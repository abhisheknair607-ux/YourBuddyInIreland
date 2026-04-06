"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Apple, ArrowLeft, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getProviders, signIn, useSession } from "next-auth/react";

import { AnimatedGradientBackground } from "@/components/AnimatedGradientBackground";
import { GoogleIcon } from "@/components/GoogleIcon";
import { OtpInput } from "@/components/OtpInput";
import { PageTransition } from "@/components/PageTransition";
import { PrivacyNotice } from "@/components/PrivacyNotice";
import {
  getMockUser,
  hasAcceptedPrivacy,
  mockSendOtp,
  mockVerifyOtp,
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
  const { data: session, status } = useSession();
  const [mode, setMode] = useState<AuthMode>("login");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [emailFormOpen, setEmailFormOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [busyAction, setBusyAction] = useState<"" | "google" | "apple" | "email">("");
  const [configuredProviders, setConfiguredProviders] = useState<AuthProviderMap>(
    {}
  );
  const [providersLoaded, setProvidersLoaded] = useState(false);

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (session?.user || getMockUser()) {
      router.replace("/dashboard");
      return;
    }

    const accepted = hasAcceptedPrivacy();
    setPrivacyAccepted(accepted);

    if (!accepted) {
      setPrivacyModalOpen(true);
    }
  }, [router, session, status]);

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

  const handleSocialLogin = async (provider: "google" | "apple") => {
    if (!ensurePrivacyAccepted()) {
      return;
    }

    if (!configuredProviders[provider]) {
      setErrorMessage(
        `${
          provider === "google" ? "Google" : "Apple"
        } sign-in is not configured yet. Add the provider credentials to enable it.`
      );
      return;
    }

    setBusyAction(provider);
    setErrorMessage("");
    await signIn(provider, { callbackUrl: "/dashboard" });
  };

  const handleEmailContinue = async () => {
    if (!ensurePrivacyAccepted()) {
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setErrorMessage("Enter a valid email address to receive the demo OTP.");
      return;
    }

    setBusyAction("email");
    setErrorMessage("");
    await mockSendOtp(normalizedEmail);
    setBusyAction("");
    setOtpModalOpen(true);
  };

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden">
      <AnimatedGradientBackground />

      <PageTransition className="relative z-10 flex min-h-[100dvh] flex-col pt-safe">
        <div className="page-shell flex flex-col gap-3 py-4 tablet:flex-row tablet:items-center tablet:justify-between tablet:py-5">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center gap-2 self-start rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 backdrop-blur-xl"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <button
            type="button"
            onClick={() => setPrivacyModalOpen(true)}
            className="min-h-[44px] self-stretch rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 tablet:self-auto"
          >
            Privacy Policy
          </button>
        </div>

        <div className="page-shell grid flex-1 items-start gap-6 py-4 tablet:gap-8 tablet:py-6 laptop:grid-cols-[0.96fr_1.04fr] laptop:items-center laptop:gap-10 laptop:py-8">
          <div className="order-2 max-w-2xl space-y-6 laptop:order-1 laptop:space-y-7">
            <div className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-sm font-medium text-sky-700 backdrop-blur-xl">
              <ShieldCheck className="h-4 w-4" />
              Safe mock sign-in for your Ireland planning dashboard
            </div>

            <div>
              <h1 className="text-[2rem] font-semibold leading-tight text-slate-950 tablet:text-[2.5rem] laptop:text-[3.1rem]">
                Sign in to organise your Ireland student journey.
              </h1>
              <p className="mt-4 max-w-[65ch] text-base leading-7 text-slate-600 tablet:mt-5 tablet:text-lg tablet:leading-8">
                Google, Apple, and email OTP are mocked for now, but the UI is
                structured for a real product that helps Indian students handle
                visas, accommodation, loans, university shortlists, and course
                choices for Ireland.
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
                  The dashboard can later support real comparisons around
                  universities, accommodation costs, and education loan plans.
                </p>
              </div>
            </div>
          </div>

          <motion.div
            whileHover={{ y: -4 }}
            className="order-1 mx-auto w-full max-w-xl laptop:order-2 laptop:max-w-none"
          >
            <div className="glass-card surface-ring rounded-[2rem] p-5 transition tablet:p-6 laptop:p-8">
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
                  Sign in with a mock provider now. Real Google, Apple, and
                  email OTP can be wired in later without changing this page
                  layout or the flow students already understand.
                </p>
              </div>

              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => void handleSocialLogin("google")}
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

                <button
                  type="button"
                  onClick={() => void handleSocialLogin("apple")}
                  disabled={
                    !providersLoaded ||
                    (busyAction !== "" && busyAction !== "apple")
                  }
                  className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-800 transition hover:scale-[1.01] hover:border-slate-300 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Apple className="h-5 w-5" />
                  {busyAction === "apple"
                    ? "Signing in..."
                    : configuredProviders.apple
                      ? "Continue with Apple"
                      : providersLoaded
                        ? "Apple sign-in coming soon"
                        : "Checking Apple sign-in..."}
                </button>

                <div className="flex items-center gap-3 py-1">
                  <div className="h-px flex-1 bg-slate-200" />
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                    OR
                  </span>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                {!emailFormOpen ? (
                  <button
                    type="button"
                    onClick={() => {
                      setEmailFormOpen(true);
                      setErrorMessage("");
                    }}
                    className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-800 transition hover:scale-[1.01] hover:border-slate-300 hover:bg-white"
                  >
                    <Mail className="h-5 w-5" />
                    Continue with Email
                  </button>
                ) : (
                  <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/80 p-4">
                    <label className="text-sm font-semibold text-slate-700">
                      Email address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="student@email.com"
                      className="mt-3 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:shadow-[0_0_0_4px_rgba(56,189,248,0.12)]"
                    />
                    <button
                      type="button"
                      onClick={() => void handleEmailContinue()}
                      disabled={busyAction !== "" && busyAction !== "email"}
                      className="mt-4 w-full rounded-2xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {busyAction === "email" ? "Sending OTP..." : "Send Demo OTP"}
                    </button>
                  </div>
                )}
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
                    I agree to the Privacy Policy and understand this sign-in
                    flow is mocked for the frontend demo of an Ireland planning
                    assistant.
                  </span>
                </label>
              </div>

              {errorMessage ? (
                <p className="mt-4 text-sm font-medium text-rose-600">
                  {errorMessage}
                </p>
              ) : (
                <p className="mt-4 text-sm leading-7 text-slate-500 wrap-anywhere">
                  Auth setup note: Google and Apple buttons will activate once
                  their credentials are added. Email OTP still works as a demo,
                  and the OTP is
                  <span className="font-semibold text-slate-700"> 123456</span>.
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </PageTransition>

      <PrivacyNotice
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
        onAccepted={() => handlePrivacyChange(true)}
      />

      <AnimatePresence>
        {otpModalOpen ? (
          <OtpInput
            email={email.trim().toLowerCase()}
            onClose={() => setOtpModalOpen(false)}
            onResend={async () => {
              await mockSendOtp(email.trim().toLowerCase());
            }}
            onSubmit={async (otp) => {
              const result = await mockVerifyOtp(otp);

              if (result.success) {
                router.push("/dashboard");
                return true;
              }

              return false;
            }}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
