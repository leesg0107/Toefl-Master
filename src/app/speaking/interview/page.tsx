"use client";

import Link from "next/link";
import { ArrowLeft, Mic, Clock, Lock, Star } from "lucide-react";
import { interviewTopics } from "@/data/speaking/interview";
import { useAuth } from "@/contexts/AuthContext";

export default function InterviewPage() {
  const { isPremium } = useAuth();

  const availableTopics = interviewTopics.filter(t => !t.isPremium || isPremium);
  const lockedTopics = interviewTopics.filter(t => t.isPremium && !isPremium);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Back */}
        <Link href="/speaking" className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-600 text-sm mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Speaking
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Take an Interview</h1>
          <p className="text-gray-500 text-sm">
            Answer questions from a researcher. Say as much as you can in 45 seconds.
          </p>
          <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              45 sec per question
            </span>
            <span>4 questions</span>
            <span>No prep time</span>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-gray-50 rounded-lg p-4 mb-8 text-sm text-gray-600">
          <p className="font-medium text-gray-700 mb-2">How It Works</p>
          <ol className="space-y-1 text-gray-500 list-decimal list-inside">
            <li>Select a topic below</li>
            <li>The researcher introduces the study</li>
            <li>Answer 4 questions (45 sec each)</li>
          </ol>
        </div>

        {/* Available Topics */}
        <div className="mb-8">
          <p className="text-xs font-medium text-gray-500 mb-3">
            Topics ({availableTopics.length})
          </p>
          <div className="space-y-2">
            {availableTopics.map((topic, index) => (
              <Link
                key={topic.id}
                href={`/speaking/interview/${topic.id}`}
                className="group flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <span className="w-7 h-7 bg-gray-900 text-white rounded flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 group-hover:text-gray-700">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-1">{topic.researchContext}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Mic className="w-3 h-3" />
                  {topic.questions.length}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Locked Premium Topics */}
        {lockedTopics.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <p className="text-xs font-medium text-gray-400">
                Premium ({lockedTopics.length})
              </p>
              <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded flex items-center gap-1">
                <Star size={10} />
                Premium
              </span>
            </div>
            <div className="space-y-2 opacity-60">
              {lockedTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 bg-gray-50"
                >
                  <span className="w-7 h-7 bg-gray-300 text-white rounded flex items-center justify-center">
                    <Lock size={12} />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-500">{topic.title}</h3>
                    <p className="text-xs text-gray-400 line-clamp-1">{topic.researchContext}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 mt-4 text-amber-600 hover:text-amber-700 text-sm"
            >
              <Star size={14} />
              Upgrade to unlock all topics
            </Link>
          </div>
        )}

        {/* Tips */}
        <div className="pt-8 border-t border-gray-100">
          <p className="text-xs font-medium text-gray-500 mb-3">Tips</p>
          <div className="grid grid-cols-2 gap-4 text-xs text-gray-400">
            <div>
              <p className="text-gray-600 mb-1">Question Types</p>
              <ul className="space-y-0.5">
                <li>• Personal experience</li>
                <li>• Preferences and opinions</li>
              </ul>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Scoring</p>
              <ul className="space-y-0.5">
                <li>• Clear pronunciation</li>
                <li>• Detailed responses</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
