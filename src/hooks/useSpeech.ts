"use client";

import { useState, useCallback, useRef, useEffect } from "react";

// Type declarations for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly length: number;
  readonly isFinal: boolean;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: Event & { error?: string }) => void) | null;
  onaudiostart: (() => void) | null;
  onspeechstart: (() => void) | null;
  start(): void;
  stop(): void;
}

type SpeechRecognitionConstructor = new () => ISpeechRecognition;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

// Speech rate options for different difficulty levels
export type SpeechRate = "slow" | "normal" | "fast";

const SPEECH_RATES: Record<SpeechRate, number> = {
  slow: 0.8,
  normal: 0.9,  // TOEFL standard speed
  fast: 1.0,
};

export function useTextToSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && !window.speechSynthesis) {
      setIsSupported(false);
    }
  }, []);

  const speak = useCallback((text: string, onEnd?: () => void, rate: SpeechRate = "normal") => {
    if (!isSupported || typeof window === "undefined") return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = SPEECH_RATES[rate];
    utterance.pitch = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      onEnd?.();
    };
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [isSupported]);

  const stop = useCallback(() => {
    if (typeof window !== "undefined") {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return { speak, stop, isSpeaking, isSupported };
}

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);
  const transcriptRef = useRef<string>("");  // Sync ref for immediate access

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognitionClass) {
        console.error("[SpeechRecognition] Not supported in this browser");
        setIsSupported(false);
        return;
      }

      console.log("[SpeechRecognition] Initializing...");
      const recognition = new SpeechRecognitionClass();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        console.log("[SpeechRecognition] onresult event:", event.results);
        let finalTranscript = "";
        let interimTranscript = "";

        for (let i = 0; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
          } else {
            interimTranscript += result[0].transcript;
          }
        }

        const currentTranscript = finalTranscript || interimTranscript;
        console.log("[SpeechRecognition] Transcript:", currentTranscript);
        transcriptRef.current = currentTranscript;  // Update ref immediately (sync)
        setTranscript(currentTranscript);  // Update state (async)
        setError(null);
      };

      recognition.onend = () => {
        console.log("[SpeechRecognition] onend - stopped listening");
        setIsListening(false);
      };

      recognition.onerror = (event: Event & { error?: string }) => {
        console.error("[SpeechRecognition] Error:", event.error);
        setError(event.error || "Unknown error");
        setIsListening(false);

        // Show user-friendly error messages
        if (event.error === "not-allowed") {
          alert("Microphone access denied. Please allow microphone access in your browser settings.");
        } else if (event.error === "no-speech") {
          console.log("[SpeechRecognition] No speech detected");
        } else if (event.error === "network") {
          alert("Network error. Speech recognition requires an internet connection.");
        }
      };

      recognition.onaudiostart = () => {
        console.log("[SpeechRecognition] Audio capture started");
      };

      recognition.onspeechstart = () => {
        console.log("[SpeechRecognition] Speech detected");
      };

      recognitionRef.current = recognition;
      console.log("[SpeechRecognition] Initialized successfully");
    }
  }, []);

  const startListening = useCallback(() => {
    if (!isSupported || !recognitionRef.current) {
      console.error("[SpeechRecognition] Cannot start - not supported or not initialized");
      return;
    }
    console.log("[SpeechRecognition] Starting...");
    transcriptRef.current = "";  // Reset ref
    setTranscript("");
    setError(null);
    setIsListening(true);
    try {
      recognitionRef.current.start();
    } catch (err) {
      console.error("[SpeechRecognition] Start error:", err);
      setIsListening(false);
    }
  }, [isSupported]);

  // Get the current transcript value synchronously (for use before async operations)
  const getTranscript = useCallback(() => {
    return transcriptRef.current;
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      console.log("[SpeechRecognition] Stopping...");
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  return { startListening, stopListening, isListening, transcript, isSupported, setTranscript, getTranscript, error };
}

// Timer hook
export function useTimer(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback((newSeconds?: number) => {
    setIsRunning(false);
    setSeconds(newSeconds ?? initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (isRunning && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => s - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsRunning(false);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, seconds]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return { seconds, isRunning, start, pause, reset, formatTime: () => formatTime(seconds) };
}
