"use client";

import Link from "next/link";
import { ArrowLeft, Mic, PenTool, Star } from "lucide-react";

const speakingRubrics = [
  {
    score: "6 (High)",
    delivery: "Speech is clear, fluid, and sustained. Pronunciation and intonation are highly intelligible.",
    language: "Uses a wide range of vocabulary and grammar with high accuracy. Minor errors don't affect meaning.",
    topic: "Response is fully developed with clear, relevant examples. Ideas are well-organized and coherent."
  },
  {
    score: "5",
    delivery: "Speech is generally clear with minor lapses. Mostly intelligible pronunciation.",
    language: "Good vocabulary range. Grammar is mostly accurate with occasional errors.",
    topic: "Response addresses the task with relevant ideas. Some minor gaps in development."
  },
  {
    score: "4",
    delivery: "Speech is mostly intelligible but may have noticeable pauses or hesitations.",
    language: "Adequate vocabulary. Some grammar errors may affect clarity.",
    topic: "Response is relevant but may lack full development. Organization is generally clear."
  },
  {
    score: "3",
    delivery: "Speech has frequent pauses, unclear pronunciation, or choppy delivery.",
    language: "Limited vocabulary. Grammar errors may obscure meaning at times.",
    topic: "Response addresses the topic but with limited development or irrelevant information."
  },
  {
    score: "2 (Low)",
    delivery: "Speech is difficult to understand. Many pronunciation issues.",
    language: "Very limited vocabulary and grammar control.",
    topic: "Response barely addresses the topic. Lacks coherent development."
  }
];

const writingRubrics = [
  {
    score: "6 (High)",
    description: "Effectively addresses the task with well-developed, relevant ideas.",
    organization: "Well-organized with clear progression of ideas.",
    language: "Uses a range of vocabulary and grammar accurately. Minor errors don't affect meaning.",
    details: "Provides specific, relevant examples and details."
  },
  {
    score: "5",
    description: "Addresses the task with mostly well-developed ideas.",
    organization: "Generally well-organized with good progression.",
    language: "Good vocabulary and grammar control. Some minor errors.",
    details: "Provides relevant support with adequate detail."
  },
  {
    score: "4",
    description: "Adequately addresses the task with some development.",
    organization: "Organized but may have some unclear connections.",
    language: "Adequate vocabulary. Grammar errors occasionally affect clarity.",
    details: "Provides some support but may lack specificity."
  },
  {
    score: "3",
    description: "Partially addresses the task with limited development.",
    organization: "Some organization but connections may be unclear.",
    language: "Limited vocabulary. Noticeable grammar errors.",
    details: "Limited or vague support for ideas."
  },
  {
    score: "2 (Low)",
    description: "Minimally addresses the task.",
    organization: "Little or no organization.",
    language: "Very limited vocabulary and grammar control.",
    details: "Little relevant content or support."
  }
];

export default function RubricsPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/study-notes"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Study Notes
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Scoring Rubrics</h1>
          <p className="text-gray-400">
            Understand how TOEFL responses are scored to improve your performance.
          </p>
        </div>

        {/* 2026 Scoring Info */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-8">
          <h3 className="text-blue-400 font-semibold mb-2">2026 Scoring Scale</h3>
          <p className="text-gray-300 text-sm mb-4">
            Starting January 2026, TOEFL will use a new 1-6 band scale aligned with CEFR levels,
            in addition to the traditional 0-120 scale.
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {[6, 5, 4, 3, 2, 1].map((score) => (
              <div key={score} className="text-center p-2 rounded-lg bg-[#1e293b]">
                <p className="text-lg font-bold text-white">{score}</p>
                <p className="text-xs text-gray-500">
                  {score === 6 ? "C2" : score === 5 ? "C1" : score === 4 ? "B2" : score === 3 ? "B1" : score === 2 ? "A2" : "A1"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Speaking Rubric */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Mic className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">Speaking Scoring Criteria</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#334155]">
                  <th className="text-left p-4 text-gray-400 font-medium">Score</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Delivery</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Language Use</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Topic Development</th>
                </tr>
              </thead>
              <tbody>
                {speakingRubrics.map((rubric, index) => (
                  <tr key={index} className="border-b border-[#334155] hover:bg-[#1e293b]/50">
                    <td className="p-4">
                      <span className={`font-semibold ${
                        index === 0 ? "text-green-400" :
                        index === 1 ? "text-blue-400" :
                        index === 2 ? "text-yellow-400" :
                        index === 3 ? "text-orange-400" : "text-red-400"
                      }`}>
                        {rubric.score}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-300">{rubric.delivery}</td>
                    <td className="p-4 text-sm text-gray-300">{rubric.language}</td>
                    <td className="p-4 text-sm text-gray-300">{rubric.topic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Writing Rubric */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <PenTool className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">Writing Scoring Criteria</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#334155]">
                  <th className="text-left p-4 text-gray-400 font-medium">Score</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Task Response</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Organization</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Language</th>
                </tr>
              </thead>
              <tbody>
                {writingRubrics.map((rubric, index) => (
                  <tr key={index} className="border-b border-[#334155] hover:bg-[#1e293b]/50">
                    <td className="p-4">
                      <span className={`font-semibold ${
                        index === 0 ? "text-green-400" :
                        index === 1 ? "text-blue-400" :
                        index === 2 ? "text-yellow-400" :
                        index === 3 ? "text-orange-400" : "text-red-400"
                      }`}>
                        {rubric.score}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-300">{rubric.description}</td>
                    <td className="p-4 text-sm text-gray-300">{rubric.organization}</td>
                    <td className="p-4 text-sm text-gray-300">{rubric.language}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Key Tips */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-[#1e293b] border border-[#334155]">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-yellow-400" />
              <h3 className="text-lg font-semibold text-white">How to Score Higher</h3>
            </div>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• <span className="text-white">Be specific</span> - Use concrete examples, not vague statements</li>
              <li>• <span className="text-white">Stay organized</span> - Use clear transitions between ideas</li>
              <li>• <span className="text-white">Address all parts</span> - Don&apos;t miss any required elements</li>
              <li>• <span className="text-white">Use varied vocabulary</span> - Avoid repeating the same words</li>
              <li>• <span className="text-white">Manage time</span> - Leave time to review your response</li>
            </ul>
          </div>

          <div className="p-6 rounded-xl bg-[#1e293b] border border-[#334155]">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-red-400" />
              <h3 className="text-lg font-semibold text-white">Common Mistakes to Avoid</h3>
            </div>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• <span className="text-white">Going off-topic</span> - Always address the question asked</li>
              <li>• <span className="text-white">Being too brief</span> - Develop your ideas fully</li>
              <li>• <span className="text-white">Memorized responses</span> - Raters can identify these</li>
              <li>• <span className="text-white">Grammar over content</span> - Ideas matter more than perfection</li>
              <li>• <span className="text-white">Rushing</span> - Take time to think before responding</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
