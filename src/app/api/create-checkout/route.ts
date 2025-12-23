import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe (only if API key is available)
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-12-15.clover" })
  : null;

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!stripe || !process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({
        message: "결제 시스템 설정이 필요합니다. 환경 변수에 STRIPE_SECRET_KEY를 추가해주세요.",
        demo: true,
      });
    }

    const body = await request.json();
    const { plan } = body;

    if (plan !== "premium") {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

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
      success_url: `${request.headers.get("origin")}/pricing?success=true`,
      cancel_url: `${request.headers.get("origin")}/pricing?canceled=true`,
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
