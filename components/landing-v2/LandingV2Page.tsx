"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowRight,
  Banknote,
  BookOpen,
  Bot,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock3,
  ExternalLink,
  Globe2,
  GraduationCap,
  HelpCircle,
  Home,
  Info,
  Instagram,
  Languages,
  LineChart,
  Linkedin,
  Link2,
  MessageCircle,
  MessageSquareText,
  Plane,
  ShieldCheck,
  Sparkles,
  UsersRound,
  type LucideIcon
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { BrandLogo } from "@/components/BrandLogo";
import { PageTransition } from "@/components/PageTransition";
import { PrivacyNotice } from "@/components/PrivacyNotice";
import { hasAcceptedPrivacy } from "@/lib/mockAuth";
import {
  DASHBOARD_STARTER_PROMPT_KEY,
  DEFAULT_STARTER_PROMPT,
  HOME_STARTER_PROMPTS
} from "@/lib/starterPrompts";

const heroBenefits = [
  "Visa paperwork",
  "Accommodation help",
  "Education loans",
  "University shortlists",
  "Trusted links",
  "Human support"
] as const;

const valueCards: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Chat-first planning",
    description:
      "Start with a question and break the Ireland journey into clearer next steps.",
    icon: Bot
  },
  {
    title: "Trusted resources",
    description:
      "Move into official links and references without losing the thread of the plan.",
    icon: ShieldCheck
  },
  {
    title: "Support when needed",
    description:
      "Step into buddy help or expert guidance when self-serve answers are not enough.",
    icon: UsersRound
  }
] as const;

const capabilityCards: {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
}[] = [
  {
    title: "Visa guidance",
    description:
      "Understand timelines, paperwork, and the first actions to take for Ireland student visas.",
    icon: Plane
  },
  {
    title: "Housing help",
    description:
      "Compare accommodation options and figure out what matters before you commit.",
    icon: Home
  },
  {
    title: "Education loans",
    description:
      "Plan funding questions, living costs, and loan-related decisions with more clarity.",
    icon: Banknote
  },
  {
    title: "Universities & courses",
    description:
      "Shortlist universities and compare courses by fit, budget, and career goals.",
    icon: GraduationCap
  },
  {
    title: "Hinglish / multilingual support",
    description:
      "Use the assistant in the language you naturally switch between while planning.",
    icon: Languages
  },
  {
    title: "Resource Hub",
    description:
      "Browse essential Ireland study links without getting lost in a long scrolling page.",
    icon: Link2,
    href: "/important-links"
  },
  {
    title: "Currency Check",
    description:
      "Keep EUR and INR planning visible as the exchange tool grows into a bigger calculator.",
    icon: LineChart,
    href: "/currency-check"
  },
  {
    title: "Buddy & Expert Help",
    description:
      "Move from self-serve planning into real support when you need local or expert help.",
    icon: UsersRound,
    href: "/support"
  }
] as const;

const processSteps = [
  {
    title: "Start with chat",
    description:
      "Ask one real question and use the assistant to organize the Ireland journey into something manageable.",
    icon: MessageSquareText
  },
  {
    title: "Open the Resource Hub",
    description:
      "Pull in essential links and references once you know which part of the journey you are solving first.",
    icon: Link2
  },
  {
    title: "Track the important topics",
    description:
      "Keep visas, housing, loans, courses, and budgeting visible instead of researching them separately.",
    icon: Clock3
  },
  {
    title: "Reach support when needed",
    description:
      "Use buddy help or expert support when the decision matters too much to leave vague.",
    icon: UsersRound
  }
] as const;

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
    icon: Building2
  },
  {
    title: "Guidance with support",
    description:
      "Use chat for clarity, resources for trusted links, and support options when you want a little extra help.",
    icon: MessageSquareText
  }
] as const;

function SectionLabel({
  eyebrow,
  title,
  description,
  align = "left"
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-700">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-[2rem] font-semibold leading-tight text-slate-950 tablet:text-[3rem]">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-slate-600 tablet:text-lg tablet:leading-8">
        {description}
      </p>
    </div>
  );
}

