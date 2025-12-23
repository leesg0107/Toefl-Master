"use client";

import Link from "next/link";
import { PenTool, Shuffle, Mail, MessageCircle, ArrowRight, Clock, FileText } from "lucide-react";

const writingTypes = [
  {
    href: "/writing/build-sentence",
    title: "Build a Sentence",
    icon: Shuffle,
    color: "from-purple-500 to-pink-500",
    description: "Reorder scrambled words to form correct sentences",
    details: [
      "Drag and drop interface",
      "Grammar structure practice",
      "Instant feedback",
      "Multiple difficulty levels",
    ],
    difficulty: "Beginner to Intermediate",
    time: "~45 seconds per question",
  },
  {
    href: "/writing/email",
    title: "Write an Email",
    icon: Mail,
    color: "from-orange-500 to-red-500",
    description: "Write emails for academic or social situations",
    details: [
      "7 minutes time limit",
      "80-120 words target",
      "3 required points to cover",
      "Polite & formal tone practice",
    ],
    difficulty: "Intermediate",
    time: "7 minutes",
  },
  {
    href: "/writing/discussion",
    title: "Academic Discussion",
    icon: MessageCircle,
    color: "from-green-500 to-teal-500",
    description: "Participate in an online class discussion",
    details: [
      "10 minutes time limit",
      "100-130 words target",
      "Read professor & student posts",
      "Express your opinion clearly",
    ],
    difficulty: "Intermediate to Advanced",
    time: "10 minutes",
  },
];

export default function WritingPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 mb-6">
            <PenTool className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Writing Practice</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Master the new TOEFL 2026 writing format with sentence building,
            email writing, and academic discussion practice.
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 mb-8">
          <h3 className="text-purple-400 font-semibold mb-2 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            2026 Writing Format Changes
          </h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• No more long essays - focus on shorter, task-oriented writing</li>
            <li>• New Build a Sentence task tests grammar and word order</li>
            <li>• New Write an Email task (7 minutes, 80-120 words)</li>
            <li>• Academic Discussion retained (10 minutes, 100-130 words)</li>
            <li>• Total writing section: ~23 minutes</li>
          </ul>
        </div>

        {/* Practice Types */}
        <div className="space-y-6">
          {writingTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Link
                key={type.href}
                href={type.href}
                className="group block p-8 rounded-2xl bg-[#1e293b] border border-[#334155] hover:border-purple-500/50 transition-all"
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
                      <ArrowRight className="w-6 h-6 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
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
          <h3 className="text-lg font-semibold text-white mb-4">Writing Tips</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-400">
            <div>
              <p className="font-medium text-gray-300 mb-1">Build a Sentence:</p>
              <ul className="space-y-1">
                <li>• Identify subject and verb first</li>
                <li>• Watch for clauses and modifiers</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-gray-300 mb-1">Email Writing:</p>
              <ul className="space-y-1">
                <li>• Use polite phrases (could, would)</li>
                <li>• Cover all 3 required points</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-gray-300 mb-1">Academic Discussion:</p>
              <ul className="space-y-1">
                <li>• Reference other students posts</li>
                <li>• State your position clearly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
