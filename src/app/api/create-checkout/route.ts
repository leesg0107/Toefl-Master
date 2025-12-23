import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

// Initialize Stripe (only if API key is available)
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

// Supabase for auth verification
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Allowed origins for redirect URLs (security: prevent open redirect)
const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_APP_URL,
  "http://localhost:3000",
  "http://localhost:3001",
].filter(Boolean);

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  return ALLOWED_ORIGINS.some(allowed => origin.startsWith(allowed as string));
}

export async function POST(request: NextRequest) {
  try {
    // === SECURITY: Verify authentication ===
    const cookieHeader = request.headers.get("cookie");
    let userId: string | null = null;

    if (supabaseUrl && supabaseServiceKey) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      // Parse auth token from cookies
      if (cookieHeader) {
        const cookies = cookieHeader.split(";").reduce((acc, cookie) => {
          const [key, value] = cookie.trim().split("=");
          acc[key] = value;
          return acc;
        }, {} as Record<string, string>);

        const tokenCookie = Object.keys(cookies).find(k => k.includes("auth-token"));
        if (tokenCookie) {
          try {
            const parsed = JSON.parse(decodeURIComponent(cookies[tokenCookie]));
            const accessToken = parsed.access_token;

            if (accessToken) {
              const { data: { user }, error } = await supabase.auth.getUser(accessToken);
              if (!error && user) {
                userId = user.id;
              }
            }
          } catch {
            // Cookie parsing failed
          }
        }
      }
    }

    // Require authentication for checkout
    if (!userId) {
      return NextResponse.json(
        { error: "Please sign in to upgrade to Premium." },
        { status: 401 }
      );
    }

    // Check if Stripe is configured
    if (!stripe || !process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({
        message: "결제 시스템 설정이 필요합니다. 환경 변수에 STRIPE_SECRET_KEY를 추가해주세요.",
        demo: true,
      });
    }

    const body = await request.json();
    const { plan } = body;

    // === SECURITY: Validate plan input ===
    if (plan !== "premium") {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    // === SECURITY: Validate origin to prevent open redirect ===
    const origin = request.headers.get("origin");
    const safeOrigin = isAllowedOrigin(origin)
      ? origin
      : (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000");

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "krw",
            product_data: {
              name: "TOEFL Master Premium",
              description: "AI-powered coaching for TOEFL preparation",
            },
            unit_amount: 5000, // ₩5,000
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      // Use validated origin for redirect URLs
      success_url: `${safeOrigin}/pricing?success=true`,
      cancel_url: `${safeOrigin}/pricing?canceled=true`,
      // Include user ID in metadata for webhook processing
      metadata: {
        userId: userId,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
