"use client";

import { Loader2, ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";

import { AnimatedGradientBackground } from "@/components/AnimatedGradientBackground";
import { FloatingStudyIcons } from "@/components/FloatingStudyIcons";
import { PageTransition } from "@/components/PageTransition";
import { PageTopIdentityHeader } from "@/components/PageTopIdentityHeader";
import { VersionSwitchLink } from "@/components/VersionSwitchLink";
import { trackAnalyticsEvent } from "@/lib/analytics";
import { getClientRequestHeaders } from "@/lib/clientRequestHeaders";
import { LOCAL_PREVIEW_USER, isLocalPreviewHost } from "@/lib/localPreview";
import { getMockUser } from "@/lib/mockAuth";
import {
  calculateStudentProfileCompletion,
  createEmptyStudentProfile,
  studentProfileOptions,
  type StudentProfile,
  type StudentProfileCompletion
} from "@/lib/studentProfile";

type ActiveUser = {
  name: string;
  email: string;
};

type ProfileResponse = {
  profile?: StudentProfile;
  completion?: StudentProfileCompletion;
  error?: string;
};

const completionAccentClass = (percentage: number) => {
  if (percentage >= 100) {
    return "from-emerald-500 to-teal-500";
  }

  if (percentage >= 60) {
    return "from-sky-500 to-blue-600";
  }

  return "from-amber-400 to-orange-500";
};

function getDisplayNameFromEmail(email: string) {
  return email
    .split("@")[0]
    .split(/[._-]+/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

function buildActiveUser(sessionUser?: {
  name?: string | null;
  email?: string | null;
}) {
  if (!sessionUser?.email) {
    return null;
  }

  return {
    name: sessionUser.name?.trim() || getDisplayNameFromEmail(sessionUser.email),
    email: sessionUser.email
  } satisfies ActiveUser;
}

function Field({
  label,
  children,
  hint
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
        {label}
      </span>
      {children}
      {hint ? (
        <span className="mt-2 block text-xs leading-5 text-slate-500">{hint}</span>
      ) : null}
    </label>
  );
}

function Input({
  value,
  onChange,
  placeholder
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="h-12 w-full rounded-[1.1rem] border border-slate-200 bg-white px-4 text-sm text-slate-950 outline-none transition focus:border-sky-400 focus:shadow-[0_0_0_4px_rgba(56,189,248,0.12)]"
    />
  );
}

function Select({
  value,
  options,
  onChange,
  placeholder
}: {
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-12 w-full rounded-[1.1rem] border border-slate-200 bg-white px-4 text-sm text-slate-950 outline-none transition focus:border-sky-400 focus:shadow-[0_0_0_4px_rgba(56,189,248,0.12)]"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [user, setUser] = useState<ActiveUser | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [profile, setProfile] = useState<StudentProfile>(createEmptyStudentProfile());
  const [completion, setCompletion] = useState<StudentProfileCompletion>(
    calculateStudentProfileCompletion(createEmptyStudentProfile())
  );
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const isV2Experience = pathname.startsWith("/v2");
  const homeHref = isV2Experience ? "/v2" : "/";
  const authHref = isV2Experience ? "/v2/register" : "/login";
  const chatHref = isV2Experience ? "/v2/chat" : "/dashboard";
  const counterpartHref = isV2Experience ? "/profile" : "/v2/profile";

  useEffect(() => {
    const mockUser = getMockUser();
    const sessionUser = buildActiveUser(session?.user);
    const activeUser =
      sessionUser ??
      (mockUser
        ? {
            name: mockUser.name,
            email: mockUser.email
          }
        : null);

    if (status === "loading") {
      return;
    }

    if (activeUser) {
      setUser(activeUser);
      setIsCheckingAuth(false);
      return;
    }

    if (isLocalPreviewHost()) {
      setUser(LOCAL_PREVIEW_USER);
      setIsCheckingAuth(false);
      return;
    }

    router.replace(authHref);
  }, [authHref, router, session?.user, status]);

  useEffect(() => {
    if (!user) {
      return;
    }

    let isMounted = true;

    async function loadProfile() {
      setIsLoadingProfile(true);
      setLoadError("");

      try {
        const response = await fetch("/api/profile", {
          headers: getClientRequestHeaders(user ?? undefined)
        });
        const data = (await response.json()) as ProfileResponse;

        if (!response.ok || !data.profile || !data.completion) {
          throw new Error(data.error || "Unable to load your profile.");
        }

        if (!isMounted) {
          return;
        }

        setProfile(data.profile);
        setCompletion(data.completion);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setLoadError(
          error instanceof Error ? error.message : "Unable to load your profile."
        );
      } finally {
        if (isMounted) {
          setIsLoadingProfile(false);
        }
      }
    }

    void loadProfile();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const liveCompletion = useMemo(
    () => calculateStudentProfileCompletion(profile),
    [profile]
  );

  const updateField = (field: keyof StudentProfile, value: string) => {
    setProfile((current) => ({
      ...current,
      [field]: value
    }));
    setSaveMessage("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      return;
    }

    setIsSaving(true);
    setLoadError("");
    setSaveMessage("");

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getClientRequestHeaders(user ?? undefined)
        },
        body: JSON.stringify({ profile })
      });
      const data = (await response.json()) as ProfileResponse;

      if (!response.ok || !data.profile || !data.completion) {
        throw new Error(data.error || "Unable to save your profile.");
      }

      setProfile(data.profile);
      setCompletion(data.completion);
      setSaveMessage("Profile saved. Guidon will now use this context in chat.");
      trackAnalyticsEvent("profile_saved", {
        completion_percentage: data.completion.percentage,
        has_target_university: Boolean(data.profile.targetUniversity),
        has_course_interest: Boolean(data.profile.courseInterest),
        has_budget_range: Boolean(data.profile.budgetRange),
        has_intake: Boolean(data.profile.intake)
      });
    } catch (error) {
      setLoadError(
        error instanceof Error ? error.message : "Unable to save your profile."
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-br from-white via-sky-50 to-blue-50 px-6">
        <div className="glass-card rounded-[28px] px-8 py-7 text-center">
          <div className="mx-auto mb-4 h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-sky-500" />
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
            Loading
          </p>
          <h1 className="mt-2 text-xl font-semibold text-slate-950">
            Opening your profile...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[100dvh] overflow-hidden">
      <AnimatedGradientBackground />
      <FloatingStudyIcons />

      <PageTransition className="relative z-10 flex h-[100dvh] min-h-[100dvh] flex-col overflow-hidden pt-safe">
        <PageTopIdentityHeader
          icon={Sparkles}
          label="Profile"
          homeHref={homeHref}
          actions={
            <VersionSwitchLink
              href={counterpartHref}
              label={isV2Experience ? "Current Version" : "Open V2"}
              fromVersion={isV2Experience ? "v2" : "current"}
              toVersion={isV2Experience ? "current" : "v2"}
              source={isV2Experience ? "v2_profile" : "current_profile"}
            />
          }
        />

        <main className="page-shell flex-1 min-h-0 pb-4 pt-1 tablet:pb-6">
          <div className="scrollbar-hidden h-full overflow-y-auto overscroll-contain pr-1 tablet:pr-2">
            <div className="space-y-3 pt-2 tablet:hidden">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700">
                Student Profile
              </p>
              <h1 className="mt-2 text-[1.9rem] font-semibold leading-tight text-slate-950">
                Complete your profile for smarter guidance.
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Add your university, budget, stage, and preferences so Guidon can answer with better context.
              </p>
            </div>

            <div className="glass-card rounded-[1.6rem] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                    Completion
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-slate-950">
                    {liveCompletion.percentage}%
                  </p>
                </div>
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-[1rem] bg-gradient-to-br ${completionAccentClass(
                    liveCompletion.percentage
                  )} text-white shadow-[0_16px_36px_rgba(59,130,246,0.2)]`}
                >
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${completionAccentClass(
                    liveCompletion.percentage
                  )}`}
                  style={{ width: `${liveCompletion.percentage}%` }}
                />
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {liveCompletion.completedFields} of {liveCompletion.totalFields} key fields are filled.
              </p>
            </div>
          </div>

            <div className="mt-6 grid gap-4 pb-4 laptop:grid-cols-[1.08fr_0.92fr] tablet:pb-6">
            <form onSubmit={handleSubmit} className="glass-card rounded-[2rem] p-5 tablet:p-7">
              <div className="hidden flex-wrap items-start justify-between gap-4 tablet:flex">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                    Student Profile
                  </p>
                  <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 tablet:text-[2.6rem]">
                    Complete your profile for smarter guidance.
                  </h1>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 tablet:text-base">
                    This profile helps Guidon answer with better context about your
                    university plans, visa stage, budget, and preferred explanation
                    style.
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-sky-100 bg-white/90 px-5 py-4 shadow-[0_16px_36px_rgba(14,116,144,0.08)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                    Destination
                  </p>
                  <p className="mt-2 text-xl font-semibold text-slate-950">
                    Ireland
                  </p>
                </div>
              </div>

              {isLoadingProfile ? (
                <div className="mt-8 flex min-h-[20rem] items-center justify-center rounded-[1.6rem] border border-slate-200/80 bg-white/70 text-sm text-slate-500">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading your profile...
                </div>
              ) : (
                <>
                  <section className="mt-8 grid gap-4 tablet:grid-cols-2">
                    <div className="tablet:col-span-2">
                      <p className="text-lg font-semibold text-slate-950">
                        Basic context
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        These details help Guidon avoid generic answers.
                      </p>
                    </div>

                    <Field label="Origin country">
                      <Input
                        value={profile.originCountry}
                        onChange={(value) => updateField("originCountry", value)}
                        placeholder="Example: India"
                      />
                    </Field>

                    <Field label="Current location">
                      <Input
                        value={profile.currentLocation}
                        onChange={(value) => updateField("currentLocation", value)}
                        placeholder="Example: Pune, Maharashtra"
                      />
                    </Field>
                  </section>

                  <section className="mt-8 grid gap-4 tablet:grid-cols-2">
                    <div className="tablet:col-span-2">
                      <p className="text-lg font-semibold text-slate-950">
                        Study plans
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Tell Guidon what you are targeting so it can keep advice
                        relevant.
                      </p>
                    </div>

                    <Field label="Target university">
                      <Input
                        value={profile.targetUniversity}
                        onChange={(value) => updateField("targetUniversity", value)}
                        placeholder="Example: UCD, Trinity, UL"
                      />
                    </Field>

                    <Field label="Target city">
                      <Input
                        value={profile.targetCity}
                        onChange={(value) => updateField("targetCity", value)}
                        placeholder="Example: Dublin, Cork, Limerick"
                      />
                    </Field>

                    <Field label="Course interest">
                      <Input
                        value={profile.courseInterest}
                        onChange={(value) => updateField("courseInterest", value)}
                        placeholder="Example: MSc Data Analytics"
                      />
                    </Field>

                    <Field label="Study level">
                      <Select
                        value={profile.studyLevel}
                        onChange={(value) => updateField("studyLevel", value)}
                        placeholder="Select your study level"
                        options={studentProfileOptions.studyLevels}
                      />
                    </Field>

                    <Field label="Preferred intake">
                      <Select
                        value={profile.intake}
                        onChange={(value) => updateField("intake", value)}
                        placeholder="Select your intake"
                        options={studentProfileOptions.intakes}
                      />
                    </Field>

                    <Field label="Budget range">
                      <Select
                        value={profile.budgetRange}
                        onChange={(value) => updateField("budgetRange", value)}
                        placeholder="Select your budget comfort"
                        options={studentProfileOptions.budgetRanges}
                      />
                    </Field>
                  </section>

                  <section className="mt-8 grid gap-4 tablet:grid-cols-2">
                    <div className="tablet:col-span-2">
                      <p className="text-lg font-semibold text-slate-950">
                        Planning stage
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        These stages help Guidon know whether to answer at an
                        exploration level or with action steps.
                      </p>
                    </div>

                    <Field label="Visa stage">
                      <Select
                        value={profile.visaStage}
                        onChange={(value) => updateField("visaStage", value)}
                        placeholder="Select your visa stage"
                        options={studentProfileOptions.visaStages}
                      />
                    </Field>

                    <Field label="Accommodation stage">
                      <Select
                        value={profile.accommodationStage}
                        onChange={(value) => updateField("accommodationStage", value)}
                        placeholder="Select your accommodation stage"
                        options={studentProfileOptions.accommodationStages}
                      />
                    </Field>
                  </section>

                  <section className="mt-8 grid gap-4 tablet:grid-cols-2">
                    <div className="tablet:col-span-2">
                      <p className="text-lg font-semibold text-slate-950">
                        Guidance preferences
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        This shapes how the AI explains things to you.
                      </p>
                    </div>

                    <Field label="Preferred language">
                      <Select
                        value={profile.languagePreference}
                        onChange={(value) => updateField("languagePreference", value)}
                        placeholder="Select your preferred language"
                        options={studentProfileOptions.languagePreferences}
                      />
                    </Field>

                    <Field label="Support style">
                      <Select
                        value={profile.supportStyle}
                        onChange={(value) => updateField("supportStyle", value)}
                        placeholder="Select how you want answers"
                        options={studentProfileOptions.supportStyles}
                      />
                    </Field>

                    <div className="tablet:col-span-2">
                      <Field
                        label="Extra notes"
                        hint="Optional: add any special goal, concern, or constraint you want Guidon to remember."
                      >
                        <textarea
                          value={profile.notes}
                          onChange={(event) => updateField("notes", event.target.value)}
                          rows={5}
                          placeholder="Example: I need budget-friendly universities with good job prospects and simple step-by-step visa help."
                          className="w-full rounded-[1.1rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-sky-400 focus:shadow-[0_0_0_4px_rgba(56,189,248,0.12)]"
                        />
                      </Field>
                    </div>
                  </section>

                  {loadError ? (
                    <div className="mt-6 rounded-[1.3rem] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                      {loadError}
                    </div>
                  ) : null}

                  {saveMessage ? (
                    <div className="mt-6 rounded-[1.3rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                      {saveMessage}
                    </div>
                  ) : null}

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[1.2rem] bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Saving profile...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-4 w-4" />
                          Save profile
                        </>
                      )}
                    </button>

                    <Link
                      href={chatHref}
                      className="inline-flex min-h-[48px] items-center justify-center rounded-[1.2rem] border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                    >
                      Return to chat
                    </Link>
                  </div>
                </>
              )}
            </form>

            <aside className="hidden space-y-4 laptop:block">
              <div className="glass-card rounded-[2rem] p-5 tablet:p-6">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-[1rem] bg-gradient-to-br ${completionAccentClass(
                      liveCompletion.percentage
                    )} text-white shadow-[0_16px_36px_rgba(59,130,246,0.2)]`}
                  >
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                      Completion
                    </p>
                    <p className="mt-1 text-2xl font-semibold text-slate-950">
                      {liveCompletion.percentage}%
                    </p>
                  </div>
                </div>

                <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${completionAccentClass(
                      liveCompletion.percentage
                    )}`}
                    style={{ width: `${liveCompletion.percentage}%` }}
                  />
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {liveCompletion.completedFields} of {liveCompletion.totalFields} key
                  fields are filled. The more context you add, the better Guidon
                  can personalize university, visa, housing, and budget guidance.
                </p>
              </div>

              <div className="glass-card rounded-[2rem] p-5 tablet:p-6">
                <p className="text-lg font-semibold text-slate-950">
                  Still missing
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  These fields would improve the next answer most.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {liveCompletion.missingFields.length ? (
                    liveCompletion.missingFields.map((field) => (
                      <span
                        key={field}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600"
                      >
                        {field}
                      </span>
                    ))
                  ) : (
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
                      Profile complete
                    </span>
                  )}
                </div>
              </div>

              <div className="glass-card rounded-[2rem] p-5 tablet:p-6">
                <p className="text-lg font-semibold text-slate-950">
                  How Guidon uses this
                </p>
                <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                  <p>
                    Guidon uses your profile to make vague follow-ups easier to
                    understand.
                  </p>
                  <p>
                    It can tailor answers around your university target, course,
                    intake, budget, and planning stage.
                  </p>
                  <p>
                    Your support style and language preference help keep replies
                    more natural and easier to act on.
                  </p>
                </div>
              </div>

              {completion.percentage > 0 ? (
                <div className="glass-card rounded-[2rem] p-5 tablet:p-6">
                  <p className="text-lg font-semibold text-slate-950">
                    Last saved state
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Saved profile completion: {completion.percentage}%
                  </p>
                </div>
              ) : null}
            </aside>
            </div>
          </div>
        </main>
      </PageTransition>
    </div>
  );
}
