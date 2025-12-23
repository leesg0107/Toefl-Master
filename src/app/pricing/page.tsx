"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Star, ArrowLeft, Loader2 } from "lucide-react";
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
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "premium" }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else if (data.message) {
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
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-600 text-sm mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Upgrade Your TOEFL Prep
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Get personalized AI coaching to maximize your score.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-6 rounded-lg border ${
                plan.popular
                  ? "border-gray-900 ring-1 ring-gray-900"
                  : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 bg-gray-900 text-white rounded-full text-xs font-medium">
                    Recommended
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  {plan.name}
                  {plan.name === "Premium" && <Star className="w-4 h-4 text-amber-500" />}
                </h2>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-400">/{plan.period}</span>
                </div>
                <p className="text-gray-500 text-sm mt-2">{plan.description}</p>
              </div>

              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-gray-900 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
                {plan.notIncluded.map((feature, i) => (
                  <li key={`not-${i}`} className="flex items-start gap-2 text-sm opacity-50">
                    <span className="w-4 text-center">—</span>
                    <span className="text-gray-400 line-through">{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.name === "Free" ? (
                <button
                  disabled
                  className="w-full py-2.5 bg-gray-100 text-gray-400 rounded-lg text-sm font-medium cursor-not-allowed"
                >
                  {isPremium ? "Previously Used" : "Current Plan"}
                </button>
              ) : isPremium ? (
                <button
                  disabled
                  className="w-full py-2.5 bg-green-50 text-green-600 rounded-lg text-sm font-medium cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Active Subscription
                </button>
              ) : (
                <button
                  onClick={handleUpgrade}
                  disabled={loading}
                  className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    plan.cta
                  )}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="border-t border-gray-100 pt-10">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">FAQ</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-1">How does AI coaching work?</h4>
              <p className="text-gray-500 text-sm">
                Our AI analyzes your speaking and writing responses, providing detailed feedback
                on grammar, vocabulary, coherence, and estimated scores.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Can I cancel anytime?</h4>
              <p className="text-gray-500 text-sm">
                Yes! Cancel anytime. You keep Premium access until your billing period ends.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">What payment methods are accepted?</h4>
              <p className="text-gray-500 text-sm">
                Credit/debit cards, 카카오페이, 네이버페이, and bank transfer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
