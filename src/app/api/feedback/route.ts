import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

interface SaveFeedbackRequest {
  sessionType: "speaking" | "writing-email" | "writing-discussion";
  feedbackType: string;
  topicTitle?: string;
  content: string;
  context?: string;
  wordCount?: number;
  score?: string;
  strengths?: string[];
  improvements?: string[];
  suggestions?: string[];
  correctedVersion?: string;
  rawFeedback: string;
  inputTokens?: number;
  outputTokens?: number;
}

// Helper to get user from auth header
async function getUserFromRequest(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.substring(7);
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return null;
  }

  return user;
}

// POST - Save feedback
export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: SaveFeedbackRequest = await request.json();
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Create practice session first
    const { data: session, error: sessionError } = await supabase
      .from("practice_sessions")
      .insert({
        user_id: user.id,
        session_type: body.sessionType,
        topic_title: body.topicTitle,
        content: body.content,
        context: body.context,
        word_count: body.wordCount,
      })
      .select()
      .single();

    if (sessionError) {
      console.error("Error creating session:", sessionError);
      return NextResponse.json({ error: "Failed to save session" }, { status: 500 });
    }

    // Save AI feedback
    const { data: feedback, error: feedbackError } = await supabase
      .from("ai_feedback")
      .insert({
        user_id: user.id,
        session_id: session.id,
        feedback_type: body.feedbackType,
        score: body.score,
        strengths: body.strengths,
        improvements: body.improvements,
        suggestions: body.suggestions,
        corrected_version: body.correctedVersion,
        raw_feedback: body.rawFeedback,
        input_tokens: body.inputTokens,
        output_tokens: body.outputTokens,
      })
      .select()
      .single();

    if (feedbackError) {
      console.error("Error saving feedback:", feedbackError);
      return NextResponse.json({ error: "Failed to save feedback" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      feedbackId: feedback.id,
    });
  } catch (error) {
    console.error("Save feedback error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// GET - Fetch feedback history
export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // 'speaking' | 'writing' | null (all)
    const limit = parseInt(searchParams.get("limit") || "20");

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    let query = supabase
      .from("ai_feedback")
      .select(`
        *,
        practice_sessions (
          id,
          session_type,
          topic_title,
          content,
          context,
          word_count,
          created_at
        )
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(limit);

    // Filter by type
    if (type === "speaking") {
      query = query.eq("feedback_type", "speaking-feedback");
    } else if (type === "writing") {
      query = query.in("feedback_type", ["email-review", "discussion-review", "writing-feedback"]);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching feedback:", error);
      return NextResponse.json({ error: "Failed to fetch feedback" }, { status: 500 });
    }

    return NextResponse.json({ feedback: data });
  } catch (error) {
    console.error("Fetch feedback error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
