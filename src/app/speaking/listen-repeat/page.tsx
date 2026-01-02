"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Play, ArrowRight, Clock, MapPin, GraduationCap } from "lucide-react";
import { listenRepeatSessions, getSessionsByDifficulty } from "@/data/speaking/listenRepeat";

type Difficulty = "all" | "beginner" | "intermediate" | "advanced";

const difficultyConfig = {
  beginner: {
    label: "Beginner",
    color: "bg-green-500/20 text-green-400 border-green-500/30",
    description: "Simple location descriptions",
  },
  intermediate: {
    label: "Intermediate",
    color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    description: "Instructions and procedures",
  },
  advanced: {
    label: "Advanced",
    color: "bg-red-500/20 text-red-400 border-red-500/30",
    description: "Complex academic communication",
  },
};

export default function ListenRepeatPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("all");

  const filteredSessions = useMemo(() => {
    if (selectedDifficulty === "all") {
      return listenRepeatSessions;
    }
    return getSessionsByDifficulty(selectedDifficulty);
  }, [selectedDifficulty]);

  const sessionCounts = useMemo(() => ({
    all: listenRepeatSessions.length,
    beginner: getSessionsByDifficulty("beginner").length,
    intermediate: getSessionsByDifficulty("intermediate").length,
    advanced: getSessionsByDifficulty("advanced").length,
  }), []);

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
            Practice repeating sentences in academic settings. Each session has 7 sentences with progressive difficulty.
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

        {/* Difficulty Filter */}
        <div className="mb-6">
          <p className="text-sm text-gray-400 mb-3">Filter by difficulty:</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedDifficulty("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedDifficulty === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-[#1e293b] text-gray-300 hover:bg-[#334155]"
              }`}
            >
              All ({sessionCounts.all})
            </button>
            {(["beginner", "intermediate", "advanced"] as const).map((level) => (
              <button
                key={level}
                onClick={() => setSelectedDifficulty(level)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                  selectedDifficulty === level
                    ? difficultyConfig[level].color
                    : "bg-[#1e293b] text-gray-300 hover:bg-[#334155] border-transparent"
                }`}
              >
                {difficultyConfig[level].label} ({sessionCounts[level]})
              </button>
            ))}
          </div>
        </div>

        {/* Session List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            {selectedDifficulty === "all"
              ? "All Scenarios"
              : `${difficultyConfig[selectedDifficulty].label} Scenarios`}
          </h2>

          {selectedDifficulty !== "all" && (
            <p className="text-sm text-gray-400 -mt-2">
              {difficultyConfig[selectedDifficulty].description}
            </p>
          )}

          <div className="grid gap-4">
            {filteredSessions.map((session) => (
              <Link
                key={session.id}
                href={`/speaking/listen-repeat/${session.id}`}
                className="group flex items-center gap-4 p-6 rounded-xl bg-[#1e293b] border border-[#334155] hover:border-blue-500/50 transition-all"
              >
                <div className="p-3 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                  <Play className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-white">{session.title}</h3>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium border ${difficultyConfig[session.difficulty].color}`}>
                      {difficultyConfig[session.difficulty].label}
                    </span>
                  </div>
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
                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>

        {/* Difficulty Guide */}
        <div className="mt-12 p-6 rounded-xl bg-[#1e293b]/50 border border-[#334155]">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Difficulty Levels</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {(["beginner", "intermediate", "advanced"] as const).map((level) => (
              <div key={level} className="p-4 rounded-lg bg-[#0f172a]">
                <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium border mb-2 ${difficultyConfig[level].color}`}>
                  {difficultyConfig[level].label}
                </span>
                <p className="text-sm text-gray-400">
                  {level === "beginner" && "Simple sentences about object locations in academic settings. Slower speech rate for easier comprehension."}
                  {level === "intermediate" && "Instructions and procedural sentences. Normal conversational speed with moderate complexity."}
                  {level === "advanced" && "Complex academic communication with longer sentences. Faster speech rate to challenge advanced learners."}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 p-6 rounded-xl bg-[#1e293b]/50 border border-[#334155]">
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
