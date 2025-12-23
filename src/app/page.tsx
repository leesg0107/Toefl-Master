"use client";

import Link from "next/link";
import { Mic, PenTool, BookOpen, FileText, ArrowRight } from "lucide-react";

const sections = [
  {
    href: "/speaking",
    title: "Speaking",
    icon: Mic,
    description: "Listen & Repeat, Interview Practice",
    features: ["7 sentences repeat", "4 interview questions", "Voice recording"],
  },
  {
    href: "/writing",
    title: "Writing",
    icon: PenTool,
    description: "Build Sentence, Email, Discussion",
    features: ["Sentence building", "Email writing (7min)", "Academic discussion"],
  },
  {
    href: "/voca",
    title: "Vocabulary",
    icon: BookOpen,
    description: "TOEFL Essential Words",
    features: ["500+ words", "Flashcards", "Quiz mode"],
  },
  {
    href: "/study-notes",
    title: "Study Notes",
    icon: FileText,
    description: "Feedback & Templates",
    features: ["Score tracking", "Templates", "Improvement tips"],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            TOEFL Master
          </h1>
          <p className="text-lg text-gray-500 mb-2">
            2026 New Format Preparation
          </p>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Prepare for the new TOEFL iBT format with adaptive practice and comprehensive feedback.
          </p>
        </div>
      </section>

      {/* Quick Info */}
      <section className="border-b border-gray-100 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <span>2026 Format</span>
            <span className="text-gray-300">|</span>
            <span>45sec Speaking</span>
            <span className="text-gray-300">|</span>
            <span>7min Email Writing</span>
            <span className="text-gray-300">|</span>
            <span>Instant Feedback</span>
          </div>
        </div>
      </section>

      {/* Sections Grid */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-4">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.href}
                href={section.href}
                className="group p-6 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors">
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{section.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">{section.description}</p>
                    <ul className="space-y-1">
                      {section.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-gray-400">
                          <span className="w-1 h-1 rounded-full bg-gray-300" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-6">
        <div className="max-w-4xl mx-auto px-6 text-center text-gray-400 text-xs">
          <p>TOEFL Master 2026 · New format starts January 21, 2026</p>
        </div>
      </footer>
    </div>
  );
}
