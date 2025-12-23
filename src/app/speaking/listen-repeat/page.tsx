"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Play, ArrowRight, Clock, CheckCircle } from "lucide-react";
import { listenRepeatSessions } from "@/data/speaking/listenRepeat";

export default function ListenRepeatPage() {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

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
            Practice repeating sentences exactly as you hear them. Each session has 7 sentences.
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-8">
          <h3 className="text-blue-400 font-semibold mb-2">How it works</h3>
          <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
            <li>Select a scenario below to start practicing</li>
            <li>Click the play button to hear each sentence</li>
            <li>Immediately repeat the sentence out loud</li>
            <li>Your response will be recorded and compared</li>
            <li>Try to match the pronunciation and intonation exactly</li>
          </ol>
        </div>

        {/* Session List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Choose a Scenario</h2>
          <div className="grid gap-4">
            {listenRepeatSessions.map((session) => (
              <Link
                key={session.id}
                href={`/speaking/listen-repeat/${session.id}`}
                className="group flex items-center gap-4 p-6 rounded-xl bg-[#1e293b] border border-[#334155] hover:border-blue-500/50 transition-all"
              >
                <div className="p-3 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                  <Play className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">{session.title}</h3>
                  <p className="text-sm text-gray-400">{session.scenario}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {session.sentences.length} sentences
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
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
