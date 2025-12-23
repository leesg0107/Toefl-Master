"use client";

import { useState, useEffect } from "react";
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
  Trophy
} from "lucide-react";
import { listenRepeatSessions } from "@/data/speaking/listenRepeat";
import { useTextToSpeech, useSpeechRecognition } from "@/hooks/useSpeech";

export default function ListenRepeatSessionPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.sessionId as string;

  const session = listenRepeatSessions.find((s) => s.id === sessionId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<"ready" | "listening" | "recording" | "result">("ready");
  const [results, setResults] = useState<{ correct: boolean; userText: string }[]>([]);
  const [hasPlayed, setHasPlayed] = useState(false);

  const { speak, isSpeaking, isSupported: ttsSupported } = useTextToSpeech();
  const {
    startListening,
    stopListening,
    isListening,
    transcript,
    isSupported: sttSupported,
    setTranscript
  } = useSpeechRecognition();

  if (!session) {
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

  const currentSentence = session.sentences[currentIndex];
  const isComplete = currentIndex >= session.sentences.length;
  const correctCount = results.filter((r) => r.correct).length;

  const playSentence = () => {
    setPhase("listening");
    setHasPlayed(true);
    speak(currentSentence, () => {
      setPhase("recording");
      // Auto-start recording after playback
      setTimeout(() => {
        startListening();
      }, 500);
    });
  };

  const checkAnswer = () => {
    stopListening();
    const userText = transcript.toLowerCase().trim();
    const targetText = currentSentence.toLowerCase().trim();

    // Simple comparison - check if most words match
    const userWords = userText.split(/\s+/);
    const targetWords = targetText.split(/\s+/).map(w => w.replace(/[.,!?]/g, ""));

    let matchCount = 0;
    targetWords.forEach(word => {
      if (userWords.some(uw => uw.replace(/[.,!?]/g, "") === word)) {
        matchCount++;
      }
    });

    const accuracy = matchCount / targetWords.length;
    const isCorrect = accuracy >= 0.7;

    setResults([...results, { correct: isCorrect, userText: transcript }]);
    setPhase("result");
  };

  const nextSentence = () => {
    setCurrentIndex(currentIndex + 1);
    setPhase("ready");
    setHasPlayed(false);
    setTranscript("");
  };

  const restartSession = () => {
    setCurrentIndex(0);
    setPhase("ready");
    setResults([]);
    setHasPlayed(false);
    setTranscript("");
  };

  // Stop recording after 5 seconds
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isListening) {
      timeout = setTimeout(() => {
        checkAnswer();
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [isListening]);

  if (isComplete) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="p-6 rounded-2xl bg-[#1e293b] border border-[#334155]">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">Session Complete!</h1>
            <p className="text-gray-400 mb-6">{session.title}</p>

            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-green-400">{correctCount}</p>
                <p className="text-sm text-gray-400">Correct</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-red-400">{session.sentences.length - correctCount}</p>
                <p className="text-sm text-gray-400">Needs Practice</p>
              </div>
            </div>

            <div className="space-y-2 mb-8">
              {session.sentences.map((sentence, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-3 rounded-lg text-left ${
                    results[i]?.correct ? "bg-green-500/10" : "bg-red-500/10"
                  }`}
                >
                  {results[i]?.correct ? (
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm text-white">{sentence}</p>
                    {results[i]?.userText && !results[i]?.correct && (
                      <p className="text-xs text-gray-500 mt-1">
                        You said: {results[i].userText}
                      </p>
                    )}
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
          <h1 className="text-2xl font-bold text-white mb-2">{session.title}</h1>
          <p className="text-gray-400 text-sm">{session.scenario}</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Sentence {currentIndex + 1} of {session.sentences.length}</span>
            <span>{correctCount} correct</span>
          </div>
          <div className="h-2 bg-[#334155] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all"
              style={{ width: `${((currentIndex) / session.sentences.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Card */}
        <div className="p-8 rounded-2xl bg-[#1e293b] border border-[#334155]">
          <p className="text-sm text-gray-400 mb-6">{session.instruction}</p>

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
                    onClick={checkAnswer}
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
                  >
                    Done Speaking
                  </button>
                )}
              </div>
              {!sttSupported && (
                <p className="text-yellow-400 text-sm mt-4">
                  Voice recognition not supported. Type your response instead.
                </p>
              )}
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

              <p className={`text-xl font-semibold mb-4 ${
                results[currentIndex]?.correct ? "text-green-400" : "text-red-400"
              }`}>
                {results[currentIndex]?.correct ? "Great job!" : "Keep practicing!"}
              </p>

              <div className="bg-[#0f172a] rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-400 mb-1">Target sentence:</p>
                <p className="text-white">{currentSentence}</p>
              </div>

              {results[currentIndex]?.userText && (
                <div className="bg-[#0f172a] rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-400 mb-1">You said:</p>
                  <p className="text-white">{results[currentIndex].userText}</p>
                </div>
              )}

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    setPhase("ready");
                    setHasPlayed(false);
                    setTranscript("");
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
