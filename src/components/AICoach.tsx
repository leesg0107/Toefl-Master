"use client";

import { useState } from "react";
import { Sparkles, Loader2, Lock, Crown, X, CheckCircle, AlertCircle, TrendingUp, BookOpen, MessageSquare, Target } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

interface AICoachProps {
  type: "speaking-feedback" | "writing-feedback" | "email-review" | "discussion-review" | "grammar-check";
  content: string;
  context?: string;
  onClose?: () => void;
}

interface ParsedFeedback {
  score?: string;
  scoreExplanation?: string;
  strengths: string[];
  improvements: string[];
  suggestions: string[];
  correctedVersion?: string;
  rawFeedback: string;
}

function parseFeedback(feedback: string): ParsedFeedback {
  const result: ParsedFeedback = {
    strengths: [],
    improvements: [],
    suggestions: [],
    rawFeedback: feedback,
  };

  // Extract score (look for patterns like "Score: 4/6" or "Estimated Score: 5")
  const scoreMatch = feedback.match(/(?:estimated\s+)?score[:\s]+(\d+(?:\.\d+)?)\s*(?:\/\s*(\d+)|out of (\d+))?/i);
  if (scoreMatch) {
    const score = scoreMatch[1];
    const maxScore = scoreMatch[2] || scoreMatch[3] || "6";
    result.score = `${score}/${maxScore}`;
  }

  // Extract sections by common headers
  const sections = feedback.split(/\n(?=\d+\.|#{1,3}\s|\*\*[^*]+\*\*:?|\b(?:Strengths?|Weakness|Areas? for Improvement|Suggestions?|Feedback|Grammar|Vocabulary|Content|Organization|Corrected|Revised))/i);

  sections.forEach(section => {
    const lowerSection = section.toLowerCase();
    const bullets = section.match(/[-•*]\s+.+/g) || [];
    const cleanBullets = bullets.map(b => b.replace(/^[-•*]\s+/, '').trim()).filter(b => b.length > 0);

    if (lowerSection.includes('strength') || lowerSection.includes('well') || lowerSection.includes('good')) {
      result.strengths.push(...cleanBullets);
    } else if (lowerSection.includes('improve') || lowerSection.includes('weakness') || lowerSection.includes('error') || lowerSection.includes('issue')) {
      result.improvements.push(...cleanBullets);
    } else if (lowerSection.includes('suggest') || lowerSection.includes('recommend') || lowerSection.includes('tip')) {
      result.suggestions.push(...cleanBullets);
    } else if (lowerSection.includes('correct') || lowerSection.includes('revised')) {
      // Extract corrected version
      const corrected = section.replace(/^.*?(?:corrected|revised)[^:]*:/i, '').trim();
      if (corrected.length > 20) {
        result.correctedVersion = corrected;
      }
    }
  });

  return result;
}

function ScoreCard({ score }: { score: string }) {
  const [achieved, total] = score.split('/').map(s => parseFloat(s.trim()));
  const percentage = (achieved / total) * 100;

  let color = "text-red-600 bg-red-50 border-red-200";
  let label = "Needs Work";

  if (percentage >= 80) {
    color = "text-green-600 bg-green-50 border-green-200";
    label = "Excellent";
  } else if (percentage >= 60) {
    color = "text-blue-600 bg-blue-50 border-blue-200";
    label = "Good";
  } else if (percentage >= 40) {
    color = "text-yellow-600 bg-yellow-50 border-yellow-200";
    label = "Fair";
  }

  return (
    <div className={`p-4 rounded-lg border ${color} text-center`}>
      <Target className="w-6 h-6 mx-auto mb-2" />
      <div className="text-3xl font-bold">{score}</div>
      <div className="text-sm font-medium mt-1">{label}</div>
    </div>
  );
}

function FeedbackSection({
  title,
  items,
  icon: Icon,
  color
}: {
  title: string;
  items: string[];
  icon: React.ElementType;
  color: string;
}) {
  if (items.length === 0) return null;

  return (
    <div className={`p-4 rounded-lg border ${color}`}>
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-5 h-5" />
        <h4 className="font-semibold">{title}</h4>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-current mt-2 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AICoach({ type, content, context, onClose }: AICoachProps) {
  const { user, isPremium, session } = useAuth();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [parsedFeedback, setParsedFeedback] = useState<ParsedFeedback | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showRaw, setShowRaw] = useState(false);

  const getFeedback = async () => {
    if (!content.trim()) {
      setError("Please write something first to get feedback.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      // Add auth token if session exists
      if (session?.access_token) {
        headers["Authorization"] = `Bearer ${session.access_token}`;
      }

      const response = await fetch("/api/ai-coach", {
        method: "POST",
        headers,
        body: JSON.stringify({ type, content, context }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get feedback");
      }

      setFeedback(data.feedback);
      setParsedFeedback(parseFeedback(data.feedback));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Show upgrade prompt for non-premium users
  if (!isPremium) {
    return (
      <div className="p-6 rounded-lg bg-white border border-gray-200 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
            <Crown className="w-6 h-6 text-amber-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              AI Coaching — Premium Feature
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Get detailed, personalized feedback from AI to improve your TOEFL score faster.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Detailed grammar & vocabulary analysis</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Estimated scores with explanations</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Personalized improvement suggestions</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Corrected versions of your responses</span>
              </div>
            </div>
            {user ? (
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <Crown className="w-4 h-4" />
                Upgrade to Premium — ₩5,000/month
              </Link>
            ) : (
              <Link
                href="/auth"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <Lock className="w-4 h-4" />
                Sign in to Upgrade
              </Link>
            )}
          </div>
          {onClose && (
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-50 border border-blue-200">
            <Sparkles className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">AI Coach</h3>
            <p className="text-xs text-gray-500">Powered by Claude</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {feedback && (
            <button
              onClick={() => setShowRaw(!showRaw)}
              className="text-xs text-gray-500 hover:text-gray-700 underline"
            >
              {showRaw ? "Show formatted" : "Show raw"}
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="p-4">
        {/* Initial State - Get Feedback Button */}
        {!feedback && !loading && (
          <div className="text-center py-6">
            <p className="text-gray-500 text-sm mb-4">
              Get detailed AI feedback on your response
            </p>
            <button
              onClick={getFeedback}
              disabled={!content.trim()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Get AI Feedback
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-3" />
            <span className="text-gray-500">Analyzing your response...</span>
            <span className="text-xs text-gray-400 mt-1">This may take a few seconds</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p>{error}</p>
              <button
                onClick={getFeedback}
                className="mt-2 text-red-600 underline hover:no-underline font-medium"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Feedback Display */}
        {feedback && parsedFeedback && (
          <div className="space-y-4">
            {showRaw ? (
              /* Raw Feedback */
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 max-h-96 overflow-y-auto">
                <div className="prose prose-sm max-w-none">
                  {feedback.split("\n").map((line, i) => (
                    <p key={i} className={line.trim() === "" ? "h-2" : "text-gray-700"}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ) : (
              /* Formatted Feedback */
              <>
                {/* Score Card */}
                {parsedFeedback.score && (
                  <ScoreCard score={parsedFeedback.score} />
                )}

                {/* Strengths */}
                <FeedbackSection
                  title="Strengths"
                  items={parsedFeedback.strengths}
                  icon={CheckCircle}
                  color="bg-green-50 border-green-200 text-green-700"
                />

                {/* Areas for Improvement */}
                <FeedbackSection
                  title="Areas for Improvement"
                  items={parsedFeedback.improvements}
                  icon={TrendingUp}
                  color="bg-amber-50 border-amber-200 text-amber-700"
                />

                {/* Suggestions */}
                <FeedbackSection
                  title="Suggestions"
                  items={parsedFeedback.suggestions}
                  icon={BookOpen}
                  color="bg-blue-50 border-blue-200 text-blue-700"
                />

                {/* Corrected Version */}
                {parsedFeedback.correctedVersion && (
                  <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                    <div className="flex items-center gap-2 mb-3 text-purple-700">
                      <MessageSquare className="w-5 h-5" />
                      <h4 className="font-semibold">Improved Version</h4>
                    </div>
                    <p className="text-sm text-purple-800 whitespace-pre-wrap">
                      {parsedFeedback.correctedVersion}
                    </p>
                  </div>
                )}

                {/* If no sections parsed, show raw */}
                {!parsedFeedback.score &&
                 parsedFeedback.strengths.length === 0 &&
                 parsedFeedback.improvements.length === 0 &&
                 parsedFeedback.suggestions.length === 0 && (
                  <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 max-h-96 overflow-y-auto">
                    <div className="prose prose-sm max-w-none">
                      {feedback.split("\n").map((line, i) => (
                        <p key={i} className={line.trim() === "" ? "h-2" : "text-gray-700"}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Get New Feedback Button */}
            <button
              onClick={() => {
                setFeedback(null);
                setParsedFeedback(null);
                setError(null);
              }}
              className="text-sm text-blue-600 hover:underline"
            >
              ↻ Get new feedback
            </button>
          </div>
        )}
      </div>
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
            ? "bg-gray-900 hover:bg-gray-800"
            : "bg-gray-400 hover:bg-gray-500"
        }`}
        title={isPremium ? "Get AI Feedback" : "Upgrade to Premium for AI Coaching"}
      >
        <Sparkles className="w-6 h-6 text-white" />
        {!isPremium && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
            <Crown className="w-3 h-3 text-white" />
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
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
