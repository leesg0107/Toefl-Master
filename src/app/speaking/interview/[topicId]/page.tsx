"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Volume2,
  Mic,
  MicOff,
  Clock,
  ArrowRight,
  Trophy,
  RotateCcw,
  Play,
  Square
} from "lucide-react";
import { interviewTopics } from "@/data/speaking/interview";
import { useTextToSpeech, useSpeechRecognition, useTimer } from "@/hooks/useSpeech";
import { AICoach } from "@/components/AICoach";

export default function InterviewSessionPage() {
  const params = useParams();
  const topicId = params.topicId as string;

  const topic = interviewTopics.find((t) => t.id === topicId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<"intro" | "question" | "answering" | "review">("intro");
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");

  const { speak, isSpeaking, isSupported: ttsSupported } = useTextToSpeech();
  const {
    startListening,
    stopListening,
    isListening,
    transcript,
    isSupported: sttSupported,
    setTranscript
  } = useSpeechRecognition();
  const timer = useTimer(45);

  if (!topic) {
    return (
      <div className="min-h-screen py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Topic not found</p>
          <Link href="/speaking/interview" className="text-purple-400 hover:underline">
            Back to Interview
          </Link>
        </div>
      </div>
    );
  }

  const currentQuestion = topic.questions[currentIndex];
  const isComplete = currentIndex >= topic.questions.length;

  const startInterview = () => {
    setPhase("question");
    playQuestion();
  };

  const playQuestion = () => {
    speak(currentQuestion, () => {
      setPhase("answering");
      timer.reset(45);
      timer.start();
      startListening();
    });
  };

  const finishAnswer = () => {
    stopListening();
    timer.pause();
    const answer = transcript || currentAnswer || "(No response recorded)";
    setAnswers([...answers, answer]);
    setPhase("review");
  };

  const nextQuestion = () => {
    setCurrentIndex(currentIndex + 1);
    setTranscript("");
    setCurrentAnswer("");
    if (currentIndex + 1 < topic.questions.length) {
      setPhase("question");
      setTimeout(() => {
        speak(topic.questions[currentIndex + 1], () => {
          setPhase("answering");
          timer.reset(45);
          timer.start();
          startListening();
        });
      }, 500);
    }
  };

  const restartInterview = () => {
    setCurrentIndex(0);
    setPhase("intro");
    setAnswers([]);
    setTranscript("");
    setCurrentAnswer("");
    timer.reset(45);
  };

  // Auto-finish when timer ends
  useEffect(() => {
    if (timer.seconds === 0 && phase === "answering") {
      finishAnswer();
    }
  }, [timer.seconds, phase]);

  // Update current answer from transcript
  useEffect(() => {
    if (transcript) {
      setCurrentAnswer(transcript);
    }
  }, [transcript]);

  if (isComplete) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="p-8 rounded-2xl bg-[#1e293b] border border-[#334155]">
            <div className="text-center mb-8">
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-white mb-2">Interview Complete!</h1>
              <p className="text-gray-400">{topic.title}</p>
            </div>

            <div className="space-y-6 mb-8">
              {topic.questions.map((question, i) => (
                <div key={i} className="p-4 rounded-lg bg-[#0f172a] border border-[#334155]">
                  <p className="text-sm text-purple-400 mb-2">Question {i + 1}</p>
                  <p className="text-white mb-3">{question}</p>
                  <div className="p-3 bg-[#1e293b] rounded-lg">
                    <p className="text-sm text-gray-400 mb-1">Your answer:</p>
                    <p className="text-gray-300 text-sm">{answers[i]}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Coach Feedback */}
            <div className="mb-8">
              <AICoach
                type="speaking-feedback"
                content={answers.map((a, i) => `Q${i + 1}: ${topic.questions[i]}\nA: ${a}`).join("\n\n")}
                context={`Interview Topic: ${topic.title}\nScenario: ${topic.scenario}`}
              />
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={restartInterview}
                className="flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </button>
              <Link
                href="/speaking/interview"
                className="flex items-center gap-2 px-6 py-3 bg-[#334155] hover:bg-[#475569] rounded-lg transition-colors"
              >
                Choose Another Topic
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
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/speaking/interview"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">{topic.title}</h1>
          <p className="text-gray-400 text-sm">{topic.scenario}</p>
        </div>

        {/* Progress */}
        {phase !== "intro" && (
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Question {currentIndex + 1} of {topic.questions.length}</span>
              {phase === "answering" && (
                <span className={`flex items-center gap-1 ${timer.seconds <= 10 ? "text-red-400" : ""}`}>
                  <Clock className="w-4 h-4" />
                  {timer.formatTime()}
                </span>
              )}
            </div>
            <div className="h-2 bg-[#334155] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                style={{ width: `${((currentIndex) / topic.questions.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Main Card */}
        <div className="p-8 rounded-2xl bg-[#1e293b] border border-[#334155]">
          {/* Intro Phase */}
          {phase === "intro" && (
            <div className="text-center">
              <div className="inline-flex p-6 rounded-full bg-purple-500/20 mb-6">
                <Mic className="w-12 h-12 text-purple-400" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-4">Ready to start?</h2>
              <p className="text-gray-400 mb-6">
                You will answer {topic.questions.length} questions about {topic.title.toLowerCase()}.
                Each question has a 45-second time limit with no preparation time.
              </p>
              <button
                onClick={startInterview}
                className="inline-flex items-center gap-2 px-8 py-4 bg-purple-500 hover:bg-purple-600 rounded-xl text-lg font-medium transition-colors"
              >
                <Play className="w-5 h-5" />
                Start Interview
              </button>
            </div>
          )}

          {/* Question Phase (Playing) */}
          {phase === "question" && (
            <div className="text-center">
              <div className="inline-flex p-6 rounded-full bg-purple-500/20 mb-6 animate-pulse">
                <Volume2 className="w-12 h-12 text-purple-400" />
              </div>
              <p className="text-purple-400 text-sm mb-2">Question {currentIndex + 1}</p>
              <p className="text-white text-lg">Listen to the question...</p>
            </div>
          )}

          {/* Answering Phase */}
          {phase === "answering" && (
            <div className="text-center">
              {/* Timer Display */}
              <div className={`text-5xl font-bold mb-6 ${timer.seconds <= 10 ? "text-red-400" : "text-white"}`}>
                {timer.formatTime()}
              </div>

              <p className="text-purple-400 text-sm mb-2">Question {currentIndex + 1}</p>
              <p className="text-white text-lg mb-6">{currentQuestion}</p>

              <div className={`inline-flex p-4 rounded-full mb-4 ${
                isListening ? "bg-red-500/20 animate-pulse" : "bg-gray-500/20"
              }`}>
                {isListening ? (
                  <Mic className="w-8 h-8 text-red-400" />
                ) : (
                  <MicOff className="w-8 h-8 text-gray-400" />
                )}
              </div>

              <p className="text-sm text-gray-400 mb-4">
                {isListening ? "Recording your answer..." : "Microphone off"}
              </p>

              {transcript && (
                <div className="bg-[#0f172a] rounded-lg p-4 mb-4 text-left max-h-32 overflow-y-auto">
                  <p className="text-sm text-gray-300">{transcript}</p>
                </div>
              )}

              <div className="flex gap-4 justify-center">
                {!isListening && (
                  <button
                    onClick={startListening}
                    disabled={!sttSupported}
                    className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                  >
                    Start Recording
                  </button>
                )}
                <button
                  onClick={finishAnswer}
                  className="flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors"
                >
                  <Square className="w-4 h-4" />
                  Finish Answer
                </button>
              </div>
            </div>
          )}

          {/* Review Phase */}
          {phase === "review" && (
            <div className="text-center">
              <p className="text-purple-400 text-sm mb-2">Question {currentIndex + 1}</p>
              <p className="text-white text-lg mb-6">{currentQuestion}</p>

              <div className="bg-[#0f172a] rounded-lg p-4 mb-6 text-left">
                <p className="text-sm text-gray-400 mb-2">Your answer:</p>
                <p className="text-gray-300">{answers[currentIndex]}</p>
              </div>

              <button
                onClick={nextQuestion}
                className="flex items-center gap-2 px-8 py-4 bg-purple-500 hover:bg-purple-600 rounded-xl font-medium transition-colors mx-auto"
              >
                {currentIndex + 1 < topic.questions.length ? (
                  <>
                    Next Question
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    See Results
                    <Trophy className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Tips */}
        {phase === "intro" && (
          <div className="mt-8 p-4 rounded-lg bg-[#1e293b]/50 border border-[#334155]">
            <p className="text-sm text-gray-400">
              <span className="text-white font-medium">Tip:</span> Start speaking immediately after the question.
              Give specific examples and use the full 45 seconds.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
