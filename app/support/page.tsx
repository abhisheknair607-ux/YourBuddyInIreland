"use client";

import { MessageSquareText, UsersRound } from "lucide-react";

import { AnimatedGradientBackground } from "@/components/AnimatedGradientBackground";
import { FloatingStudyIcons } from "@/components/FloatingStudyIcons";
import { PageTransition } from "@/components/PageTransition";
import { PageTopIdentityHeader } from "@/components/PageTopIdentityHeader";

export default function SupportPage() {
  return (
    <div className="relative h-[100dvh] overflow-hidden bg-slate-50">
      <AnimatedGradientBackground />
      <FloatingStudyIcons />

        <PageTransition className="relative z-10 flex h-[100dvh] min-h-[100dvh] flex-col overflow-hidden">
          <PageTopIdentityHeader icon={UsersRound} label="Support" />

        <main className="page-shell flex-1 min-h-0 pb-4 pt-1 tablet:pb-6">
          <div className="scrollbar-hidden h-full overflow-y-auto overscroll-contain pr-1 tablet:pr-2">
            <div className="grid gap-4 pb-4 pt-2 tablet:grid-cols-2 tablet:pb-6">
              <div className="glass-card rounded-[1.75rem] p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-sky-50 text-sky-700">
                  <UsersRound className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-slate-950">
                  Need a buddy?
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Use this area for local help, accommodation viewing support, and
                  practical student guidance.
                </p>
              </div>

              <div className="glass-card rounded-[1.75rem] p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-sky-50 text-sky-700">
                  <MessageSquareText className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-slate-950">
                  Need expert advice?
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  This section is set up for visa, loan, university, and planning
                  support.
                </p>
              </div>
            </div>
          </div>
        </main>
      </PageTransition>
    </div>
  );
}
