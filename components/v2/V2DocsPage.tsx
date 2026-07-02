"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  FileText,
  Loader2,
  Sparkles
} from "lucide-react";
import Link from "next/link";

import { AnimatedGradientBackground } from "@/components/AnimatedGradientBackground";
import { FloatingStudyIcons } from "@/components/FloatingStudyIcons";
import { PageTransition } from "@/components/PageTransition";
import { V2SiteFooter } from "@/components/v2/V2SiteFooter";
import { V2SiteHeader } from "@/components/v2/V2SiteHeader";

const steps = ["Background", "Motivation", "Goals", "Why Ireland", "Review"] as const;

type DraftFieldKey = "background" | "motivation" | "goals" | "whyIreland";

type ReviewResult = {
  score: number;
  overview: string;
  strengths: string[];
  improvements: string[];
  reviewNotes: string[];
  sectionFeedback: Record<DraftFieldKey, string>;
  readyForExport: boolean;
};

const draftFields: Array<{
  key: DraftFieldKey;
  label: string;
  placeholder: string;
  hint: string;
}> = [
  {
    key: "background",
    label: "Background",
    placeholder:
      "Describe your academic background, relevant coursework, projects, or work experience.",
    hint:
      "One concrete project, module, or internship detail makes this section much stronger."
  },
  {
    key: "motivation",
    label: "Motivation",
    placeholder:
      "Explain what pushed you toward this field and why you want to study it further.",
    hint:
      "Show the trigger. A real experience is stronger than generic enthusiasm."
  },
  {
    key: "goals",
    label: "Goals",
    placeholder:
      "State your short-term and long-term goals after the programme.",
    hint:
      "Link the degree to a believable next role, not just a broad dream outcome."
  },
  {
    key: "whyIreland",
    label: "Why Ireland",
    placeholder:
      "Explain why Ireland and this study environment fit your goals.",
    hint:
      "Keep this Ireland-specific with programme fit, industry links, or post-study logic."
  }
];

const emptyReview: ReviewResult = {
  score: 0,
  overview:
    "Run a review to score the SOP, surface weak sections, and get export-ready notes.",
  strengths: [],
  improvements: [
    "Complete all four sections before you ask for a final review.",
    "Keep each section specific to your own projects, goals, and Ireland rationale."
  ],
  reviewNotes: [
    "The review endpoint uses the live document API.",
    "If Gemini is configured, the feedback becomes AI-generated. Otherwise a structured fallback review is returned."
  ],
  sectionFeedback: {
    background: "Add your background section to begin the draft.",
    motivation: "Add your motivation section to explain the shift toward this course.",
    goals: "Add your goals section to connect the programme with your future path.",
    whyIreland: "Add your Ireland section so the SOP feels destination-specific."
  },
  readyForExport: false
};

function buildDraftText(sections: Record<DraftFieldKey, string>) {
  return [
    "# Statement of Purpose Draft",
    "",
    "## Background",
    sections.background || "[Add your background here]",
    "",
    "## Motivation",
    sections.motivation || "[Add your motivation here]",
    "",
    "## Goals",
    sections.goals || "[Add your goals here]",
    "",
    "## Why Ireland",
    sections.whyIreland || "[Add your Ireland rationale here]"
  ].join("\n");
}

