import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

export type CoachingType =
  | "speaking-feedback"
  | "writing-feedback"
  | "email-review"
  | "discussion-review"
  | "grammar-check"
  | "vocabulary-help";

interface CoachingRequest {
  type: CoachingType;
  content: string;
  context?: string;
  targetScore?: number;
}

const SYSTEM_PROMPTS: Record<CoachingType, string> = {
  "speaking-feedback": `You are an expert TOEFL Speaking coach. Analyze the student's spoken response and provide:
1. Pronunciation feedback (if transcribed text suggests issues)
2. Fluency assessment
3. Content evaluation
4. Specific suggestions for improvement
5. An estimated score (1-6 scale)

Be encouraging but honest. Focus on actionable improvements.`,

  "writing-feedback": `You are an expert TOEFL Writing coach. Analyze the student's writing and provide:
1. Grammar and vocabulary assessment
2. Organization and coherence evaluation
3. Task response analysis
4. Specific suggestions for improvement
5. An estimated score (1-6 scale)

Highlight both strengths and areas for improvement.`,

  "email-review": `You are an expert TOEFL Email Writing coach. Review the student's email and assess:
1. Appropriate tone and formality
2. Coverage of required points
3. Grammar and vocabulary
4. Email structure (greeting, body, closing)
5. Word count appropriateness (target: 80-120 words)

Provide specific corrections and suggestions.`,

  "discussion-review": `You are an expert TOEFL Academic Discussion coach. Review the student's discussion post and assess:
1. Clear position statement
2. Reference to classmates' ideas
3. Supporting arguments and examples
4. Grammar and vocabulary
5. Word count appropriateness (target: 100-130 words)

Provide specific suggestions for improvement.`,

  "grammar-check": `You are an English grammar expert. Analyze the text and:
1. Identify all grammar errors
2. Explain why each error is incorrect
3. Provide the corrected version
4. Give tips to avoid similar mistakes

Be thorough but explain in simple terms.`,

  "vocabulary-help": `You are a TOEFL vocabulary expert. Help the student with:
1. Word definitions and usage
2. Synonyms and antonyms
3. Example sentences
4. Common collocations
5. Related academic vocabulary

Make explanations clear and memorable.`,
};

export async function POST(request: NextRequest) {
  try {
    // Check for API key
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "AI coaching is not configured. Please add ANTHROPIC_API_KEY to environment." },
        { status: 503 }
      );
    }

    const body: CoachingRequest = await request.json();
    const { type, content, context } = body;

    if (!type || !content) {
      return NextResponse.json(
        { error: "Missing required fields: type and content" },
        { status: 400 }
      );
    }

    const systemPrompt = SYSTEM_PROMPTS[type];
    if (!systemPrompt) {
      return NextResponse.json(
        { error: "Invalid coaching type" },
        { status: 400 }
      );
    }

    let userMessage = content;
    if (context) {
      userMessage = `Context: ${context}\n\nStudent's response:\n${content}`;
    }

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    const responseText = message.content[0].type === "text"
      ? message.content[0].text
      : "";

    return NextResponse.json({
      feedback: responseText,
      usage: {
        input_tokens: message.usage.input_tokens,
        output_tokens: message.usage.output_tokens,
      },
    });

  } catch (error) {
    console.error("AI Coach error:", error);
    return NextResponse.json(
      { error: "Failed to get AI feedback. Please try again." },
      { status: 500 }
    );
  }
}
