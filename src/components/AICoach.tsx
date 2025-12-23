"use client";

import { useState } from "react";
import { Sparkles, Loader2, Lock, Crown, X, Send } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

interface AICoachProps {
  type: "speaking-feedback" | "writing-feedback" | "email-review" | "discussion-review" | "grammar-check";
  content: string;
  context?: string;
  onClose?: () => void;
}

export function AICoach({ type, content, context, onClose }: AICoachProps) {
  const { user, isPremium } = useAuth();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getFeedback = async () => {
    if (!content.trim()) {
      setError("Please write something first to get feedback.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ai-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, content, context }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get feedback");
      }

      setFeedback(data.feedback);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Show upgrade prompt for non-premium users
  if (!isPremium) {
    return (
      <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-purple-500/20">
            <Crown className="w-6 h-6 text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">
              AI Coaching - Premium Feature
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Get personalized feedback from AI on your speaking and writing.
              Upgrade to Premium for just ₩5,000/month.
            </p>
            <ul className="text-sm text-gray-300 space-y-1 mb-4">
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                Detailed grammar and vocabulary feedback
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                Estimated scores with explanations
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                Personalized improvement suggestions
              </li>
            </ul>
            {user ? (
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-sm font-medium transition-colors"
              >
                <Crown className="w-4 h-4" />
                Upgrade to Premium
              </Link>
            ) : (
              <Link
                href="/auth"
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-sm font-medium transition-colors"
              >
                <Lock className="w-4 h-4" />
                Sign in to Upgrade
              </Link>
            )}
          </div>
          {onClose && (
            <button onClick={onClose} className="text-gray-500 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/20">
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">AI Coach</h3>
            <p className="text-xs text-gray-400">Powered by Claude</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-gray-500 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {!feedback && !loading && (
        <div className="text-center py-4">
          <p className="text-gray-400 text-sm mb-4">
            Get personalized AI feedback on your response
          </p>
          <button
            onClick={getFeedback}
            disabled={!content.trim()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 rounded-lg font-medium transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            Get AI Feedback
          </button>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
          <span className="ml-3 text-gray-400">Analyzing your response...</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {error}
          <button
            onClick={getFeedback}
            className="ml-4 underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      )}

      {feedback && (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-[#0f172a] max-h-96 overflow-y-auto">
            <div className="prose prose-invert prose-sm max-w-none">
              {feedback.split("\n").map((line, i) => (
                <p key={i} className={line.trim() === "" ? "h-2" : "text-gray-300"}>
                  {line}
                </p>
              ))}
            </div>
          </div>
          <button
            onClick={() => {
              setFeedback(null);
              setError(null);
            }}
            className="text-sm text-purple-400 hover:underline"
          >
            Get new feedback
          </button>
        </div>
      )}
    </div>
  );
}

// Floating AI Coach button for pages
export function AICoachButton({
  type,
  content,
  context,
}: Omit<AICoachProps, "onClose">) {
  const [isOpen, setIsOpen] = useState(false);
  const { isPremium } = useAuth();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg transition-all z-50 ${
          isPremium
            ? "bg-purple-500 hover:bg-purple-600"
            : "bg-gray-600 hover:bg-gray-500"
        }`}
        title={isPremium ? "Get AI Feedback" : "Upgrade to Premium for AI Coaching"}
      >
        <Sparkles className="w-6 h-6 text-white" />
        {!isPremium && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
            <Crown className="w-3 h-3 text-black" />
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-lg">
            <AICoach
              type={type}
              content={content}
              context={context}
              onClose={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
