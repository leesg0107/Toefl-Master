import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const WEBHOOK_SECRET = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

// Initialize Supabase admin client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

interface LemonSqueezyWebhookEvent {
  meta: {
    event_name: string;
    custom_data?: {
      user_id?: string;
    };
  };
  data: {
    id: string;
    type: string;
    attributes: {
      status: string;
      user_email: string;
      ends_at: string | null;
      renews_at: string | null;
      created_at: string;
      updated_at: string;
      customer_id: number;
      product_id: number;
      variant_id: number;
    };
  };
}

function verifySignature(payload: string, signature: string): boolean {
  if (!WEBHOOK_SECRET) {
    console.error("Webhook secret not configured");
    return false;
  }

  const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET);
  const digest = hmac.update(payload).digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(digest)
  );
}

export async function POST(request: NextRequest) {
  try {
    // Get the raw body for signature verification
    const rawBody = await request.text();
    const signature = request.headers.get("x-signature");

    // Verify webhook signature
    if (!signature || !verifySignature(rawBody, signature)) {
      console.error("Invalid webhook signature");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    const event: LemonSqueezyWebhookEvent = JSON.parse(rawBody);
    const eventName = event.meta.event_name;
    const userId = event.meta.custom_data?.user_id;

    console.log("Webhook received:", eventName, "for user:", userId);

    // Initialize Supabase client
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Supabase not configured");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Handle different event types
    switch (eventName) {
      case "subscription_created":
      case "subscription_updated":
      case "subscription_resumed": {
        if (!userId) {
          console.error("No user_id in webhook custom_data");
          return NextResponse.json({ received: true });
        }

        const { status, ends_at, renews_at, customer_id } = event.data.attributes;
        const isActive = status === "active" || status === "on_trial";

        // Update user's subscription in the database
        const { error } = await supabase
          .from("profiles")
          .update({
            subscription_tier: isActive ? "premium" : "free",
            subscription_expires_at: ends_at || renews_at,
            lemon_squeezy_subscription_id: event.data.id,
            lemon_squeezy_customer_id: customer_id ? String(customer_id) : null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", userId);

        if (error) {
          console.error("Failed to update profile:", error);
          return NextResponse.json(
            { error: "Failed to update subscription" },
            { status: 500 }
          );
        }

        console.log("Subscription updated for user:", userId, "status:", isActive ? "premium" : "free");
        break;
      }

      case "subscription_cancelled":
      case "subscription_expired":
      case "subscription_paused": {
        if (!userId) {
          console.error("No user_id in webhook custom_data");
          return NextResponse.json({ received: true });
        }

        // Set subscription to free when cancelled/expired
        const { error } = await supabase
          .from("profiles")
          .update({
            subscription_tier: "free",
            updated_at: new Date().toISOString(),
          })
          .eq("id", userId);

        if (error) {
          console.error("Failed to update profile:", error);
          return NextResponse.json(
            { error: "Failed to update subscription" },
            { status: 500 }
          );
        }

        console.log("Subscription cancelled for user:", userId);
        break;
      }

      case "subscription_payment_success": {
        console.log("Payment successful for subscription:", event.data.id);
        break;
      }

      case "subscription_payment_failed": {
        console.log("Payment failed for subscription:", event.data.id);
        // Optionally send notification to user
        break;
      }

      default:
        console.log("Unhandled webhook event:", eventName);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
