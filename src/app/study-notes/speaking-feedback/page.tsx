"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Mic, TrendingUp, Target, Clock, ChevronDown, ChevronUp, Loader2, CheckCircle, AlertCircle, BookOpen } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface FeedbackItem {
  id: string;
  feedback_type: string;
  score: string | null;
  strengths: string[] | null;
  improvements: string[] | null;
  suggestions: string[] | null;
  corrected_version: string | null;
  raw_feedback: string;
  created_at: string;
  practice_sessions: {
    id: string;
    session_type: string;
    topic_title: string | null;
    content: string;
    context: string | null;
    word_count: number | null;
    created_at: string;
  } | null;
}

function FeedbackCard({ feedback, isExpanded, onToggle }: { feedback: FeedbackItem; isExpanded: boolean; onToggle: () => void }) {
  const session = feedback.practice_sessions;
  const date = new Date(feedback.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="rounded-xl bg-white border border-gray-200 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-blue-50">
            <Mic className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-900">
              {session?.topic_title || "Speaking Practice"}
            </h3>
            <p className="text-sm text-gray-500">{date}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {feedback.score && (
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
              {feedback.score}
            </span>
          )}
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-gray-100">
          {/* Your Response */}
          {session?.content && (
            <div className="pt-4">
              <p className="text-xs font-medium text-gray-500 mb-2">Your Response:</p>
              <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">
                {session.content}
              </p>
            </div>
          )}

          {/* Strengths */}
          {feedback.strengths && feedback.strengths.length > 0 && (
            <div className="p-3 rounded-lg bg-green-50 border border-green-200">
              <div className="flex items-center gap-2 mb-2 text-green-700">
                <CheckCircle className="w-4 h-4" />
                <span className="font-semibold text-sm">Strengths</span>
              </div>
              <ul className="text-sm text-green-800 space-y-1">
                {feedback.strengths.map((s, i) => (
                  <li key={i}>• {s}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Areas for Improvement */}
          {feedback.improvements && feedback.improvements.length > 0 && (
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
              <div className="flex items-center gap-2 mb-2 text-amber-700">
                <AlertCircle className="w-4 h-4" />
                <span className="font-semibold text-sm">Areas for Improvement</span>
              </div>
              <ul className="text-sm text-amber-800 space-y-1">
                {feedback.improvements.map((s, i) => (
                  <li key={i}>• {s}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Suggestions */}
          {feedback.suggestions && feedback.suggestions.length > 0 && (
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-2 text-blue-700">
                <BookOpen className="w-4 h-4" />
                <span className="font-semibold text-sm">Suggestions</span>
              </div>
              <ul className="text-sm text-blue-800 space-y-1">
                {feedback.suggestions.map((s, i) => (
                  <li key={i}>• {s}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Corrected Version */}
          {feedback.corrected_version && (
            <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
              <p className="text-xs font-medium text-purple-700 mb-2">Improved Version:</p>
              <p className="text-sm text-purple-800 whitespace-pre-wrap">
                {feedback.corrected_version}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function SpeakingFeedbackPage() {
  const { session } = useAuth();
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      if (!session?.access_token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/feedback?type=speaking", {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFeedbackList(data.feedback || []);
        }
      } catch (error) {
        console.error("Failed to fetch feedback:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [session]);

  // Calculate stats
  const totalSessions = feedbackList.length;
  const scores = feedbackList
    .filter(f => f.score)
    .map(f => {
      const match = f.score?.match(/(\d+(?:\.\d+)?)/);
      return match ? parseFloat(match[1]) : null;
    })
    .filter((s): s is number => s !== null);
  const avgScore = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "--";

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/study-notes"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-600 text-sm mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Study Notes
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Speaking Feedback</h1>
          <p className="text-gray-500 text-sm">Track your speaking practice and review AI feedback.</p>
        </div>

        {/* Stats Overview */}
        <div className="flex gap-8 mb-8 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-900">{totalSessions}</p>
            <p className="text-xs text-gray-400">Sessions</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{avgScore}</p>
            <p className="text-xs text-gray-400">Avg Score</p>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        )}

        {/* Empty State */}
        {!loading && feedbackList.length === 0 && (
          <div className="p-12 rounded-xl bg-gray-50 border border-gray-200 text-center mb-8">
            <Mic className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Speaking Feedback Yet</h3>
            <p className="text-gray-500 mb-6">Complete speaking exercises with AI coaching to see your feedback here.</p>
            <Link
              href="/speaking"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors"
            >
              Start Speaking Practice
            </Link>
          </div>
        )}

        {/* Feedback List */}
        {!loading && feedbackList.length > 0 && (
          <div className="space-y-4 mb-8">
            {feedbackList.map((feedback) => (
              <FeedbackCard
                key={feedback.id}
                feedback={feedback}
                isExpanded={expandedId === feedback.id}
                onToggle={() => setExpandedId(expandedId === feedback.id ? null : feedback.id)}
              />
            ))}
          </div>
        )}

        {/* Tips */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-blue-600" />
              <h3 className="font-semibold text-gray-900 text-sm">Tips</h3>
            </div>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• Speak immediately without hesitation</li>
              <li>• Use specific examples</li>
              <li>• Fill the entire 45 seconds</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <h3 className="font-semibold text-gray-900 text-sm">Focus Areas</h3>
            </div>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• Clear pronunciation</li>
              <li>• Smooth delivery</li>
              <li>• Developed ideas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
