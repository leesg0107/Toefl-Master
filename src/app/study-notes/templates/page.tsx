"use client";

import Link from "next/link";
import { ArrowLeft, Mic, PenTool, Copy, Check, Crown, Lock } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface Template {
  title: string;
  description: string;
  template: string;
  example: string;
  premium?: boolean;
}

const speakingTemplates: Template[] = [
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
  },
  {
    title: "Advanced: STAR Method Response",
    description: "Situation-Task-Action-Result framework for high scores",
    premium: true,
    template: `[SITUATION] When I was [context/time], I faced [describe the situation].

[TASK] My goal was to [explain what needed to be done].

[ACTION] To address this, I [describe specific actions you took]. First, I [step 1]. Then, I [step 2].

[RESULT] As a result, [describe the positive outcome]. This experience taught me [lesson learned].`,
    example: `When I was in my second year of university, I faced a challenging group project where team members weren't communicating effectively.

My goal was to complete the project on time while ensuring everyone contributed equally.

To address this, I organized weekly meetings and created a shared document for tracking progress. First, I spoke individually with each team member. Then, I assigned roles based on everyone's strengths.

As a result, we submitted the project two days early and received the highest grade in our class. This experience taught me the importance of proactive communication.`
  },
  {
    title: "Advanced: Problem-Solution Framework",
    description: "Structure for discussing challenges and solutions",
    premium: true,
    template: `One significant [problem/challenge] that I see is [describe the issue clearly].

This is problematic because [explain why this matters - give impact/consequences].

However, I believe a effective solution would be to [propose solution]. This would work because [explain reasoning].

For example, [provide specific evidence or example of success].

In conclusion, addressing [the problem] through [the solution] could lead to [positive outcome].`,
    example: `One significant challenge that I see is the rising cost of higher education.

This is problematic because many talented students cannot afford university, which limits social mobility and wastes human potential.

However, I believe an effective solution would be to expand income-based tuition programs. This would work because students pay according to their ability, making education accessible while maintaining university funding.

For example, Australia's HECS system has successfully increased university enrollment among lower-income families.

In conclusion, addressing education costs through income-based programs could lead to a more educated and equitable society.`
  }
];

const writingTemplates: Template[] = [
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
  },
  {
    title: "Advanced: Integrated Response Framework",
    description: "Perfect score template for discussion posts",
    premium: true,
    template: `Building on [classmate 1]'s point about [their idea] and [classmate 2]'s observation regarding [their idea], I would like to offer a synthesis of these perspectives.

I strongly believe that [your clear position].

[Supporting point 1 with specific evidence]. For instance, [concrete example from experience or knowledge].

Moreover, [supporting point 2 that addresses both classmates' ideas]. Research has shown that [add credibility with reference to studies/facts].

While some might argue [potential counterargument], I maintain that [refutation].

Ultimately, [strong concluding statement that ties everything together].`,
    example: `Building on Sarah's point about online learning flexibility and Tom's observation regarding the importance of peer interaction, I would like to offer a synthesis of these perspectives.

I strongly believe that a hybrid learning model combining both approaches offers the best educational outcomes.

Online components allow students to learn at their own pace and review materials multiple times. For instance, during my experience with online courses, I improved my understanding by rewatching difficult lectures.

Moreover, in-person sessions ensure meaningful collaboration and networking. Research has shown that students in hybrid programs demonstrate 15% higher retention rates than those in purely online courses.

While some might argue that full online education is more cost-effective, I maintain that the social and academic benefits of some face-to-face interaction justify the additional investment.

Ultimately, education should leverage technology while preserving the irreplaceable value of human connection.`
  },
  {
    title: "Advanced: Email with Multiple Requests",
    description: "Handle complex email scenarios with multiple points",
    premium: true,
    template: `Dear [Recipient],

I hope this email finds you well. I am writing regarding [main topic/situation] and would like to address several points.

First, concerning [point 1]: [explanation and request].

Second, regarding [point 2]: [explanation and request].

Finally, I wanted to inquire about [point 3/question].

I understand you have a busy schedule, so please respond at your convenience. If it would be easier, I am also available [suggest alternative communication method].

Thank you for your time and assistance. I truly appreciate your support.

Best regards,
[Your Name]`,
    example: `Dear Dr. Peterson,

I hope this email finds you well. I am writing regarding my upcoming graduate school applications and would like to address several points.

First, concerning the letter of recommendation: I would be honored if you could write a letter supporting my application to the Master's program at Stanford. The deadline is December 15th.

Second, regarding my research proposal: I have drafted an initial version and would greatly appreciate your feedback before submission. I have attached it to this email.

Finally, I wanted to inquire about potential research assistant positions in your lab next semester.

I understand you have a busy schedule, so please respond at your convenience. If it would be easier, I am also available to discuss these matters during your office hours.

Thank you for your time and assistance. I truly appreciate your support.

Best regards,
Emily Chen`
  }
];

