"use client";

import Link from "next/link";
import { ArrowLeft, Mic, PenTool, Star, AlertCircle } from "lucide-react";

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

function getScoreColor(index: number) {
  const colors = [
    "text-green-600 bg-green-50",
    "text-blue-600 bg-blue-50",
    "text-yellow-600 bg-yellow-50",
    "text-orange-600 bg-orange-50",
    "text-red-600 bg-red-50"
  ];
  return colors[index] || colors[4];
}

export default function RubricsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/study-notes"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-600 text-sm mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Study Notes
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Scoring Rubrics</h1>
          <p className="text-gray-500 text-sm">
            Understand how TOEFL responses are scored to improve your performance.
          </p>
        </div>

        {/* 2026 Scoring Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-800 mb-1">2026 Scoring Scale</h3>
              <p className="text-sm text-blue-700 mb-3">
                Starting January 2026, TOEFL uses a 1-6 band scale aligned with CEFR levels.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { score: 6, cefr: "C2", label: "Proficient" },
                  { score: 5, cefr: "C1", label: "Advanced" },
                  { score: 4, cefr: "B2", label: "Upper-Int" },
                  { score: 3, cefr: "B1", label: "Intermediate" },
                  { score: 2, cefr: "A2", label: "Elementary" },
                  { score: 1, cefr: "A1", label: "Beginner" }
                ].map((item) => (
                  <div key={item.score} className="text-center px-3 py-2 rounded-lg bg-white border border-blue-200">
                    <p className="text-lg font-bold text-gray-900">{item.score}</p>
                    <p className="text-xs text-blue-600 font-medium">{item.cefr}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Speaking Rubric */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-100">
              <Mic className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Speaking Scoring Criteria</h2>
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left p-4 text-gray-600 font-medium text-sm">Score</th>
                  <th className="text-left p-4 text-gray-600 font-medium text-sm">Delivery</th>
                  <th className="text-left p-4 text-gray-600 font-medium text-sm">Language Use</th>
                  <th className="text-left p-4 text-gray-600 font-medium text-sm">Topic Development</th>
                </tr>
              </thead>
              <tbody>
                {speakingRubrics.map((rubric, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4">
                      <span className={`inline-block px-2 py-1 rounded text-sm font-semibold ${getScoreColor(index)}`}>
                        {rubric.score}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{rubric.delivery}</td>
                    <td className="p-4 text-sm text-gray-600">{rubric.language}</td>
                    <td className="p-4 text-sm text-gray-600">{rubric.topic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Writing Rubric */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-100">
              <PenTool className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Writing Scoring Criteria</h2>
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left p-4 text-gray-600 font-medium text-sm">Score</th>
                  <th className="text-left p-4 text-gray-600 font-medium text-sm">Task Response</th>
                  <th className="text-left p-4 text-gray-600 font-medium text-sm">Organization</th>
                  <th className="text-left p-4 text-gray-600 font-medium text-sm">Language</th>
                </tr>
              </thead>
              <tbody>
                {writingRubrics.map((rubric, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4">
                      <span className={`inline-block px-2 py-1 rounded text-sm font-semibold ${getScoreColor(index)}`}>
                        {rubric.score}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{rubric.description}</td>
                    <td className="p-4 text-sm text-gray-600">{rubric.organization}</td>
                    <td className="p-4 text-sm text-gray-600">{rubric.language}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Key Tips */}
        <section className="grid md:grid-cols-2 gap-4">
          <div className="p-5 rounded-lg bg-green-50 border border-green-200">
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-green-800">How to Score Higher</h3>
            </div>
            <ul className="text-sm text-green-700 space-y-2">
              <li>• <span className="font-medium">Be specific</span> - Use concrete examples, not vague statements</li>
              <li>• <span className="font-medium">Stay organized</span> - Use clear transitions between ideas</li>
              <li>• <span className="font-medium">Address all parts</span> - Don&apos;t miss any required elements</li>
              <li>• <span className="font-medium">Use varied vocabulary</span> - Avoid repeating the same words</li>
              <li>• <span className="font-medium">Manage time</span> - Leave time to review your response</li>
            </ul>
          </div>

          <div className="p-5 rounded-lg bg-red-50 border border-red-200">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <h3 className="font-semibold text-red-800">Common Mistakes to Avoid</h3>
            </div>
            <ul className="text-sm text-red-700 space-y-2">
              <li>• <span className="font-medium">Going off-topic</span> - Always address the question asked</li>
              <li>• <span className="font-medium">Being too brief</span> - Develop your ideas fully</li>
              <li>• <span className="font-medium">Memorized responses</span> - Raters can identify these</li>
              <li>• <span className="font-medium">Grammar over content</span> - Ideas matter more than perfection</li>
              <li>• <span className="font-medium">Rushing</span> - Take time to think before responding</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
