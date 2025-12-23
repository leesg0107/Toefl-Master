"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Clock, Check, ArrowRight, RotateCcw, User, AlertCircle } from "lucide-react";
import { discussionTopics } from "@/data/writing/discussionTopics";
import { useTimer } from "@/hooks/useSpeech";
import { AICoach } from "@/components/AICoach";

export default function DiscussionPage() {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [response, setResponse] = useState("");
  const [phase, setPhase] = useState<"select" | "writing" | "review">("select");
  const [wordCount, setWordCount] = useState(0);

  const timer = useTimer(600); // 10 minutes = 600 seconds

  const selectedTopic = discussionTopics.find(t => t.id === selectedTopicId);

  useEffect(() => {
    const words = response.trim().split(/\s+/).filter(w => w.length > 0);
    setWordCount(words.length);
  }, [response]);

  const startWriting = (topicId: string) => {
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

  const getWordCountStatus = () => {
    if (wordCount < 100) return { color: "text-red-400", message: "Too short (aim for 100-130 words)" };
    if (wordCount <= 130) return { color: "text-green-400", message: "Good length!" };
    if (wordCount <= 150) return { color: "text-yellow-400", message: "Slightly long" };
    return { color: "text-red-400", message: "Too long (aim for 100-130 words)" };
  };

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
            <h1 className="text-3xl font-bold text-white mb-2">Academic Discussion</h1>
            <p className="text-gray-400">
              Join an online class discussion. Read the professor&apos;s question and student responses,
              then share your opinion.
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mb-8">
            <h3 className="text-green-400 font-semibold mb-2">How it works</h3>
            <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
              <li>Select a discussion topic below</li>
              <li>Read the professor&apos;s question and student posts</li>
              <li>Write your response (100-130 words)</li>
              <li>Reference classmates&apos; ideas when relevant</li>
              <li>Complete within 10 minutes</li>
            </ol>
          </div>

          {/* Topic List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Choose a Topic</h2>
            <div className="grid gap-4">
              {discussionTopics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => startWriting(topic.id)}
                  className="group text-left p-6 rounded-xl bg-[#1e293b] border border-[#334155] hover:border-green-500/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                      <MessageCircle className="w-6 h-6 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-white">{topic.title}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[#334155] text-gray-400">
                          {topic.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {topic.professorQuestion}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-green-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedTopic) return null;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={selectNewTopic}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Choose Another
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">{selectedTopic.title}</h1>
              <span className="text-sm text-gray-400">{selectedTopic.category}</span>
            </div>
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

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Discussion Thread */}
          <div className="space-y-4">
            {/* Professor Question */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-500/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-green-400">Professor</p>
                  <p className="text-xs text-gray-500">Discussion Prompt</p>
                </div>
              </div>
              <p className="text-gray-200">{selectedTopic.professorQuestion}</p>
            </div>

            {/* Student A */}
            <div className="p-5 rounded-xl bg-[#1e293b] border border-[#334155]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <span className="text-blue-400 font-medium">{selectedTopic.studentA.name[0]}</span>
                </div>
                <div>
                  <p className="font-medium text-white">{selectedTopic.studentA.name}</p>
                  <p className="text-xs text-gray-500">Student</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">{selectedTopic.studentA.response}</p>
            </div>

            {/* Student B */}
            <div className="p-5 rounded-xl bg-[#1e293b] border border-[#334155]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <span className="text-purple-400 font-medium">{selectedTopic.studentB.name[0]}</span>
                </div>
                <div>
                  <p className="font-medium text-white">{selectedTopic.studentB.name}</p>
                  <p className="text-xs text-gray-500">Student</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">{selectedTopic.studentB.response}</p>
            </div>
          </div>

          {/* Response Editor */}
          <div>
            <div className="p-6 rounded-xl bg-[#1e293b] border border-[#334155] sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">Your Response</h3>
                <div className={`text-sm ${getWordCountStatus().color}`}>
                  {wordCount} words
                </div>
              </div>

              {phase === "writing" ? (
                <>
                  <textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder={`I agree with ${selectedTopic.studentA.name} because...

or

I have a different perspective on this topic...`}
                    className="w-full h-64 bg-[#0f172a] border border-[#334155] rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 resize-none"
                  />

                  <p className={`text-xs mt-2 ${getWordCountStatus().color}`}>
                    {getWordCountStatus().message}
                  </p>

                  <div className="flex justify-end mt-4">
                    <button
                      onClick={finishWriting}
                      className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      Submit Response
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-[#0f172a] rounded-lg p-4 mb-6 whitespace-pre-wrap text-gray-300 min-h-32">
                    {response || "(No response)"}
                  </div>

                  {/* Feedback */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg bg-[#0f172a]">
                        <p className="text-sm text-gray-400">Word Count</p>
                        <p className={`text-xl font-bold ${getWordCountStatus().color}`}>
                          {wordCount}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-[#0f172a]">
                        <p className="text-sm text-gray-400">Time Used</p>
                        <p className="text-xl font-bold text-white">
                          {Math.floor((600 - timer.seconds) / 60)}:{((600 - timer.seconds) % 60).toString().padStart(2, "0")}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                      <h5 className="text-blue-400 font-medium mb-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Self-Check
                      </h5>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>Did you state your position clearly?</li>
                        <li>Did you reference a classmate&apos;s idea?</li>
                        <li>Did you provide specific reasons or examples?</li>
                        <li>Is your response well-organized?</li>
                      </ul>
                    </div>

                    {/* AI Coach Feedback */}
                    <AICoach
                      type="discussion-review"
                      content={response}
                      context={`Topic: ${selectedTopic.title}\nProfessor's question: ${selectedTopic.professorQuestion}\n${selectedTopic.studentA.name}'s view: ${selectedTopic.studentA.response}\n${selectedTopic.studentB.name}'s view: ${selectedTopic.studentB.response}`}
                    />
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => {
                        setPhase("writing");
                        timer.reset(600);
                        timer.start();
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-[#334155] hover:bg-[#475569] rounded-lg transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Try Again
                    </button>
                    <button
                      onClick={selectNewTopic}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
                    >
                      Next Topic
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
