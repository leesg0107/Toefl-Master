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
  Square,
  User
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
  const [showIntroMessage, setShowIntroMessage] = useState(true);

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
      <div className="min-h-screen bg-[#f5f5f5] py-12 px-4 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded border border-[#ccc]">
          <p className="text-[#666] mb-4">Topic not found</p>
          <Link href="/speaking/interview" className="text-[#0077c8] hover:underline">
            Back to Interview Topics
          </Link>
        </div>
      </div>
    );
  }

  const currentQuestion = topic.questions[currentIndex];
  const isComplete = currentIndex >= topic.questions.length;

  const startInterview = () => {
    setShowIntroMessage(true);
    // First speak the intro message
    speak(topic.introMessage, () => {
      setShowIntroMessage(false);
      setPhase("question");
      // Then speak the first question
      setTimeout(() => {
        speak(currentQuestion.text, () => {
          setPhase("answering");
          timer.reset(45);
          timer.start();
          startListening();
        });
      }, 500);
    });
  };

  const playQuestion = () => {
    speak(currentQuestion.text, () => {
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
        speak(topic.questions[currentIndex + 1].text, () => {
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
    setShowIntroMessage(true);
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
      <div className="min-h-screen bg-[#f5f5f5]">
        {/* Header */}
        <div className="bg-gradient-to-b from-[#004080] to-[#003366] text-white px-4 py-2">
          <div className="flex items-center gap-4">
            <span className="font-bold">Speaking Section</span>
            <span className="text-white/80">|</span>
            <span className="text-sm">Interview Complete</span>
          </div>
        </div>

        <div className="max-w-3xl mx-auto p-6">
          <div className="bg-white border border-[#ccc] rounded overflow-hidden">
            <div className="bg-[#e5e5e5] px-4 py-3 border-b border-[#ccc] text-center">
              <Trophy className="w-12 h-12 text-[#ffc107] mx-auto mb-2" />
              <h1 className="text-xl font-bold text-[#333]">Interview Complete!</h1>
              <p className="text-[#666]">{topic.title}</p>
            </div>

            <div className="p-4 space-y-4">
              {topic.questions.map((question, i) => (
                <div key={i} className="p-4 bg-[#f5f5f5] border border-[#ddd] rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-[#0077c8] text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </div>
                    <span className="text-sm text-[#666]">Question {i + 1}</span>
                  </div>
                  <p className="text-[#333] mb-3">{question.text}</p>
                  <div className="p-3 bg-white border border-[#ccc] rounded">
                    <p className="text-xs text-[#999] mb-1">Your response:</p>
                    <p className="text-[#444] text-sm">{answers[i]}</p>
                  </div>
                </div>
              ))}

              {/* AI Coach */}
              <AICoach
                type="speaking-feedback"
                content={answers.map((a, i) => `Q${i + 1}: ${topic.questions[i].text}\nA: ${a}`).join("\n\n")}
                context={`Interview Topic: ${topic.title}\nResearch Context: ${topic.researchContext}`}
              />
            </div>

            <div className="p-4 border-t border-[#ddd] flex gap-4 justify-center">
              <button
                onClick={restartInterview}
                className="toefl-button-secondary px-6 py-2 rounded flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </button>
              <Link
                href="/speaking/interview"
                className="toefl-button px-6 py-2 rounded"
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
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#004080] to-[#003366] text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-bold">Speaking Section</span>
          <span className="text-white/80">|</span>
          <span className="text-sm">Take an Interview</span>
        </div>
        {phase === "answering" && (
          <div className={`toefl-timer ${timer.seconds <= 10 ? "warning" : ""}`}>
            <Clock className="w-4 h-4 inline mr-2" />
            {timer.formatTime()}
          </div>
        )}
      </div>

      <div className="max-w-3xl mx-auto p-6">
        {/* Progress */}
        {phase !== "intro" && (
          <div className="mb-6 bg-white border border-[#ccc] rounded p-4">
            <div className="flex justify-between text-sm text-[#666] mb-2">
              <span>Question {currentIndex + 1} of {topic.questions.length}</span>
            </div>
            <div className="h-2 bg-[#e5e5e5] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0077c8] transition-all"
                style={{ width: `${((currentIndex) / topic.questions.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Main Card */}
        <div className="bg-white border border-[#ccc] rounded overflow-hidden">
          <div className="bg-[#e5e5e5] px-4 py-2 border-b border-[#ccc] font-semibold text-[#333]">
            {topic.title}
          </div>

          <div className="p-6">
            {/* Intro Phase */}
            {phase === "intro" && (
              <div className="text-center">
                <div className="inline-flex p-4 rounded-full bg-[#e3f2fd] mb-4">
                  <Mic className="w-10 h-10 text-[#0077c8]" />
                </div>
                <h2 className="text-lg font-semibold text-[#333] mb-4">Take an Interview</h2>

                <div className="text-left bg-[#fffde7] border border-[#ffc107] p-4 rounded mb-4">
                  <p className="text-sm text-[#333] mb-2">
                    <strong>Instructions:</strong> An interviewer will ask you questions. Answer the questions
                    and be sure to say as much as you can in the time allowed.
                  </p>
                  <p className="text-sm text-[#666]">
                    No time for preparation will be provided. You have 45 seconds for each answer.
                  </p>
                </div>

                <div className="text-left bg-[#f5f5f5] border border-[#ddd] p-4 rounded mb-6">
                  <p className="text-[#333]">{topic.researchContext}</p>
                </div>

                <button
                  onClick={startInterview}
                  disabled={!ttsSupported}
                  className="toefl-button px-8 py-3 rounded text-lg flex items-center gap-2 mx-auto"
                >
                  <Play className="w-5 h-5" />
                  Start Interview
                </button>

                {!ttsSupported && (
                  <p className="text-[#dc3545] text-sm mt-3">
                    Text-to-speech is not supported in your browser.
                  </p>
                )}
              </div>
            )}

            {/* Question Phase (Playing intro or question) */}
            {phase === "question" && (
              <div className="text-center py-8">
                <div className="inline-flex p-4 rounded-full bg-[#e3f2fd] mb-4 animate-pulse">
                  <Volume2 className="w-10 h-10 text-[#0077c8]" />
                </div>

                {/* Researcher avatar */}
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#2e7d32] flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-[#333]">Researcher</p>
                    <p className="text-xs text-[#666]">Speaking...</p>
                  </div>
                </div>

                <p className="text-[#666]">
                  {showIntroMessage ? "Introducing the interview..." : "Asking question..."}
                </p>
              </div>
            )}

            {/* Answering Phase */}
            {phase === "answering" && (
              <div className="text-center">
                {/* Timer */}
                <div className={`text-4xl font-bold mb-4 font-mono ${timer.seconds <= 10 ? "text-[#dc3545]" : "text-[#333]"}`}>
                  0:{timer.seconds.toString().padStart(2, "0")}
                </div>

                {/* Question display */}
                <div className="bg-[#f5f5f5] border border-[#ddd] p-4 rounded mb-4 text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#2e7d32] flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-[#666]">Researcher - Question {currentIndex + 1}</span>
                  </div>
                  <p className="text-[#333]">{currentQuestion.text}</p>
                </div>

                {/* Recording indicator */}
                <div className={`inline-flex p-3 rounded-full mb-3 ${
                  isListening ? "bg-[#ffebee] animate-pulse" : "bg-[#f5f5f5]"
                }`}>
                  {isListening ? (
                    <Mic className="w-8 h-8 text-[#dc3545]" />
                  ) : (
                    <MicOff className="w-8 h-8 text-[#999]" />
                  )}
                </div>

                <p className="text-sm text-[#666] mb-3">
                  {isListening ? "Recording your answer..." : "Microphone off"}
                </p>

                {/* Transcript display */}
                {transcript && (
                  <div className="bg-white border border-[#ccc] rounded p-3 mb-4 text-left max-h-24 overflow-y-auto">
                    <p className="text-xs text-[#999] mb-1">Your response:</p>
                    <p className="text-sm text-[#333]">{transcript}</p>
                  </div>
                )}

                <div className="flex gap-4 justify-center">
                  {!isListening && sttSupported && (
                    <button
                      onClick={startListening}
                      className="toefl-button-secondary px-4 py-2 rounded flex items-center gap-2"
                    >
                      <Mic className="w-4 h-4" />
                      Start Recording
                    </button>
                  )}
                  <button
                    onClick={finishAnswer}
                    className="toefl-button px-6 py-2 rounded flex items-center gap-2"
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
                <div className="bg-[#f5f5f5] border border-[#ddd] p-4 rounded mb-4 text-left">
                  <p className="text-sm text-[#666] mb-2">Question {currentIndex + 1}:</p>
                  <p className="text-[#333] mb-4">{currentQuestion.text}</p>

                  <div className="bg-white border border-[#ccc] rounded p-3">
                    <p className="text-xs text-[#999] mb-1">Your response:</p>
                    <p className="text-[#444]">{answers[currentIndex]}</p>
                  </div>
                </div>

                <button
                  onClick={nextQuestion}
                  className="toefl-button px-8 py-3 rounded flex items-center gap-2 mx-auto"
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
        </div>

        {/* Tips */}
        {phase === "intro" && (
          <div className="mt-4 p-4 bg-white border border-[#ccc] rounded">
            <p className="text-sm text-[#666]">
              <span className="font-medium text-[#333]">Tip:</span> Start speaking immediately after the question.
              Give specific examples and use the full 45 seconds. Speak clearly and at a natural pace.
            </p>
          </div>
        )}

        {/* Back link */}
        <div className="mt-4">
          <Link
            href="/speaking/interview"
            className="inline-flex items-center gap-2 text-[#0077c8] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Topic Selection
          </Link>
        </div>
      </div>
    </div>
  );
}
