"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Volume2,
  Mic,
  MicOff,
  CheckCircle,
  XCircle,
  RotateCcw,
  ArrowRight,
  Trophy,
  MapPin,
  Loader2,
  Lock
} from "lucide-react";
import { listenRepeatSessions } from "@/data/speaking/listenRepeat";
import { useTextToSpeech, useSpeechRecognition } from "@/hooks/useSpeech";
import { useAuth } from "@/contexts/AuthContext";

interface EvaluationResult {
  correct: boolean;
  userText: string;
  feedback: string;
  score: number;
}

export default function ListenRepeatSessionPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.sessionId as string;
  const { isPremium, session: authSession } = useAuth();

  const sessionData = listenRepeatSessions.find((s) => s.id === sessionId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<"ready" | "listening" | "recording" | "evaluating" | "result">("ready");
  const [results, setResults] = useState<EvaluationResult[]>([]);
  const [currentFeedback, setCurrentFeedback] = useState<string>("");

  const { speak, isSupported: ttsSupported } = useTextToSpeech();
  const {
    startListening,
    stopListening,
    isListening,
    transcript,
    getTranscript,
    isSupported: sttSupported,
    setTranscript
  } = useSpeechRecognition();

  // Keep a ref that always has the latest transcript value
  const transcriptRef = useRef(transcript);
  useEffect(() => {
    transcriptRef.current = transcript;
    console.log("[transcriptRef] Updated to:", transcript);
  }, [transcript]);

  // Redirect if not premium
  useEffect(() => {
    if (!isPremium) {
      router.push("/speaking/listen-repeat");
    }
  }, [isPremium, router]);

  if (!sessionData) {
    return (
      <div className="min-h-screen py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Session not found</p>
          <Link href="/speaking/listen-repeat" className="text-blue-400 hover:underline">
            Back to Listen & Repeat
          </Link>
        </div>
      </div>
    );
  }

  if (!isPremium) {
    return (
      <div className="min-h-screen py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <Lock className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">Premium subscription required</p>
          <Link href="/pricing" className="text-blue-400 hover:underline">
            Upgrade to Premium
          </Link>
        </div>
      </div>
    );
  }

  const currentSentence = sessionData.sentences[currentIndex];
  const isComplete = currentIndex >= sessionData.sentences.length;
  const correctCount = results.filter((r) => r.correct).length;

  const playSentence = () => {
    setPhase("listening");
    speak(currentSentence, () => {
      setPhase("recording");
      setTimeout(() => {
        startListening();
      }, 500);
    });
  };

  const evaluateWithAI = async () => {
    // First stop listening to finalize the transcript
    stopListening();
    setPhase("evaluating");

    // Wait a moment for speech recognition to finalize and React to update
    await new Promise(resolve => setTimeout(resolve, 500));

    // Get transcript from local ref (updated via useEffect when transcript state changes)
    const fromLocalRef = transcriptRef.current;
    const fromHookRef = getTranscript();

    console.log("[evaluateWithAI] From local ref:", fromLocalRef);
    console.log("[evaluateWithAI] From hook ref:", fromHookRef);

    // Use whichever has a value
    const finalTranscript = fromLocalRef || fromHookRef || "(no speech detected)";
    console.log("[evaluateWithAI] Final transcript to send:", finalTranscript);

    console.log("[evaluateWithAI] Auth session exists:", !!authSession);
    console.log("[evaluateWithAI] Token exists:", !!authSession?.access_token);

    try {
      const response = await fetch("/api/speaking-eval", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authSession?.access_token}`,
        },
        body: JSON.stringify({
          targetSentence: currentSentence,
          userTranscript: finalTranscript,
          sessionTitle: sessionData.title,
          location: sessionData.location,
        }),
      });

      const data = await response.json();
      console.log("[evaluateWithAI] Response status:", response.status, "Data:", data);

      if (response.ok) {
        setCurrentFeedback(data.feedback);
        setResults([...results, {
          correct: data.isCorrect,
          userText: finalTranscript,
          feedback: data.feedback,
          score: data.score,
        }]);
      } else {
        // Show specific error message
        const errorMessage = data.error || "Unknown error";
        console.error("[evaluateWithAI] API error:", response.status, errorMessage);
        setCurrentFeedback(`Error: ${errorMessage} (Status: ${response.status})`);
        setResults([...results, {
          correct: false,
          userText: finalTranscript,
          feedback: `API Error: ${errorMessage}`,
          score: 0,
        }]);
      }
    } catch (error) {
      console.error("Evaluation error:", error);
      setCurrentFeedback("Could not get AI feedback. Please try again.");
      setResults([...results, {
        correct: false,
        userText: finalTranscript,
        feedback: "Evaluation failed",
        score: 0,
      }]);
    }

    setPhase("result");
  };

  const nextSentence = () => {
    setCurrentIndex(currentIndex + 1);
    setPhase("ready");
    setTranscript("");
    setCurrentFeedback("");
  };

  const restartSession = () => {
    setCurrentIndex(0);
    setPhase("ready");
    setResults([]);
    setTranscript("");
    setCurrentFeedback("");
  };

  // Auto-stop recording after 6 seconds
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isListening) {
      timeout = setTimeout(() => {
        evaluateWithAI();
      }, 6000);
    }
    return () => clearTimeout(timeout);
  }, [isListening]);

  if (isComplete) {
    const averageScore = results.reduce((sum, r) => sum + r.score, 0) / results.length;

    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="p-6 rounded-2xl bg-[#1e293b] border border-[#334155]">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">Session Complete!</h1>
            <p className="text-gray-400 mb-2">{sessionData.title}</p>
            <div className="flex items-center justify-center gap-2 mb-6">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-gray-500">{sessionData.location}</span>
            </div>

            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-green-400">{correctCount}</p>
                <p className="text-sm text-gray-400">Correct</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-blue-400">{averageScore.toFixed(1)}</p>
                <p className="text-sm text-gray-400">Avg Score</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-red-400">{sessionData.sentences.length - correctCount}</p>
                <p className="text-sm text-gray-400">Needs Practice</p>
              </div>
            </div>

            <div className="space-y-2 mb-8 max-h-64 overflow-y-auto">
              {sessionData.sentences.map((sentence, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 p-3 rounded-lg text-left ${
                    results[i]?.correct ? "bg-green-500/10" : "bg-red-500/10"
                  }`}
                >
                  {results[i]?.correct ? (
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm text-white">{sentence}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Score: {results[i]?.score || 0}/10
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={restartSession}
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </button>
              <Link
                href="/speaking/listen-repeat"
                className="flex items-center gap-2 px-6 py-3 bg-[#334155] hover:bg-[#475569] rounded-lg transition-colors"
              >
                Choose Another
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
            href="/speaking/listen-repeat"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">{sessionData.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {sessionData.location}
            </span>
          </div>
          <p className="text-gray-500 text-sm mt-2">{sessionData.description}</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Sentence {currentIndex + 1} of {sessionData.sentences.length}</span>
            <span>{correctCount} correct</span>
          </div>
          <div className="h-2 bg-[#334155] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all"
              style={{ width: `${((currentIndex) / sessionData.sentences.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Card */}
        <div className="p-8 rounded-2xl bg-[#1e293b] border border-[#334155]">
          <p className="text-sm text-gray-400 mb-6">
            Listen carefully and repeat the sentence exactly as you hear it.
          </p>

          {/* Phase: Ready */}
          {phase === "ready" && (
            <div className="text-center">
              <p className="text-gray-400 mb-6">
                Click the button below to hear the sentence
              </p>
              <button
                onClick={playSentence}
                disabled={!ttsSupported}
                className="inline-flex items-center gap-3 px-8 py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 rounded-xl text-lg font-medium transition-colors"
              >
                <Volume2 className="w-6 h-6" />
                Play Sentence
              </button>
              {!ttsSupported && (
                <p className="text-red-400 text-sm mt-4">
                  Text-to-speech is not supported in your browser
                </p>
              )}
            </div>
          )}

          {/* Phase: Listening */}
          {phase === "listening" && (
            <div className="text-center">
              <div className="inline-flex p-6 rounded-full bg-blue-500/20 mb-6 animate-pulse">
                <Volume2 className="w-12 h-12 text-blue-400" />
              </div>
              <p className="text-white text-lg">Listen carefully...</p>
            </div>
          )}

          {/* Phase: Recording */}
          {phase === "recording" && (
            <div className="text-center">
              <div className={`inline-flex p-6 rounded-full mb-6 ${
                isListening ? "bg-red-500/20 animate-pulse" : "bg-gray-500/20"
              }`}>
                {isListening ? (
                  <Mic className="w-12 h-12 text-red-400" />
                ) : (
                  <MicOff className="w-12 h-12 text-gray-400" />
                )}
              </div>
              <p className="text-white text-lg mb-2">
                {isListening ? "Recording... Speak now!" : "Click to start recording"}
              </p>
              {transcript && (
                <p className="text-gray-400 text-sm mb-4">
                  Heard: &quot;{transcript}&quot;
                </p>
              )}
              <div className="flex gap-4 justify-center">
                {!isListening ? (
                  <button
                    onClick={startListening}
                    disabled={!sttSupported}
                    className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                  >
                    Start Recording
                  </button>
                ) : (
                  <button
                    onClick={evaluateWithAI}
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
                  >
                    Done Speaking
                  </button>
                )}
              </div>
              {!sttSupported && (
                <p className="text-yellow-400 text-sm mt-4">
                  Voice recognition not supported in your browser.
                </p>
              )}
            </div>
          )}

          {/* Phase: Evaluating */}
          {phase === "evaluating" && (
            <div className="text-center">
              <div className="inline-flex p-6 rounded-full bg-purple-500/20 mb-6">
                <Loader2 className="w-12 h-12 text-purple-400 animate-spin" />
              </div>
              <p className="text-white text-lg">AI is evaluating your pronunciation...</p>
            </div>
          )}

          {/* Phase: Result */}
          {phase === "result" && (
            <div className="text-center">
              {results[currentIndex]?.correct ? (
                <div className="inline-flex p-6 rounded-full bg-green-500/20 mb-6">
                  <CheckCircle className="w-12 h-12 text-green-400" />
                </div>
              ) : (
                <div className="inline-flex p-6 rounded-full bg-red-500/20 mb-6">
                  <XCircle className="w-12 h-12 text-red-400" />
                </div>
              )}

              <p className={`text-xl font-semibold mb-2 ${
                results[currentIndex]?.correct ? "text-green-400" : "text-red-400"
              }`}>
                Score: {results[currentIndex]?.score || 0}/10
              </p>

              <div className="bg-[#0f172a] rounded-lg p-4 mb-4 text-left">
                <p className="text-sm text-gray-400 mb-1">Target sentence:</p>
                <p className="text-white">{currentSentence}</p>
              </div>

              {/* AI Feedback */}
              {currentFeedback && (
                <div className="bg-[#0f172a] rounded-lg p-4 mb-6 text-left">
                  <p className="text-sm text-blue-400 mb-2 font-medium">AI Feedback:</p>
                  <div className="text-sm text-gray-300 whitespace-pre-wrap">
                    {currentFeedback}
                  </div>
                </div>
              )}

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    setPhase("ready");
                    setTranscript("");
                    setCurrentFeedback("");
                    setResults(results.slice(0, -1));
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-[#334155] hover:bg-[#475569] rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Try Again
                </button>
                <button
                  onClick={nextSentence}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
