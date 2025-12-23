"use client";

import Link from "next/link";
import { ArrowLeft, Mic, ChevronRight, Clock, Star, Lock } from "lucide-react";
import { interviewTopics } from "@/data/speaking/interview";
import { useAuth } from "@/contexts/AuthContext";

export default function InterviewPage() {
  const { isPremium } = useAuth();

  // Filter topics based on premium status
  const availableTopics = interviewTopics.filter(t => !t.isPremium || isPremium);
  const lockedTopics = interviewTopics.filter(t => t.isPremium && !isPremium);

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/speaking"
            className="inline-flex items-center gap-2 text-[#0077c8] hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Speaking
          </Link>
          <div className="bg-gradient-to-b from-[#004080] to-[#003366] text-white p-4 rounded-t">
            <h1 className="text-xl font-bold">Take an Interview</h1>
          </div>
          <div className="bg-white border border-[#ccc] border-t-0 p-4 rounded-b">
            <p className="text-[#333] mb-3">
              An interviewer will ask you questions. Answer the questions and be sure to say as much
              as you can in the time allowed.
            </p>
            <div className="flex items-center gap-4 text-sm text-[#666]">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                45 seconds per question
              </span>
              <span>•</span>
              <span>4 questions per interview</span>
              <span>•</span>
              <span>No preparation time</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-[#fffde7] border border-[#ffc107] rounded p-4 mb-6">
          <h3 className="font-semibold text-[#333] mb-2">How It Works</h3>
          <ol className="text-sm text-[#666] space-y-1 list-decimal list-inside">
            <li>Select a research topic below to start the interview</li>
            <li>The researcher will introduce themselves and the study</li>
            <li>You will be asked 4 questions about the topic</li>
            <li>Start speaking immediately after each question (no prep time)</li>
            <li>You have 45 seconds to answer each question</li>
          </ol>
        </div>

        {/* Available Topics */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#003366] mb-3">
            Select a Topic ({availableTopics.length} available)
          </h2>
          <div className="space-y-2">
            {availableTopics.map((topic, index) => (
              <Link
                key={topic.id}
                href={`/speaking/interview/${topic.id}`}
                className="flex items-center gap-4 p-4 bg-white border border-[#ccc] hover:border-[#0077c8] hover:bg-[#f0f8ff] transition-all rounded group"
              >
                <span className="w-8 h-8 bg-[#0077c8] text-white rounded flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#333] group-hover:text-[#0077c8]">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-[#666] line-clamp-1">{topic.researchContext}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-[#999]">
                    <span className="flex items-center gap-1">
                      <Mic className="w-3 h-3" />
                      {topic.questions.length} questions
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      45 sec each
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#999] group-hover:text-[#0077c8]" />
              </Link>
            ))}
          </div>
        </div>

        {/* Locked Premium Topics */}
        {lockedTopics.length > 0 && (
          <div className="mb-6">
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
                  className="flex items-center gap-4 p-4 bg-[#f0f0f0] border border-[#ddd] rounded opacity-75"
                >
                  <span className="w-8 h-8 bg-[#999] text-white rounded flex items-center justify-center">
                    <Lock size={14} />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#666]">{topic.title}</h3>
                    <p className="text-sm text-[#999] line-clamp-1">{topic.researchContext}</p>
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

        {/* Tips */}
        <div className="bg-white border border-[#ccc] rounded overflow-hidden">
          <div className="bg-[#e5e5e5] px-4 py-2 border-b border-[#ccc] font-semibold text-[#333]">
            Interview Tips
          </div>
          <div className="p-4">
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-medium text-[#333] mb-2">Question Types:</p>
                <ul className="text-[#666] space-y-1">
                  <li>• Personal experience and habits</li>
                  <li>• Preferences and choices</li>
                  <li>• Opinions and evaluations</li>
                  <li>• Views about future situations</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-[#333] mb-2">Scoring Criteria:</p>
                <ul className="text-[#666] space-y-1">
                  <li>• Clear pronunciation and delivery</li>
                  <li>• Relevant and detailed responses</li>
                  <li>• Good use of vocabulary and grammar</li>
                  <li>• Natural flow and coherence</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
