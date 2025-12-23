"use client";

import Link from "next/link";
import { ArrowLeft, MessageSquare, ArrowRight, Clock, Users } from "lucide-react";
import { interviewTopics } from "@/data/speaking/interview";

export default function InterviewPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/speaking"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Speaking
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Interview Practice</h1>
          <p className="text-gray-400">
            Answer interview questions on various topics. You have 45 seconds per question with no preparation time.
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 mb-8">
          <h3 className="text-purple-400 font-semibold mb-2">How it works</h3>
          <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
            <li>Select a topic below to start the interview</li>
            <li>You will be asked 4 questions about the topic</li>
            <li>Start speaking immediately after each question (no prep time)</li>
            <li>You have 45 seconds to answer each question</li>
            <li>Questions get progressively harder</li>
          </ol>
        </div>

        {/* Topic List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Choose a Topic</h2>
          <div className="grid gap-4">
            {interviewTopics.map((topic) => (
              <Link
                key={topic.id}
                href={`/speaking/interview/${topic.id}`}
                className="group flex items-center gap-4 p-6 rounded-xl bg-[#1e293b] border border-[#334155] hover:border-purple-500/50 transition-all"
              >
                <div className="p-3 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                  <MessageSquare className="w-6 h-6 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">{topic.title}</h3>
                  <p className="text-sm text-gray-400">{topic.scenario}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {topic.questions.length} questions
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      45 sec each
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-12 p-6 rounded-xl bg-[#1e293b]/50 border border-[#334155]">
          <h3 className="text-lg font-semibold text-white mb-4">Interview Tips</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-400">
            <div>
              <p className="font-medium text-gray-300 mb-2">Question Types:</p>
              <ul className="space-y-1">
                <li>• Personal experience and habits</li>
                <li>• Preferences and choices</li>
                <li>• Opinions and evaluations</li>
                <li>• Views about future situations</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-gray-300 mb-2">Scoring Criteria:</p>
              <ul className="space-y-1">
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
  );
}
