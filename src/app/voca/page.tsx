"use client";

import Link from "next/link";
import { ArrowLeft, Layers, Brain, List, ArrowRight } from "lucide-react";

const vocaTypes = [
  {
    href: "/voca/flashcard",
    title: "Flashcards",
    icon: Layers,
    description: "Learn words with interactive flashcards",
  },
  {
    href: "/voca/quiz",
    title: "Word Quiz",
    icon: Brain,
    description: "Test your vocabulary knowledge",
  },
  {
    href: "/voca/word-list",
    title: "Word List",
    icon: List,
    description: "Browse all TOEFL vocabulary",
  },
];

const categories = ["Academic", "Science", "Social", "Technology", "Environment", "Business"];

export default function VocaPage() {
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Vocabulary</h1>
          <p className="text-gray-500 text-sm">
            Build your TOEFL vocabulary with 500+ essential words.
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-8 mb-8 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-900">500+</p>
            <p className="text-xs text-gray-400">Words</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">6</p>
            <p className="text-xs text-gray-400">Categories</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">0</p>
            <p className="text-xs text-gray-400">Learned</p>
          </div>
        </div>

        {/* Practice Types */}
        <div className="space-y-3 mb-10">
          {vocaTypes.map((type) => {
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
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
              </Link>
            );
          })}
        </div>

        {/* Categories */}
        <div className="pt-8 border-t border-gray-100">
          <p className="text-xs font-medium text-gray-500 mb-3">Categories</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <span key={cat} className="px-3 py-1 text-xs text-gray-500 bg-gray-100 rounded-full">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