function PreviewFrame({
  label,
  children,
  className = ""
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.08)] ${className}`.trim()}
    >
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 text-xs font-medium text-slate-500">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
        </div>
        <span>{label}</span>
      </div>
      {children}
    </div>
  );
}

function HeroCanvas() {
  return (
    <div className="relative min-h-[28rem] overflow-hidden rounded-[2.2rem] border border-slate-200 bg-[#efefed] shadow-[0_22px_70px_rgba(15,23,42,0.08)] tablet:min-h-[38rem]">
      <div className="absolute inset-0">
        <Image
          src="/homepage-hero-left.png"
          alt="Dublin riverside skyline"
          fill
          sizes="(min-width: 900px) 42vw, 100vw"
          className="object-cover object-center opacity-[0.12] grayscale"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.45),rgba(239,239,237,0.82))]" />
      </div>

      <div className="relative flex h-full flex-col justify-between px-5 py-5 tablet:px-7 tablet:py-6">
        <div className="flex items-center justify-between gap-3">
          <div className="rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-600">
            Guidon workspace
          </div>
          <div className="rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-600">
            AI + resources + support
          </div>
        </div>

        <div className="mx-auto w-full max-w-[28rem] rounded-[1.65rem] border border-slate-200 bg-white px-5 py-4 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                Start with one question
              </p>
              <p className="mt-2 text-lg font-semibold leading-7 text-slate-900 tablet:text-[1.55rem]">
                Help me plan my Ireland study journey
              </p>
            </div>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500">
              <ArrowRight className="h-4.5 w-4.5" />
            </div>
          </div>
        </div>

        <div className="grid gap-3 tablet:grid-cols-2">
          <div className="rounded-[1.45rem] border border-white/80 bg-white/92 p-4 shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700">
              Resource Hub
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Student essentials", "Finance", "Housing"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[1.45rem] border border-white/80 bg-slate-950 p-4 text-white shadow-[0_10px_28px_rgba(15,23,42,0.12)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-200">
              Currency + support
            </p>
            <p className="mt-3 text-base font-semibold">
              EUR / INR planning and human guidance stay visible in the journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AssistantSpotlightPreview({
  onStartChat
}: {
  onStartChat: (prompt: string) => void;
}) {
  return (
    <PreviewFrame label="Guidon AI assistant">
      <div className="space-y-4 bg-[#fafafa] p-4">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[1rem] bg-sky-50 text-sky-700">
              <Bot className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Ask for clarity, not just answers
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                The assistant can help compare universities, explain visa steps,
                plan education loans, and turn the journey into a calmer list
                of next actions.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 tablet:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-3">
            <div className="rounded-[1.3rem] bg-slate-950 px-4 py-3 text-sm font-medium text-white">
              Help me compare MSc Data Analytics courses in Ireland.
            </div>
            <div className="rounded-[1.3rem] bg-white px-4 py-3 text-sm leading-6 text-slate-600">
              We can shortlist by budget, city, course fit, and career
              outcomes, then map the practical next steps.
            </div>
          </div>

          <div className="rounded-[1.3rem] border border-slate-200 bg-white p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700">
              Start with a plan
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {HOME_STARTER_PROMPTS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => onStartChat(item.prompt)}
                  className="rounded-[1rem] border border-slate-200 bg-slate-50 px-3 py-3 text-left text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-white"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

function ResourceSpotlightPreview() {
  return (
    <PreviewFrame label="Guidon Resource Hub">
      <div className="space-y-3 bg-[#fafafa] p-4">
        {[
          {
            title: "Student Essentials",
            note: "Open first for the most useful links.",
            active: true
          },
          {
            title: "Housing",
            note: "Accommodation resources and living basics."
          },
          {
            title: "Finance",
            note: "Funding, budgeting, and money planning."
          },
          {
            title: "Community",
            note: "Practical student support and local help."
          }
        ].map((item) => (
          <div
            key={item.title}
            className={`rounded-[1.35rem] border p-4 ${
              item.active
                ? "border-sky-200 bg-white"
                : "border-slate-200 bg-white/80"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                <p className="mt-1 text-xs text-slate-500">{item.note}</p>
              </div>
              <ChevronDown
                className={`h-4 w-4 ${
                  item.active ? "text-sky-700" : "text-slate-400"
                }`}
              />
            </div>

            {item.active ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {["Immigration", "CAO", "Budget", "Student support"].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
}

function CurrencySpotlightPreview() {
  return (
    <PreviewFrame label="Currency Check">
      <div className="space-y-4 bg-[#fafafa] p-4">
        <div className="grid gap-3 tablet:grid-cols-2">
          <div className="rounded-[1.35rem] border border-slate-200 bg-white p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700">
              EUR / INR
            </p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">
              Rate awareness
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              A dedicated place for exchange-rate planning while students budget
              tuition and living costs.
            </p>
          </div>
          <div className="rounded-[1.35rem] border border-slate-200 bg-slate-950 p-4 text-white">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-200">
              Target alerts
            </p>
            <p className="mt-3 text-base font-semibold">
              Email and browser notifications when the rate reaches the target.
            </p>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
          <svg viewBox="0 0 320 160" className="h-[12rem] w-full" aria-hidden="true">
            <path
              d="M20 136 H300"
              stroke="rgba(148,163,184,0.32)"
              strokeWidth="1"
            />
            <path
              d="M20 110 C44 94, 60 122, 92 88 S148 66, 182 82 S236 124, 268 58 S292 34, 300 42"
              fill="none"
              stroke="#111827"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <path
              d="M20 72 H300"
              stroke="#38bdf8"
              strokeWidth="2"
              strokeDasharray="7 7"
            />
            <circle cx="300" cy="42" r="5" fill="#111827" />
          </svg>
          <div className="mt-3 flex items-center justify-between gap-3 text-xs font-medium text-slate-500">
            <span>30D</span>
            <span>90D</span>
            <span>1Y</span>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

function SupportSpotlightPreview() {
  return (
    <PreviewFrame label="Buddy & Expert Help">
      <div className="grid gap-4 bg-[#fafafa] p-4 tablet:grid-cols-2">
        <div className="rounded-[1.45rem] border border-slate-200 bg-white p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700">
            Need a buddy?
          </p>
          <p className="mt-3 text-base font-semibold text-slate-950">
            Get practical help for local questions, viewings, and student reality checks.
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
              Accommodation support
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
              Local practical guidance
            </li>
          </ul>
        </div>

        <div className="rounded-[1.45rem] border border-slate-200 bg-slate-950 p-4 text-white">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-200">
            Need expert advice?
          </p>
          <p className="mt-3 text-base font-semibold">
            Reach stronger help for visas, loans, universities, and key planning calls.
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-white/75">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
              Escalate important decisions
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
              Get clarity before committing
            </li>
          </ul>
        </div>
      </div>
    </PreviewFrame>
  );
}

export function LandingV2Page() {
  const router = useRouter();
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    if (!hasAcceptedPrivacy()) {
      setIsPrivacyOpen(true);
    }
  }, []);

  const openStarterChat = (prompt: string) => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(DASHBOARD_STARTER_PROMPT_KEY, prompt);
    }

    router.push("/login");
  };

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden bg-[#fcfcfb]">
      <div className="absolute inset-0 bg-[#fcfcfb]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.055) 1px, transparent 1px)",
          backgroundSize: "76px 76px",
          maskImage:
            "linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,0.68), rgba(255,255,255,0.88))"
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[26rem] bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.14),transparent_32%),radial-gradient(circle_at_top_right,rgba(125,211,252,0.12),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.72),transparent)]" />

      <PageTransition className="relative z-10 flex min-h-[100dvh] flex-col">
        <header className="page-shell pt-safe py-5 tablet:py-6">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/landing-v2"
              className="inline-flex min-h-[44px] items-center rounded-[1.1rem] bg-transparent px-1 py-1"
            >
              <BrandLogo size="sm" priority className="w-[138px] tablet:w-[158px]" />
            </Link>

            <nav className="hidden items-center gap-7 text-[15px] font-medium text-slate-700 laptop:flex">
              <a href="#features" className="transition hover:text-slate-950">
                Product
              </a>
              <a href="#how-it-works" className="transition hover:text-slate-950">
                Journey
              </a>
              <a href="#spotlights" className="transition hover:text-slate-950">
                Resources
              </a>
              <a href="#faq-section" className="transition hover:text-slate-950">
                FAQ
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="hidden text-[15px] font-medium text-slate-700 transition hover:text-slate-950 tablet:inline-flex"
              >
                Current Home
              </Link>
              <Link
                href="/login"
                className="inline-flex min-h-[48px] items-center justify-center rounded-[0.95rem] bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
              >
                Join Us
              </Link>
            </div>
          </div>
        </header>

        <main className="page-shell flex-1 pb-12 tablet:pb-16">
          <section className="pb-10 pt-6 tablet:pb-12 tablet:pt-10">
            <div className="grid gap-10 laptop:grid-cols-[minmax(0,0.88fr)_minmax(360px,1.12fr)] laptop:items-center">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                  <Sparkles className="h-3.5 w-3.5" />
                  Built for Indian students moving to Ireland
                </div>

                <h1 className="mt-7 max-w-[10.5ch] text-[3.1rem] font-semibold leading-[0.98] tracking-[-0.03em] text-slate-950 tablet:text-[4.8rem] laptop:text-[5.3rem]">
                  Your Companion for visa, housing, loan, & university
                </h1>

                <p className="mt-6 max-w-xl text-[1.05rem] leading-8 text-slate-600 tablet:text-[1.22rem]">
                  A calm planning space for Indian students preparing to study
                  in Ireland - visa paperwork, accommodation, education loans,
                  university shortlists, and course decisions, all in one place.
                </p>

                <div className="mt-8 flex flex-col gap-3 tablet:flex-row tablet:flex-wrap">
                  <button
                    type="button"
                    onClick={() => openStarterChat(DEFAULT_STARTER_PROMPT)}
                    className="inline-flex min-h-[56px] items-center justify-center rounded-[0.95rem] bg-slate-950 px-6 py-3 text-base font-semibold text-white transition hover:bg-slate-900"
                  >
                    Start Chat
                  </button>
                  <Link
                    href="/important-links"
                    className="inline-flex min-h-[56px] items-center justify-center rounded-[0.95rem] border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-900 transition hover:border-slate-400"
                  >
                    Resource Hub
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap gap-2.5">
                  {heroBenefits.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <HeroCanvas />
            </div>
          </section>

          <section className="pb-10 tablet:pb-14">
            <div className="grid gap-4 tablet:grid-cols-3">
              {valueCards.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,0.04)]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-sky-50 text-sky-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 text-lg font-semibold text-slate-950">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          <section id="features" className="pb-10 pt-6 tablet:pb-16 tablet:pt-10">
            <SectionLabel
              eyebrow="Product"
              title="Keep the real Guidon content, but present it in a cleaner product format"
              description="This preview does not invent a new product. It reframes the current work with stronger hierarchy, more breathing space, and a clearer landing-page narrative."
              align="center"
            />

            <div className="mt-10 grid gap-4 tablet:grid-cols-2 laptop:grid-cols-4">
              {capabilityCards.map((item) => {
                const Icon = item.icon;

                const card = (
                  <div className="group h-full rounded-[1.7rem] border border-slate-200 bg-white p-5 shadow-[0_12px_36px_rgba(15,23,42,0.04)] transition hover:-translate-y-1">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-slate-100 text-slate-900">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 text-lg font-semibold text-slate-950">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                    {item.href ? (
                      <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                        Open
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      </div>
                    ) : null}
                  </div>
                );

                return item.href ? (
                  <Link key={item.title} href={item.href} className="h-full">
                    {card}
                  </Link>
                ) : (
                  <div key={item.title}>{card}</div>
                );
              })}
            </div>
          </section>

          <section id="how-it-works" className="pb-10 pt-6 tablet:pb-16 tablet:pt-10">
            <SectionLabel
              eyebrow="Journey"
              title="The workflow is simple when the page tells the story in the right order"
              description="The LiveChatAI influence here is less about copying visuals and more about using the same conversion-first rhythm: clear hero, clear steps, clear product areas, and repeated calls to action."
            />

            <div className="mt-10 grid gap-4 tablet:grid-cols-2 laptop:grid-cols-4">
              {processSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.title}
                    className="rounded-[1.7rem] border border-slate-200 bg-white p-5 shadow-[0_12px_36px_rgba(15,23,42,0.04)]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-slate-100 text-slate-900">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                        0{index + 1}
                      </span>
                    </div>
                    <p className="mt-5 text-lg font-semibold text-slate-950">
                      {step.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          <section id="spotlights" className="pb-10 pt-6 tablet:pb-16 tablet:pt-10">
            <div className="grid gap-12">
              <div className="grid gap-6 laptop:grid-cols-[minmax(0,0.92fr)_minmax(340px,1.08fr)] laptop:items-center">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-700">
                    AI assistant
                  </p>
                  <h3 className="mt-4 text-[2rem] font-semibold leading-tight text-slate-950 tablet:text-[2.9rem]">
                    Make chat the centerpiece, the way a SaaS homepage should
                  </h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">
                    Students already begin with chat in your product. This
                    redesign simply gives that flow the kind of framing and
                    polish that makes it feel intentional from the first scroll.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => openStarterChat(DEFAULT_STARTER_PROMPT)}
                      className="inline-flex min-h-[50px] items-center justify-center rounded-[0.95rem] bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
                    >
                      Start Chat
                    </button>
                    <Link
                      href="/dashboard"
                      className="inline-flex min-h-[50px] items-center justify-center rounded-[0.95rem] border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400"
                    >
                      Dashboard
                    </Link>
                  </div>
                </div>

                <AssistantSpotlightPreview onStartChat={openStarterChat} />
              </div>

              <div className="grid gap-6 laptop:grid-cols-[minmax(340px,1.04fr)_minmax(0,0.96fr)] laptop:items-center">
                <ResourceSpotlightPreview />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-700">
                    Resource Hub
                  </p>
                  <h3 className="mt-4 text-[2rem] font-semibold leading-tight text-slate-950 tablet:text-[2.9rem]">
                    Show the important-links experience as a real product promise
                  </h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">
                    The content stays the same. The difference is that the
                    landing page makes the Resource Hub feel like a designed
                    second step instead of just another utility page.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/important-links"
                      className="inline-flex min-h-[50px] items-center justify-center rounded-[0.95rem] bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
                    >
                      Open Resource Hub
                    </Link>
                    <div className="inline-flex min-h-[50px] items-center rounded-[0.95rem] border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-600">
                      Student Essentials stays first
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 laptop:grid-cols-[minmax(0,0.92fr)_minmax(340px,1.08fr)] laptop:items-center">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-700">
                    Currency Check
                  </p>
                  <h3 className="mt-4 text-[2rem] font-semibold leading-tight text-slate-950 tablet:text-[2.9rem]">
                    Give forex planning a clear place in the product story
                  </h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">
                    Even before the full alert flow is finished, the landing
                    page can already present exchange-rate awareness as part of
                    the student planning stack.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/currency-check"
                      className="inline-flex min-h-[50px] items-center justify-center rounded-[0.95rem] bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
                    >
                      Open Currency Check
                    </Link>
                    <div className="inline-flex min-h-[50px] items-center rounded-[0.95rem] border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-600">
                      EUR / INR planning view
                    </div>
                  </div>
                </div>

                <CurrencySpotlightPreview />
              </div>

              <div className="grid gap-6 laptop:grid-cols-[minmax(340px,1.04fr)_minmax(0,0.96fr)] laptop:items-center">
                <SupportSpotlightPreview />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-700">
                    Support
                  </p>
                  <h3 className="mt-4 text-[2rem] font-semibold leading-tight text-slate-950 tablet:text-[2.9rem]">
                    Make it obvious that the product can move beyond AI when needed
                  </h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">
                    Guidon already has the support destination. The redesign
                    simply makes it more visible that students can reach buddy
                    help or expert advice inside the same ecosystem.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/support"
                      className="inline-flex min-h-[50px] items-center justify-center rounded-[0.95rem] bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
                    >
                      Open Support
                    </Link>
                    <div className="inline-flex min-h-[50px] items-center rounded-[0.95rem] border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-600">
                      Buddy help + expert advice
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="faq-section" className="pb-10 pt-6 tablet:pb-16 tablet:pt-10">
            <div className="grid gap-8 laptop:grid-cols-[minmax(0,0.84fr)_minmax(360px,1.16fr)]">
              <SectionLabel
                eyebrow="FAQ"
                title="Common questions, answered simply"
                description="The content stays grounded in the current homepage. It is just surfaced as part of the landing story instead of hiding behind modal-first interaction."
              />

              <div className="space-y-3">
                {homepageFaqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;

                  return (
                    <div
                      key={faq.question}
                      className="rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.04)]"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenFaqIndex((current) =>
                            current === index ? null : index
                          )
                        }
                        className="flex min-h-[58px] w-full items-center justify-between gap-4 px-4 py-4 text-left tablet:px-5"
                      >
                        <span className="text-sm font-semibold leading-6 text-slate-900 tablet:text-base">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 text-slate-900 transition ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen ? (
                        <div className="border-t border-slate-100 px-4 pb-4 pt-3 tablet:px-5">
                          <p className="text-sm leading-7 text-slate-600">
                            {faq.answer}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section id="about-section" className="pb-10 pt-6 tablet:pb-16 tablet:pt-10">
            <div className="grid gap-8 laptop:grid-cols-[minmax(0,0.88fr)_minmax(360px,1.12fr)] laptop:items-start">
              <SectionLabel
                eyebrow="About Us"
                title="A calm planning companion for students heading to Ireland"
                description="Guidon is being shaped as a simple, reassuring space for Indian students who want clarity across visas, housing, budgets, universities, and support without feeling overwhelmed. Built with the real experience of students and peers who have been through the Ireland student journey firsthand."
              />

              <div className="grid gap-3">
                {aboutHighlights.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.04)]"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem] bg-slate-100 text-slate-900">
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <div>
                          <p className="text-base font-semibold text-slate-950">
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
            </div>
          </section>

          <section className="pb-6 pt-6 tablet:pb-10 tablet:pt-10">
            <div className="rounded-[2.2rem] border border-slate-200 bg-white px-5 py-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)] tablet:px-8 tablet:py-10">
              <div className="grid gap-6 laptop:grid-cols-[minmax(0,1fr)_auto] laptop:items-center">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-700">
                    Ready to begin
                  </p>
                  <h2 className="mt-4 text-[2rem] font-semibold leading-tight text-slate-950 tablet:text-[3rem]">
                    Keep the current product. Upgrade the way it is introduced.
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 tablet:text-lg">
                    This separate route keeps your current homepage safe while
                    showing how the same Guidon content can live inside a more
                    polished SaaS-style landing experience.
                  </p>
                </div>

                <div className="flex flex-col gap-3 tablet:flex-row laptop:flex-col laptop:min-w-[16rem]">
                  <button
                    type="button"
                    onClick={() => openStarterChat(DEFAULT_STARTER_PROMPT)}
                    className="inline-flex min-h-[52px] items-center justify-center rounded-[0.95rem] bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
                  >
                    Start Chat
                  </button>
                  <Link
                    href="/important-links"
                    className="inline-flex min-h-[52px] items-center justify-center rounded-[0.95rem] border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400"
                  >
                    Resource Hub
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="page-shell pb-safe pb-6 tablet:pb-8">
          <div className="flex flex-col gap-3 border-t border-slate-200 py-5 text-xs text-slate-500 tablet:flex-row tablet:items-center tablet:justify-between">
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
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1 tablet:justify-end">
              <a
                href="#faq-section"
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full px-3 py-2 font-semibold text-slate-600 transition hover:text-slate-900"
              >
                <HelpCircle className="h-3.5 w-3.5" />
                FAQ
              </a>
              <span className="text-slate-300" aria-hidden="true">
                &middot;
              </span>
              <a
                href="#about-section"
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full px-3 py-2 font-semibold text-slate-600 transition hover:text-slate-900"
              >
                <Info className="h-3.5 w-3.5" />
                About Us
              </a>
              <span className="text-slate-300" aria-hidden="true">
                &middot;
              </span>
              <button
                type="button"
                onClick={() => setIsPrivacyOpen(true)}
                className="inline-flex min-h-[40px] items-center rounded-full px-3 py-2 font-semibold text-sky-700 transition hover:text-sky-800"
              >
                Privacy Notice
              </button>
            </div>
          </div>
        </footer>
      </PageTransition>

      <PrivacyNotice
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </div>
  );
}
