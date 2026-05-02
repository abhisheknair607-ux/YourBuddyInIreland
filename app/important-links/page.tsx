"use client";

import {
  Banknote,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Bus,
  Car,
  ChevronDown,
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
import { useEffect, useMemo, useRef, useState } from "react";

import { AnimatedGradientBackground } from "@/components/AnimatedGradientBackground";
import { BrandLogo } from "@/components/BrandLogo";
import { FloatingStudyIcons } from "@/components/FloatingStudyIcons";
import { PageTransition } from "@/components/PageTransition";
import {
  importantReferenceSections,
  type ImportantReferenceItem,
  type ImportantReferenceSection
} from "@/lib/importantLinks";

const DEFAULT_SECTION_ID = "student-essentials";
const PREVIEW_LINK_COUNT = 2;

const toneStyles: Record<
  ImportantReferenceSection["tone"],
  {
    icon: string;
    ring: string;
    chip: string;
    text: string;
    subtle: string;
  }
> = {
  sky: {
    icon: "bg-sky-50 text-sky-700",
    ring: "border-sky-100",
    chip: "border-sky-200 bg-sky-50 text-sky-700",
    text: "text-sky-700",
    subtle: "bg-sky-50/70 text-sky-700"
  },
  blue: {
    icon: "bg-blue-50 text-blue-700",
    ring: "border-blue-100",
    chip: "border-blue-200 bg-blue-50 text-blue-700",
    text: "text-blue-700",
    subtle: "bg-blue-50/70 text-blue-700"
  },
  violet: {
    icon: "bg-violet-50 text-violet-700",
    ring: "border-violet-100",
    chip: "border-violet-200 bg-violet-50 text-violet-700",
    text: "text-violet-700",
    subtle: "bg-violet-50/70 text-violet-700"
  },
  amber: {
    icon: "bg-amber-50 text-amber-700",
    ring: "border-amber-100",
    chip: "border-amber-200 bg-amber-50 text-amber-700",
    text: "text-amber-700",
    subtle: "bg-amber-50/70 text-amber-700"
  },
  emerald: {
    icon: "bg-emerald-50 text-emerald-700",
    ring: "border-emerald-100",
    chip: "border-emerald-200 bg-emerald-50 text-emerald-700",
    text: "text-emerald-700",
    subtle: "bg-emerald-50/70 text-emerald-700"
  },
  rose: {
    icon: "bg-rose-50 text-rose-700",
    ring: "border-rose-100",
    chip: "border-rose-200 bg-rose-50 text-rose-700",
    text: "text-rose-700",
    subtle: "bg-rose-50/70 text-rose-700"
  },
  teal: {
    icon: "bg-teal-50 text-teal-700",
    ring: "border-teal-100",
    chip: "border-teal-200 bg-teal-50 text-teal-700",
    text: "text-teal-700",
    subtle: "bg-teal-50/70 text-teal-700"
  },
  indigo: {
    icon: "bg-indigo-50 text-indigo-700",
    ring: "border-indigo-100",
    chip: "border-indigo-200 bg-indigo-50 text-indigo-700",
    text: "text-indigo-700",
    subtle: "bg-indigo-50/70 text-indigo-700"
  },
  orange: {
    icon: "bg-orange-50 text-orange-700",
    ring: "border-orange-100",
    chip: "border-orange-200 bg-orange-50 text-orange-700",
    text: "text-orange-700",
    subtle: "bg-orange-50/70 text-orange-700"
  },
  slate: {
    icon: "bg-slate-100 text-slate-700",
    ring: "border-slate-200",
    chip: "border-slate-200 bg-slate-100 text-slate-700",
    text: "text-slate-700",
    subtle: "bg-slate-100 text-slate-700"
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

type FilteredSection = ImportantReferenceSection;
type ExpandedItemsBySection = Record<string, string[]>;

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

function getItemKey(sectionId: string, item: ImportantReferenceItem) {
  return `${sectionId}-${item.title}`;
}

export default function ImportantLinksPage() {
  const [query, setQuery] = useState("");
  const [expandedSectionId, setExpandedSectionId] = useState(DEFAULT_SECTION_ID);
  const [expandedItemsBySection, setExpandedItemsBySection] =
    useState<ExpandedItemsBySection>({});
  const resultsPaneRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const normalizedQuery = query.trim();
  const isSearchActive = normalizedQuery.length > 0;

  const filteredSections = useMemo(
    () =>
      importantReferenceSections
        .map((section) => matchesQuery(section, normalizedQuery))
        .filter(Boolean) as FilteredSection[],
    [normalizedQuery]
  );

  const visibleSections = isSearchActive ? filteredSections : importantReferenceSections;

  useEffect(() => {
    if (isSearchActive) {
      return;
    }

    setExpandedSectionId(DEFAULT_SECTION_ID);
    setExpandedItemsBySection({});

    requestAnimationFrame(() => {
      resultsPaneRef.current?.scrollTo({
        top: 0,
        behavior: "auto"
      });
    });
  }, [isSearchActive]);

  function scrollSectionIntoResults(sectionId: string, behavior: ScrollBehavior = "smooth") {
    const resultsPane = resultsPaneRef.current;
    const sectionElement = sectionRefs.current[sectionId];

    if (!resultsPane || !sectionElement) {
      return;
    }

    const paneRect = resultsPane.getBoundingClientRect();
    const sectionRect = sectionElement.getBoundingClientRect();
    const nextTop = resultsPane.scrollTop + (sectionRect.top - paneRect.top) - 8;

    resultsPane.scrollTo({
      top: Math.max(nextTop, 0),
      behavior
    });
  }

  function handleSectionClick(sectionId: string) {
    setExpandedSectionId(sectionId);
    requestAnimationFrame(() => {
      scrollSectionIntoResults(sectionId);
    });
  }

  function toggleItem(sectionId: string, itemKey: string) {
    setExpandedItemsBySection((current) => {
      const sectionItems = current[sectionId] ?? [];
      const isExpanded = sectionItems.includes(itemKey);

      return {
        ...current,
        [sectionId]: isExpanded
          ? sectionItems.filter((key) => key !== itemKey)
          : [...sectionItems, itemKey]
      };
    });
  }

  return (
    <div className="relative h-[100dvh] overflow-hidden bg-slate-50">
      <AnimatedGradientBackground />
      <FloatingStudyIcons />

      <PageTransition className="relative z-10 flex h-[100dvh] min-h-[100dvh] flex-col overflow-hidden">
        <header className="page-shell shrink-0 py-3 tablet:py-5">
          <div className="grid grid-cols-[132px_minmax(0,132px)] items-center justify-between gap-2 tablet:flex tablet:items-center tablet:justify-between tablet:gap-3">
            <Link
              href="/"
              className="inline-flex h-[48px] w-[132px] shrink-0 items-center justify-center self-start overflow-hidden rounded-[1.2rem] border border-white/70 bg-white/80 px-2.5 py-1.5 shadow-[0_10px_24px_rgba(15,23,42,0.06)] backdrop-blur-xl transition hover:border-slate-300 hover:bg-white tablet:h-[52px] tablet:w-auto tablet:px-3 tablet:py-2"
            >
              <BrandLogo
                size="xs"
                priority
                className="w-[98px] max-w-[98px] shrink-0 tablet:w-[122px] tablet:max-w-[122px]"
              />
            </Link>

            <div className="inline-flex h-[48px] w-[132px] min-w-0 items-center justify-center gap-1 rounded-[1.2rem] border border-sky-200 bg-white/82 px-2 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-sky-700 shadow-[0_10px_24px_rgba(15,23,42,0.06)] backdrop-blur-xl tablet:h-[48px] tablet:w-auto tablet:gap-2 tablet:px-4 tablet:text-xs tablet:tracking-[0.18em]">
              <BookOpen className="h-3.5 w-3.5 shrink-0" />
              <span className="leading-none">Resources Hub</span>
            </div>
          </div>
        </header>

        <main className="page-shell flex-1 min-h-0 pb-4 pt-1 tablet:pb-6">
          <div className="flex h-full min-h-0 flex-col laptop:grid laptop:grid-cols-[224px_minmax(0,1fr)] laptop:gap-6">
            <div className="shrink-0 laptop:min-h-0">
              <div className="-mx-1.5 mt-2 border-y border-slate-200/60 bg-white/88 px-2 py-2 shadow-[0_4px_20px_rgba(15,23,42,0.06)] backdrop-blur-xl tablet:-mx-3 tablet:mt-3 tablet:px-3 tablet:py-2.5 laptop:mx-0 laptop:mt-0 laptop:flex laptop:h-full laptop:min-h-0 laptop:flex-col laptop:rounded-[1.5rem] laptop:border laptop:border-white/75 laptop:bg-white/80 laptop:p-3 laptop:shadow-[0_8px_32px_rgba(15,23,42,0.08)]">
                <label className="relative block w-full shrink-0">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search links, topics, or tools"
                    className="h-10 w-full rounded-full border border-slate-200/80 bg-white px-10 text-sm text-slate-900 shadow-[0_2px_8px_rgba(15,23,42,0.05)] outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:shadow-[0_0_0_4px_rgba(56,189,248,0.12)] tablet:h-11 laptop:rounded-[1.1rem]"
                  />
                </label>

                <nav className="scrollbar-hidden mt-2.5 flex gap-1.5 overflow-x-auto pb-0.5 laptop:min-h-0 laptop:flex-1 laptop:flex-col laptop:overflow-x-visible laptop:overflow-y-auto laptop:pb-0 laptop:gap-1">
                  {visibleSections.map((section) => {
                    const isActive =
                      !isSearchActive && expandedSectionId === section.id;

                    return (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => handleSectionClick(section.id)}
                        className={`shrink-0 rounded-full border px-2.5 py-1.5 text-xs font-medium transition tablet:px-3 tablet:py-2 laptop:w-full laptop:rounded-[1rem] laptop:px-3 laptop:py-2.5 laptop:text-left laptop:text-[13px] ${
                          isActive
                            ? "border-sky-200 bg-sky-50 text-sky-700 shadow-[0_2px_8px_rgba(56,189,248,0.18)]"
                            : "border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
                        }`}
                      >
                        {section.title}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            <div
              ref={resultsPaneRef}
              className="scrollbar-hidden mt-4 min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1 tablet:mt-5 tablet:pr-1.5 laptop:mt-0 laptop:pr-2"
            >
              <div className="space-y-4 pb-4 tablet:space-y-5 tablet:pb-6">
                {filteredSections.map((section) => {
                  const Icon =
                    sectionIcons[section.id as keyof typeof sectionIcons] ?? Building2;
                  const tone = toneStyles[section.tone];
                  const isExpanded =
                    isSearchActive || expandedSectionId === section.id;

                  return (
                    <section
                      key={section.id}
                      id={section.id}
                      ref={(node) => {
                        sectionRefs.current[section.id] = node;
                      }}
                      className={`scroll-mt-4 rounded-[1.3rem] border bg-white/88 p-3 shadow-[0_10px_28px_rgba(15,23,42,0.07)] backdrop-blur-xl transition-all duration-200 tablet:p-4 ${tone.ring} ${isExpanded ? "shadow-[0_18px_46px_rgba(15,23,42,0.1)]" : ""}`}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          if (isSearchActive) {
                            handleSectionClick(section.id);
                            return;
                          }

                          setExpandedSectionId(section.id);
                        }}
                        className="group flex w-full items-start gap-3 text-left"
                        aria-expanded={isExpanded}
                      >
                        <div
                          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.95rem] tablet:h-10 tablet:w-10 tablet:rounded-[1rem] ${tone.icon}`}
                        >
                          <Icon className="h-4 w-4 tablet:h-[18px] tablet:w-[18px]" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <h2 className="text-[1.05rem] font-semibold leading-tight text-slate-950 tablet:text-[1.2rem]">
                                {section.title}
                              </h2>
                              <p className="mt-1 text-sm leading-6 text-slate-600">
                                {section.description}
                              </p>
                            </div>

                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-slate-300 transition group-hover:text-slate-500 tablet:h-8 tablet:w-8">
                              <ChevronDown
                                className={`h-3.5 w-3.5 transition ${
                                  isExpanded ? "rotate-180" : ""
                                }`}
                              />
                            </div>
                          </div>
                        </div>
                      </button>

                      {isExpanded ? (
                        <div className="mt-3 grid gap-2.5 border-t border-slate-100 pt-3 tablet:grid-cols-2 tablet:gap-3 laptop:grid-cols-2">
                          {section.items.map((item) => {
                            const itemKey = getItemKey(section.id, item);
                            const isItemExpanded =
                              isSearchActive ||
                              (expandedItemsBySection[section.id] ?? []).includes(itemKey);
                            const shouldShowToggle =
                              !isSearchActive && item.links.length > PREVIEW_LINK_COUNT;
                            const visibleLinks = isItemExpanded
                              ? item.links
                              : item.links.slice(0, PREVIEW_LINK_COUNT);

                            return (
                              <article
                                key={itemKey}
                                className={`flex min-h-0 flex-col rounded-[1.25rem] border bg-white p-3.5 shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition hover:shadow-[0_12px_32px_rgba(15,23,42,0.09)] tablet:rounded-[1.35rem] tablet:p-4 ${tone.ring}`}
                              >
                                <div>
                                  <h3 className="text-[15px] font-semibold leading-snug text-slate-950">
                                    {item.title}
                                  </h3>
                                </div>

                                <div className="mt-3 flex flex-wrap gap-1.5 tablet:gap-2">
                                  {visibleLinks.map((link) => (
                                    <a
                                      key={`${itemKey}-${link.url}`}
                                      href={link.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className={`inline-flex min-h-[32px] items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold shadow-[0_2px_6px_rgba(15,23,42,0.06)] transition hover:brightness-[0.97] hover:shadow-[0_4px_12px_rgba(15,23,42,0.10)] tablet:min-h-[34px] tablet:gap-1.5 tablet:px-3 tablet:py-1.5 tablet:text-xs ${tone.chip}`}
                                    >
                                      <span className="max-w-[11rem] truncate tablet:max-w-[13rem]">
                                        {link.label}
                                      </span>
                                      <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                                    </a>
                                  ))}
                                </div>

                                {shouldShowToggle ? (
                                  <button
                                    type="button"
                                    onClick={() => toggleItem(section.id, itemKey)}
                                    className={`mt-3 inline-flex min-h-[30px] items-center self-start rounded-full border border-current/20 px-3 py-1 text-xs font-semibold transition hover:bg-slate-50 ${tone.text}`}
                                  >
                                    {isItemExpanded
                                      ? "Show less"
                                      : `View all ${item.links.length} links`}
                                  </button>
                                ) : null}
                              </article>
                            );
                          })}
                        </div>
                      ) : null}
                    </section>
                  );
                })}

                {!filteredSections.length ? (
                  <div className="rounded-[1.5rem] border border-slate-200 bg-white/80 px-5 py-10 text-center">
                    <Search className="mx-auto mb-3 h-8 w-8 text-slate-300" />
                    <p className="text-sm font-medium text-slate-500">No matching links found.</p>
                    <p className="mt-1 text-xs text-slate-400">
                      Try a different search term or browse a category above.
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </main>
      </PageTransition>
    </div>
  );
}
