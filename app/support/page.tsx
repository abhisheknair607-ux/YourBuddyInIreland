"use client";

import { MessageSquareText, Sparkles, UsersRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";

import { AnimatedGradientBackground } from "@/components/AnimatedGradientBackground";
import { FeedbackModal } from "@/components/FeedbackModal";
import { FloatingStudyIcons } from "@/components/FloatingStudyIcons";
import { GetInTouchModal } from "@/components/GetInTouchModal";
import { PageTransition } from "@/components/PageTransition";
import { PageTopIdentityHeader } from "@/components/PageTopIdentityHeader";
import { VersionSwitchLink } from "@/components/VersionSwitchLink";
import { getMockUser } from "@/lib/mockAuth";

export default function SupportPage() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isGetInTouchOpen, setIsGetInTouchOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const isV2Experience = pathname.startsWith("/v2");
  const homeHref = isV2Experience ? "/v2" : "/";
  const dashboardHref = isV2Experience ? "/v2/chat" : "/dashboard";
  const profileHref = isV2Experience ? "/v2/profile" : "/profile";
  const counterpartHref = isV2Experience ? "/support" : "/v2/support";

  const activeUser = useMemo(() => {
    const mockUser = getMockUser();
    const sessionEmail = session?.user?.email?.trim() || "";

    if (sessionEmail) {
      return {
        name: session?.user?.name?.trim() || sessionEmail,
        email: sessionEmail
      };
    }

    if (mockUser?.email) {
      return {
        name: mockUser.name,
        email: mockUser.email
      };
    }

    return null;
  }, [session?.user?.email, session?.user?.name]);

  return (
    <div className="relative h-[100dvh] overflow-hidden bg-slate-50">
      <AnimatedGradientBackground />
      <FloatingStudyIcons />

      <PageTransition className="relative z-10 flex h-[100dvh] min-h-[100dvh] flex-col overflow-hidden">
        <PageTopIdentityHeader
          icon={UsersRound}
          label="Support"
          homeHref={homeHref}
          actions={
            <VersionSwitchLink
              href={counterpartHref}
              label={isV2Experience ? "Current Version" : "Open V2"}
              fromVersion={isV2Experience ? "v2" : "current"}
              toVersion={isV2Experience ? "current" : "v2"}
              source={isV2Experience ? "v2_support" : "current_support"}
            />
          }
        />

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
                  Open the working contact flow for local help, accommodation
                  support, and practical student guidance.
                </p>
                <button
                  type="button"
                  onClick={() => setIsGetInTouchOpen(true)}
                  className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900"
                >
                  Ask for help
                </button>
              </div>

              <div className="glass-card rounded-[1.75rem] p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-sky-50 text-sky-700">
                  <MessageSquareText className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-slate-950">
                  Need expert advice?
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Reach out for visa, loan, university, or planning support and
                  keep the message flow inside the product.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setIsFeedbackOpen(true)}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-300"
                  >
                    Send feedback
                  </button>
                  <Link
                    href={dashboardHref}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:scale-[1.01]"
                  >
                    Open chat
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid gap-4 pb-6 laptop:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
              <div className="glass-card rounded-[1.75rem] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                  What works now
                </p>
                <div className="mt-4 grid gap-3 tablet:grid-cols-2">
                  <div className="rounded-[1.25rem] border border-slate-200/80 bg-white/85 p-4">
                    <p className="text-sm font-semibold text-slate-950">
                      Direct contact
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      The support modals use the live contact API and can email
                      your request when SMTP is configured.
                    </p>
                  </div>
                  <div className="rounded-[1.25rem] border border-slate-200/80 bg-white/85 p-4">
                    <p className="text-sm font-semibold text-slate-950">
                      Profile-aware guidance
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Keep your student profile up to date so the chat and next
                      steps stay more relevant to your situation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-[1.75rem] p-5">
                <div className="flex items-center gap-2 text-sky-700">
                  <Sparkles className="h-4.5 w-4.5" />
                  <p className="text-xs font-semibold uppercase tracking-[0.22em]">
                    Quick links
                  </p>
                </div>
                <div className="mt-4 grid gap-3">
                  <Link
                    href={profileHref}
                    className="rounded-[1.2rem] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-300"
                  >
                    Open profile
                  </Link>
                  <Link
                    href={dashboardHref}
                    className="rounded-[1.2rem] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-300"
                  >
                    Return to chat
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>

        <GetInTouchModal
          isOpen={isGetInTouchOpen}
          onClose={() => setIsGetInTouchOpen(false)}
          userName={activeUser?.name}
          userEmail={activeUser?.email}
        />
        <FeedbackModal
          isOpen={isFeedbackOpen}
          onClose={() => setIsFeedbackOpen(false)}
          userName={activeUser?.name}
          userEmail={activeUser?.email}
        />
      </PageTransition>
    </div>
  );
}
