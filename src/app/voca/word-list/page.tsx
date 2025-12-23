"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Volume2, BookOpen } from "lucide-react";
import { vocabularyWords, categories } from "@/data/vocabulary/words";
import { useTextToSpeech } from "@/hooks/useSpeech";

export default function WordListPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedWord, setExpandedWord] = useState<string | null>(null);

  const { speak, isSpeaking, isSupported } = useTextToSpeech();

  const filteredWords = vocabularyWords.filter(word => {
    const matchesCategory = selectedCategory === "all" || word.category === selectedCategory;
    const matchesSearch = word.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      word.definition.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const pronounceWord = (word: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSupported) {
      speak(word);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/voca"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Vocabulary
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Word List</h1>
          <p className="text-gray-400">Browse and search all TOEFL vocabulary words.</p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search words or definitions..."
            className="w-full bg-[#1e293b] border border-[#334155] rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              selectedCategory === "all"
                ? "bg-blue-500 text-white"
                : "bg-[#334155] text-gray-400 hover:text-white"
            }`}
          >
            All ({vocabularyWords.length})
          </button>
          {categories.map((cat) => {
            const count = vocabularyWords.filter(w => w.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  selectedCategory === cat
                    ? "bg-blue-500 text-white"
                    : "bg-[#334155] text-gray-400 hover:text-white"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Results Count */}
        <p className="text-sm text-gray-400 mb-4">
          Showing {filteredWords.length} words
        </p>

        {/* Word List */}
        <div className="space-y-2">
          {filteredWords.map((word) => (
            <div
              key={word.id}
              className="rounded-xl bg-[#1e293b] border border-[#334155] overflow-hidden"
            >
              <button
                onClick={() => setExpandedWord(expandedWord === word.id ? null : word.id)}
                className="w-full p-4 flex items-center gap-4 text-left hover:bg-[#243044] transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-white">{word.word}</h3>
                    <span className="text-xs text-gray-500">({word.partOfSpeech})</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#334155] text-gray-400">
                      {word.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1 line-clamp-1">{word.definition}</p>
                </div>
                <button
                  onClick={(e) => pronounceWord(word.word, e)}
                  disabled={!isSupported}
                  className="p-2 rounded-lg bg-[#334155] hover:bg-[#475569] transition-colors"
                >
                  <Volume2 className="w-4 h-4 text-gray-400" />
                </button>
              </button>

              {expandedWord === word.id && (
                <div className="px-4 pb-4 border-t border-[#334155]">
                  <div className="pt-4">
                    <p className="text-gray-400 text-sm mb-2">Definition:</p>
                    <p className="text-white mb-4">{word.definition}</p>
                    <p className="text-gray-400 text-sm mb-2">Example:</p>
                    <p className="text-gray-300 italic">&quot;{word.example}&quot;</p>
                  </div>
                </div>
              )}
            </div>
          ))}

          {filteredWords.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No words found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
