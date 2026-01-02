import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";

// Note: Anthropic client is created per-request to ensure env vars are read correctly
function getAnthropicClient() {
  return new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY || "",
  });
}

// Initialize Supabase admin client for server-side auth verification
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

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
  "speaking-feedback": `You are an expert TOEFL Speaking coach providing premium feedback. Analyze the student's spoken response and provide structured feedback.

FORMAT YOUR RESPONSE EXACTLY LIKE THIS:

**Estimated Score: X/6**

**Strengths:**
- [List 2-3 specific things the student did well]

**Areas for Improvement:**
- [List 2-3 specific issues to work on]

**Suggestions:**
- [List 2-3 actionable tips for improvement]

**Corrected/Improved Version:**
[Provide an improved version of their response that maintains their ideas but fixes errors and enhances expression]

Be encouraging but honest. Focus on delivery, language use, and topic development. Provide specific examples from their response.`,

  "writing-feedback": `You are an expert TOEFL Writing coach providing premium feedback. Analyze the student's writing and provide structured feedback.

FORMAT YOUR RESPONSE EXACTLY LIKE THIS:

**Estimated Score: X/6**

**Strengths:**
- [List 2-3 specific things the student did well]

**Areas for Improvement:**
- [List 2-3 specific grammar, vocabulary, or organization issues]

**Suggestions:**
- [List 2-3 actionable tips for improvement]

**Corrected/Improved Version:**
[Provide a polished version that maintains their ideas but improves grammar, vocabulary, and flow]

Focus on grammar accuracy, vocabulary range, organization, coherence, and task completion. Use specific examples.`,

  "email-review": `You are an expert TOEFL Email Writing coach providing premium feedback. Review the student's email response.

FORMAT YOUR RESPONSE EXACTLY LIKE THIS:

**Estimated Score: X/6**

**Strengths:**
- [List 2-3 things done well: tone, structure, coverage of points]

**Areas for Improvement:**
- [List issues with formality, grammar, missing points, or word count]

**Suggestions:**
- [Specific tips for email writing improvement]

**Corrected/Improved Version:**
[Provide a polished email that addresses all required points with appropriate tone]

Target word count is 80-120 words. Check for appropriate greeting, clear body paragraphs, and proper closing.`,

  "discussion-review": `You are an expert TOEFL Academic Discussion coach providing premium feedback. Review the student's discussion post.

FORMAT YOUR RESPONSE EXACTLY LIKE THIS:

**Estimated Score: X/6**

**Strengths:**
- [List 2-3 things done well: position clarity, references to others, examples]

**Areas for Improvement:**
- [List issues with argumentation, grammar, or task completion]

**Suggestions:**
- [Specific tips for academic discussion improvement]

**Corrected/Improved Version:**
[Provide an improved discussion post that clearly states position, references classmates, and supports with examples]

Target word count is 100-130 words. Check for clear position, engagement with others' ideas, and supporting evidence.`,

  "grammar-check": `You are an English grammar expert providing detailed analysis.

FORMAT YOUR RESPONSE EXACTLY LIKE THIS:

**Strengths:**
- [List grammatical structures used correctly]

**Areas for Improvement:**
- [List each grammar error with explanation]

**Suggestions:**
- [Tips to avoid these mistakes in the future]

**Corrected Version:**
[Provide the fully corrected text]

Be thorough and educational. Explain why each correction was made.`,

  "vocabulary-help": `You are a TOEFL vocabulary expert providing comprehensive help.

FORMAT YOUR RESPONSE EXACTLY LIKE THIS:

**Word Analysis:**
- Definition: [Clear definition]
- Part of speech: [noun/verb/adj/etc.]

**Strengths (if used in context):**
- [How the word was used effectively]

**Suggestions:**
- [Better word choices or collocations]
- [Related academic vocabulary to learn]

**Example Sentences:**
[2-3 example sentences using the word correctly in TOEFL contexts]

Make explanations clear, memorable, and relevant to TOEFL.`,
};

// Valid coaching types for validation
const VALID_TYPES = new Set<string>([
  "speaking-feedback",
  "writing-feedback",
  "email-review",
  "discussion-review",
  "grammar-check",
  "vocabulary-help"
]);

