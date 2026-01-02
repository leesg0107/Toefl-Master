"use client";

import Link from "next/link";
import { ArrowLeft, Play, ArrowRight, Clock, MapPin, Lock } from "lucide-react";
import { listenRepeatSessions } from "@/data/speaking/listenRepeat";
import { useAuth } from "@/contexts/AuthContext";

export default function ListenRepeatPage() {
  const { isPremium } = useAuth();

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/speaking"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Speaking
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Listen & Repeat</h1>
          <p className="text-gray-400">
            Practice repeating sentences in academic settings. Each session has 7 sentences with AI-powered feedback.
          </p>
        </div>

        {/* Premium Notice */}
        {!isPremium && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-amber-400 mt-0.5" />
              <div>
                <h3 className="text-amber-400 font-semibold mb-1">Premium Feature</h3>
                <p className="text-gray-300 text-sm mb-3">
                  Listen & Repeat with AI evaluation is available for Premium members.
                  Get detailed pronunciation feedback powered by AI.
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black rounded-lg text-sm font-medium transition-colors"
                >
                  Upgrade to Premium
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-8">
          <h3 className="text-blue-400 font-semibold mb-2">How it works</h3>
          <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
            <li>Select a scenario below to start practicing</li>
            <li>Click the play button to hear each sentence</li>
            <li>Immediately repeat the sentence out loud</li>
            <li>AI will evaluate your pronunciation and accuracy</li>
            <li>Review feedback and practice again to improve</li>
          </ol>
        </div>

        {/* Session List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            Choose a Scenario ({listenRepeatSessions.length} sessions)
          </h2>

          <div className="grid gap-4">
            {listenRepeatSessions.map((session) => (
              <Link
                key={session.id}
                href={isPremium ? `/speaking/listen-repeat/${session.id}` : "/pricing"}
                className={`group flex items-center gap-4 p-6 rounded-xl bg-[#1e293b] border border-[#334155] transition-all ${
                  isPremium ? "hover:border-blue-500/50" : "opacity-75"
                }`}
              >
                <div className={`p-3 rounded-lg transition-colors ${
                  isPremium
                    ? "bg-blue-500/10 group-hover:bg-blue-500/20"
                    : "bg-gray-500/10"
                }`}>
                  {isPremium ? (
                    <Play className="w-6 h-6 text-blue-400" />
                  ) : (
                    <Lock className="w-6 h-6 text-gray-500" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">{session.title}</h3>
                  <p className="text-sm text-gray-400 mb-2">{session.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {session.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {session.sentences.length} sentences
                    </span>
                  </div>
                </div>
                <ArrowRight className={`w-5 h-5 transition-all ${
                  isPremium
                    ? "text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1"
                    : "text-gray-600"
                }`} />
              </Link>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 p-6 rounded-xl bg-[#1e293b]/50 border border-[#334155]">
          <h3 className="text-lg font-semibold text-white mb-4">Your Progress</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">0</p>
              <p className="text-xs text-gray-400">Sessions Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">0</p>
              <p className="text-xs text-gray-400">Sentences Practiced</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-400">--</p>
              <p className="text-xs text-gray-400">Accuracy Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
