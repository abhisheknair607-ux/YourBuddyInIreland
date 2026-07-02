"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getProviders, signIn, useSession } from "next-auth/react";

import { AnimatedGradientBackground } from "@/components/AnimatedGradientBackground";
import { BrandLogo } from "@/components/BrandLogo";
import { CompactMobilePageHeader } from "@/components/CompactMobilePageHeader";
import { FloatingStudyIcons } from "@/components/FloatingStudyIcons";
import { GoogleIcon } from "@/components/GoogleIcon";
import { PageTransition } from "@/components/PageTransition";
import { PrivacyNotice } from "@/components/PrivacyNotice";
import { VersionSwitchLink } from "@/components/VersionSwitchLink";
import { trackAnalyticsEvent } from "@/lib/analytics";
import {
  getMockUser,
  hasAcceptedPrivacy,
  mockLogout,
  setPrivacyAccepted as persistPrivacyAccepted
} from "@/lib/mockAuth";

type AuthMode = "login" | "signup";

type AuthProviderMap = Record<
  string,
  {
    id: string;
    name: string;
  }
>;

export default function LoginPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [mode, setMode] = useState<AuthMode>("login");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [busyAction, setBusyAction] = useState<"" | "google">("");
  const [configuredProviders, setConfiguredProviders] = useState<AuthProviderMap>(
    {}
  );
  const [providersLoaded, setProvidersLoaded] = useState(false);
  const isV2Experience = pathname.startsWith("/v2");
  const dashboardHref = isV2Experience ? "/v2/chat" : "/dashboard";
  const homeHref = isV2Experience ? "/v2" : "/";
  const switchHref = isV2Experience ? "/login" : "/v2/register";
  const switchLabel = isV2Experience ? "Current Version" : "Open V2";
  const versionSwitchSource = isV2Experience ? "v2_register" : "current_login";
  const analyticsEventName = isV2Experience
    ? "v2_login_google_click"
    : "login_google_click";

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (session?.user) {
      router.replace(dashboardHref);
      return;
    }

    if (getMockUser()) {
      mockLogout();
    }

    const accepted = hasAcceptedPrivacy();
    setPrivacyAccepted(accepted);

    if (!accepted) {
      setPrivacyModalOpen(true);
    }
  }, [dashboardHref, router, session, status]);

  useEffect(() => {
    let isMounted = true;

    void getProviders()
      .then((providers) => {
        if (!isMounted) {
          return;
        }

        setConfiguredProviders((providers ?? {}) as AuthProviderMap);
        setProvidersLoaded(true);
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }

        setConfiguredProviders({});
        setProvidersLoaded(true);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const ensurePrivacyAccepted = () => {
    if (privacyAccepted) {
      return true;
    }

    setErrorMessage("Please accept the Privacy Policy before continuing.");
    setPrivacyModalOpen(true);
    return false;
  };

  const handlePrivacyChange = (accepted: boolean) => {
    setPrivacyAccepted(accepted);
    persistPrivacyAccepted(accepted);
    setErrorMessage("");
  };

  const handleGoogleLogin = async () => {
    if (!ensurePrivacyAccepted()) {
      return;
    }

    if (!configuredProviders.google) {
      setErrorMessage(
        "Google sign-in is not configured yet. Add the provider credentials to enable it."
      );
      return;
    }

    setBusyAction("google");
    setErrorMessage("");
    trackAnalyticsEvent(analyticsEventName, {
      mode
    });
    await signIn("google", { callbackUrl: dashboardHref });
  };

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden">
      <AnimatedGradientBackground />
      <FloatingStudyIcons />

      <PageTransition className="relative z-10 flex min-h-[100dvh] flex-col pt-safe">
        <div className="page-shell py-3 tablet:py-5">
          <CompactMobilePageHeader
            homeHref={homeHref}
            trailing={
              <VersionSwitchLink
                href={switchHref}
                label={switchLabel}
                fromVersion={isV2Experience ? "v2" : "current"}
                toVersion={isV2Experience ? "current" : "v2"}
                source={versionSwitchSource}
                className="min-h-[40px] px-3 text-xs"
              />
            }
          />

          <div className="hidden tablet:flex items-center justify-between gap-3">
            <Link
              href={homeHref}
              className="inline-flex min-h-[44px] items-center self-start rounded-[1.4rem] border border-white/70 bg-white/80 px-3 py-2 backdrop-blur-xl transition hover:border-slate-300 hover:bg-white"
            >
              <BrandLogo size="sm" className="w-[132px] tablet:w-[150px]" />
            </Link>
            <div className="flex items-center gap-3">
              <VersionSwitchLink
                href={switchHref}
                label={switchLabel}
                fromVersion={isV2Experience ? "v2" : "current"}
                toVersion={isV2Experience ? "current" : "v2"}
                source={versionSwitchSource}
              />
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(true)}
                className="min-h-[44px] self-stretch rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 tablet:self-auto"
              >
                Privacy Policy
              </button>
            </div>
          </div>
        </div>

        <div className="page-shell grid flex-1 items-start gap-4 py-2 tablet:gap-8 tablet:py-6 laptop:grid-cols-[0.96fr_1.04fr] laptop:items-center laptop:gap-10 laptop:py-8">
          <div className="order-2 hidden max-w-2xl space-y-6 tablet:block laptop:order-1 laptop:space-y-7">
            <div className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-sm font-medium text-sky-700 backdrop-blur-xl">
              <ShieldCheck className="h-4 w-4" />
              Secure sign-in for your Ireland planning dashboard
            </div>

            <div>
              <h1 className="text-[2rem] font-semibold leading-tight text-slate-950 tablet:text-[2.5rem] laptop:text-[3.1rem]">
                Sign in to organise your Ireland student journey.
              </h1>
              <p className="mt-4 max-w-[65ch] text-base leading-7 text-slate-600 tablet:mt-5 tablet:text-lg tablet:leading-8">
                Sign in with Google to access your Ireland planning dashboard,
                chat history, visa guidance, accommodation planning, education
                loan support, and university shortlists.
              </p>
            </div>

            <div className="grid gap-4 tablet:grid-cols-2">
              <div className="glass-card rounded-[1.75rem] p-5">
                <p className="text-sm font-semibold text-slate-900">
                  Visa + document planning
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Give students a clean entry point before they begin checking
                  requirements, paperwork, and their next visa steps.
                </p>
              </div>
              <div className="glass-card rounded-[1.75rem] p-5">
                <p className="text-sm font-semibold text-slate-900">
                  Uni + budget decisions
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Compare universities, accommodation costs, and education loan
                  plans with your saved guidance in one place.
                </p>
              </div>
            </div>
          </div>

          <motion.div
            whileHover={{ y: -4 }}
            className="order-1 mx-auto w-full max-w-xl laptop:order-2 laptop:max-w-none"
          >
            <div className="glass-card surface-ring rounded-[1.75rem] p-4 transition tablet:rounded-[2rem] tablet:p-6 laptop:p-8">
              <div className="mb-6 flex rounded-full border border-slate-200/80 bg-slate-50/80 p-1">
                {(["login", "signup"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setMode(option)}
                    className={`min-h-[44px] flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                      mode === option
                        ? "bg-white text-slate-950 shadow-sm"
                        : "text-slate-500"
                    }`}
                  >
                    {option === "login" ? "Login" : "Sign up"}
                  </button>
                ))}
              </div>

              <div className="mb-8">
                <h2 className="text-[1.8rem] font-semibold leading-tight text-slate-950 tablet:text-3xl">
                  {mode === "login"
                    ? "Welcome back, Future Scholar"
                    : "Start your Ireland student journey"}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Use your Google account to create or access your account and
                  keep your chat history connected to the same login.
                </p>
              </div>

              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => void handleGoogleLogin()}
                  disabled={
                    !providersLoaded ||
                    (busyAction !== "" && busyAction !== "google")
                  }
                  className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-800 transition hover:scale-[1.01] hover:border-slate-300 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <GoogleIcon className="h-5 w-5" />
                  {busyAction === "google"
                    ? "Signing in..."
                    : configuredProviders.google
                      ? "Continue with Google"
                      : providersLoaded
                        ? "Google sign-in coming soon"
                        : "Checking Google sign-in..."}
                </button>
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-slate-200/80 bg-white/85 p-4">
                <label className="flex items-start gap-3 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={privacyAccepted}
                    onChange={(event) => handlePrivacyChange(event.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                  />
                  <span>
                    I agree to the Privacy Policy and understand how my account
                    information may be used for the Ireland planning assistant.
                  </span>
                </label>
              </div>

              {errorMessage ? (
                <p className="mt-4 text-sm font-medium text-rose-600">
                  {errorMessage}
                </p>
              ) : (
                <p className="mt-4 text-sm leading-7 text-slate-500 wrap-anywhere">
                  Your saved chats and requests stay attached to your Google
                  login.
                </p>
              )}
            </div>
          </motion.div>
        </div>

        <div className="page-shell pb-5 tablet:hidden">
          <button
            type="button"
            onClick={() => setPrivacyModalOpen(true)}
            className="min-h-[44px] w-full rounded-full border border-slate-200/80 bg-white/85 px-4 py-2 text-sm font-medium text-slate-700 shadow-[0_10px_26px_rgba(15,23,42,0.06)] backdrop-blur-xl"
          >
            Privacy Policy
          </button>
        </div>
      </PageTransition>

      <PrivacyNotice
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
        onAccepted={() => handlePrivacyChange(true)}
      />
    </div>
  );
}
