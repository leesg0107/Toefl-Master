"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Star, Lock, ChevronRight, FileText } from "lucide-react";
import { emailPrompts } from "@/data/writing/emailPrompts";
import { useTimer } from "@/hooks/useSpeech";
import { AICoach } from "@/components/AICoach";
import { useAuth } from "@/contexts/AuthContext";

export default function EmailWritingPage() {
  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(null);
  const [emailContent, setEmailContent] = useState("");
  const [phase, setPhase] = useState<"select" | "writing" | "review">("select");
  const [wordCount, setWordCount] = useState(0);
  const { isPremium } = useAuth();

  const timer = useTimer(420); // 7 minutes = 420 seconds

  const selectedPrompt = emailPrompts.find(p => p.id === selectedPromptId);

  // Filter prompts based on premium status
  const availablePrompts = emailPrompts.filter(p => !p.isPremium || isPremium);
  const lockedPrompts = emailPrompts.filter(p => p.isPremium && !isPremium);

  useEffect(() => {
    const words = emailContent.trim().split(/\s+/).filter(w => w.length > 0);
    setWordCount(words.length);
  }, [emailContent]);

  const startWriting = (promptId: string) => {
    const prompt = emailPrompts.find(p => p.id === promptId);
    if (prompt?.isPremium && !isPremium) return;

    setSelectedPromptId(promptId);
    setPhase("writing");
    setEmailContent("");
    timer.reset(420);
    timer.start();
  };

  const finishWriting = () => {
    timer.pause();
    setPhase("review");
  };

  const selectNewPrompt = () => {
    setPhase("select");
    setSelectedPromptId(null);
    setEmailContent("");
    timer.reset(420);
  };

  // Auto-finish when timer ends
  useEffect(() => {
    if (timer.seconds === 0 && phase === "writing") {
      finishWriting();
    }
  }, [timer.seconds, phase]);

  if (phase === "select") {
    return (
      <div className="min-h-screen bg-[#f5f5f5] py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <Link
              href="/writing"
              className="inline-flex items-center gap-2 text-[#0077c8] hover:underline mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Writing
            </Link>
            <div className="bg-gradient-to-b from-[#004080] to-[#003366] text-white p-4 rounded-t">
              <h1 className="text-xl font-bold">Write an Email</h1>
            </div>
            <div className="bg-white border border-[#ccc] border-t-0 p-4 rounded-b">
              <p className="text-[#333]">
                You will read some information and use the information to write an email.
                You will have <strong>7 minutes</strong> to write the email.
              </p>
              <p className="text-[#666] text-sm mt-2">
                Write as much as you can in complete sentences. Aim for 80-120 words.
              </p>
            </div>
          </div>

          {/* Available Prompts */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-[#003366] mb-3">
              Select a Prompt ({availablePrompts.length} available)
            </h2>
            <div className="space-y-2">
              {availablePrompts.map((prompt, index) => (
                <button
                  key={prompt.id}
                  onClick={() => startWriting(prompt.id)}
                  className="w-full text-left p-4 bg-white border border-[#ccc] hover:border-[#0077c8] hover:bg-[#f0f8ff] transition-all rounded flex items-center gap-4 group"
                >
                  <span className="w-8 h-8 bg-[#0077c8] text-white rounded flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#333] group-hover:text-[#0077c8]">
                      {prompt.title}
                    </h3>
                    <p className="text-sm text-[#666] line-clamp-1">{prompt.situation}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#999] group-hover:text-[#0077c8]" />
                </button>
              ))}
            </div>
          </div>

          {/* Locked Premium Prompts */}
          {lockedPrompts.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-lg font-semibold text-[#666]">
                  Premium Prompts ({lockedPrompts.length})
                </h2>
                <span className="premium-badge flex items-center gap-1">
                  <Star size={10} />
                  Premium
                </span>
              </div>
              <div className="space-y-2">
                {lockedPrompts.map((prompt) => (
                  <div
                    key={prompt.id}
                    className="p-4 bg-[#f0f0f0] border border-[#ddd] rounded flex items-center gap-4 opacity-75"
                  >
                    <span className="w-8 h-8 bg-[#999] text-white rounded flex items-center justify-center">
                      <Lock size={14} />
                    </span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#666]">{prompt.title}</h3>
                      <p className="text-sm text-[#999] line-clamp-1">{prompt.situation}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 mt-4 text-[#0077c8] hover:underline text-sm"
              >
                <Star size={14} />
                Upgrade to Premium to unlock all prompts
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!selectedPrompt) return null;

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* TOEFL-style Header Bar */}
      <div className="bg-gradient-to-b from-[#004080] to-[#003366] text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-bold">Writing Section</span>
          <span className="text-white/80">|</span>
          <span className="text-sm">Write an Email</span>
        </div>
        {phase === "writing" && (
          <div className={`toefl-timer ${timer.seconds <= 60 ? "warning" : ""}`}>
            <Clock className="w-4 h-4 inline mr-2" />
            {timer.formatTime()}
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto p-4">
        {phase === "writing" ? (
          <div className="grid lg:grid-cols-2 gap-4">
            {/* Left: Instructions */}
            <div className="bg-white border border-[#ccc] rounded overflow-hidden">
              <div className="bg-[#e5e5e5] px-4 py-2 border-b border-[#ccc] font-semibold text-[#333]">
                Directions
              </div>
              <div className="p-4 text-[#333] space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                <p className="font-medium">{selectedPrompt.instructions}</p>

                <div className="toefl-instructions">
                  <p className="font-medium mb-2">Situation:</p>
                  <p>{selectedPrompt.situation}</p>
                </div>

                <div className="bg-white border border-[#ccc] p-3 rounded">
                  <p className="text-sm text-[#666] mb-1">Write an email to:</p>
                  <p className="font-mono text-[#0077c8]">{selectedPrompt.recipientEmail}</p>
                </div>

                <div>
                  <p className="font-medium mb-2">In your email, do the following:</p>
                  <ul className="list-disc list-inside space-y-1 text-[#333]">
                    {selectedPrompt.requiredPoints.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>

                <p className="text-sm text-[#666] italic">
                  Write as much as you can in complete sentences.
                </p>
              </div>
            </div>

            {/* Right: Writing Area */}
            <div className="bg-white border border-[#ccc] rounded overflow-hidden">
              <div className="bg-[#e5e5e5] px-4 py-2 border-b border-[#ccc] flex items-center justify-between">
                <span className="font-semibold text-[#333]">Your Response</span>
                <span className="toefl-word-count">Word Count: {wordCount}</span>
              </div>
              <div className="p-4">
                <div className="mb-3 p-3 bg-[#f5f5f5] border border-[#ddd] rounded text-sm">
                  <p><strong>To:</strong> {selectedPrompt.recipientEmail}</p>
                  <p><strong>Subject:</strong> {selectedPrompt.suggestedSubject}</p>
                </div>
                <textarea
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                  placeholder="Write your email here..."
                  className="toefl-textarea w-full h-64 text-[#333]"
                  autoFocus
                />
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={selectNewPrompt}
                    className="toefl-button-secondary px-6 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={finishWriting}
                    className="toefl-button px-6 py-2 rounded"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Review Phase */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border border-[#ccc] rounded overflow-hidden mb-4">
              <div className="bg-[#e5e5e5] px-4 py-2 border-b border-[#ccc] font-semibold text-[#333]">
                Your Submitted Email
              </div>
              <div className="p-4">
                <div className="mb-3 p-3 bg-[#f5f5f5] border border-[#ddd] rounded text-sm">
                  <p><strong>To:</strong> {selectedPrompt.recipientEmail}</p>
                  <p><strong>Subject:</strong> {selectedPrompt.suggestedSubject}</p>
                </div>
                <div className="toefl-passage min-h-32 whitespace-pre-wrap">
                  {emailContent || "(No response submitted)"}
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white border border-[#ccc] rounded p-4 text-center">
                <p className="text-sm text-[#666]">Word Count</p>
                <p className={`text-2xl font-bold ${
                  wordCount >= 80 && wordCount <= 120 ? "text-[#28a745]" : "text-[#dc3545]"
                }`}>
                  {wordCount}
                </p>
                <p className="text-xs text-[#999]">Target: 80-120 words</p>
              </div>
              <div className="bg-white border border-[#ccc] rounded p-4 text-center">
                <p className="text-sm text-[#666]">Time Used</p>
                <p className="text-2xl font-bold text-[#333]">
                  {Math.floor((420 - timer.seconds) / 60)}:{((420 - timer.seconds) % 60).toString().padStart(2, "0")}
                </p>
                <p className="text-xs text-[#999]">of 7:00 minutes</p>
              </div>
            </div>

            {/* Self-Check */}
            <div className="bg-[#fffde7] border border-[#ffc107] rounded p-4 mb-4">
              <h3 className="font-semibold text-[#333] mb-2">Self-Check Checklist</h3>
              <ul className="text-sm text-[#666] space-y-1">
                <li>☐ Did you include a proper greeting (e.g., Dear...)?</li>
                <li>☐ Did you address all three required points?</li>
                <li>☐ Did you use polite language (could, would, please)?</li>
                <li>☐ Did you include a proper closing (e.g., Sincerely, Best regards)?</li>
              </ul>
            </div>

            {/* AI Coach */}
            <div className="mb-4">
              <AICoach
                type="email-review"
                content={emailContent}
                context={`Email scenario: ${selectedPrompt.title}\nSituation: ${selectedPrompt.situation}\nRecipient: ${selectedPrompt.recipientEmail}\nRequired points: ${selectedPrompt.requiredPoints.join(", ")}`}
              />
            </div>

            {/* Sample Response */}
            {selectedPrompt.sampleResponse && (
              <details className="bg-white border border-[#ccc] rounded overflow-hidden mb-4">
                <summary className="bg-[#e5e5e5] px-4 py-2 border-b border-[#ccc] cursor-pointer hover:bg-[#d5d5d5] flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  View Sample Response
                </summary>
                <div className="p-4 toefl-passage whitespace-pre-wrap">
                  {selectedPrompt.sampleResponse}
                </div>
              </details>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setPhase("writing");
                  timer.reset(420);
                  timer.start();
                }}
                className="toefl-button-secondary px-6 py-2 rounded"
              >
                Try Again
              </button>
              <button
                onClick={selectNewPrompt}
                className="toefl-button flex-1 px-6 py-2 rounded"
              >
                Next Prompt
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