function TemplateCard({ template, isPremium }: { template: Template; isPremium: boolean }) {
  const [copied, setCopied] = useState(false);
  const [showExample, setShowExample] = useState(false);
  const isLocked = template.premium && !isPremium;

  const copyTemplate = () => {
    if (isLocked) return;
    navigator.clipboard.writeText(template.template);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`p-5 rounded-lg border ${isLocked ? "border-amber-200 bg-amber-50/50" : "border-gray-200 bg-white"}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900">{template.title}</h3>
            {template.premium && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-700">
                <Crown className="w-3 h-3" />
                Premium
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">{template.description}</p>
        </div>
        <button
          onClick={copyTemplate}
          disabled={isLocked}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
            isLocked
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 hover:bg-gray-200 text-gray-600"
          }`}
        >
          {isLocked ? (
            <>
              <Lock className="w-4 h-4" />
              Locked
            </>
          ) : copied ? (
            <>
              <Check className="w-4 h-4 text-green-600" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy
            </>
          )}
        </button>
      </div>

      {isLocked ? (
        <div className="p-4 rounded-lg bg-amber-100/50 border border-amber-200 text-center">
          <Lock className="w-6 h-6 text-amber-600 mx-auto mb-2" />
          <p className="text-sm text-amber-700 mb-2">Upgrade to Premium to unlock advanced templates</p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1 text-sm font-medium text-amber-700 hover:text-amber-800"
          >
            View Plans →
          </Link>
        </div>
      ) : (
        <>
          <div className="p-4 rounded-lg bg-gray-50 border border-gray-100 mb-3">
            <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">{template.template}</pre>
          </div>

          <button
            onClick={() => setShowExample(!showExample)}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            {showExample ? "Hide example ↑" : "Show example ↓"}
          </button>

          {showExample && (
            <div className="mt-3 p-4 rounded-lg bg-blue-50 border border-blue-100">
              <p className="text-xs font-medium text-blue-600 mb-2">Example Response:</p>
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">{template.example}</pre>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function TemplatesPage() {
  const { isPremium } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/study-notes"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-600 text-sm mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Study Notes
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">High-Score Templates</h1>
          <p className="text-gray-500 text-sm">
            Use these proven templates to structure your speaking and writing responses.
          </p>
        </div>

        {/* Premium Banner */}
        {!isPremium && (
          <div className="mb-8 p-4 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-100">
                <Crown className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Unlock Advanced Templates</p>
                <p className="text-sm text-gray-600">Premium members get access to 5+ advanced high-score templates</p>
              </div>
              <Link
                href="/pricing"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Upgrade
              </Link>
            </div>
          </div>
        )}

        {/* Speaking Templates */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-100">
              <Mic className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Speaking Templates</h2>
          </div>
          <div className="space-y-4">
            {speakingTemplates.map((template, index) => (
              <TemplateCard key={index} template={template} isPremium={isPremium} />
            ))}
          </div>
        </section>

        {/* Writing Templates */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-100">
              <PenTool className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Writing Templates</h2>
          </div>
          <div className="space-y-4">
            {writingTemplates.map((template, index) => (
              <TemplateCard key={index} template={template} isPremium={isPremium} />
            ))}
          </div>
        </section>

        {/* Tips */}
        <div className="p-5 rounded-lg bg-green-50 border border-green-200">
          <h3 className="font-semibold text-green-800 mb-3">Template Tips</h3>
          <ul className="text-sm text-green-700 space-y-2">
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
