"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Mic, PenTool, Target, BookOpen, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const sections = [
  {
    href: "/study-notes/speaking-feedback",
    title: "Speaking Feedback",
    icon: Mic,
    description: "Review your speaking practice",
  },
  {
    href: "/study-notes/writing-feedback",
    title: "Writing Feedback",
    icon: PenTool,
    description: "Analyze your writing responses",
  },
  {
    href: "/study-notes/templates",
    title: "High-Score Templates",
    icon: Target,
    description: "Proven templates for speaking and writing",
  },
  {
    href: "/study-notes/rubrics",
    title: "Scoring Rubrics",
    icon: BookOpen,
    description: "Understand how TOEFL responses are scored",
  },
];

interface Stats {
  speakingCount: number;
  writingCount: number;
  totalWords: number;
  avgScore: string;
}

export default function StudyNotesPage() {
  const { session } = useAuth();
  const [stats, setStats] = useState<Stats>({
    speakingCount: 0,
    writingCount: 0,
    totalWords: 0,
    avgScore: "--",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!session?.access_token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/feedback", {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const feedback = data.feedback || [];

          const speakingCount = feedback.filter((f: { feedback_type: string }) =>
            f.feedback_type === "speaking-feedback"
          ).length;

          const writingCount = feedback.filter((f: { feedback_type: string }) =>
            ["email-review", "discussion-review", "writing-feedback"].includes(f.feedback_type)
          ).length;

          const totalWords = feedback.reduce((sum: number, f: { practice_sessions?: { word_count?: number } }) =>
            sum + (f.practice_sessions?.word_count || 0), 0
          );

          const scores = feedback
            .filter((f: { score?: string }) => f.score)
            .map((f: { score?: string }) => {
              const match = f.score?.match(/(\d+(?:\.\d+)?)/);
              return match ? parseFloat(match[1]) : null;
            })
            .filter((s: number | null): s is number => s !== null);

          const avgScore = scores.length > 0
            ? (scores.reduce((a: number, b: number) => a + b, 0) / scores.length).toFixed(1)
            : "--";

          setStats({ speakingCount, writingCount, totalWords, avgScore });
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [session]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Back */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-600 text-sm mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Study Notes</h1>
          <p className="text-gray-500 text-sm">
            Track your progress, review feedback, and access templates.
          </p>
        </div>

        {/* Stats */}
        {loading ? (
          <div className="flex justify-center py-4 mb-8">
            <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
          </div>
        ) : (
          <div className="flex gap-8 mb-8 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.speakingCount}</p>
              <p className="text-xs text-gray-400">Speaking</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.writingCount}</p>
              <p className="text-xs text-gray-400">Writing</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalWords}</p>
              <p className="text-xs text-gray-400">Words</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.avgScore}</p>
              <p className="text-xs text-gray-400">Avg Score</p>
            </div>
          </div>
        )}

        {/* Sections */}
        <div className="space-y-3">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.href}
                href={section.href}
                className="group flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <div className="p-2 rounded-lg bg-gray-100">
                  <Icon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{section.title}</h3>
                  <p className="text-sm text-gray-500">{section.description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
              </Link>
            );
          })}
        </div>

        {/* Tips */}
        <div className="mt-10 pt-8 border-t border-gray-100">
          <p className="text-xs font-medium text-gray-500 mb-3">Study Tips</p>
          <div className="grid grid-cols-2 gap-4 text-xs text-gray-400">
            <div>
              <p className="text-gray-600 mb-1">Focus Areas</p>
              <ul className="space-y-0.5">
                <li>• Identify patterns in mistakes</li>
                <li>• Practice weak areas more</li>
              </ul>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Daily Schedule</p>
              <ul className="space-y-0.5">
                <li>• Speaking: 15 min</li>
                <li>• Writing: 1 email + 1 discussion</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
