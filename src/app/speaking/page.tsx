"use client";

import Link from "next/link";
import { ArrowLeft, Repeat, MessageSquare, ArrowRight, Clock } from "lucide-react";

const speakingTypes = [
  {
    href: "/speaking/listen-repeat",
    title: "Listen & Repeat",
    icon: Repeat,
    description: "Listen to sentences and repeat them exactly",
    details: ["7 sentences per session", "Voice recording & playback"],
    time: "~5 minutes",
  },
  {
    href: "/speaking/interview",
    title: "Interview",
    icon: MessageSquare,
    description: "Answer interview questions on various topics",
    details: ["4 questions per topic", "45 seconds per answer", "No preparation time"],
    time: "~4 minutes",
  },
];

export default function SpeakingPage() {
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Speaking</h1>
          <p className="text-gray-500 text-sm">
            Practice Listen & Repeat and Interview tasks for the new TOEFL 2026 format.
          </p>
        </div>

        {/* Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-8 text-sm text-gray-600">
          <p className="font-medium text-gray-700 mb-2">2026 Speaking Format</p>
          <ul className="space-y-1 text-gray-500">
            <li>• Listen & Repeat: 7 sentences</li>
            <li>• Interview: 4 questions, no prep time</li>
            <li>• Total: ~16 minutes</li>
          </ul>
        </div>

        {/* Practice Types */}
        <div className="space-y-3">
          {speakingTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Link
                key={type.href}
                href={type.href}
                className="group flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <div className="p-2 rounded-lg bg-gray-100">
                  <Icon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-gray-900">{type.title}</h2>
                  <p className="text-sm text-gray-500">{type.description}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    {type.time}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
              </Link>
            );
          })}
        </div>

        {/* Tips */}
        <div className="mt-10 pt-8 border-t border-gray-100">
          <p className="text-xs font-medium text-gray-500 mb-3">Tips</p>
          <div className="grid grid-cols-2 gap-4 text-xs text-gray-400">
            <div>
              <p className="text-gray-600 mb-1">Listen & Repeat</p>
              <ul className="space-y-0.5">
                <li>• Focus on pronunciation</li>
                <li>• Listen carefully - one chance only</li>
              </ul>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Interview</p>
              <ul className="space-y-0.5">
                <li>• Start speaking immediately</li>
                <li>• Use specific examples</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
