"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, ChevronDown, ChevronUp, Lightbulb } from "lucide-react";
import { useState } from "react";
import { wordRoots, commonPrefixes } from "@/data/vocabulary/wordRoots";

function RootCard({ root }: { root: typeof wordRoots[0] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
      >
        <div>
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-blue-600">{root.root}</span>
            <span className="text-sm text-gray-500">({root.origin})</span>
          </div>
          <p className="text-gray-700 mt-1">{root.meaning}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">{root.words.length} words</span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="p-4 space-y-3">
            {root.words.map((word, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 border border-gray-100"
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {word.prefix && word.prefix !== "(none)" && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                      {word.prefix} {word.prefixMeaning}
                    </span>
                  )}
                  <span className="text-gray-400">+</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                    {root.root.split(" / ")[0]}
                  </span>
                  <span className="text-gray-400">=</span>
                  <span className="text-lg font-bold text-gray-900">{word.word}</span>
                </div>
                <p className="text-gray-700 mb-2">{word.definition}</p>
                <p className="text-sm text-gray-500 italic">&ldquo;{word.example}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function WordRootsPage() {
  const [showPrefixes, setShowPrefixes] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/voca"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-600 text-sm mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Vocabulary
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Word Roots</h1>
          <p className="text-gray-500 text-sm">
            Learn how prefixes and roots combine to create different meanings. Understanding these patterns helps you decode unfamiliar words.
          </p>
        </div>

        {/* Tip Box */}
        <div className="mb-8 p-4 rounded-lg bg-amber-50 border border-amber-200">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <p className="font-medium text-amber-800 mb-1">Why Learn Word Roots?</p>
              <p className="text-sm text-amber-700">
                Once you know that <strong>-ject</strong> means &ldquo;to throw&rdquo; and <strong>re-</strong> means &ldquo;back,&rdquo; you can understand that <strong>reject</strong> literally means &ldquo;to throw back&rdquo; = to refuse. This technique helps you understand thousands of English words!
              </p>
            </div>
          </div>
        </div>

        {/* Common Prefixes Section */}
        <div className="mb-8">
          <button
            onClick={() => setShowPrefixes(!showPrefixes)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4"
          >
            <BookOpen className="w-4 h-4" />
            {showPrefixes ? "Hide Common Prefixes" : "Show Common Prefixes"}
            {showPrefixes ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {showPrefixes && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              {commonPrefixes.map((item, index) => (
                <div key={index} className="bg-white p-3 rounded border border-gray-100">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-purple-600">{item.prefix}</span>
                    <span className="text-sm text-gray-600">{item.meaning}</span>
                  </div>
                  <p className="text-xs text-gray-500">{item.examples}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="flex gap-6 mb-8 text-center">
          <div className="flex-1 p-4 rounded-lg bg-blue-50 border border-blue-100">
            <p className="text-2xl font-bold text-blue-600">{wordRoots.length}</p>
            <p className="text-xs text-blue-600">Word Roots</p>
          </div>
          <div className="flex-1 p-4 rounded-lg bg-purple-50 border border-purple-100">
            <p className="text-2xl font-bold text-purple-600">
              {wordRoots.reduce((sum, root) => sum + root.words.length, 0)}
            </p>
            <p className="text-xs text-purple-600">Total Words</p>
          </div>
          <div className="flex-1 p-4 rounded-lg bg-green-50 border border-green-100">
            <p className="text-2xl font-bold text-green-600">{commonPrefixes.length}</p>
            <p className="text-xs text-green-600">Prefixes</p>
          </div>
        </div>

        {/* Word Roots List */}
        <div className="space-y-4">
          {wordRoots.map((root) => (
            <RootCard key={root.id} root={root} />
          ))}
        </div>

        {/* Bottom Tip */}
        <div className="mt-10 p-5 rounded-lg bg-green-50 border border-green-200">
          <h3 className="font-semibold text-green-800 mb-2">Study Tips</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Focus on understanding the root meaning first</li>
            <li>• Practice breaking down unfamiliar words into prefix + root</li>
            <li>• Create your own example sentences</li>
            <li>• When you see a new word on TOEFL, try to identify its root</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
