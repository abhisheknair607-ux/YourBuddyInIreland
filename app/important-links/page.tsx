"use client";

import {
  ArrowLeft,
  Banknote,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Bus,
  Car,
  ExternalLink,
  HeartPulse,
  Home,
  Plane,
  Search,
  ShieldCheck,
  UsersRound,
  Zap
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { AnimatedGradientBackground } from "@/components/AnimatedGradientBackground";
import { BrandLogo } from "@/components/BrandLogo";
import { PageTransition } from "@/components/PageTransition";
import {
  importantReferenceSections,
  type ImportantReferenceSection
} from "@/lib/importantLinks";

const toneStyles: Record<
  ImportantReferenceSection["tone"],
  {
    icon: string;
    ring: string;
    chip: string;
    text: string;
  }
> = {
  sky: {
    icon: "bg-sky-50 text-sky-700",
    ring: "border-sky-100",
    chip: "border-sky-200 bg-sky-50 text-sky-700",
    text: "text-sky-700"
  },
  blue: {
    icon: "bg-blue-50 text-blue-700",
    ring: "border-blue-100",
    chip: "border-blue-200 bg-blue-50 text-blue-700",
    text: "text-blue-700"
  },
  violet: {
    icon: "bg-violet-50 text-violet-700",
    ring: "border-violet-100",
    chip: "border-violet-200 bg-violet-50 text-violet-700",
    text: "text-violet-700"
  },
  amber: {
    icon: "bg-amber-50 text-amber-700",
    ring: "border-amber-100",
    chip: "border-amber-200 bg-amber-50 text-amber-700",
    text: "text-amber-700"
  },
  emerald: {
    icon: "bg-emerald-50 text-emerald-700",
    ring: "border-emerald-100",
    chip: "border-emerald-200 bg-emerald-50 text-emerald-700",
    text: "text-emerald-700"
  },
  rose: {
    icon: "bg-rose-50 text-rose-700",
    ring: "border-rose-100",
    chip: "border-rose-200 bg-rose-50 text-rose-700",
    text: "text-rose-700"
  },
  teal: {
    icon: "bg-teal-50 text-teal-700",
    ring: "border-teal-100",
    chip: "border-teal-200 bg-teal-50 text-teal-700",
    text: "text-teal-700"
  },
  indigo: {
    icon: "bg-indigo-50 text-indigo-700",
    ring: "border-indigo-100",
    chip: "border-indigo-200 bg-indigo-50 text-indigo-700",
    text: "text-indigo-700"
  },
  orange: {
    icon: "bg-orange-50 text-orange-700",
    ring: "border-orange-100",
    chip: "border-orange-200 bg-orange-50 text-orange-700",
    text: "text-orange-700"
  },
  slate: {
    icon: "bg-slate-100 text-slate-700",
    ring: "border-slate-200",
    chip: "border-slate-200 bg-slate-100 text-slate-700",
    text: "text-slate-700"
  }
};

const sectionIcons = {
  "student-essentials": ShieldCheck,
  education: BookOpen,
  immigration: Plane,
  housing: Home,
  finance: Banknote,
  healthcare: HeartPulse,
  employment: BriefcaseBusiness,
  transport: Bus,
  utilities: Zap,
  driving: Car,
  community: UsersRound
};

function matchesQuery(section: ImportantReferenceSection, query: string) {
  if (!query) {
    return section;
  }

  const normalizedQuery = query.toLowerCase();
  const filteredItems = section.items
    .map((item) => {
      const itemText = `${section.title} ${item.title} ${item.description}`.toLowerCase();
      const matchingLinks = item.links.filter((link) =>
        `${link.label} ${link.url}`.toLowerCase().includes(normalizedQuery)
      );

      if (itemText.includes(normalizedQuery)) {
        return item;
      }

      if (matchingLinks.length) {
        return {
          ...item,
          links: matchingLinks
        };
      }

      return null;
    })
    .filter(Boolean) as ImportantReferenceSection["items"];

  if (!filteredItems.length) {
    return null;
  }

  return {
    ...section,
    items: filteredItems
  };
}

export default function ImportantLinksPage() {
  const [query, setQuery] = useState("");
  const filteredSections = useMemo(
    () =>
      importantReferenceSections
        .map((section) => matchesQuery(section, query.trim()))
        .filter(Boolean) as ImportantReferenceSection[],
    [query]
  );

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden bg-slate-50">
      <AnimatedGradientBackground />

      <PageTransition className="relative z-10 flex min-h-[100dvh] flex-col">
        <header className="page-shell flex shrink-0 flex-col gap-3 py-4 tablet:flex-row tablet:items-center tablet:justify-between tablet:py-5">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center self-start rounded-[1.4rem] border border-white/70 bg-white/80 px-3 py-2 backdrop-blur-xl transition hover:border-slate-300 hover:bg-white"
          >
            <BrandLogo size="sm" priority className="w-[132px] tablet:w-[150px]" />
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 self-stretch rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-white tablet:self-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>
        </header>

        <main className="page-shell flex-1 pb-8 tablet:pb-10">
          <section className="py-3 tablet:py-6">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700">
                Resources Hub
              </p>
              <h1 className="mt-2 text-[1.7rem] font-semibold leading-tight text-slate-950 tablet:mt-3 tablet:text-[2.7rem]">
                Ireland student resources hub
              </h1>
            </div>
          </section>

          <div className="sticky top-0 z-20 -mx-3 border-y border-white/80 bg-slate-50/85 px-3 py-2 backdrop-blur-xl tablet:top-0 tablet:rounded-[1.5rem] tablet:border tablet:bg-white/70 tablet:py-3">
            <div className="flex flex-col gap-2.5 laptop:flex-row laptop:items-center">
              <label className="relative block w-full laptop:max-w-sm">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search links"
                  className="h-10 w-full rounded-full border border-slate-200 bg-white px-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:shadow-[0_0_0_4px_rgba(56,189,248,0.12)]"
                />
              </label>

              <nav className="thin-scrollbar flex gap-1.5 overflow-x-auto pb-1 laptop:pb-0">
                {importantReferenceSections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="shrink-0 rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700 tablet:px-3 tablet:py-2"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          <div className="mt-4 space-y-6 tablet:mt-6 tablet:space-y-8">
            {filteredSections.map((section) => {
              const Icon =
                sectionIcons[section.id as keyof typeof sectionIcons] ?? Building2;
              const tone = toneStyles[section.tone];

              return (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28"
                >
                  <div className="mb-3 flex items-center gap-2.5 tablet:mb-4 tablet:gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[1rem] tablet:h-11 tablet:w-11 tablet:rounded-[1.15rem] ${tone.icon}`}
                    >
                      <Icon className="h-4 w-4 tablet:h-5 tablet:w-5" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-lg font-semibold text-slate-950 tablet:text-2xl">
                        {section.title}
                      </h2>
                    </div>
                  </div>

                  <div className="grid gap-2.5 tablet:grid-cols-2 tablet:gap-3 laptop:grid-cols-3">
                    {section.items.map((item) => (
                      <article
                        key={`${section.id}-${item.title}`}
                        className={`flex min-h-0 flex-col rounded-[1.1rem] border bg-white/86 p-3 shadow-[0_14px_35px_rgba(15,23,42,0.06)] backdrop-blur-xl tablet:rounded-[1.35rem] tablet:p-4 ${tone.ring}`}
                      >
                        <div>
                          <h3 className="text-base font-semibold leading-snug text-slate-950">
                            {item.title}
                          </h3>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-1.5 tablet:mt-auto tablet:gap-2 tablet:pt-4">
                          {item.links.map((link) => (
                            <a
                              key={`${item.title}-${link.url}`}
                              href={link.url}
                              target="_blank"
                              rel="noreferrer"
                              className={`inline-flex min-h-[30px] items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition hover:scale-[1.01] tablet:min-h-[34px] tablet:gap-1.5 tablet:px-3 tablet:py-1.5 tablet:text-xs ${tone.chip}`}
                            >
                              <span className="max-w-[11rem] truncate tablet:max-w-[13rem]">
                                {link.label}
                              </span>
                              <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                            </a>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}

            {!filteredSections.length ? (
              <div className="rounded-[1.5rem] border border-slate-200 bg-white/80 px-5 py-8 text-center text-sm text-slate-500">
                No matching links found.
              </div>
            ) : null}
          </div>
        </main>
      </PageTransition>
    </div>
  );
}
