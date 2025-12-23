"use client";

import Link from "next/link";
import { Mic, PenTool, BookOpen, FileText, ArrowRight, Target, Clock, Zap } from "lucide-react";

const sections = [
  {
    href: "/speaking",
    title: "Speaking",
    icon: Mic,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    description: "Listen & Repeat, Interview Practice",
    features: ["7 sentences repeat", "4 interview questions", "Voice recording"],
  },
  {
    href: "/writing",
    title: "Writing",
    icon: PenTool,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    description: "Build Sentence, Email, Discussion",
    features: ["Sentence building", "Email writing (7min)", "Academic discussion"],
  },
  {
    href: "/voca",
    title: "Vocabulary",
    icon: BookOpen,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    description: "TOEFL Essential Words",
    features: ["500+ words", "Flashcards", "Quiz mode"],
  },
  {
    href: "/study-notes",
    title: "Study Notes",
    icon: FileText,
    color: "from-orange-500 to-yellow-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
    description: "Feedback & Templates",
    features: ["Score tracking", "Templates", "Improvement tips"],
  },
];

const highlights = [
  {
    icon: Target,
    title: "2026 Format",
    description: "Updated for the new TOEFL iBT format starting January 2026",
  },
  {
    icon: Clock,
    title: "Timed Practice",
    description: "Real exam timing with 45sec speaking and 7min email writing",
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description: "Get immediate feedback on your responses",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                TOEFL Master
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-4">
              2026 New Format Preparation
            </p>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Prepare for the new TOEFL iBT format with adaptive practice,
              real exam simulations, and comprehensive feedback.
            </p>
          </div>

          {/* Highlights */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 rounded-xl bg-[#1e293b]/50 border border-[#334155] animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-3 rounded-lg bg-blue-500/10">
                  <item.icon className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sections Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <h2 className="text-2xl font-bold text-center mb-10">Choose Your Practice</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.href}
                href={section.href}
                className={`group relative p-8 rounded-2xl ${section.bgColor} border ${section.borderColor}
                  hover:scale-[1.02] transition-all duration-300 animate-fade-in overflow-hidden`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-20 rounded-full blur-3xl" />

                <div className="relative">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${section.color} mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">{section.title}</h3>
                  <p className="text-gray-400 mb-4">{section.description}</p>

                  <ul className="space-y-2 mb-6">
                    {section.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${section.color}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-2 text-sm font-medium text-white group-hover:gap-4 transition-all">
                    Start Practice
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#334155] py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>TOEFL Master 2026 - Practice for the new TOEFL iBT format</p>
          <p className="mt-2">New format starts January 21, 2026</p>
        </div>
      </footer>
    </div>
  );
}
