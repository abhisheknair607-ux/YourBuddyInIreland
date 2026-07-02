"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  CircleDollarSign,
  FileText,
  GraduationCap,
  MessageSquareText,
  Plane,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import Link from "next/link";

import { AnimatedGradientBackground } from "@/components/AnimatedGradientBackground";
import { FloatingStudyIcons } from "@/components/FloatingStudyIcons";
import { PageTransition } from "@/components/PageTransition";
import { V2SiteFooter } from "@/components/v2/V2SiteFooter";
import { V2SiteHeader } from "@/components/v2/V2SiteHeader";

const demoSteps = [
  {
    title: "AI chat",
    body: "Start with one real question and turn the Ireland student journey into clear next actions.",
    icon: MessageSquareText
  },
  {
    title: "Live resources",
    body: "Jump from guidance into official links without losing the planning thread.",
    icon: ShieldCheck
  },
  {
    title: "Forex planning",
    body: "Keep EUR / INR awareness visible while budgeting tuition and living costs.",
    icon: CircleDollarSign
  },
  {
    title: "Mentor help",
    body: "Move from self-serve planning into student-to-student support when needed.",
    icon: GraduationCap
  },
  {
    title: "Document builder",
    body: "Use a guided prototype to show how SOP and document workflows could fit the product.",
    icon: FileText
  }
] as const;

const scenarios = [
  {
    title: "Still applying",
    summary: "Shortlist courses, shape an SOP, and identify which university choices fit budget and goals.",
    points: [
      "Open V2 chat and compare programmes by city, tuition, and course fit.",
      "Use the Document Builder prototype to structure a first SOP draft.",
      "Move into the Resource Hub for official university and visa references."
    ]
  },
  {
    title: "Arriving soon",
    summary: "Plan accommodation, funding, and arrival logistics without bouncing between too many tools.",
    points: [
      "Keep forex rates and alerts visible in the V2 forex view.",
      "Ask the live assistant about what to prioritise first before flying.",
      "Use mentor and support pathways when the decision matters."
    ]
  },
  {
    title: "Just landed",
    summary: "Handle the first urgent admin steps calmly and get help where ambiguity becomes risky.",
    points: [
      "Use the live assistant for visa, PPS, and next-step planning questions.",
      "Open the Resource Hub for official references and links.",
      "Use Mentor Connect or the current support flow when a human view helps."
    ]
  }
] as const;

export function V2DemoPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeScenario, setActiveScenario] = useState(0);

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden">
      <AnimatedGradientBackground />
      <FloatingStudyIcons />

      <PageTransition className="relative z-10 flex min-h-[100dvh] flex-col">
        <V2SiteHeader currentHref="/" ctaHref="/v2/register" ctaLabel="Try V2" />

        <main className="page-shell flex-1 pb-12">
          <section className="pb-12 pt-4 tablet:pb-16 tablet:pt-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-700 backdrop-blur-xl">
                <Sparkles className="h-3.5 w-3.5" />
                Demo walkthrough
              </div>
              <h1 className="mt-6 text-[3rem] font-semibold leading-[0.96] tracking-[-0.035em] text-slate-950 tablet:text-[4.2rem]">
                See how the expanded product story fits together.
              </h1>
              <p className="mt-5 max-w-2xl text-[1.05rem] leading-8 text-slate-600 tablet:text-[1.16rem]">
                This page turns the new V2 surface into a clean walkthrough so
                students can understand the product before committing to one
                route or one tool.
              </p>
            </div>
          </section>

          <section className="pb-12 tablet:pb-16">
            <div className="grid gap-6 laptop:grid-cols-[280px_minmax(0,1fr)]">
              <div className="space-y-3">
                {demoSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index === activeStep;

                  return (
                    <button
                      key={step.title}
                      type="button"
                      onClick={() => setActiveStep(index)}
                      className={`w-full rounded-[1.5rem] border p-4 text-left transition ${
                        isActive
                          ? "border-sky-200 bg-white shadow-[0_18px_44px_rgba(15,23,42,0.08)]"
                          : "border-white/75 bg-white/72 shadow-[0_10px_28px_rgba(15,23,42,0.04)]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-[1rem] bg-sky-50 text-sky-700">
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-950">{step.title}</p>
                          <p className="mt-1 text-xs text-slate-500">Step 0{index + 1}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="rounded-[2rem] border border-white/75 bg-white/80 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl tablet:p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700">
                    Step 0{activeStep + 1}
                  </p>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
                    V2 walkthrough
                  </span>
                </div>
                <h2 className="mt-4 text-[2rem] font-semibold leading-tight text-slate-950">
                  {demoSteps[activeStep].title}
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                  {demoSteps[activeStep].body}
                </p>

                <div className="mt-6 grid gap-4 tablet:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-950 p-5 text-white">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-200">
                      Student view
                    </p>
                    <p className="mt-3 text-base font-semibold">
                      One calm path instead of five disconnected tools.
                    </p>
                    <p className="mt-3 text-sm leading-6 text-white/75">
                      Every section is meant to feel like the next step of the
                      same journey rather than a new product.
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-slate-200/80 bg-white p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700">
                      Product view
                    </p>
                    <p className="mt-3 text-base font-semibold text-slate-950">
                      Keep what is already real. Add what is newly designed.
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      V2 combines live functionality with higher-fidelity
                      presentational pages for the new surface area.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/v2/chat"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-[1rem] bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
                  >
                    Open V2 chat
                  </Link>
                  <Link
                    href="/v2/register"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-[1rem] border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400"
                  >
                    Join V2
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="pb-10">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-700">
                Student journeys
              </p>
              <h2 className="mt-3 text-[2rem] font-semibold leading-tight text-slate-950 tablet:text-[3rem]">
                Different phases, same product language
              </h2>
            </div>

            <div className="mt-8 grid gap-4 tablet:grid-cols-3">
              {scenarios.map((scenario, index) => (
                <button
                  key={scenario.title}
                  type="button"
                  onClick={() => setActiveScenario(index)}
                  className={`rounded-[1.75rem] border p-5 text-left transition ${
                    index === activeScenario
                      ? "border-sky-200 bg-white shadow-[0_18px_44px_rgba(15,23,42,0.08)]"
                      : "border-white/75 bg-white/76 shadow-[0_10px_28px_rgba(15,23,42,0.05)]"
                  }`}
                >
                  <p className="text-lg font-semibold text-slate-950">{scenario.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {scenario.summary}
                  </p>
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-[2rem] border border-white/75 bg-white/82 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-[1rem] bg-sky-50 text-sky-700">
                  <Plane className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-950">
                    {scenarios[activeScenario].title}
                  </p>
                  <p className="text-sm text-slate-500">
                    A practical V2 path for this phase
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                {scenarios[activeScenario].points.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 rounded-[1.25rem] border border-slate-200/80 bg-white p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-sky-700" />
                    <p className="text-sm leading-6 text-slate-600">{point}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/v2/resources"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-300"
                >
                  Resources
                </Link>
                <Link
                  href="/v2/forex"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-300"
                >
                  Forex
                </Link>
                <Link
                  href="/v2/mentors"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-300"
                >
                  Mentors
                </Link>
              </div>
            </div>
          </section>
        </main>

        <V2SiteFooter currentHref="/" />
      </PageTransition>
    </div>
  );
}
