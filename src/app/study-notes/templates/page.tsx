"use client";

import Link from "next/link";
import { ArrowLeft, Mic, PenTool, Copy, Check } from "lucide-react";
import { useState } from "react";

const speakingTemplates = [
  {
    title: "Interview - Opinion Question",
    description: "Use this template when asked for your opinion on a topic",
    template: `In my opinion, [state your position clearly].

I believe this because [reason 1 with specific example].

Additionally, [reason 2 with another example].

Therefore, I think [restate your position].`,
    example: `In my opinion, studying abroad is beneficial for students.

I believe this because it exposes students to different cultures and perspectives. For example, when I visited Japan, I learned so much about their work ethic.

Additionally, it helps develop independence and problem-solving skills.

Therefore, I think every student should consider studying abroad if they have the opportunity.`
  },
  {
    title: "Interview - Personal Experience",
    description: "Use when asked about your habits or experiences",
    template: `I usually [describe your habit/experience].

This is because [explain the reason].

For instance, [give a specific example].

Overall, I find that [summarize the benefit/outcome].`,
    example: `I usually study in the library rather than at home.

This is because the quiet environment helps me focus better on my work.

For instance, last semester I was able to complete my thesis ahead of schedule by studying in the library every evening.

Overall, I find that this habit has significantly improved my productivity.`
  },
  {
    title: "Interview - Comparison",
    description: "Use when comparing two options",
    template: `I prefer [option A] over [option B] for several reasons.

First, [advantage 1 of option A].

Second, [advantage 2 of option A].

While [option B] has its merits, such as [brief acknowledgment], I still believe [option A] is the better choice for me.`,
    example: `I prefer online shopping over traditional shopping for several reasons.

First, it saves a lot of time since I don't have to travel to stores.

Second, I can easily compare prices across different websites.

While traditional shopping has its merits, such as trying products before buying, I still believe online shopping is the better choice for me.`
  }
];

const writingTemplates = [
  {
    title: "Email - Formal Request",
    description: "Use for requesting something from a professor or official",
    template: `Dear [Recipient],

I am writing to [state the purpose of your email clearly].

[Explain the reason/situation in 1-2 sentences]. [Provide specific details].

I would greatly appreciate it if [state your specific request]. [Offer any relevant information].

Thank you for considering my request. I look forward to your response.

Sincerely,
[Your Name]`,
    example: `Dear Professor Williams,

I am writing to request an extension for the research paper due this Friday.

Unfortunately, I have been unwell with a severe flu this past week. Despite my best efforts, I have not been able to complete the paper on time.

I would greatly appreciate it if I could have five additional days to submit my work. I have already completed the research and outline.

Thank you for considering my request. I look forward to your response.

Sincerely,
John Smith`
  },
  {
    title: "Academic Discussion - Agreement",
    description: "Use when agreeing with a classmate's point",
    template: `I agree with [classmate's name] that [restate their main point].

[Add your own supporting reason or example].

Furthermore, [additional point that strengthens the argument].

In my view, [conclude with your position].`,
    example: `I agree with Maria that companies should prioritize environmental sustainability.

In today's world, businesses have a responsibility to consider their environmental impact. My hometown has seen significant improvement in air quality since local factories adopted green practices.

Furthermore, sustainable businesses often see long-term cost savings through energy efficiency.

In my view, environmental responsibility is not just ethical but also makes good business sense.`
  },
  {
    title: "Academic Discussion - Disagreement",
    description: "Use when presenting a different perspective",
    template: `While [classmate's name] makes a valid point about [acknowledge their view], I have a different perspective.

I believe that [state your position].

[Provide your main reason with evidence/example].

Therefore, [conclude with your stance].`,
    example: `While James makes a valid point about taxing unhealthy products, I have a different perspective.

I believe that such taxes unfairly burden low-income families who rely on affordable food options.

Instead of taxation, the government should invest in making healthy food more accessible. In my country, subsidizing fresh produce has been more effective than adding taxes.

Therefore, I think education and accessibility are better solutions than taxation.`
  }
];

function TemplateCard({ template, type }: { template: typeof speakingTemplates[0], type: "speaking" | "writing" }) {
  const [copied, setCopied] = useState(false);
  const [showExample, setShowExample] = useState(false);

  const copyTemplate = () => {
    navigator.clipboard.writeText(template.template);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 rounded-xl bg-[#1e293b] border border-[#334155]">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{template.title}</h3>
          <p className="text-sm text-gray-400">{template.description}</p>
        </div>
        <button
          onClick={copyTemplate}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#334155] hover:bg-[#475569] rounded-lg text-sm transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <div className="p-4 rounded-lg bg-[#0f172a] mb-4">
        <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans">{template.template}</pre>
      </div>

      <button
        onClick={() => setShowExample(!showExample)}
        className="text-sm text-blue-400 hover:underline"
      >
        {showExample ? "Hide example" : "Show example"}
      </button>

      {showExample && (
        <div className="mt-4 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
          <p className="text-xs text-blue-400 mb-2">Example:</p>
          <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans">{template.example}</pre>
        </div>
      )}
    </div>
  );
}

export default function TemplatesPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/study-notes"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Study Notes
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">High-Score Templates</h1>
          <p className="text-gray-400">
            Use these proven templates to structure your speaking and writing responses.
          </p>
        </div>

        {/* Speaking Templates */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Mic className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">Speaking Templates</h2>
          </div>
          <div className="space-y-4">
            {speakingTemplates.map((template, index) => (
              <TemplateCard key={index} template={template} type="speaking" />
            ))}
          </div>
        </section>

        {/* Writing Templates */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <PenTool className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">Writing Templates</h2>
          </div>
          <div className="space-y-4">
            {writingTemplates.map((template, index) => (
              <TemplateCard key={index} template={template} type="writing" />
            ))}
          </div>
        </section>

        {/* Tips */}
        <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30">
          <h3 className="text-lg font-semibold text-green-400 mb-3">Template Tips</h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>• Adapt templates to fit the specific question - don&apos;t use them word for word</li>
            <li>• Add personal examples and specific details to make your response unique</li>
            <li>• Practice until templates feel natural, not memorized</li>
            <li>• Focus on clear organization and logical flow</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
