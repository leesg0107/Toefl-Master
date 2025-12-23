"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Trophy, RotateCcw, ArrowRight, Check, X } from "lucide-react";
import { vocabularyWords, categories, VocabularyWord } from "@/data/vocabulary/words";

type QuizType = "definition" | "word";

interface QuizQuestion {
  word: VocabularyWord;
  options: string[];
  correctIndex: number;
  type: QuizType;
}

function generateQuiz(words: VocabularyWord[], count: number = 10): QuizQuestion[] {
  const shuffled = [...words].sort(() => Math.random() - 0.5);
  const selectedWords = shuffled.slice(0, Math.min(count, words.length));

  return selectedWords.map(word => {
    const type: QuizType = Math.random() > 0.5 ? "definition" : "word";

    // Get 3 wrong answers
    const otherWords = words.filter(w => w.id !== word.id);
    const wrongAnswers = otherWords
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(w => type === "definition" ? w.definition : w.word);

    const correctAnswer = type === "definition" ? word.definition : word.word;
    const allOptions = [...wrongAnswers, correctAnswer].sort(() => Math.random() - 0.5);

    return {
      word,
      options: allOptions,
      correctIndex: allOptions.indexOf(correctAnswer),
      type,
    };
  });
}

export default function QuizPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<"setup" | "quiz" | "result">("setup");

  const filteredWords = selectedCategory === "all"
    ? vocabularyWords
    : vocabularyWords.filter(w => w.category === selectedCategory);

  const currentQuestion = quiz[currentIndex];
  const isComplete = currentIndex >= quiz.length && quiz.length > 0;

  const startQuiz = () => {
    const newQuiz = generateQuiz(filteredWords, 10);
    setQuiz(newQuiz);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setPhase("quiz");
  };

  const selectAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    if (index === currentQuestion.correctIndex) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 >= quiz.length) {
      setPhase("result");
    } else {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
    }
  };

  if (phase === "setup") {
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
            <h1 className="text-3xl font-bold text-white mb-2">Word Quiz</h1>
            <p className="text-gray-400">Test your vocabulary knowledge with multiple choice questions.</p>
          </div>

          {/* Category Selection */}
          <div className="p-6 rounded-xl bg-[#1e293b] border border-[#334155]">
            <h3 className="text-lg font-semibold text-white mb-4">Select Category</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  selectedCategory === "all"
                    ? "bg-yellow-500 text-black"
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
                        ? "bg-yellow-500 text-black"
                        : "bg-[#334155] text-gray-400 hover:text-white"
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>

            <div className="p-4 rounded-lg bg-[#0f172a] mb-6">
              <p className="text-sm text-gray-400">
                Selected: <span className="text-white">{filteredWords.length} words</span>
              </p>
              <p className="text-sm text-gray-400">
                Quiz length: <span className="text-white">10 questions</span>
              </p>
            </div>

            <button
              onClick={startQuiz}
              disabled={filteredWords.length < 4}
              className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-600 text-black font-medium rounded-lg transition-colors"
            >
              Start Quiz
            </button>
            {filteredWords.length < 4 && (
              <p className="text-red-400 text-sm mt-2">Need at least 4 words to start quiz</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (phase === "result") {
    const percentage = Math.round((score / quiz.length) * 100);
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="p-8 rounded-2xl bg-[#1e293b] border border-[#334155]">
            <Trophy className={`w-16 h-16 mx-auto mb-4 ${
              percentage >= 80 ? "text-yellow-400" :
              percentage >= 60 ? "text-gray-400" : "text-orange-400"
            }`} />
            <h1 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h1>
            <p className="text-gray-400 mb-6">
              {percentage >= 80 ? "Excellent work!" :
               percentage >= 60 ? "Good job! Keep practicing." : "Keep studying!"}
            </p>

            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-green-400">{score}</p>
                <p className="text-sm text-gray-400">Correct</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-red-400">{quiz.length - score}</p>
                <p className="text-sm text-gray-400">Incorrect</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-blue-400">{percentage}%</p>
                <p className="text-sm text-gray-400">Score</p>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={startQuiz}
                className="flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </button>
              <Link
                href="/voca"
                className="flex items-center gap-2 px-6 py-3 bg-[#334155] hover:bg-[#475569] rounded-lg transition-colors"
              >
                Back to Vocabulary
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Question {currentIndex + 1} of {quiz.length}</span>
            <span>Score: {score}</span>
          </div>
          <div className="h-2 bg-[#334155] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all"
              style={{ width: `${((currentIndex) / quiz.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="p-8 rounded-2xl bg-[#1e293b] border border-[#334155]">
          <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 mb-4 inline-block">
            {currentQuestion.word.category}
          </span>

          {currentQuestion.type === "definition" ? (
            <>
              <p className="text-gray-400 mb-2">What is the definition of:</p>
              <h2 className="text-3xl font-bold text-white mb-8">{currentQuestion.word.word}</h2>
            </>
          ) : (
            <>
              <p className="text-gray-400 mb-2">Which word matches this definition:</p>
              <p className="text-xl text-white mb-8">&quot;{currentQuestion.word.definition}&quot;</p>
            </>
          )}

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQuestion.correctIndex;
              const showResult = selectedAnswer !== null;

              let bgColor = "bg-[#0f172a] hover:bg-[#1a2744]";
              let borderColor = "border-[#334155]";

              if (showResult) {
                if (isCorrect) {
                  bgColor = "bg-green-500/20";
                  borderColor = "border-green-500";
                } else if (isSelected && !isCorrect) {
                  bgColor = "bg-red-500/20";
                  borderColor = "border-red-500";
                }
              } else if (isSelected) {
                borderColor = "border-yellow-500";
              }

              return (
                <button
                  key={index}
                  onClick={() => selectAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 rounded-lg border text-left transition-all ${bgColor} ${borderColor} disabled:cursor-default`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#334155] flex items-center justify-center text-sm">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1 text-gray-200">{option}</span>
                    {showResult && isCorrect && (
                      <Check className="w-5 h-5 text-green-400" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <X className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {selectedAnswer !== null && (
            <div className="mt-6">
              <div className={`p-4 rounded-lg mb-4 ${
                selectedAnswer === currentQuestion.correctIndex
                  ? "bg-green-500/10 border border-green-500/30"
                  : "bg-red-500/10 border border-red-500/30"
              }`}>
                <p className="text-sm text-gray-400 mb-1">Example:</p>
                <p className="text-gray-300 italic">&quot;{currentQuestion.word.example}&quot;</p>
              </div>

              <button
                onClick={nextQuestion}
                className="w-full flex items-center justify-center gap-2 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg transition-colors"
              >
                {currentIndex + 1 >= quiz.length ? "See Results" : "Next Question"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
