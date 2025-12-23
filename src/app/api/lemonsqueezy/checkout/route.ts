import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Lemon Squeezy API
const LEMONSQUEEZY_API_KEY = process.env.LEMONSQUEEZY_API_KEY;
const LEMONSQUEEZY_STORE_ID = process.env.LEMONSQUEEZY_STORE_ID;
const LEMONSQUEEZY_VARIANT_ID = process.env.LEMONSQUEEZY_VARIANT_ID;

export async function POST(request: NextRequest) {
  try {
    // === SECURITY: Verify authentication using Supabase SSR ===
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Create Supabase client with cookie handling
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          const cookieHeader = request.headers.get("cookie") || "";
          const cookies: { name: string; value: string }[] = [];

          cookieHeader.split(";").forEach((cookie) => {
            const [name, ...valueParts] = cookie.trim().split("=");
            if (name) {
              cookies.push({
                name: name.trim(),
                value: valueParts.join("="),
              });
            }
          });

          return cookies;
        },
        setAll() {
          // Not needed for reading auth state
        },
      },
    });

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Please sign in to upgrade to Premium." },
        { status: 401 }
      );
    }

    const userId = user.id;
    const userEmail = user.email;

    // Check if Lemon Squeezy is configured
    if (!LEMONSQUEEZY_API_KEY || !LEMONSQUEEZY_STORE_ID || !LEMONSQUEEZY_VARIANT_ID) {
      return NextResponse.json({
        message: "Payment system not configured. Please add Lemon Squeezy environment variables.",
        demo: true,
      });
    }

    // Get redirect URL
    const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Create Lemon Squeezy checkout session
    const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
      method: "POST",
      headers: {
        "Accept": "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        "Authorization": `Bearer ${LEMONSQUEEZY_API_KEY}`,
      },
      body: JSON.stringify({
        data: {
          type: "checkouts",
          attributes: {
            checkout_options: {
              embed: false,
              media: false,
              button_color: "#111827",
            },
            checkout_data: {
              email: userEmail,
              custom: {
                user_id: userId,
              },
            },
            product_options: {
              redirect_url: `${origin}/pricing?success=true`,
              receipt_thank_you_note: "Thank you for subscribing to TOEFL Master Premium!",
            },
          },
          relationships: {
            store: {
              data: {
                type: "stores",
                id: LEMONSQUEEZY_STORE_ID,
              },
            },
            variant: {
              data: {
                type: "variants",
                id: LEMONSQUEEZY_VARIANT_ID,
              },
            },
          },
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Lemon Squeezy error:", errorData);
      return NextResponse.json(
        { error: "Failed to create checkout session" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const checkoutUrl = data.data.attributes.url;

    return NextResponse.json({ url: checkoutUrl });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
