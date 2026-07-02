"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Banknote,
  BookOpen,
  Bot,
  FileText,
  Globe2,
  GraduationCap,
  Languages,
  LineChart,
  MessageSquareText,
  Plane,
  Settings2,
  ShieldCheck,
  Sparkles,
  UsersRound,
  type LucideIcon
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { AnimatedGradientBackground } from "@/components/AnimatedGradientBackground";
import { FloatingStudyIcons } from "@/components/FloatingStudyIcons";
import { PageTransition } from "@/components/PageTransition";
import { PrivacyNotice } from "@/components/PrivacyNotice";
import { VersionSwitchLink } from "@/components/VersionSwitchLink";
import { V2SiteFooter } from "@/components/v2/V2SiteFooter";
import { V2SiteHeader } from "@/components/v2/V2SiteHeader";
import { trackAnalyticsEvent } from "@/lib/analytics";
import { hasAcceptedPrivacy } from "@/lib/mockAuth";
import {
  DASHBOARD_STARTER_PROMPT_KEY,
  DEFAULT_STARTER_PROMPT,
  HOME_STARTER_PROMPTS
} from "@/lib/starterPrompts";

const productCards: {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  eyebrow: string;
}[] = [
  {
    title: "AI chat",
    description: "Use the live assistant, multilingual replies, and saved chat history in the upgraded V2 shell.",
    href: "/v2/chat",
    icon: Bot,
    eyebrow: "Live"
  },
  {
    title: "Registration",
    description: "Keep the real Google sign-in flow while presenting the cleaner V2 onboarding entry.",
    href: "/v2/register",
    icon: ShieldCheck,
    eyebrow: "Live"
  },
  {
    title: "Resource Hub",
    description: "Browse the same important links and categories with the V2 route structure.",
    href: "/v2/resources",
    icon: Globe2,
    eyebrow: "Live"
  },
  {
    title: "Forex notifier",
    description: "Use live rate, history, and alert functionality inside the parallel V2 namespace.",
    href: "/v2/forex",
    icon: LineChart,
    eyebrow: "Live"
  },
  {
    title: "Support",
    description: "Open the working help and contact flows without leaving the V2 route family.",
    href: "/v2/support",
    icon: UsersRound,
    eyebrow: "Live"
  },
  {
    title: "Student profile",
    description: "Edit the saved profile that improves guidance quality across chat and planning flows.",
    href: "/v2/profile",
    icon: Settings2,
    eyebrow: "Live"
  },
  {
    title: "Demo walkthrough",
    description: "Step through the expanded product story and see how the platform ties together.",
    href: "/v2/demo",
    icon: Sparkles,
    eyebrow: "New"
  },
  {
    title: "Mentor Connect",
    description: "Explore the new mentor discovery experience with clear links back into support.",
    href: "/v2/mentors",
    icon: UsersRound,
    eyebrow: "Prototype"
  },
  {
    title: "Document Builder",
    description: "Run a live SOP review flow with editable sections, export, and API-backed feedback.",
    href: "/v2/docs",
    icon: FileText,
    eyebrow: "Live"
  }
] as const;

const journeyItems = [
  "Visa paperwork",
  "Accommodation planning",
  "Education loans",
  "University shortlists",
  "Hinglish / multilingual guidance",
  "Mentor support"
] as const;