export function V2DocsPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [background, setBackground] = useState(
    "I completed my undergraduate degree in computer science and developed a strong interest in data-informed decision making through coursework and project work."
  );
  const [motivation, setMotivation] = useState(
    "An internship showed me how analytics can improve real operational decisions, and it pushed me toward a more applied postgraduate path."
  );
  const [goals, setGoals] = useState(
    "My near-term goal is to join a data or analytics role where I can build practical experience before moving into longer-term product or strategy leadership."
  );
  const [whyIreland, setWhyIreland] = useState(
    "Ireland combines a strong university environment, an English-speaking context, and a practical post-study pathway that fits my goals."
  );
  const [review, setReview] = useState<ReviewResult>(emptyReview);
  const [reviewError, setReviewError] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);

  const draftSections = useMemo(
    () => ({
      background,
      motivation,
      goals,
      whyIreland
    }),
    [background, motivation, goals, whyIreland]
  );
  const combinedDraft = useMemo(
    () => buildDraftText(draftSections),
    [draftSections]
  );
  const currentField = activeStep < draftFields.length ? draftFields[activeStep] : null;
  const completionCount = Object.values(draftSections).filter((value) => value.trim()).length;

  const handleChange = (key: DraftFieldKey, value: string) => {
    if (key === "background") setBackground(value);
    if (key === "motivation") setMotivation(value);
    if (key === "goals") setGoals(value);
    if (key === "whyIreland") setWhyIreland(value);
  };

  const handleReview = async () => {
    setIsReviewing(true);
    setReviewError("");

    try {
      const response = await fetch("/api/documents/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(draftSections)
      });
      const data = (await response.json()) as ReviewResult & { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Review could not be generated right now.");
      }

      setReview(data);
      setActiveStep(steps.length - 1);
    } catch (error) {
      setReviewError(
        error instanceof Error
          ? error.message
          : "Review could not be generated right now."
      );
    } finally {
      setIsReviewing(false);
    }
  };

  const handleExport = () => {
    const blob = new Blob([combinedDraft], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "guidon-sop-draft.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden">
      <AnimatedGradientBackground />
      <FloatingStudyIcons />

      <PageTransition className="relative z-10 flex min-h-[100dvh] flex-col">
        <V2SiteHeader currentHref="/" ctaHref="/v2/profile" ctaLabel="Open Profile" />

        <main className="page-shell flex-1 pb-12">
          <section className="pb-12 pt-4 tablet:pb-16 tablet:pt-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-700 backdrop-blur-xl">
                <FileText className="h-3.5 w-3.5" />
                Document Builder
              </div>
              <h1 className="mt-6 text-[3rem] font-semibold leading-[0.96] tracking-[-0.035em] text-slate-950 tablet:text-[4.2rem]">
                Draft an SOP, run a live review, and export it from the same flow.
              </h1>
              <p className="mt-5 max-w-2xl text-[1.05rem] leading-8 text-slate-600 tablet:text-[1.16rem]">
                This route now uses the document review API. You can edit each
                SOP section, request structured feedback, and export the draft
                without leaving the V2 experience.
              </p>
            </div>
          </section>

          <section className="pb-10">
            <div className="grid gap-6 laptop:grid-cols-[240px_minmax(0,1fr)_340px]">
              <aside className="rounded-[1.85rem] border border-white/75 bg-white/82 p-4 shadow-[0_16px_44px_rgba(15,23,42,0.05)] backdrop-blur-xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700">
                  Workflow
                </p>
                <div className="mt-4 grid gap-2">
                  {steps.map((step, index) => (
                    <button
                      key={step}
                      type="button"
                      onClick={() => setActiveStep(index)}
                      className={`rounded-[1.1rem] border px-3.5 py-3 text-left text-sm font-medium transition ${
                        index === activeStep
                          ? "border-sky-200 bg-sky-50 text-sky-700"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {index + 1}. {step}
                    </button>
                  ))}
                </div>
              </aside>

              <div className="rounded-[1.95rem] border border-white/75 bg-white/84 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur-xl tablet:p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700">
                      Step {activeStep + 1}
                    </p>
                    <h2 className="mt-2 text-[1.9rem] font-semibold leading-tight text-slate-950">
                      {steps[activeStep]}
                    </h2>
                  </div>
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    API connected
                  </span>
                </div>

                {currentField ? (
                  <div className="mt-5 grid gap-4">
                    <label className="text-sm font-semibold text-slate-900">
                      Draft content
                      <textarea
                        value={draftSections[currentField.key]}
                        onChange={(event) =>
                          handleChange(currentField.key, event.target.value)
                        }
                        rows={8}
                        placeholder={currentField.placeholder}
                        className="mt-3 w-full rounded-[1.25rem] border border-slate-200 bg-white px-4 py-3 text-sm leading-7 text-slate-700 outline-none transition focus:border-sky-400"
                      />
                    </label>

                    <div className="rounded-[1.35rem] border border-sky-200 bg-sky-50 p-4">
                      <div className="flex items-center gap-2 text-sky-700">
                        <Sparkles className="h-4.5 w-4.5" />
                        <p className="text-sm font-semibold">Writing hint</p>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {currentField.hint}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-5 grid gap-4">
                    <div className="rounded-[1.35rem] border border-slate-200 bg-white p-4">
                      <p className="text-sm font-semibold text-slate-900">Compiled draft preview</p>
                      <pre className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-600">
                        {combinedDraft}
                      </pre>
                    </div>

                    <div className="rounded-[1.35rem] border border-sky-200 bg-sky-50 p-4">
                      <div className="flex items-center gap-2 text-sky-700">
                        <Sparkles className="h-4.5 w-4.5" />
                        <p className="text-sm font-semibold">Review summary</p>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {review.overview}
                      </p>
                    </div>
                  </div>
                )}

                {reviewError ? (
                  <div className="mt-4 rounded-[1.25rem] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {reviewError}
                  </div>
                ) : null}

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveStep((current) => Math.max(current - 1, 0))}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-300"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveStep((current) => Math.min(current + 1, steps.length - 1))
                    }
                    className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900"
                  >
                    Next step
                  </button>
                  <button
                    type="button"
                    onClick={handleReview}
                    disabled={isReviewing}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isReviewing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Reviewing...
                      </>
                    ) : (
                      "Run live review"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleExport}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-300"
                  >
                    <Download className="h-4 w-4" />
                    Export draft
                  </button>
                  <Link
                    href="/v2/profile"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-300"
                  >
                    Open profile
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <aside className="rounded-[1.85rem] border border-white/75 bg-white/82 p-5 shadow-[0_16px_44px_rgba(15,23,42,0.05)] backdrop-blur-xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700">
                  Strength score
                </p>
                <p className="mt-3 text-[2.6rem] font-semibold leading-none text-slate-950">
                  {review.score}
                  <span className="ml-1 text-base font-medium text-slate-400">/100</span>
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {review.readyForExport
                    ? "This draft is structurally ready to export and refine further."
                    : "Run a review after completing all sections to get a stronger export-ready draft."}
                </p>

                <div className="mt-5 rounded-[1.25rem] bg-slate-100 p-4">
                  <p className="text-sm font-semibold text-slate-950">
                    Completion
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {completionCount} of {draftFields.length} core sections have content.
                  </p>
                </div>

                <div className="mt-5 grid gap-3">
                  {review.reviewNotes.map((note) => (
                    <div
                      key={note}
                      className="flex items-start gap-3 rounded-[1.2rem] border border-slate-200/80 bg-white p-3.5"
                    >
                      <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-sky-700" />
                      <p className="text-sm leading-6 text-slate-600">{note}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5">
                  <p className="text-sm font-semibold text-slate-950">Strengths</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {review.strengths.length ? (
                      review.strengths.map((strength) => (
                        <span
                          key={strength}
                          className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700"
                        >
                          {strength}
                        </span>
                      ))
                    ) : (
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600">
                        Review not run yet
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-sm font-semibold text-slate-950">Section guidance</p>
                  <div className="mt-3 grid gap-3">
                    {draftFields.map((field) => (
                      <div
                        key={field.key}
                        className="rounded-[1.2rem] border border-slate-200/80 bg-white p-3.5"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                          {field.label}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {review.sectionFeedback[field.key]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={handleExport}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900"
                  >
                    <Download className="h-4 w-4" />
                    Export draft
                  </button>
                  <Link
                    href="/v2/chat"
                    className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-300"
                  >
                    Ask chat for help
                  </Link>
                </div>
              </aside>
            </div>
          </section>
        </main>

        <V2SiteFooter currentHref="/" />
      </PageTransition>
    </div>
  );
}
