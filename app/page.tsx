"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { AnimatedGradientBackground } from "@/components/AnimatedGradientBackground";
import { FloatingStudyIcons } from "@/components/FloatingStudyIcons";
import { IntroScreen } from "@/components/IntroScreen";
import { PageTransition } from "@/components/PageTransition";
import { PrivacyNotice } from "@/components/PrivacyNotice";
import { TypewriterText } from "@/components/TypewriterText";
import { hasAcceptedPrivacy } from "@/lib/mockAuth";

const subjects = [
  "Visa steps",
  "Universities",
  "Courses",
  "Accommodation",
  "Education loans",
  "Hinglish support"
];

export default function HomePage() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  useEffect(() => {
    if (!hasAcceptedPrivacy()) {
      setIsPrivacyOpen(true);
    }
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      <IntroScreen />
      <AnimatedGradientBackground />
      <FloatingStudyIcons />

      <PageTransition className="relative z-10 flex h-full flex-col">
        {/* Header */}
        <header className="mx-auto flex w-full max-w-7xl shrink-0 items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-800 backdrop-blur-xl"
          >
            <div className="rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 p-2 text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            Your Buddy In Ireland
          </Link>
          <Link
            href="/login"
            className="min-h-[44px] rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-white"
          >
            Login
          </Link>
        </header>

        {/* Hero - fills remaining height */}
        <section className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center gap-8 overflow-hidden px-6 py-4 lg:flex-row lg:items-center lg:gap-12">
          {/* Left column */}
          <div className="flex w-full flex-col gap-5 lg:max-w-[52%]">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-200 bg-sky-50/90 px-4 py-1.5 text-sm font-medium text-sky-700"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Crafted for Indian students moving to Ireland
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl xl:text-5xl"
            >
              Your Ireland Study Companion for visas, accommodation, loans,
              and university choices
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="text-sm leading-7 text-slate-600 sm:text-base"
            >
              A calm planning space for Indian students preparing to study in
              Ireland - visa paperwork, accommodation, education loans,
              university shortlists, and course decisions, all in one place.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="glass-card flex flex-col rounded-[1.75rem] p-4"
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
              transition={{ duration: 0.45, delay: 0.2 }}
              className="flex flex-wrap items-center gap-3"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/login"
                  className="button-glow inline-flex min-h-[44px] items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white"
                >
                  Start Planning
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
              {subjects.map((subject) => (
                <span
                  key={subject}
                  className="rounded-full border border-slate-200/80 bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-600"
                >
                  {subject}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right column - preview card, hidden on small mobile */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: 16 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12 }}
            className="hidden w-full lg:block lg:max-w-[48%]"
          >
            <div className="glass-card surface-ring rounded-[2rem] p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                    Live Preview
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-slate-950">
                    A dashboard that guides the whole Ireland journey
                  </h2>
                </div>
                <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Mock Demo
                </div>
              </div>

              <div className="space-y-3 rounded-[1.5rem] border border-slate-200/70 bg-white/80 p-4">
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-[1.25rem] rounded-bl-md border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm leading-6 text-slate-700">
                    Namaste! I can help you compare universities in Ireland,
                    understand visa paperwork, and shortlist courses. What
                    do you want to figure out first?
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-[1.25rem] rounded-br-md bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 px-4 py-2.5 text-sm leading-6 text-white">
                    Help me compare MSc Data Analytics options in Dublin and
                    Limerick.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="mx-auto flex w-full max-w-7xl shrink-0 flex-row items-center justify-between px-6 py-3 text-xs text-slate-500">
          <p>Frontend demo only. Real auth and Gemini integration can plug in later.</p>
          <button
            type="button"
            onClick={() => setIsPrivacyOpen(true)}
            className="font-semibold text-sky-700 transition hover:text-sky-800"
          >
            Privacy Notice
          </button>
        </footer>
      </PageTransition>

      <PrivacyNotice
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </div>
  );
}
