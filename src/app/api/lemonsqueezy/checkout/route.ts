import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Lemon Squeezy API
const LEMONSQUEEZY_API_KEY = process.env.LEMONSQUEEZY_API_KEY;
const LEMONSQUEEZY_STORE_ID = process.env.LEMONSQUEEZY_STORE_ID;
const LEMONSQUEEZY_VARIANT_ID = process.env.LEMONSQUEEZY_VARIANT_ID;

export async function POST(request: NextRequest) {
  try {
    // === SECURITY: Verify authentication via Authorization header ===
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Missing Supabase config:", { supabaseUrl: !!supabaseUrl, supabaseAnonKey: !!supabaseAnonKey });
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Get access token from Authorization header
    const authHeader = request.headers.get("authorization");
    console.log("Auth header present:", !!authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Please sign in to upgrade to Premium." },
        { status: 401 }
      );
    }

    const accessToken = authHeader.substring(7); // Remove "Bearer " prefix
    console.log("Access token length:", accessToken.length);

    // Create Supabase client and set the session manually
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });

    // Get the user using the token
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    console.log("Auth result:", { user: !!user, error: authError?.message });

    if (authError || !user) {
      console.error("Auth error:", authError);
      return NextResponse.json(
        { error: "Please sign in to upgrade to Premium." },
        { status: 401 }
      );
    }

    const userId = user.id;
    const userEmail = user.email;
    console.log("User authenticated:", { userId, userEmail });

    // Check if Lemon Squeezy is configured
    if (!LEMONSQUEEZY_API_KEY || !LEMONSQUEEZY_STORE_ID || !LEMONSQUEEZY_VARIANT_ID) {
      console.error("Missing Lemon Squeezy config:", {
        apiKey: !!LEMONSQUEEZY_API_KEY,
        storeId: LEMONSQUEEZY_STORE_ID,
        variantId: LEMONSQUEEZY_VARIANT_ID,
      });
      return NextResponse.json({
        message: "Payment system not configured. Please add Lemon Squeezy environment variables.",
        demo: true,
      });
    }

    console.log("Lemon Squeezy config:", {
      storeId: LEMONSQUEEZY_STORE_ID,
      variantId: LEMONSQUEEZY_VARIANT_ID,
    });

    // Get redirect URL
    const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "https://toeflmaster.org";

    const requestBody = {
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
              id: String(LEMONSQUEEZY_STORE_ID),
            },
          },
          variant: {
            data: {
              type: "variants",
              id: String(LEMONSQUEEZY_VARIANT_ID),
            },
          },
        },
      },
    };

    console.log("Lemon Squeezy request body:", JSON.stringify(requestBody, null, 2));

    // Create Lemon Squeezy checkout session
    const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
      method: "POST",
      headers: {
        "Accept": "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        "Authorization": `Bearer ${LEMONSQUEEZY_API_KEY}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Lemon Squeezy error response:", JSON.stringify(errorData, null, 2));

      // Extract error message for user
      const errorMessage = errorData.errors?.[0]?.detail || "Failed to create checkout session";
      return NextResponse.json(
        { error: errorMessage },
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