// Rate limiting: simple in-memory store (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // requests per window
const RATE_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(userId);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(userId, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  console.log("[AI Coach] Request received");

  try {
    // Check for API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    console.log("[AI Coach] API key present:", !!apiKey, "Length:", apiKey?.length || 0);

    if (!apiKey) {
      return NextResponse.json(
        { error: "AI coaching is not configured. Please add ANTHROPIC_API_KEY to environment." },
        { status: 503 }
      );
    }

    // === SECURITY: Verify authentication ===
    const authHeader = request.headers.get("authorization");
    const cookieHeader = request.headers.get("cookie");

    // Try to get session from Supabase
    let userId: string | null = null;
    let isPremium = false;

    if (supabaseUrl && supabaseServiceKey) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      // Get the access token from Authorization header or cookie
      let accessToken: string | null = null;

      if (authHeader?.startsWith("Bearer ")) {
        accessToken = authHeader.substring(7);
      } else if (cookieHeader) {
        // Parse sb-access-token from cookies
        const cookies = cookieHeader.split(";").reduce((acc, cookie) => {
          const [key, value] = cookie.trim().split("=");
          acc[key] = value;
          return acc;
        }, {} as Record<string, string>);

        // Supabase stores tokens in cookies with project-specific names
        const tokenCookie = Object.keys(cookies).find(k => k.includes("auth-token"));
        if (tokenCookie) {
          try {
            const parsed = JSON.parse(decodeURIComponent(cookies[tokenCookie]));
            accessToken = parsed.access_token;
          } catch {
            // Cookie parsing failed
          }
        }
      }

      if (accessToken) {
        const { data: { user }, error } = await supabase.auth.getUser(accessToken);
        if (!error && user) {
          userId = user.id;

          // Check premium status from database
          const { data: profile } = await supabase
            .from("profiles")
            .select("subscription_tier, subscription_expires_at")
            .eq("id", user.id)
            .single();

          if (profile) {
            const hasActiveSub = profile.subscription_tier === "premium" &&
              (!profile.subscription_expires_at ||
               new Date(profile.subscription_expires_at) > new Date());
            isPremium = hasActiveSub;
          }
        }
      }
    }

    // === SECURITY: Require authentication for AI features ===
    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required. Please sign in to use AI coaching." },
        { status: 401 }
      );
    }

    // === SECURITY: Check rate limit ===
    if (!checkRateLimit(userId)) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please wait a moment before trying again." },
        { status: 429 }
      );
    }

    const body: CoachingRequest = await request.json();
    const { type, content, context } = body;

    // === SECURITY: Validate input ===
    if (!type || !content) {
      return NextResponse.json(
        { error: "Missing required fields: type and content" },
        { status: 400 }
      );
    }

    // Validate coaching type
    if (!VALID_TYPES.has(type)) {
      return NextResponse.json(
        { error: "Invalid coaching type" },
        { status: 400 }
      );
    }

    // === SECURITY: Limit content length to prevent abuse ===
    const MAX_CONTENT_LENGTH = 5000;
    const MAX_CONTEXT_LENGTH = 2000;

    if (content.length > MAX_CONTENT_LENGTH) {
      return NextResponse.json(
        { error: `Content too long. Maximum ${MAX_CONTENT_LENGTH} characters allowed.` },
        { status: 400 }
      );
    }

    if (context && context.length > MAX_CONTEXT_LENGTH) {
      return NextResponse.json(
        { error: `Context too long. Maximum ${MAX_CONTEXT_LENGTH} characters allowed.` },
        { status: 400 }
      );
    }

    const systemPrompt = SYSTEM_PROMPTS[type];

    let userMessage = content;
    if (context) {
      userMessage = `Context: ${context}\n\nStudent's response:\n${content}`;
    }

    console.log("[AI Coach] Calling Anthropic API with model: claude-haiku-4-5-20251001");
    console.log("[AI Coach] Content length:", userMessage.length);

    const anthropic = getAnthropicClient();
    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2048,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    console.log("[AI Coach] Anthropic API call successful");

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

  } catch (error: unknown) {
    console.error("AI Coach error:", error);

    // Log full error details for debugging
    const errorObj = error as { status?: number; message?: string; error?: { type?: string; message?: string } };
    console.error("Full error object:", JSON.stringify(errorObj, null, 2));

    let errorMessage = "Failed to get AI feedback. Please try again.";

    // Check for Anthropic API errors
    if (errorObj.error?.message) {
      console.error("Anthropic error message:", errorObj.error.message);
      errorMessage = `API Error: ${errorObj.error.message}`;
    } else if (errorObj.message) {
      console.error("Error message:", errorObj.message);
      if (errorObj.message.includes("API key") || errorObj.message.includes("authentication")) {
        errorMessage = "Invalid API key. Please check your ANTHROPIC_API_KEY.";
      } else if (errorObj.message.includes("rate")) {
        errorMessage = "Rate limit exceeded. Please try again in a moment.";
      } else {
        errorMessage = errorObj.message;
      }
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
