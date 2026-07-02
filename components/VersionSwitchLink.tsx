"use client";

import Link from "next/link";

import { trackAnalyticsEvent } from "@/lib/analytics";

type VersionSwitchLinkProps = {
  href: string;
  label: string;
  fromVersion: "current" | "v2";
  toVersion: "current" | "v2";
  source: string;
  className?: string;
};

export function VersionSwitchLink({
  href,
  label,
  fromVersion,
  toVersion,
  source,
  className = ""
}: VersionSwitchLinkProps) {
  return (
    <Link
      href={href}
      onClick={() =>
        trackAnalyticsEvent("version_switch_click", {
          from_version: fromVersion,
          to_version: toVersion,
          source
        })
      }
      className={`inline-flex min-h-[40px] items-center justify-center rounded-full border border-slate-200/80 bg-white/85 px-4 py-2 text-sm font-medium text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.05)] backdrop-blur-xl transition hover:border-slate-300 hover:bg-white hover:text-slate-950 ${className}`.trim()}
    >
      {label}
    </Link>
  );
}
