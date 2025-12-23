"use client";

import Link from "next/link";
import { ArrowLeft, PenTool, TrendingUp, Target, FileText } from "lucide-react";

export default function WritingFeedbackPage() {
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
          <h1 className="text-3xl font-bold text-white mb-2">Writing Feedback</h1>
          <p className="text-gray-400">Track your writing practice and get improvement suggestions.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-[#1e293b] border border-[#334155] text-center">
            <p className="text-3xl font-bold text-purple-400">0</p>
            <p className="text-xs text-gray-400">Build Sentence</p>
          </div>
          <div className="p-4 rounded-xl bg-[#1e293b] border border-[#334155] text-center">
            <p className="text-3xl font-bold text-orange-400">0</p>
            <p className="text-xs text-gray-400">Emails Written</p>
          </div>
          <div className="p-4 rounded-xl bg-[#1e293b] border border-[#334155] text-center">
            <p className="text-3xl font-bold text-green-400">0</p>
            <p className="text-xs text-gray-400">Discussions</p>
          </div>
          <div className="p-4 rounded-xl bg-[#1e293b] border border-[#334155] text-center">
            <p className="text-3xl font-bold text-yellow-400">--</p>
            <p className="text-xs text-gray-400">Est. Score</p>
          </div>
        </div>

        {/* Empty State */}
        <div className="p-12 rounded-xl bg-[#1e293b] border border-[#334155] text-center mb-8">
          <PenTool className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Writing Practice Yet</h3>
          <p className="text-gray-400 mb-6">Complete some writing exercises to see your feedback here.</p>
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors"
          >
            Start Writing Practice
          </Link>
        </div>

        {/* Task-specific Tips */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="p-5 rounded-xl bg-[#1e293b] border border-[#334155]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <span className="text-purple-400 font-bold">1</span>
              </div>
              <h3 className="font-semibold text-white">Build Sentence</h3>
            </div>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• Identify subject and verb first</li>
              <li>• Look for clause markers (who, which)</li>
              <li>• Check article usage (a, an, the)</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-[#1e293b] border border-[#334155]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <span className="text-orange-400 font-bold">2</span>
              </div>
              <h3 className="font-semibold text-white">Email Writing</h3>
            </div>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• Cover all 3 required points</li>
              <li>• Use polite language (could, would)</li>
              <li>• Keep it 80-120 words</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-[#1e293b] border border-[#334155]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                <span className="text-green-400 font-bold">3</span>
              </div>
              <h3 className="font-semibold text-white">Discussion</h3>
            </div>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• Reference classmates&apos; posts</li>
              <li>• State your position clearly</li>
              <li>• Aim for 100-130 words</li>
            </ul>
          </div>
        </div>

        {/* Common Errors */}
        <div className="p-6 rounded-xl bg-[#1e293b] border border-[#334155] mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-5 h-5 text-red-400" />
            <h3 className="font-semibold text-white">Common Errors to Watch</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-[#0f172a]">
              <p className="text-white font-medium mb-2">Grammar</p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Subject-verb agreement</li>
                <li>• Article usage (a/an/the)</li>
                <li>• Verb tense consistency</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-[#0f172a]">
              <p className="text-white font-medium mb-2">Structure</p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Missing topic sentence</li>
                <li>• Weak transitions</li>
                <li>• Incomplete conclusions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Writing Checklist */}
        <div className="p-6 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-5 h-5 text-purple-400" />
            <h3 className="font-semibold text-white">Self-Check Before Submitting</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-300 mb-2">Content:</p>
              <ul className="text-gray-400 space-y-1">
                <li>☐ Addressed all parts of the question</li>
                <li>☐ Provided specific examples</li>
                <li>☐ Ideas are clearly explained</li>
              </ul>
            </div>
            <div>
              <p className="text-gray-300 mb-2">Language:</p>
              <ul className="text-gray-400 space-y-1">
                <li>☐ Checked spelling and punctuation</li>
                <li>☐ Varied vocabulary used</li>
                <li>☐ Appropriate tone maintained</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
