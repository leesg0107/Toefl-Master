"use client";

import Link from "next/link";
import { ArrowLeft, Shuffle, Mail, MessageCircle, ArrowRight, Clock } from "lucide-react";

const writingTypes = [
  {
    href: "/writing/build-sentence",
    title: "Build a Sentence",
    icon: Shuffle,
    description: "Reorder scrambled words to form correct sentences",
    time: "~45 sec per question",
  },
  {
    href: "/writing/email",
    title: "Write an Email",
    icon: Mail,
    description: "Write emails for academic or social situations",
    time: "7 minutes",
  },
  {
    href: "/writing/discussion",
    title: "Academic Discussion",
    icon: MessageCircle,
    description: "Participate in an online class discussion",
    time: "10 minutes",
  },
];

export default function WritingPage() {
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Writing</h1>
          <p className="text-gray-500 text-sm">
            Practice sentence building, email writing, and academic discussion tasks.
          </p>
        </div>

        {/* Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-8 text-sm text-gray-600">
          <p className="font-medium text-gray-700 mb-2">2026 Writing Format</p>
          <ul className="space-y-1 text-gray-500">
            <li>• Build a Sentence: Grammar and word order</li>
            <li>• Email: 80-120 words, 7 minutes</li>
            <li>• Discussion: 100-130 words, 10 minutes</li>
          </ul>
        </div>

        {/* Practice Types */}
        <div className="space-y-3">
          {writingTypes.map((type) => {
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
          <div className="grid grid-cols-3 gap-4 text-xs text-gray-400">
            <div>
              <p className="text-gray-600 mb-1">Sentence</p>
              <p>Identify subject & verb first</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Email</p>
              <p>Cover all required points</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Discussion</p>
              <p>State your position clearly</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
