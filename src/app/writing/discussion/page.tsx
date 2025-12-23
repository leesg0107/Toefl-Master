"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Star, Lock, ChevronRight, User } from "lucide-react";
import { discussionTopics } from "@/data/writing/discussionTopics";
import { useTimer } from "@/hooks/useSpeech";
import { AICoach } from "@/components/AICoach";
import { useAuth } from "@/contexts/AuthContext";

export default function DiscussionPage() {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [response, setResponse] = useState("");
  const [phase, setPhase] = useState<"select" | "writing" | "review">("select");
  const [wordCount, setWordCount] = useState(0);
  const { isPremium } = useAuth();

  const timer = useTimer(600); // 10 minutes = 600 seconds

  const selectedTopic = discussionTopics.find(t => t.id === selectedTopicId);

  // Filter topics based on premium status
  const availableTopics = discussionTopics.filter(t => !t.isPremium || isPremium);
  const lockedTopics = discussionTopics.filter(t => t.isPremium && !isPremium);

  useEffect(() => {
    const words = response.trim().split(/\s+/).filter(w => w.length > 0);
    setWordCount(words.length);
  }, [response]);

  const startWriting = (topicId: string) => {
    const topic = discussionTopics.find(t => t.id === topicId);
    if (topic?.isPremium && !isPremium) return;

    setSelectedTopicId(topicId);
    setPhase("writing");
    setResponse("");
    timer.reset(600);
    timer.start();
  };

  const finishWriting = () => {
    timer.pause();
    setPhase("review");
  };

  const selectNewTopic = () => {
    setPhase("select");
    setSelectedTopicId(null);
    setResponse("");
    timer.reset(600);
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
              <h1 className="text-xl font-bold">Write for an Academic Discussion</h1>
            </div>
            <div className="bg-white border border-[#ccc] border-t-0 p-4 rounded-b">
              <p className="text-[#333] mb-3">
                A professor has posted a question about a topic and students have responded with their
                thoughts and ideas. Make a contribution to the discussion.
              </p>
              <p className="text-[#333] mb-2">
                You will have <strong>10 minutes</strong> to write.
              </p>
              <p className="text-[#666] text-sm">
                In your response, you should express and support your opinion and make a contribution
                to the discussion in your own words. An effective response will contain at least 100 words.
              </p>
            </div>
          </div>

          {/* Available Topics */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-[#003366] mb-3">
              Select a Topic ({availableTopics.length} available)
            </h2>
            <div className="space-y-2">
              {availableTopics.map((topic, index) => (
                <button
                  key={topic.id}
                  onClick={() => startWriting(topic.id)}
                  className="w-full text-left p-4 bg-white border border-[#ccc] hover:border-[#0077c8] hover:bg-[#f0f8ff] transition-all rounded flex items-center gap-4 group"
                >
                  <span className="w-8 h-8 bg-[#0077c8] text-white rounded flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-[#333] group-hover:text-[#0077c8]">
                        {topic.title}
                      </h3>
                      <span className="text-xs px-2 py-0.5 bg-[#e5e5e5] text-[#666] rounded">
                        {topic.category}
                      </span>
                    </div>
                    <p className="text-sm text-[#666] line-clamp-1">{topic.courseContext}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#999] group-hover:text-[#0077c8]" />
                </button>
              ))}
            </div>
          </div>

          {/* Locked Premium Topics */}
          {lockedTopics.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-lg font-semibold text-[#666]">
                  Premium Topics ({lockedTopics.length})
                </h2>
                <span className="premium-badge flex items-center gap-1">
                  <Star size={10} />
                  Premium
                </span>
              </div>
              <div className="space-y-2">
                {lockedTopics.map((topic) => (
                  <div
                    key={topic.id}
                    className="p-4 bg-[#f0f0f0] border border-[#ddd] rounded flex items-center gap-4 opacity-75"
                  >
                    <span className="w-8 h-8 bg-[#999] text-white rounded flex items-center justify-center">
                      <Lock size={14} />
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-[#666]">{topic.title}</h3>
                        <span className="text-xs px-2 py-0.5 bg-[#ddd] text-[#888] rounded">
                          {topic.category}
                        </span>
                      </div>
                      <p className="text-sm text-[#999] line-clamp-1">{topic.courseContext}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 mt-4 text-[#0077c8] hover:underline text-sm"
              >
                <Star size={14} />
                Upgrade to Premium to unlock all topics
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!selectedTopic) return null;

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* TOEFL-style Header Bar */}
      <div className="bg-gradient-to-b from-[#004080] to-[#003366] text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-bold">Writing Section</span>
          <span className="text-white/80">|</span>
          <span className="text-sm">Academic Discussion</span>
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
            {/* Left: Discussion Thread */}
            <div className="bg-white border border-[#ccc] rounded overflow-hidden">
              <div className="bg-[#e5e5e5] px-4 py-2 border-b border-[#ccc] font-semibold text-[#333]">
                Discussion Board
              </div>
              <div className="p-4 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                {/* Instructions */}
                <div className="text-sm text-[#666] border-b border-[#eee] pb-3">
                  <p className="mb-2">{selectedTopic.courseContext} Write a post responding to the professor&apos;s question.</p>
                  <p>In your response, you should:</p>
                  <ul className="list-disc list-inside ml-2">
                    <li>Express and support your opinion</li>
                    <li>Make a contribution to the discussion in your own words</li>
                  </ul>
                  <p className="mt-2 font-medium">An effective response will contain at least 100 words.</p>
                </div>

                {/* Professor Question */}
                <div className="p-4 bg-[#e8f4e8] border border-[#90c090] rounded">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#2e7d32] flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#2e7d32]">Professor</p>
                      <p className="text-xs text-[#666]">Course Instructor</p>
                    </div>
                  </div>
                  <p className="text-[#333] leading-relaxed">{selectedTopic.professorQuestion}</p>
                </div>

                {/* Student A */}
                <div className="p-4 bg-white border border-[#ddd] rounded">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#1976d2] flex items-center justify-center">
                      <span className="text-white font-bold">{selectedTopic.studentA.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-[#333]">{selectedTopic.studentA.name}</p>
                      <p className="text-xs text-[#666]">Student</p>
                    </div>
                  </div>
                  <p className="text-[#444] text-sm leading-relaxed">{selectedTopic.studentA.response}</p>
                </div>

                {/* Student B */}
                <div className="p-4 bg-white border border-[#ddd] rounded">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#9c27b0] flex items-center justify-center">
                      <span className="text-white font-bold">{selectedTopic.studentB.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-[#333]">{selectedTopic.studentB.name}</p>
                      <p className="text-xs text-[#666]">Student</p>
                    </div>
                  </div>
                  <p className="text-[#444] text-sm leading-relaxed">{selectedTopic.studentB.response}</p>
                </div>
              </div>
            </div>

            {/* Right: Writing Area */}
            <div className="bg-white border border-[#ccc] rounded overflow-hidden">
              <div className="bg-[#e5e5e5] px-4 py-2 border-b border-[#ccc] flex items-center justify-between">
                <span className="font-semibold text-[#333]">Your Response</span>
                <span className="toefl-word-count">Word Count: {wordCount}</span>
              </div>
              <div className="p-4">
                <textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder="Write your response to the discussion here..."
                  className="toefl-textarea w-full h-80 text-[#333]"
                  autoFocus
                />
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={selectNewTopic}
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
                Your Submitted Response
              </div>
              <div className="p-4">
                <p className="text-sm text-[#666] mb-3">Topic: {selectedTopic.title}</p>
                <div className="toefl-passage min-h-32 whitespace-pre-wrap">
                  {response || "(No response submitted)"}
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white border border-[#ccc] rounded p-4 text-center">
                <p className="text-sm text-[#666]">Word Count</p>
                <p className={`text-2xl font-bold ${
                  wordCount >= 100 ? "text-[#28a745]" : "text-[#dc3545]"
                }`}>
                  {wordCount}
                </p>
                <p className="text-xs text-[#999]">Minimum: 100 words</p>
              </div>
              <div className="bg-white border border-[#ccc] rounded p-4 text-center">
                <p className="text-sm text-[#666]">Time Used</p>
                <p className="text-2xl font-bold text-[#333]">
                  {Math.floor((600 - timer.seconds) / 60)}:{((600 - timer.seconds) % 60).toString().padStart(2, "0")}
                </p>
                <p className="text-xs text-[#999]">of 10:00 minutes</p>
              </div>
            </div>

            {/* Self-Check */}
            <div className="bg-[#fffde7] border border-[#ffc107] rounded p-4 mb-4">
              <h3 className="font-semibold text-[#333] mb-2">Self-Check Checklist</h3>
              <ul className="text-sm text-[#666] space-y-1">
                <li>☐ Did you clearly state your position?</li>
                <li>☐ Did you reference or respond to a classmate&apos;s idea?</li>
                <li>☐ Did you provide specific reasons or examples?</li>
                <li>☐ Is your response well-organized and coherent?</li>
                <li>☐ Did you write at least 100 words?</li>
              </ul>
            </div>

            {/* AI Coach */}
            <div className="mb-4">
              <AICoach
                type="discussion-review"
                content={response}
                context={`Topic: ${selectedTopic.title}\nProfessor's question: ${selectedTopic.professorQuestion}\n${selectedTopic.studentA.name}'s view: ${selectedTopic.studentA.response}\n${selectedTopic.studentB.name}'s view: ${selectedTopic.studentB.response}`}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setPhase("writing");
                  timer.reset(600);
                  timer.start();
                }}
                className="toefl-button-secondary px-6 py-2 rounded"
              >
                Try Again
              </button>
              <button
                onClick={selectNewTopic}
                className="toefl-button flex-1 px-6 py-2 rounded"
              >
                Next Topic
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
