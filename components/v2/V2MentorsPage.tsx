"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Clock3, MapPin, ShieldCheck, Sparkles, Star, UsersRound } from "lucide-react";
import Link from "next/link";

import { AnimatedGradientBackground } from "@/components/AnimatedGradientBackground";
import { FloatingStudyIcons } from "@/components/FloatingStudyIcons";
import { PageTransition } from "@/components/PageTransition";
import { V2SiteFooter } from "@/components/v2/V2SiteFooter";
import { V2SiteHeader } from "@/components/v2/V2SiteHeader";

const mentors = [
  {
    name: "Priya Nair",
    university: "UCD",
    course: "MSc Data Analytics",
    home: "Kerala",
    responseTime: "2 hours",
    rating: 5,
    summary: "Guide students through IRP process, Dublin settling-in steps, and finding accommodation calmly.",
    tags: ["IRP Process", "Accommodation", "UCD"]
  },
  {
    name: "Rahul Mehta",
    university: "TCD",
    course: "MSc Finance",
    home: "Mumbai",
    responseTime: "4 hours",
    rating: 4,
    summary: "Good for banking questions, part-time work expectations, and campus admin reality checks.",
    tags: ["Banking", "Part-time Work", "TCD"]
  },
  {
    name: "Ananya Krishnan",
    university: "DCU",
    course: "PhD Computer Science",
    home: "Chennai",
    responseTime: "1 hour",
    rating: 5,
    summary: "Strong for community support, longer-term student life, and what PhD life actually feels like.",
    tags: ["Community", "PhD Life", "DCU"]
  },
  {
    name: "Sneha Iyer",
    university: "TCD",
    course: "LLM Law",
    home: "Bangalore",
    responseTime: "2 hours",
    rating: 5,
    summary: "Useful for women students, legal clarity, safety questions, and accommodation decisions.",
    tags: ["Women's Safety", "Legal", "TCD"]
  }
] as const;

const universityFilters = ["All", "UCD", "TCD", "DCU"] as const;

export function V2MentorsPage() {
  const [universityFilter, setUniversityFilter] =
    useState<(typeof universityFilters)[number]>("All");

  const filteredMentors = useMemo(() => {
    if (universityFilter === "All") {
      return mentors;
    }

    return mentors.filter((mentor) => mentor.university === universityFilter);
  }, [universityFilter]);

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden">
      <AnimatedGradientBackground />
      <FloatingStudyIcons />

      <PageTransition className="relative z-10 flex min-h-[100dvh] flex-col">
        <V2SiteHeader currentHref="/support" ctaHref="/support" ctaLabel="Open Support" />

        <main className="page-shell flex-1 pb-12">
          <section className="pb-12 pt-4 tablet:pb-16 tablet:pt-8">
            <div className="grid gap-8 laptop:grid-cols-[minmax(0,0.92fr)_minmax(320px,1.08fr)] laptop:items-center">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-700 backdrop-blur-xl">
                  <UsersRound className="h-3.5 w-3.5" />
                  Mentor Connect prototype
                </div>
                <h1 className="mt-6 text-[3rem] font-semibold leading-[0.96] tracking-[-0.035em] text-slate-950 tablet:text-[4.2rem]">
                  Let students reach someone who has already lived the journey.
                </h1>
                <p className="mt-5 max-w-xl text-[1.05rem] leading-8 text-slate-600 tablet:text-[1.16rem]">
                  Mentor Connect is a polished V2 prototype that keeps the
                  current support route intact while showing how verified
                  student-to-student guidance can fit the product.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/support"
                    className="inline-flex min-h-[52px] items-center justify-center rounded-[1rem] bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
                  >
                    Open current support
                  </Link>
                  <Link
                    href="/v2/register"
                    className="inline-flex min-h-[52px] items-center justify-center rounded-[1rem] border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400"
                  >
                    Join V2
                  </Link>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/75 bg-white/82 p-5 shadow-[0_22px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl">
                <div className="grid gap-4 tablet:grid-cols-3">
                  <div className="rounded-[1.4rem] bg-sky-50 p-4">
                    <ShieldCheck className="h-4.5 w-4.5 text-sky-700" />
                    <p className="mt-3 text-sm font-semibold text-slate-900">Verified students</p>
                  </div>
                  <div className="rounded-[1.4rem] bg-emerald-50 p-4">
                    <Clock3 className="h-4.5 w-4.5 text-emerald-700" />
                    <p className="mt-3 text-sm font-semibold text-slate-900">Response-time context</p>
                  </div>
                  <div className="rounded-[1.4rem] bg-slate-100 p-4">
                    <Sparkles className="h-4.5 w-4.5 text-slate-700" />
                    <p className="mt-3 text-sm font-semibold text-slate-900">Clear escalation path</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="pb-10">
            <div className="flex flex-wrap gap-2">
              {universityFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setUniversityFilter(filter)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    filter === universityFilter
                      ? "border-sky-200 bg-sky-50 text-sky-700"
                      : "border-slate-200 bg-white/82 text-slate-600 hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-4 tablet:grid-cols-2">
              {filteredMentors.map((mentor) => (
                <article
                  key={mentor.name}
                  className="rounded-[1.85rem] border border-white/75 bg-white/82 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur-xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-slate-950">{mentor.name}</p>
                      <p className="mt-1 text-sm text-slate-500">
                        {mentor.course} · {mentor.university}
                      </p>
                    </div>
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
                      Verified
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      {mentor.home}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="h-4 w-4 text-slate-400" />
                      Replies in {mentor.responseTime}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Star className="h-4 w-4 text-amber-500" />
                      {mentor.rating}/5
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {mentor.summary}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {mentor.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href="/support"
                      className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900"
                    >
                      Continue to support
                    </Link>
                    <Link
                      href="/v2/register"
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-300"
                    >
                      Join V2
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>

        <V2SiteFooter currentHref="/support" />
      </PageTransition>
    </div>
  );
}
