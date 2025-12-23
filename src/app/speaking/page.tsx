"use client";

import Link from "next/link";
import { Mic, Repeat, MessageSquare, ArrowRight, Volume2, Clock } from "lucide-react";

const speakingTypes = [
  {
    href: "/speaking/listen-repeat",
    title: "Listen & Repeat",
    icon: Repeat,
    color: "from-blue-500 to-cyan-500",
    description: "Listen to sentences and repeat them exactly",
    details: [
      "7 sentences per session",
      "Campus & daily life scenarios",
      "Voice recording & playback",
      "Accuracy feedback",
    ],
    difficulty: "Beginner to Advanced",
    time: "~5 minutes",
  },
  {
    href: "/speaking/interview",
    title: "Interview",
    icon: MessageSquare,
    color: "from-purple-500 to-pink-500",
    description: "Answer interview questions on various topics",
    details: [
      "4 questions per topic",
      "45 seconds per answer",
      "No preparation time",
      "Real exam simulation",
    ],
    difficulty: "Intermediate to Advanced",
    time: "~4 minutes",
  },
];

export default function SpeakingPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 mb-6">
            <Mic className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Speaking Practice</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Master the new TOEFL 2026 speaking format with Listen & Repeat and Interview practice.
            Practice speaking naturally without preparation time.
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-8">
          <h3 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            2026 Speaking Format Changes
          </h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• New Listen & Repeat task: Repeat 7 sentences exactly as heard</li>
            <li>• New Interview task: Answer 4 questions immediately (no prep time)</li>
            <li>• Total 11 questions across both tasks</li>
            <li>• Speaking section takes approximately 16 minutes</li>
          </ul>
        </div>

        {/* Practice Types */}
        <div className="space-y-6">
          {speakingTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Link
                key={type.href}
                href={type.href}
                className="group block p-8 rounded-2xl bg-[#1e293b] border border-[#334155] hover:border-blue-500/50 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${type.color}`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-2">{type.title}</h2>
                        <p className="text-gray-400">{type.description}</p>
                      </div>
                      <ArrowRight className="w-6 h-6 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                    </div>

                    <ul className="grid grid-cols-2 gap-2 mb-4">
                      {type.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                          <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${type.color}`} />
                          {detail}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {type.time}
                      </span>
                      <span>•</span>
                      <span>{type.difficulty}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Tips */}
        <div className="mt-12 p-6 rounded-xl bg-[#1e293b]/50 border border-[#334155]">
          <h3 className="text-lg font-semibold text-white mb-4">Speaking Tips</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-400">
            <div>
              <p className="font-medium text-gray-300 mb-1">For Listen & Repeat:</p>
              <ul className="space-y-1">
                <li>• Focus on pronunciation and intonation</li>
                <li>• Listen carefully - you only hear each sentence once</li>
                <li>• Practice shadowing exercises regularly</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-gray-300 mb-1">For Interview:</p>
              <ul className="space-y-1">
                <li>• Start speaking immediately after the question</li>
                <li>• Give specific examples from personal experience</li>
                <li>• Use the full 45 seconds for each answer</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
