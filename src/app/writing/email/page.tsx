"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Clock, Check, ArrowRight, RotateCcw, FileText, AlertCircle } from "lucide-react";
import { emailPrompts } from "@/data/writing/emailPrompts";
import { useTimer } from "@/hooks/useSpeech";
import { AICoach } from "@/components/AICoach";

export default function EmailWritingPage() {
  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(null);
  const [emailContent, setEmailContent] = useState("");
  const [phase, setPhase] = useState<"select" | "writing" | "review">("select");
  const [wordCount, setWordCount] = useState(0);

  const timer = useTimer(420); // 7 minutes = 420 seconds

  const selectedPrompt = emailPrompts.find(p => p.id === selectedPromptId);

  useEffect(() => {
    const words = emailContent.trim().split(/\s+/).filter(w => w.length > 0);
    setWordCount(words.length);
  }, [emailContent]);

  const startWriting = (promptId: string) => {
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

  // Check word count status
  const getWordCountStatus = () => {
    if (wordCount < 80) return { color: "text-red-400", message: "Too short (aim for 80-120 words)" };
    if (wordCount <= 120) return { color: "text-green-400", message: "Good length!" };
    if (wordCount <= 180) return { color: "text-yellow-400", message: "Acceptable (try to be more concise)" };
    return { color: "text-red-400", message: "Too long (aim for 80-120 words)" };
  };

  // Auto-finish when timer ends
  useEffect(() => {
    if (timer.seconds === 0 && phase === "writing") {
      finishWriting();
    }
  }, [timer.seconds, phase]);

  if (phase === "select") {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/writing"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Writing
            </Link>
            <h1 className="text-3xl font-bold text-white mb-2">Write an Email</h1>
            <p className="text-gray-400">
              Practice writing emails for academic and professional situations.
              You have 7 minutes per email.
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6 mb-8">
            <h3 className="text-orange-400 font-semibold mb-2">How it works</h3>
            <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
              <li>Select an email scenario below</li>
              <li>Write an email covering all required points (80-120 words)</li>
              <li>Use polite and formal language</li>
              <li>Complete within 7 minutes</li>
            </ol>
          </div>

          {/* Prompt List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Choose a Scenario</h2>
            <div className="grid gap-4">
              {emailPrompts.map((prompt) => (
                <button
                  key={prompt.id}
                  onClick={() => startWriting(prompt.id)}
                  className="group text-left p-6 rounded-xl bg-[#1e293b] border border-[#334155] hover:border-orange-500/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors">
                      <Mail className="w-6 h-6 text-orange-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">{prompt.title}</h3>
                      <p className="text-sm text-gray-400 mb-3">{prompt.situation}</p>
                      <p className="text-xs text-gray-500">To: {prompt.recipient}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedPrompt) return null;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={selectNewPrompt}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Choose Another
          </button>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">{selectedPrompt.title}</h1>
            {phase === "writing" && (
              <div className={`flex items-center gap-2 text-lg font-mono ${
                timer.seconds <= 60 ? "text-red-400" : "text-white"
              }`}>
                <Clock className="w-5 h-5" />
                {timer.formatTime()}
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Prompt Details */}
          <div className="lg:col-span-1 space-y-4">
            <div className="p-4 rounded-xl bg-[#1e293b] border border-[#334155]">
              <h3 className="text-sm font-medium text-gray-400 mb-2">Situation</h3>
              <p className="text-white text-sm">{selectedPrompt.situation}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#1e293b] border border-[#334155]">
              <h3 className="text-sm font-medium text-gray-400 mb-2">To</h3>
              <p className="text-white text-sm">{selectedPrompt.recipient}</p>
            </div>

            <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30">
              <h3 className="text-sm font-medium text-orange-400 mb-2">Required Points</h3>
              <ul className="space-y-2">
                {selectedPrompt.requiredPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-orange-500/20 text-orange-400 text-xs flex-shrink-0">
                      {i + 1}
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Word Count */}
            <div className="p-4 rounded-xl bg-[#1e293b] border border-[#334155]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Word Count</span>
                <span className={`text-lg font-bold ${getWordCountStatus().color}`}>
                  {wordCount}
                </span>
              </div>
              <p className={`text-xs ${getWordCountStatus().color}`}>
                {getWordCountStatus().message}
              </p>
              <div className="mt-2 h-2 bg-[#334155] rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    wordCount < 80 ? "bg-red-500" :
                    wordCount <= 120 ? "bg-green-500" :
                    wordCount <= 180 ? "bg-yellow-500" : "bg-red-500"
                  }`}
                  style={{ width: `${Math.min((wordCount / 120) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Email Editor */}
          <div className="lg:col-span-2">
            <div className="p-6 rounded-xl bg-[#1e293b] border border-[#334155]">
              {phase === "writing" ? (
                <>
                  <textarea
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                    placeholder="Dear [Recipient],

Write your email here...

Sincerely,
[Your Name]"
                    className="w-full h-80 bg-[#0f172a] border border-[#334155] rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 resize-none"
                  />
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={finishWriting}
                      className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      Submit Email
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold text-white mb-4">Your Email</h3>
                  <div className="bg-[#0f172a] rounded-lg p-4 mb-6 whitespace-pre-wrap text-gray-300">
                    {emailContent || "(No content)"}
                  </div>

                  {/* Feedback */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-400">Quick Feedback</h4>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg bg-[#0f172a]">
                        <p className="text-sm text-gray-400">Word Count</p>
                        <p className={`text-xl font-bold ${getWordCountStatus().color}`}>
                          {wordCount} words
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-[#0f172a]">
                        <p className="text-sm text-gray-400">Time Used</p>
                        <p className="text-xl font-bold text-white">
                          {Math.floor((420 - timer.seconds) / 60)}:{((420 - timer.seconds) % 60).toString().padStart(2, "0")}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                      <h5 className="text-blue-400 font-medium mb-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Self-Check
                      </h5>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>Did you include a proper greeting?</li>
                        <li>Did you cover all 3 required points?</li>
                        <li>Did you use polite language (could, would, please)?</li>
                        <li>Did you include a proper closing?</li>
                      </ul>
                    </div>

                    {/* AI Coach Feedback */}
                    <AICoach
                      type="email-review"
                      content={emailContent}
                      context={`Email scenario: ${selectedPrompt.title}\nSituation: ${selectedPrompt.situation}\nRecipient: ${selectedPrompt.recipient}\nRequired points: ${selectedPrompt.requiredPoints.join(", ")}`}
                    />

                    {selectedPrompt.sampleResponse && (
                      <details className="group">
                        <summary className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer hover:text-white">
                          <FileText className="w-4 h-4" />
                          View Sample Response
                        </summary>
                        <div className="mt-3 p-4 rounded-lg bg-[#0f172a] text-sm text-gray-300 whitespace-pre-wrap">
                          {selectedPrompt.sampleResponse}
                        </div>
                      </details>
                    )}
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => {
                        setPhase("writing");
                        timer.reset(420);
                        timer.start();
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-[#334155] hover:bg-[#475569] rounded-lg transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Try Again
                    </button>
                    <button
                      onClick={selectNewPrompt}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
                    >
                      Next Prompt
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
