"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Crown, Sparkles, ArrowLeft, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const plans = [
  {
    name: "Free",
    price: "₩0",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      "All Speaking practice sessions",
      "All Writing practice types",
      "Vocabulary flashcards & quiz",
      "Study Notes & Templates",
      "Basic progress tracking",
    ],
    notIncluded: [
      "AI-powered feedback",
      "Personalized coaching",
      "Score predictions",
    ],
    cta: "Current Plan",
    disabled: true,
  },
  {
    name: "Premium",
    price: "₩5,000",
    period: "month",
    description: "Get AI-powered coaching",
    features: [
      "Everything in Free",
      "AI Speaking feedback",
      "AI Writing review & corrections",
      "Grammar & vocabulary analysis",
      "Estimated score predictions",
      "Personalized improvement tips",
      "Priority support",
    ],
    notIncluded: [],
    cta: "Upgrade Now",
    disabled: false,
    popular: true,
  },
];

export default function PricingPage() {
  const { user, isPremium } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    if (!user) {
      router.push("/auth?redirect=/pricing");
      return;
    }

    setLoading(true);

    try {
      // In production, this would redirect to Stripe/Toss checkout
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "premium" }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else if (data.message) {
        // Demo mode
        alert(data.message);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("결제 시스템이 아직 설정되지 않았습니다. Stripe 설정 후 이용 가능합니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Upgrade Your TOEFL Prep
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Get personalized AI coaching to maximize your score.
            Our AI analyzes your responses and provides detailed feedback.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-8 rounded-2xl border ${
                plan.popular
                  ? "bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/50"
                  : "bg-[#1e293b] border-[#334155]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-purple-500 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                  {plan.name}
                  {plan.name === "Premium" && <Crown className="w-5 h-5 text-yellow-400" />}
                </h2>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400">/{plan.period}</span>
                </div>
                <p className="text-gray-400 mt-2">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
                {plan.notIncluded.map((feature, i) => (
                  <li key={`not-${i}`} className="flex items-start gap-3 opacity-50">
                    <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                      —
                    </span>
                    <span className="text-gray-500 line-through">{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.name === "Free" ? (
                <button
                  disabled
                  className="w-full py-3 bg-[#334155] text-gray-400 rounded-lg font-medium cursor-not-allowed"
                >
                  {isPremium ? "Previously Used" : "Current Plan"}
                </button>
              ) : isPremium ? (
                <button
                  disabled
                  className="w-full py-3 bg-green-500/20 text-green-400 rounded-lg font-medium cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  Active Subscription
                </button>
              ) : (
                <button
                  onClick={handleUpgrade}
                  disabled={loading}
                  className="w-full py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-500/50 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      {plan.cta}
                    </>
                  )}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="p-8 rounded-2xl bg-[#1e293b] border border-[#334155]">
          <h3 className="text-xl font-semibold text-white mb-6">
            Frequently Asked Questions
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-white mb-2">How does AI coaching work?</h4>
              <p className="text-gray-400 text-sm">
                Our AI analyzes your speaking and writing responses, providing detailed feedback
                on grammar, vocabulary, coherence, and more. It also estimates your score and
                gives personalized tips for improvement.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Can I cancel anytime?</h4>
              <p className="text-gray-400 text-sm">
                Yes! You can cancel your subscription at any time. You&apos;ll continue to have
                Premium access until the end of your billing period.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">What payment methods are accepted?</h4>
              <p className="text-gray-400 text-sm">
                We accept credit/debit cards, and Korean payment methods including
                카카오페이, 네이버페이, and bank transfer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
