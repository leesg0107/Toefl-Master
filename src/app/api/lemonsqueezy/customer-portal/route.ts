import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const LEMONSQUEEZY_API_KEY = process.env.LEMONSQUEEZY_API_KEY;

export async function POST(request: NextRequest) {
  try {
    // === SECURITY: Verify authentication ===
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Get access token from Authorization header
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const accessToken = authHeader.substring(7);
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Verify user
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !user) {
      return NextResponse.json(
        { error: "Invalid session" },
        { status: 401 }
      );
    }

    // Get subscription ID from profile
    if (!supabaseServiceKey) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const adminSupabase = createClient(supabaseUrl, supabaseServiceKey);
    const { data: profile, error: profileError } = await adminSupabase
      .from("profiles")
      .select("lemon_squeezy_subscription_id, lemon_squeezy_customer_id")
      .eq("id", user.id)
      .single();

    if (profileError || !profile?.lemon_squeezy_subscription_id) {
      return NextResponse.json(
        { error: "No active subscription found" },
        { status: 404 }
      );
    }

    // Check if Lemon Squeezy is configured
    if (!LEMONSQUEEZY_API_KEY) {
      return NextResponse.json(
        { error: "Payment system not configured" },
        { status: 500 }
      );
    }

    // Get subscription details from Lemon Squeezy
    const subscriptionResponse = await fetch(
      `https://api.lemonsqueezy.com/v1/subscriptions/${profile.lemon_squeezy_subscription_id}`,
      {
        headers: {
          "Accept": "application/vnd.api+json",
          "Authorization": `Bearer ${LEMONSQUEEZY_API_KEY}`,
        },
      }
    );

    if (!subscriptionResponse.ok) {
      console.error("Failed to fetch subscription:", await subscriptionResponse.text());
      return NextResponse.json(
        { error: "Failed to fetch subscription details" },
        { status: 500 }
      );
    }

    const subscriptionData = await subscriptionResponse.json();
    const subscription = subscriptionData.data.attributes;

    // Return subscription details and URLs
    return NextResponse.json({
      subscription: {
        status: subscription.status,
        statusFormatted: subscription.status_formatted,
        renewsAt: subscription.renews_at,
        endsAt: subscription.ends_at,
        cardBrand: subscription.card_brand,
        cardLastFour: subscription.card_last_four,
      },
      urls: {
        updatePaymentMethod: subscription.urls?.update_payment_method,
        customerPortal: subscription.urls?.customer_portal,
      },
    });

  } catch (error) {
    console.error("Customer portal error:", error);
    return NextResponse.json(
      { error: "Failed to get subscription details" },
      { status: 500 }
    );
  }
}
