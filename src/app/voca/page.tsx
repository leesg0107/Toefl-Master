"use client";

import Link from "next/link";
import { BookOpen, Layers, Brain, List, ArrowRight, Star, TrendingUp } from "lucide-react";

const vocaTypes = [
  {
    href: "/voca/flashcard",
    title: "Flashcards",
    icon: Layers,
    color: "from-green-500 to-emerald-500",
    description: "Learn words with interactive flashcards",
    details: [
      "Flip to reveal meaning",
      "Example sentences",
      "Mark as learned/review",
      "Spaced repetition",
    ],
  },
  {
    href: "/voca/quiz",
    title: "Word Quiz",
    icon: Brain,
    color: "from-yellow-500 to-orange-500",
    description: "Test your vocabulary knowledge",
    details: [
      "Multiple choice",
      "Fill in the blank",
      "Matching exercises",
      "Score tracking",
    ],
  },
  {
    href: "/voca/word-list",
    title: "Word List",
    icon: List,
    color: "from-blue-500 to-indigo-500",
    description: "Browse all TOEFL vocabulary",
    details: [
      "500+ essential words",
      "Categorized by topic",
      "Search & filter",
      "Progress tracking",
    ],
  },
];

const categories = [
  { name: "Academic", count: 120, color: "bg-blue-500" },
  { name: "Science", count: 95, color: "bg-green-500" },
  { name: "Social", count: 85, color: "bg-purple-500" },
  { name: "Technology", count: 70, color: "bg-orange-500" },
  { name: "Environment", count: 65, color: "bg-teal-500" },
  { name: "Business", count: 65, color: "bg-pink-500" },
];

export default function VocaPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 mb-6">
            <BookOpen className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Vocabulary</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Build your TOEFL vocabulary with 500+ essential words.
            Practice with flashcards, quizzes, and comprehensive word lists.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-[#1e293b] border border-[#334155] text-center">
            <p className="text-3xl font-bold text-green-400">500+</p>
            <p className="text-sm text-gray-400">Total Words</p>
          </div>
          <div className="p-4 rounded-xl bg-[#1e293b] border border-[#334155] text-center">
            <p className="text-3xl font-bold text-yellow-400">6</p>
            <p className="text-sm text-gray-400">Categories</p>
          </div>
          <div className="p-4 rounded-xl bg-[#1e293b] border border-[#334155] text-center">
            <p className="text-3xl font-bold text-blue-400">0</p>
            <p className="text-sm text-gray-400">Learned</p>
          </div>
        </div>

        {/* Practice Types */}
        <div className="space-y-4 mb-12">
          {vocaTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Link
                key={type.href}
                href={type.href}
                className="group flex items-center gap-6 p-6 rounded-2xl bg-[#1e293b] border border-[#334155] hover:border-green-500/50 transition-all"
              >
                <div className={`p-4 rounded-xl bg-gradient-to-r ${type.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <div className="flex-1">
                  <h2 className="text-xl font-bold text-white mb-1">{type.title}</h2>
                  <p className="text-gray-400 text-sm">{type.description}</p>
                </div>

                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-green-400 group-hover:translate-x-1 transition-all" />
              </Link>
            );
          })}
        </div>

        {/* Categories */}
        <div className="p-6 rounded-xl bg-[#1e293b]/50 border border-[#334155]">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" />
            Word Categories
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="flex items-center gap-3 p-3 rounded-lg bg-[#0f172a] border border-[#334155]"
              >
                <div className={`w-3 h-3 rounded-full ${cat.color}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{cat.name}</p>
                  <p className="text-xs text-gray-500">{cat.count} words</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Tips */}
        <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30">
          <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Vocabulary Learning Tips
          </h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>• Learn words in context with example sentences</li>
            <li>• Review words regularly using spaced repetition</li>
            <li>• Focus on high-frequency TOEFL words first</li>
            <li>• Practice using new words in your speaking and writing</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
