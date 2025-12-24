import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Use service role key for database updates
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Helper to extract subscription period from Stripe response
interface SubscriptionData {
  id: string;
  status: string;
  customer: string;
  current_period_start: number;
  current_period_end: number;
  cancel_at_period_end: boolean;
}

function extractSubscriptionData(obj: unknown): SubscriptionData {
  const sub = obj as Record<string, unknown>;
  return {
    id: sub.id as string,
    status: sub.status as string,
    customer: (typeof sub.customer === 'string' ? sub.customer : (sub.customer as Record<string, unknown>)?.id) as string,
    current_period_start: sub.current_period_start as number,
    current_period_end: sub.current_period_end as number,
    cancel_at_period_end: sub.cancel_at_period_end as boolean,
  };
}

export async function POST(request: NextRequest) {
  if (!stripe || !webhookSecret) {
    console.error("Stripe or webhook secret not configured");
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 500 }
    );
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Supabase not configured");
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "No signature provided" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const customerId = session.customer as string;
        const subscriptionId = session.subscription as string;

        if (userId && subscriptionId) {
          // Fetch subscription details
          const subscriptionResponse = await stripe.subscriptions.retrieve(subscriptionId);
          const subscription = extractSubscriptionData(subscriptionResponse);
          const periodEnd = new Date(subscription.current_period_end * 1000);

          // Update user profile with premium status
          await supabase
            .from("profiles")
            .update({
              subscription_tier: "premium",
              subscription_expires_at: periodEnd.toISOString(),
              stripe_customer_id: customerId,
            })
            .eq("id", userId);

          // Create subscription record
          await supabase.from("subscriptions").upsert({
            user_id: userId,
            stripe_subscription_id: subscriptionId,
            stripe_customer_id: customerId,
            status: subscription.status,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: periodEnd.toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end,
          }, {
            onConflict: "stripe_subscription_id",
          });

          console.log(`Premium activated for user ${userId}`);
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscriptionEvent = event.data.object;
        const subscription = extractSubscriptionData(subscriptionEvent);
        const subscriptionId = subscription.id;
        const customerId = subscription.customer;

        // Find user by stripe_customer_id
        const { data: profile } = await supabase
          .from("profiles")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (profile) {
          const periodEnd = new Date(subscription.current_period_end * 1000);
          const isActive = subscription.status === "active" || subscription.status === "trialing";

          // Update profile
          await supabase
            .from("profiles")
            .update({
              subscription_tier: isActive ? "premium" : "free",
              subscription_expires_at: isActive ? periodEnd.toISOString() : null,
            })
            .eq("id", profile.id);

          // Update subscription record
          await supabase.from("subscriptions").upsert({
            user_id: profile.id,
            stripe_subscription_id: subscriptionId,
            stripe_customer_id: customerId,
            status: subscription.status,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: periodEnd.toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end,
          }, {
            onConflict: "stripe_subscription_id",
          });

          console.log(`Subscription updated for user ${profile.id}: ${subscription.status}`);
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscriptionEvent = event.data.object;
        const subscription = extractSubscriptionData(subscriptionEvent);
        const customerId = subscription.customer;

        // Find user and downgrade to free
        const { data: profile } = await supabase
          .from("profiles")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (profile) {
          await supabase
            .from("profiles")
            .update({
              subscription_tier: "free",
              subscription_expires_at: null,
            })
            .eq("id", profile.id);

          // Update subscription record status
          await supabase
            .from("subscriptions")
            .update({ status: "canceled" })
            .eq("stripe_subscription_id", subscription.id);

          console.log(`Subscription canceled for user ${profile.id}`);
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = (typeof invoice.customer === 'string'
          ? invoice.customer
          : invoice.customer?.id) as string;

        // Find user and mark subscription as past_due
        const { data: profile } = await supabase
          .from("profiles")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (profile) {
          await supabase
            .from("subscriptions")
            .update({ status: "past_due" })
            .eq("user_id", profile.id)
            .eq("status", "active");

          console.log(`Payment failed for user ${profile.id}`);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