export function V2HomePage() {
  const router = useRouter();
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  useEffect(() => {
    if (!hasAcceptedPrivacy()) {
      setIsPrivacyOpen(true);
    }
  }, []);

  const openStarterChat = (prompt: string, source: string) => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(DASHBOARD_STARTER_PROMPT_KEY, prompt);
    }

    trackAnalyticsEvent("v2_start_chat_click", {
      source
    });
    router.push("/v2/register");
  };

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden">
      <AnimatedGradientBackground />
      <FloatingStudyIcons />

      <PageTransition className="relative z-10 flex min-h-[100dvh] flex-col">
        <V2SiteHeader currentHref="/" />

        <main className="page-shell flex-1 pb-10">
          <section className="pb-12 pt-4 tablet:pb-16 tablet:pt-8">
            <div className="grid gap-8 laptop:grid-cols-[minmax(0,0.9fr)_minmax(360px,1.1fr)] laptop:items-center">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-700 backdrop-blur-xl">
                  <Sparkles className="h-3.5 w-3.5" />
                  Parallel V2 preview
                </div>

                <h1 className="mt-6 max-w-[11ch] text-[3rem] font-semibold leading-[0.96] tracking-[-0.035em] text-slate-950 tablet:text-[4.65rem] laptop:text-[5.25rem]">
                  The expanded Guidon experience, live beside the current one.
                </h1>

                <p className="mt-6 max-w-xl text-[1.05rem] leading-8 text-slate-600 tablet:text-[1.18rem]">
                  Keep the current product exactly where it is while opening a
                  cleaner V2 surface for walkthroughs, mentors, documents, and
                  the live planning tools students already use today.
                </p>

                <div className="mt-8 flex flex-col gap-3 tablet:flex-row tablet:flex-wrap">
                  <button
                    type="button"
                    onClick={() => openStarterChat(DEFAULT_STARTER_PROMPT, "v2_home_primary")}
                    className="inline-flex min-h-[54px] items-center justify-center rounded-[1rem] bg-slate-950 px-6 py-3 text-base font-semibold text-white transition hover:bg-slate-900"
                  >
                    Start in V2
                  </button>
                  <Link
                    href="/v2/demo"
                    className="inline-flex min-h-[54px] items-center justify-center rounded-[1rem] border border-slate-300 bg-white/85 px-6 py-3 text-base font-semibold text-slate-900 backdrop-blur-xl transition hover:border-slate-400 hover:bg-white"
                  >
                    Walk through V2
                  </Link>
                  <VersionSwitchLink
                    href="/"
                    label="Open Current Version"
                    fromVersion="v2"
                    toVersion="current"
                    source="v2_home_hero"
                  />
                </div>

                <div className="mt-8 flex flex-wrap gap-2.5">
                  {journeyItems.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-200/80 bg-white/84 px-3.5 py-2 text-sm font-medium text-slate-600 shadow-[0_8px_20px_rgba(15,23,42,0.04)] backdrop-blur-xl"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-white/75 bg-white/72 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl tablet:p-6">
                <div className="grid gap-4 tablet:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-950 p-5 text-white">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-200">
                      Live V2
                    </p>
                    <p className="mt-3 text-2xl font-semibold">Chat, auth, resources, forex, support, profile.</p>
                    <p className="mt-3 text-sm leading-6 text-white/75">
                      The real application flows are mounted under the V2 route
                      family without replacing the current experience.
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] border border-slate-200/80 bg-white p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700">
                      New surface area
                    </p>
                    <p className="mt-3 text-2xl font-semibold text-slate-950">
                      Demo, mentors, docs review.
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      Add the product-story pages from the design system as
                      polished prototype routes.
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-[1.75rem] border border-slate-200/80 bg-white p-4 tablet:p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700">
                    Start with a plan
                  </p>
                  <div className="mt-3 grid gap-2.5 tablet:grid-cols-3">
                    {HOME_STARTER_PROMPTS.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => openStarterChat(item.prompt, "v2_home_plan_chip")}
                        className="flex min-h-[48px] items-center justify-center rounded-[1rem] border border-slate-200 bg-slate-50/90 px-3 py-3 text-center text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-white"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  <div className="mt-5 grid gap-3 tablet:grid-cols-3">
                    <div className="rounded-[1.25rem] bg-sky-50 p-4">
                      <MessageSquareText className="h-4.5 w-4.5 text-sky-700" />
                      <p className="mt-3 text-sm font-semibold text-slate-900">Chat-first planning</p>
                    </div>
                    <div className="rounded-[1.25rem] bg-slate-100 p-4">
                      <Languages className="h-4.5 w-4.5 text-slate-700" />
                      <p className="mt-3 text-sm font-semibold text-slate-900">Hinglish-friendly replies</p>
                    </div>
                    <div className="rounded-[1.25rem] bg-emerald-50 p-4">
                      <BookOpen className="h-4.5 w-4.5 text-emerald-700" />
                      <p className="mt-3 text-sm font-semibold text-slate-900">Trusted next steps</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="pb-12 tablet:pb-16">
            <div className="flex flex-col gap-3 tablet:flex-row tablet:items-end tablet:justify-between">
              <div className="max-w-2xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-700">
                  V2 routes
                </p>
                <h2 className="mt-3 text-[2rem] font-semibold leading-tight text-slate-950 tablet:text-[3rem]">
                  Every V2 page is accessible now
                </h2>
                <p className="mt-3 text-base leading-7 text-slate-600 tablet:text-lg tablet:leading-8">
                  Students can keep using the current version, while V2 opens a
                  fuller product story with the new pages layered in.
                </p>
              </div>
              <Link
                href="/v2/demo"
                className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-slate-900 transition hover:text-slate-700"
              >
                Explore the walkthrough
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 grid gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
              {productCards.map((card) => {
                const Icon = card.icon;

                return (
                  <Link
                    key={card.href}
                    href={card.href}
                    className="group h-full rounded-[1.75rem] border border-white/75 bg-white/78 p-5 shadow-[0_16px_44px_rgba(15,23,42,0.05)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_22px_56px_rgba(15,23,42,0.08)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-sky-50 text-sky-700">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {card.eyebrow}
                      </span>
                    </div>
                    <p className="mt-4 text-lg font-semibold text-slate-950">
                      {card.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {card.description}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                      Open route
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="pb-10">
            <div className="grid gap-4 tablet:grid-cols-3">
              <div className="rounded-[1.8rem] border border-white/75 bg-white/80 p-5 shadow-[0_16px_44px_rgba(15,23,42,0.05)] backdrop-blur-xl">
                <Plane className="h-5 w-5 text-sky-700" />
                <p className="mt-4 text-lg font-semibold text-slate-950">Keep the real product</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  The current routes remain the default experience for students
                  who already know the flow.
                </p>
              </div>
              <div className="rounded-[1.8rem] border border-white/75 bg-white/80 p-5 shadow-[0_16px_44px_rgba(15,23,42,0.05)] backdrop-blur-xl">
                <GraduationCap className="h-5 w-5 text-sky-700" />
                <p className="mt-4 text-lg font-semibold text-slate-950">Add the missing pages</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  The new walkthrough, mentors, and documents pages live beside
                  the existing app instead of waiting for a full replacement.
                </p>
              </div>
              <div className="rounded-[1.8rem] border border-white/75 bg-white/80 p-5 shadow-[0_16px_44px_rgba(15,23,42,0.05)] backdrop-blur-xl">
                <Banknote className="h-5 w-5 text-sky-700" />
                <p className="mt-4 text-lg font-semibold text-slate-950">Measure V2 separately</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  V2 entrypoints use separate route paths and distinct click
                  events so version traffic can be compared cleanly.
                </p>
              </div>
            </div>
          </section>
        </main>

        <V2SiteFooter currentHref="/" />
      </PageTransition>

      <PrivacyNotice
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </div>
  );
}
