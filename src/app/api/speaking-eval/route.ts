import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";

const anthropic = new Anthropic();

export async function POST(request: NextRequest) {
  try {
    console.log("[speaking-eval] Request received");

    // SECURITY: Require Supabase configuration - fail securely in production
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("[speaking-eval] Supabase not configured");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

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

    // Check premium status (same logic as frontend AuthContext)
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("subscription_tier, subscription_expires_at")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.error("[speaking-eval] Profile query failed");
      return NextResponse.json({ error: "Failed to verify premium status" }, { status: 500 });
    }

    if (!profile) {
      return NextResponse.json({ error: "User profile not found" }, { status: 404 });
    }

    // Premium check: tier is "premium" AND (no expiry OR expiry in future)
    const isPremium = profile.subscription_tier === "premium" &&
      (!profile.subscription_expires_at || new Date(profile.subscription_expires_at) > new Date());

    if (!isPremium) {
      return NextResponse.json({ error: "Premium subscription required" }, { status: 403 });
    }

    const { targetSentence, userTranscript, sessionTitle, location } = await request.json();

    // SECURITY: Validate all inputs to prevent prompt injection
    if (!targetSentence || !userTranscript) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const MAX_SENTENCE_LENGTH = 500;
    const MAX_TRANSCRIPT_LENGTH = 1000;
    const MAX_METADATA_LENGTH = 200;

    if (targetSentence.length > MAX_SENTENCE_LENGTH ||
        userTranscript.length > MAX_TRANSCRIPT_LENGTH ||
        (sessionTitle && sessionTitle.length > MAX_METADATA_LENGTH) ||
        (location && location.length > MAX_METADATA_LENGTH)) {
      return NextResponse.json({ error: "Input too long" }, { status: 400 });
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
