"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Shuffle, Check, X, ArrowRight, RotateCcw, Trophy } from "lucide-react";
import { buildSentenceQuestions, BuildSentenceQuestion } from "@/data/writing/buildSentence";

export default function BuildSentencePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState<"all" | "easy" | "medium" | "hard">("all");

  const filteredQuestions = difficulty === "all"
    ? buildSentenceQuestions
    : buildSentenceQuestions.filter(q => q.difficulty === difficulty);

  const currentQuestion = filteredQuestions[currentIndex];
  const isComplete = currentIndex >= filteredQuestions.length;

  useEffect(() => {
    if (currentQuestion) {
      // Shuffle the words
      const shuffled = [...currentQuestion.scrambledWords].sort(() => Math.random() - 0.5);
      setAvailableWords(shuffled);
      setSelectedWords([]);
      setIsChecked(false);
    }
  }, [currentIndex, difficulty]);

  const selectWord = (word: string, index: number) => {
    if (isChecked) return;
    setSelectedWords([...selectedWords, word]);
    setAvailableWords(availableWords.filter((_, i) => i !== index));
  };

  const removeWord = (word: string, index: number) => {
    if (isChecked) return;
    setAvailableWords([...availableWords, word]);
    setSelectedWords(selectedWords.filter((_, i) => i !== index));
  };

  const checkAnswer = () => {
    const userSentence = selectedWords.join(" ");
    const correct = userSentence.toLowerCase().replace(/[.,!?]/g, "") ===
      currentQuestion.correctSentence.toLowerCase().replace(/[.,!?]/g, "");
    setIsCorrect(correct);
    setIsChecked(true);
    if (correct) setScore(score + 1);
  };

  const nextQuestion = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const restart = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedWords([]);
    setIsChecked(false);
  };

  if (!currentQuestion && !isComplete) {
    return (
      <div className="min-h-screen py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">No questions available for this difficulty</p>
          <button
            onClick={() => setDifficulty("all")}
            className="text-purple-400 hover:underline"
          >
            Show all questions
          </button>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="p-8 rounded-2xl bg-[#1e293b] border border-[#334155]">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">Practice Complete!</h1>
            <p className="text-gray-400 mb-6">Build a Sentence</p>

            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-green-400">{score}</p>
                <p className="text-sm text-gray-400">Correct</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-red-400">{filteredQuestions.length - score}</p>
                <p className="text-sm text-gray-400">Incorrect</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-blue-400">
                  {Math.round((score / filteredQuestions.length) * 100)}%
                </p>
                <p className="text-sm text-gray-400">Accuracy</p>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={restart}
                className="flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Practice Again
              </button>
              <Link
                href="/writing"
                className="flex items-center gap-2 px-6 py-3 bg-[#334155] hover:bg-[#475569] rounded-lg transition-colors"
              >
                Back to Writing
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Writing
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Build a Sentence</h1>
          <p className="text-gray-400">Reorder the words to form a correct sentence.</p>
        </div>

        {/* Difficulty Filter */}
        <div className="flex gap-2 mb-6">
          {(["all", "easy", "medium", "hard"] as const).map((level) => (
            <button
              key={level}
              onClick={() => {
                setDifficulty(level);
                setCurrentIndex(0);
                setScore(0);
              }}
              className={`px-4 py-2 rounded-lg text-sm capitalize transition-colors ${
                difficulty === level
                  ? "bg-purple-500 text-white"
                  : "bg-[#334155] text-gray-400 hover:text-white"
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Question {currentIndex + 1} of {filteredQuestions.length}</span>
            <span>Score: {score}</span>
          </div>
          <div className="h-2 bg-[#334155] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
              style={{ width: `${((currentIndex) / filteredQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="p-8 rounded-2xl bg-[#1e293b] border border-[#334155]">
          {/* Prompt */}
          <div className="mb-6">
            <span className={`text-xs px-2 py-1 rounded-full ${
              currentQuestion.difficulty === "easy" ? "bg-green-500/20 text-green-400" :
              currentQuestion.difficulty === "medium" ? "bg-yellow-500/20 text-yellow-400" :
              "bg-red-500/20 text-red-400"
            }`}>
              {currentQuestion.difficulty}
            </span>
            <p className="text-gray-400 mt-3 mb-2">Question:</p>
            <p className="text-white text-lg">{currentQuestion.prompt}</p>
          </div>

          {/* Selected Words (Answer Area) */}
          <div className="mb-6">
            <p className="text-gray-400 mb-2">Your sentence:</p>
            <div className={`min-h-20 p-4 rounded-xl border-2 border-dashed ${
              isChecked
                ? isCorrect
                  ? "border-green-500/50 bg-green-500/5"
                  : "border-red-500/50 bg-red-500/5"
                : "border-[#334155] bg-[#0f172a]"
            }`}>
              <div className="flex flex-wrap gap-2">
                {selectedWords.map((word, index) => (
                  <button
                    key={`selected-${index}`}
                    onClick={() => removeWord(word, index)}
                    disabled={isChecked}
                    className="px-3 py-2 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 disabled:cursor-default transition-colors"
                  >
                    {word}
                  </button>
                ))}
                {selectedWords.length === 0 && (
                  <span className="text-gray-500 text-sm">Click words below to build your sentence</span>
                )}
              </div>
            </div>
          </div>

          {/* Available Words */}
          <div className="mb-6">
            <p className="text-gray-400 mb-2">Available words:</p>
            <div className="flex flex-wrap gap-2">
              {availableWords.map((word, index) => (
                <button
                  key={`available-${index}`}
                  onClick={() => selectWord(word, index)}
                  disabled={isChecked}
                  className="px-3 py-2 bg-[#334155] text-white rounded-lg hover:bg-[#475569] disabled:opacity-50 disabled:cursor-default transition-colors"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>

          {/* Result */}
          {isChecked && (
            <div className={`p-4 rounded-lg mb-6 ${
              isCorrect ? "bg-green-500/10 border border-green-500/30" : "bg-red-500/10 border border-red-500/30"
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <Check className="w-5 h-5 text-green-400" />
                ) : (
                  <X className="w-5 h-5 text-red-400" />
                )}
                <span className={isCorrect ? "text-green-400" : "text-red-400"}>
                  {isCorrect ? "Correct!" : "Not quite right"}
                </span>
              </div>
              <p className="text-sm text-gray-400">Correct answer:</p>
              <p className="text-white">{currentQuestion.correctSentence}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4">
            {!isChecked ? (
              <>
                <button
                  onClick={() => {
                    const shuffled = [...currentQuestion.scrambledWords].sort(() => Math.random() - 0.5);
                    setAvailableWords([...availableWords, ...selectedWords].sort(() => Math.random() - 0.5));
                    setSelectedWords([]);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-[#334155] hover:bg-[#475569] rounded-lg transition-colors"
                >
                  <Shuffle className="w-4 h-4" />
                  Shuffle
                </button>
                <button
                  onClick={checkAnswer}
                  disabled={selectedWords.length === 0}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 rounded-lg transition-colors"
                >
                  <Check className="w-4 h-4" />
                  Check Answer
                </button>
              </>
            ) : (
              <button
                onClick={nextQuestion}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors"
              >
                Next Question
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
