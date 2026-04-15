"use client";

import { AnimatedGradientBackground } from "@/components/AnimatedGradientBackground";
import { BrandLogo } from "@/components/BrandLogo";
import { FloatingStudyIcons } from "@/components/FloatingStudyIcons";
import { PageTransition } from "@/components/PageTransition";

const loadingSteps = [
  "Checking your study planning workspace",
  "Preparing visa, university, and accommodation guidance",
  "Getting your docs-first assistant ready"
];

type LoadingExperienceProps = {
  overlay?: boolean;
};

export function LoadingExperience({
  overlay = false
}: LoadingExperienceProps) {
  return (
    <div
      className={`relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-sky-50 to-blue-50 ${
        overlay ? "backdrop-blur-sm" : ""
      }`}
    >
      <AnimatedGradientBackground />
      <FloatingStudyIcons />

      <PageTransition className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-10">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="max-w-2xl">
            <div className="inline-flex rounded-[1.4rem] border border-sky-200 bg-white/80 px-3 py-2 backdrop-blur-xl">
              <BrandLogo size="sm" className="w-[150px]" />
            </div>

            <h1 className="mt-6 text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
              Setting up your student journey dashboard.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Bringing together visas, accommodation, loans, universities,
              courses, and your uploaded knowledge docs in one calm space.
            </p>

            <div className="mt-8 grid gap-3 sm:max-w-xl">
              {loadingSteps.map((step, index) => (
                <div
                  key={step}
                  className="glass-card flex items-center gap-4 rounded-[1.5rem] px-5 py-4"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">{step}</p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 animate-[pulse_1.8s_ease-in-out_infinite]"
                        style={{
                          width: `${68 + index * 10}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="glass-card surface-ring rounded-[2rem] p-5 sm:p-6">
            <div className="rounded-[1.75rem] bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 p-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-sky-100">
                Journey In Progress
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-snug">
                Your assistant is warming up with a docs-first mindset.
              </h2>
              <p className="mt-3 text-sm leading-7 text-sky-50/90">
                Local knowledge stays first. Current web facts only step in when
                your documents do not fully answer the question.
              </p>
            </div>

            <div className="mt-5 rounded-[1.75rem] border border-slate-200/80 bg-white/85 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                    Live Setup
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">
                    Preparing a welcoming student experience
                  </h3>
                </div>
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((dot) => (
                    <span
                      key={dot}
                      className="h-2.5 w-2.5 animate-bounce rounded-full bg-sky-500"
                      style={{
                        animationDelay: `${dot * 180}ms`
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="h-3 w-28 rounded-full bg-slate-200" />
                  <div className="mt-3 h-3 w-full rounded-full bg-slate-100" />
                  <div className="mt-2 h-3 w-4/5 rounded-full bg-slate-100" />
                </div>

                <div className="flex justify-end">
                  <div className="w-[72%] rounded-2xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 px-4 py-4">
                    <div className="h-3 w-16 rounded-full bg-white/35" />
                    <div className="mt-3 h-3 w-full rounded-full bg-white/20" />
                    <div className="mt-2 h-3 w-5/6 rounded-full bg-white/20" />
                  </div>
                </div>

                <div className="rounded-2xl border border-dashed border-sky-200 bg-sky-50/70 px-4 py-3">
                  <p className="text-sm font-medium text-slate-700">
                    Loading high-accuracy guidance for Indian students moving to
                    Ireland...
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </PageTransition>
    </div>
  );
}
