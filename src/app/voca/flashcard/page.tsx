"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw, ChevronLeft, ChevronRight, Check, X, Shuffle, Volume2 } from "lucide-react";
import { vocabularyWords, categories } from "@/data/vocabulary/words";
import { useTextToSpeech } from "@/hooks/useSpeech";

export default function FlashcardPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [learned, setLearned] = useState<Set<string>>(new Set());
  const [needsReview, setNeedsReview] = useState<Set<string>>(new Set());

  const { speak, isSpeaking, isSupported } = useTextToSpeech();

  const filteredWords = selectedCategory === "all"
    ? vocabularyWords
    : vocabularyWords.filter(w => w.category === selectedCategory);

  const currentWord = filteredWords[currentIndex];

  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedCategory]);

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((currentIndex + 1) % filteredWords.length);
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((currentIndex - 1 + filteredWords.length) % filteredWords.length);
    }, 150);
  };

  const shuffleCards = () => {
    const randomIndex = Math.floor(Math.random() * filteredWords.length);
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex(randomIndex);
    }, 150);
  };

  const markAsLearned = () => {
    const newLearned = new Set(learned);
    newLearned.add(currentWord.id);
    setLearned(newLearned);
    needsReview.delete(currentWord.id);
    setNeedsReview(new Set(needsReview));
    nextCard();
  };

  const markForReview = () => {
    const newReview = new Set(needsReview);
    newReview.add(currentWord.id);
    setNeedsReview(newReview);
    learned.delete(currentWord.id);
    setLearned(new Set(learned));
    nextCard();
  };

  const pronounceWord = () => {
    if (isSupported && currentWord) {
      speak(currentWord.word);
    }
  };

  if (!currentWord) {
    return (
      <div className="min-h-screen py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">No words available for this category</p>
          <button
            onClick={() => setSelectedCategory("all")}
            className="text-green-400 hover:underline"
          >
            Show all words
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/voca"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Vocabulary
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Flashcards</h1>
          <p className="text-gray-400">Flip cards to learn word meanings and examples.</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              selectedCategory === "all"
                ? "bg-green-500 text-white"
                : "bg-[#334155] text-gray-400 hover:text-white"
            }`}
          >
            All ({vocabularyWords.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === cat
                  ? "bg-green-500 text-white"
                  : "bg-[#334155] text-gray-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-gray-400">
            Card {currentIndex + 1} of {filteredWords.length}
          </span>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-green-400">Learned: {learned.size}</span>
            <span className="text-yellow-400">Review: {needsReview.size}</span>
          </div>
        </div>

        {/* Flashcard */}
        <div
          className="relative h-80 cursor-pointer perspective-1000 mb-6"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div
            className={`absolute inset-0 transition-transform duration-500 transform-style-preserve-3d ${
              isFlipped ? "rotate-y-180" : ""
            }`}
            style={{
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 p-8 flex flex-col items-center justify-center"
              style={{ backfaceVisibility: "hidden" }}
            >
              <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-400 mb-4">
                {currentWord.category}
              </span>
              <h2 className="text-4xl font-bold text-white mb-2">{currentWord.word}</h2>
              <p className="text-gray-400 text-sm">{currentWord.partOfSpeech}</p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  pronounceWord();
                }}
                disabled={!isSupported || isSpeaking}
                className="mt-4 p-3 rounded-full bg-green-500/20 hover:bg-green-500/30 transition-colors disabled:opacity-50"
              >
                <Volume2 className={`w-5 h-5 text-green-400 ${isSpeaking ? "animate-pulse" : ""}`} />
              </button>

              <p className="text-gray-500 text-sm mt-6">Click to flip</p>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 rounded-2xl bg-[#1e293b] border border-[#334155] p-8 flex flex-col justify-center"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-4">{currentWord.word}</h3>
                <p className="text-gray-300 text-lg mb-6">{currentWord.definition}</p>
                <div className="p-4 rounded-lg bg-[#0f172a]">
                  <p className="text-sm text-gray-400 mb-1">Example:</p>
                  <p className="text-gray-300 italic">&quot;{currentWord.example}&quot;</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm mt-6 text-center">Click to flip back</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={prevCard}
            className="p-3 rounded-lg bg-[#334155] hover:bg-[#475569] transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={shuffleCards}
            className="flex items-center gap-2 px-4 py-2 bg-[#334155] hover:bg-[#475569] rounded-lg transition-colors"
          >
            <Shuffle className="w-4 h-4" />
            Shuffle
          </button>

          <button
            onClick={nextCard}
            className="p-3 rounded-lg bg-[#334155] hover:bg-[#475569] transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={markForReview}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
            Needs Review
          </button>
          <button
            onClick={markAsLearned}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-colors"
          >
            <Check className="w-5 h-5" />
            Learned
          </button>
        </div>

        {/* Keyboard Hint */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Use arrow keys to navigate, spacebar to flip
        </p>
      </div>
    </div>
  );
}
