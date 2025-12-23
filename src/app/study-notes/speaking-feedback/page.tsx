"use client";

import Link from "next/link";
import { ArrowLeft, Mic, TrendingUp, Target, Clock } from "lucide-react";

export default function SpeakingFeedbackPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/study-notes"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Study Notes
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Speaking Feedback</h1>
          <p className="text-gray-400">Track your speaking practice and get improvement suggestions.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-[#1e293b] border border-[#334155] text-center">
            <p className="text-3xl font-bold text-blue-400">0</p>
            <p className="text-xs text-gray-400">Listen & Repeat</p>
          </div>
          <div className="p-4 rounded-xl bg-[#1e293b] border border-[#334155] text-center">
            <p className="text-3xl font-bold text-purple-400">0</p>
            <p className="text-xs text-gray-400">Interviews</p>
          </div>
          <div className="p-4 rounded-xl bg-[#1e293b] border border-[#334155] text-center">
            <p className="text-3xl font-bold text-green-400">--</p>
            <p className="text-xs text-gray-400">Avg. Accuracy</p>
          </div>
          <div className="p-4 rounded-xl bg-[#1e293b] border border-[#334155] text-center">
            <p className="text-3xl font-bold text-yellow-400">--</p>
            <p className="text-xs text-gray-400">Est. Score</p>
          </div>
        </div>

        {/* Empty State */}
        <div className="p-12 rounded-xl bg-[#1e293b] border border-[#334155] text-center mb-8">
          <Mic className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Speaking Practice Yet</h3>
          <p className="text-gray-400 mb-6">Complete some speaking exercises to see your feedback here.</p>
          <Link
            href="/speaking"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
          >
            Start Speaking Practice
          </Link>
        </div>

        {/* Improvement Tips */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-[#1e293b] border border-[#334155]">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Target className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white">Listen & Repeat Tips</h3>
            </div>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Focus on word stress and sentence rhythm</li>
              <li>• Practice shadowing - speak along with audio</li>
              <li>• Pay attention to connected speech</li>
              <li>• Record yourself and compare to original</li>
            </ul>
          </div>

          <div className="p-6 rounded-xl bg-[#1e293b] border border-[#334155]">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <Clock className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="font-semibold text-white">Interview Tips</h3>
            </div>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Start speaking immediately - no hesitation</li>
              <li>• Use specific examples from your experience</li>
              <li>• Fill the entire 45 seconds</li>
              <li>• Practice common question types daily</li>
            </ul>
          </div>
        </div>

        {/* Focus Areas */}
        <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <h3 className="font-semibold text-white">Recommended Focus Areas</h3>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            Based on common challenges for TOEFL test-takers, focus on these areas:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-[#0f172a]">
              <p className="text-white font-medium mb-1">Pronunciation</p>
              <p className="text-xs text-gray-400">Clear articulation of sounds</p>
            </div>
            <div className="p-4 rounded-lg bg-[#0f172a]">
              <p className="text-white font-medium mb-1">Fluency</p>
              <p className="text-xs text-gray-400">Smooth delivery without pauses</p>
            </div>
            <div className="p-4 rounded-lg bg-[#0f172a]">
              <p className="text-white font-medium mb-1">Content</p>
              <p className="text-xs text-gray-400">Relevant and developed ideas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
