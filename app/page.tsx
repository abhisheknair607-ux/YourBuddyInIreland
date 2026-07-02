"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  HelpCircle,
  Info,
  Instagram,
  Linkedin,
  Link2,
  MessageCircle,
  MessageSquareText,
  Sparkles,
  X
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AnimatedGradientBackground } from "@/components/AnimatedGradientBackground";
import { BrandLogo } from "@/components/BrandLogo";
import { FloatingStudyIcons } from "@/components/FloatingStudyIcons";
import { IntroScreen } from "@/components/IntroScreen";
import { PageTransition } from "@/components/PageTransition";
import { PrivacyNotice } from "@/components/PrivacyNotice";
import { TypewriterText } from "@/components/TypewriterText";
import { VersionSwitchLink } from "@/components/VersionSwitchLink";
import { trackAnalyticsEvent } from "@/lib/analytics";
import { hasAcceptedPrivacy } from "@/lib/mockAuth";
import {
  DASHBOARD_STARTER_PROMPT_KEY,
  DEFAULT_STARTER_PROMPT,
  HOME_STARTER_PROMPTS
} from "@/lib/starterPrompts";

const homepageFaqs = [
  {
    question: "What can Guidon help me with?",
    answer:
      "Guidon helps Indian students plan visas, housing, education loans, universities, and course decisions for studying in Ireland."
  },
  {
    question: "Do I need to sign in before using everything?",
    answer:
      "You can explore the homepage first, but signing in gives you the main chat experience, saved progress, and more guided help."
  },
  {
    question: "Can I use chat and resources together?",
    answer:
      "Yes. You can start with chat for guidance and then use the Resource Hub when you want important links and references in one place."
  },
  {
    question: "Is this useful only for visa questions?",
    answer:
      "No. It is designed for the full journey, from university shortlisting and budgeting to accommodation and planning your next steps."
  },
  {
    question: "Can I ask questions in Hinglish?",
    answer:
      "Yes. The assistant is designed to feel easy to use, including simple Hinglish-style conversations when that feels more natural."
  },
  {
    question: "What if I need human help too?",
    answer:
      "That is part of the idea as well. Alongside AI guidance, the platform can point students toward resources, support, and expert help when needed."
  }
] as const;

const aboutHighlights = [
  {
    title: "Made for this journey",
    description:
      "Built for Indian students preparing to move to Ireland and needing one place to start calmly.",
    icon: Sparkles
  },
  {
    title: "Planning made simpler",
    description:
      "Bring together visas, housing, university choices, budgets, and practical next steps without feeling lost.",
    icon: BookOpen
  },
  {
    title: "Guidance with support",
    description:
      "Use chat for clarity, resources for trusted links, and support options when you want a little extra help.",
    icon: MessageSquareText
  }
] as const;

