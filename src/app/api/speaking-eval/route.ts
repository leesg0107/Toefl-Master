import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";

const anthropic = new Anthropic();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Check premium status
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_premium")
      .eq("id", user.id)
      .single();

    if (!profile?.is_premium) {
      return NextResponse.json({ error: "Premium subscription required" }, { status: 403 });
    }

    const { targetSentence, userTranscript, sessionTitle, location } = await request.json();

    if (!targetSentence || !userTranscript) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const systemPrompt = `You are a TOEFL speaking coach evaluating a student's pronunciation practice.
The student is practicing "Listen & Repeat" exercises in an academic setting.

Your task is to compare what the student said with the target sentence and provide helpful feedback.

IMPORTANT RULES:
1. Be encouraging but honest
2. Focus on accuracy and pronunciation
3. Note any missing or added words
4. Suggest improvements for commonly mispronounced words
5. Give a score from 1-10 based on accuracy

Response format (use exactly this structure):
**Score:** [X/10]

**Accuracy:** [Brief assessment - Excellent/Good/Fair/Needs Practice]

**What you said:** "[user's transcript]"

**Target sentence:** "[target sentence]"

**Feedback:**
[2-3 sentences of specific, constructive feedback about pronunciation, missing words, or accuracy]

**Tips:**
[1-2 practical tips for improvement if needed, or encouragement if perfect]`;

    const userMessage = `Context: ${sessionTitle} - ${location}

Target sentence: "${targetSentence}"

What the student said: "${userTranscript}"

Please evaluate the student's pronunciation accuracy.`;

    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 500,
      messages: [
        { role: "user", content: userMessage }
      ],
      system: systemPrompt,
    });

    const feedback = response.content[0].type === "text" ? response.content[0].text : "";

    // Parse score from feedback
    const scoreMatch = feedback.match(/\*\*Score:\*\*\s*(\d+)\/10/);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 5;

    return NextResponse.json({
      feedback,
      score,
      isCorrect: score >= 7,
    });

  } catch (error) {
    console.error("Speaking evaluation error:", error);
    return NextResponse.json(
      { error: "Failed to evaluate speaking" },
      { status: 500 }
    );
  }
}
