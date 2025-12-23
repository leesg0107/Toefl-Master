import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Supabase for auth verification
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Lemon Squeezy API
const LEMONSQUEEZY_API_KEY = process.env.LEMONSQUEEZY_API_KEY;
const LEMONSQUEEZY_STORE_ID = process.env.LEMONSQUEEZY_STORE_ID;
const LEMONSQUEEZY_VARIANT_ID = process.env.LEMONSQUEEZY_VARIANT_ID; // Product variant for Premium subscription

export async function POST(request: NextRequest) {
  try {
    // === SECURITY: Verify authentication ===
    const cookieHeader = request.headers.get("cookie");
    let userId: string | null = null;
    let userEmail: string | null = null;

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
                userEmail = user.email || null;
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
              button_color: "#111827", // Match our design
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