export default function HomePage() {
  const router = useRouter();
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    if (!hasAcceptedPrivacy()) {
      setIsPrivacyOpen(true);
    }
  }, []);

  const openStarterChat = (prompt: string, source = "homepage_start_chat") => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(DASHBOARD_STARTER_PROMPT_KEY, prompt);
    }

    trackAnalyticsEvent("start_chat_click", {
      source
    });
    router.push("/login");
  };

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden">
      <IntroScreen />
      <AnimatedGradientBackground />
      <FloatingStudyIcons />

      <PageTransition className="relative z-10 flex min-h-[100dvh] flex-col">
        <section className="page-shell flex-1 pb-6 pt-4 tablet:pb-8 tablet:pt-5">
          <div className="overflow-hidden rounded-[2rem] border border-white/75 bg-white/55 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <div className="flex flex-col laptop:min-h-[42rem] laptop:flex-row">
              <div
                className="relative isolate flex w-full flex-col justify-start overflow-hidden px-5 py-6 tablet:px-6 tablet:py-7 laptop:min-h-[42rem] laptop:max-w-[54%] laptop:px-8 laptop:py-8"
                style={{
                  backgroundImage: "url('/homepage-hero-left.png')",
                  backgroundPosition: "28% center",
                  backgroundSize: "cover"
                }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(226,242,255,0.2)_0%,rgba(255,255,255,0.08)_100%)]" />

                <div className="relative flex w-full max-w-[31rem] flex-col gap-6 rounded-[2rem] border border-white/35 bg-white/16 p-6 shadow-[0_26px_70px_rgba(15,23,42,0.1)] backdrop-blur-[4px] tablet:max-w-[33rem] tablet:p-7 laptop:min-h-[36rem] laptop:max-w-[35rem] laptop:rounded-[2.2rem] laptop:p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="w-fit"
                  >
                    <Link
                      href="/"
                      className="inline-flex items-center rounded-[1.4rem] border border-white/80 bg-white/82 px-4 py-3 shadow-[0_10px_28px_rgba(15,23,42,0.08)] backdrop-blur-sm transition hover:border-sky-200 hover:bg-white"
                    >
                      <BrandLogo
                        size="sm"
                        priority
                        className="w-[132px] tablet:w-[150px]"
                      />
                    </Link>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                    className="max-w-[13ch] text-[2rem] font-semibold leading-tight text-slate-950 tablet:max-w-[12ch] tablet:text-[2.7rem] laptop:max-w-[11ch] laptop:text-[3.2rem] wide:text-[3.55rem]"
                  >
                    Your Companion for visa, housing, loan, & university
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.1 }}
                    className="mt-auto max-w-[33rem] text-base leading-7 text-slate-900"
                  >
                    A calm planning space for Indian students preparing to study
                    in Ireland - visa paperwork, accommodation, education
                    loans, university shortlists, and course decisions, all in
                    one place.
                  </motion.p>
                </div>
              </div>

              <div className="flex w-full flex-col gap-4 border-t border-white/45 bg-white/72 px-5 py-6 backdrop-blur-xl tablet:px-6 tablet:py-7 laptop:max-w-[46%] laptop:justify-center laptop:gap-5 laptop:border-l laptop:border-t-0 laptop:px-8 laptop:py-8">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.15 }}
                  className="glass-card flex flex-col rounded-[1.75rem] bg-white/82 p-5 backdrop-blur-sm tablet:p-6"
                >
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                    What students can do
                  </p>
                  <TypewriterText
                    phrases={[
                      "Understand the Ireland student visa journey",
                      "Compare universities and courses with confidence",
                      "Plan accommodation and loan questions in one place"
                    ]}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.18 }}
                  className="flex flex-col gap-3"
                >
                  <VersionSwitchLink
                    href="/v2"
                    label="Open V2"
                    fromVersion="current"
                    toVersion="v2"
                    source="current_home"
                    className="w-full justify-center rounded-[1.35rem] border-white/80 bg-white/82"
                  />
                  <Link
                    href="/login"
                    onClick={() =>
                      trackAnalyticsEvent("join_us_click", {
                        source: "homepage_primary"
                      })
                    }
                    className="inline-flex min-h-[52px] w-full items-center justify-center rounded-[1.35rem] bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_38px_rgba(37,99,235,0.26)] transition hover:from-sky-600 hover:to-blue-700"
                  >
                    Join Us
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30, y: 16 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.12 }}
                  className="glass-card rounded-[1.75rem] bg-white/84 p-5 backdrop-blur-sm tablet:p-6"
                >
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                        Get Started
                      </p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        Choose where you want to begin and sign in to continue.
                      </p>
                    </div>

                    <div className="grid gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          openStarterChat(
                            DEFAULT_STARTER_PROMPT,
                            "homepage_primary_card"
                          )
                        }
                        className="group rounded-[1.5rem] border border-sky-400/60 bg-gradient-to-r from-sky-500 to-blue-600 p-4 shadow-[0_18px_38px_rgba(37,99,235,0.24)] transition hover:from-sky-600 hover:to-blue-700"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex min-w-0 items-center gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.95rem] bg-white/18 text-white backdrop-blur-sm">
                              <MessageSquareText className="h-4.5 w-4.5" />
                            </div>
                            <div className="min-w-0 text-left">
                              <p className="text-[1.15rem] font-semibold leading-none text-white">
                                Start Chat
                              </p>
                              <p className="mt-2 text-sm leading-none text-sky-50/90">
                                Custom AI Powered Assistant
                              </p>
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 shrink-0 text-white transition group-hover:translate-x-0.5" />
                        </div>
                      </button>

                      <Link
                        href="/login"
                        onClick={() =>
                          trackAnalyticsEvent("resource_hub_click", {
                            source: "homepage_primary_card"
                          })
                        }
                        className="group rounded-[1.5rem] border border-sky-400/60 bg-gradient-to-r from-sky-500 to-blue-600 p-4 shadow-[0_18px_38px_rgba(37,99,235,0.24)] transition hover:from-sky-600 hover:to-blue-700"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex min-w-0 items-center gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.95rem] bg-white/18 text-white backdrop-blur-sm">
                              <Link2 className="h-4.5 w-4.5" />
                            </div>
                            <div className="min-w-0 text-left">
                              <p className="text-[1.15rem] font-semibold leading-none text-white">
                                Resource Hub
                              </p>
                              <p className="mt-2 text-sm leading-none text-sky-50/90">
                                All Important Links
                              </p>
                            </div>
                          </div>
                          <BookOpen className="h-4 w-4 shrink-0 text-white" />
                        </div>
                      </Link>
                    </div>

                    <div className="flex flex-col gap-3 tablet:flex-row tablet:items-center tablet:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                          Start with a plan
                        </p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          Pick the part of the Ireland journey you want to sort
                          out first.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 tablet:grid-cols-3">
                      {HOME_STARTER_PROMPTS.map((subject) => (
                        <button
                          key={subject.label}
                          type="button"
                          onClick={() =>
                            openStarterChat(subject.prompt, "homepage_plan_chip")
                          }
                          className="flex min-h-[44px] items-center justify-center rounded-[1.25rem] border border-slate-200/80 bg-slate-50/90 px-3 py-3 text-center text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-white"
                        >
                          {subject.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <footer className="page-shell flex shrink-0 flex-col gap-3 py-4 text-xs text-slate-500 tablet:gap-2">
          <div className="flex flex-col gap-3 tablet:flex-row tablet:items-center tablet:justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-medium text-slate-400">
                Follow us
              </span>
              <div className="flex items-center gap-1.5">
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-white/70 text-slate-500 transition hover:border-slate-300 hover:bg-white hover:text-slate-900"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-white/70 text-slate-500 transition hover:border-slate-300 hover:bg-white hover:text-slate-900"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-white/70 text-slate-500 transition hover:border-slate-300 hover:bg-white hover:text-slate-900"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1 tablet:justify-end">
              <button
                type="button"
                onClick={() => setIsFaqOpen(true)}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full px-3 py-2 font-semibold text-slate-600 transition hover:bg-white/70 hover:text-slate-900"
              >
                <HelpCircle className="h-3.5 w-3.5" />
                FAQ
              </button>
              <span className="text-slate-300" aria-hidden="true">&middot;</span>
              <button
                type="button"
                onClick={() => setIsAboutOpen(true)}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full px-3 py-2 font-semibold text-slate-600 transition hover:bg-white/70 hover:text-slate-900"
              >
                <Info className="h-3.5 w-3.5" />
                About Us
              </button>
              <span className="text-slate-300" aria-hidden="true">&middot;</span>
              <button
                type="button"
                onClick={() => setIsPrivacyOpen(true)}
                className="inline-flex min-h-[40px] items-center rounded-full px-3 py-2 font-semibold text-sky-700 transition hover:bg-white/70 hover:text-sky-800"
              >
                Privacy Notice
              </button>
            </div>
          </div>
        </footer>
      </PageTransition>

      <AnimatePresence>
        {isFaqOpen ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/35 p-2 backdrop-blur-md tablet:items-center tablet:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFaqOpen(false)}
          >
            <motion.div
              className="glass-card surface-ring thin-scrollbar relative max-h-[calc(100dvh-0.5rem)] w-full max-w-xl overflow-y-auto rounded-[1.35rem] p-4 tablet:max-h-[85vh] tablet:rounded-[2rem] tablet:p-8"
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 12 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsFaqOpen(false)}
                className="absolute right-4 top-4 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-slate-200/80 bg-white/90 p-2 text-slate-500 transition hover:text-slate-900"
                aria-label="Close FAQ"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="mb-4 flex items-start gap-3 pr-12 tablet:mb-5 tablet:items-center">
                <div className="shrink-0 rounded-2xl bg-sky-100 p-3 text-sky-700">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">
                    FAQs
                  </p>
                  <h2 className="mt-0.5 text-lg font-semibold leading-tight text-slate-950 tablet:text-2xl">
                    Common questions, answered simply.
                  </h2>
                </div>
              </div>

              <div className="space-y-2.5">
                {homepageFaqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;

                  return (
                    <div
                      key={faq.question}
                      className="rounded-[1.35rem] border border-slate-200/80 bg-white/80 shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenFaqIndex((current) =>
                            current === index ? null : index
                          )
                        }
                        className="flex min-h-[52px] w-full items-center justify-between gap-4 px-4 py-3 text-left tablet:px-5"
                        aria-expanded={isOpen}
                      >
                        <span className="text-sm font-semibold leading-6 text-slate-900 tablet:text-[15px]">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 text-sky-700 transition ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen ? (
                        <div className="border-t border-slate-100 px-4 pb-4 pt-3 tablet:px-5">
                          <p className="text-sm leading-6 text-slate-600">
                            {faq.answer}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {isAboutOpen ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/35 p-2 backdrop-blur-md tablet:items-center tablet:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsAboutOpen(false)}
          >
            <motion.div
              className="glass-card surface-ring thin-scrollbar relative max-h-[calc(100dvh-0.5rem)] w-full max-w-xl overflow-y-auto rounded-[1.35rem] p-4 tablet:max-h-[85vh] tablet:rounded-[2rem] tablet:p-8"
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 12 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsAboutOpen(false)}
                className="absolute right-4 top-4 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-slate-200/80 bg-white/90 p-2 text-slate-500 transition hover:text-slate-900"
                aria-label="Close About Us"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="mb-4 flex items-start gap-3 pr-12 tablet:mb-5 tablet:items-center">
                <div className="shrink-0 rounded-2xl bg-sky-100 p-3 text-sky-700">
                  <Info className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">
                    About Us
                  </p>
                  <h2 className="mt-0.5 text-lg font-semibold leading-tight text-slate-950 tablet:text-2xl">
                    A calm planning companion for students heading to Ireland.
                  </h2>
                </div>
              </div>

              <p className="text-sm leading-7 text-slate-600 tablet:text-[15px]">
                Guidon is being shaped as a simple, reassuring space for Indian
                students who want clarity across visas, housing, budgets,
                universities, and support without feeling overwhelmed. Built
                with the real experience of students and peers who have been
                through the Ireland student journey firsthand.
              </p>

              <div className="mt-5 grid gap-2.5">
                {aboutHighlights.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-[1.35rem] border border-slate-200/80 bg-white/80 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.95rem] bg-sky-50 text-sky-700">
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {item.title}
                          </p>
                          <p className="mt-1 text-sm leading-6 text-slate-600">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <PrivacyNotice
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </div>
  );
}
