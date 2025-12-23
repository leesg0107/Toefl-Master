"use client";

import Link from "next/link";
import {
  FileText,
  Mic,
  PenTool,
  TrendingUp,
  Target,
  BookOpen,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Clock
} from "lucide-react";

const sections = [
  {
    href: "/study-notes/speaking-feedback",
    title: "Speaking Feedback",
    icon: Mic,
    color: "from-blue-500 to-cyan-500",
    description: "Review your speaking practice and get improvement tips",
  },
  {
    href: "/study-notes/writing-feedback",
    title: "Writing Feedback",
    icon: PenTool,
    color: "from-purple-500 to-pink-500",
    description: "Analyze your writing responses and grammar",
  },
  {
    href: "/study-notes/templates",
    title: "High-Score Templates",
    icon: Target,
    color: "from-green-500 to-emerald-500",
    description: "Learn proven templates for speaking and writing",
  },
  {
    href: "/study-notes/rubrics",
    title: "Scoring Rubrics",
    icon: BookOpen,
    color: "from-orange-500 to-yellow-500",
    description: "Understand how TOEFL responses are scored",
  },
];

const recentActivity = [
  {
    type: "speaking",
    title: "Listen & Repeat - Art Gallery",
    score: "6/7 correct",
    time: "2 hours ago",
    status: "good",
  },
  {
    type: "writing",
    title: "Email Writing - Professor Meeting",
    score: "4.5/6.0",
    time: "Yesterday",
    status: "warning",
  },
  {
    type: "voca",
    title: "Academic Vocabulary Quiz",
    score: "18/20 correct",
    time: "2 days ago",
    status: "good",
  },
];

export default function StudyNotesPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-500 mb-6">
            <FileText className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Study Notes</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Track your progress, review feedback, and access high-score templates
            to improve your TOEFL performance.
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-[#1e293b] border border-[#334155] text-center">
            <p className="text-2xl font-bold text-blue-400">0</p>
            <p className="text-xs text-gray-400">Speaking Sessions</p>
          </div>
          <div className="p-4 rounded-xl bg-[#1e293b] border border-[#334155] text-center">
            <p className="text-2xl font-bold text-purple-400">0</p>
            <p className="text-xs text-gray-400">Writing Sessions</p>
          </div>
          <div className="p-4 rounded-xl bg-[#1e293b] border border-[#334155] text-center">
            <p className="text-2xl font-bold text-green-400">0</p>
            <p className="text-xs text-gray-400">Words Learned</p>
          </div>
          <div className="p-4 rounded-xl bg-[#1e293b] border border-[#334155] text-center">
            <p className="text-2xl font-bold text-orange-400">--</p>
            <p className="text-xs text-gray-400">Avg. Score</p>
          </div>
        </div>

        {/* Sections */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.href}
                href={section.href}
                className="group p-6 rounded-2xl bg-[#1e293b] border border-[#334155] hover:border-orange-500/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${section.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">{section.title}</h3>
                    <p className="text-sm text-gray-400">{section.description}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="p-6 rounded-xl bg-[#1e293b]/50 border border-[#334155] mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-400" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-lg bg-[#0f172a] border border-[#334155]"
              >
                {activity.status === "good" ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-yellow-400" />
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.score}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-4">
            Start practicing to see your activity here
          </p>
        </div>

        {/* Quick Tips */}
        <div className="p-6 rounded-xl bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/30">
          <h3 className="text-lg font-semibold text-orange-400 mb-3">
            Improvement Strategy
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div>
              <p className="font-medium text-white mb-2">Focus Areas:</p>
              <ul className="space-y-1">
                <li>• Identify patterns in your mistakes</li>
                <li>• Practice weak areas more frequently</li>
                <li>• Use templates for structured responses</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-2">Study Schedule:</p>
              <ul className="space-y-1">
                <li>• Practice speaking daily (15 min)</li>
                <li>• Write 1 email + 1 discussion daily</li>
                <li>• Learn 10 new words per day</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
