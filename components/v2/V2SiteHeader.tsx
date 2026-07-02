import Link from "next/link";

import { BrandLogo } from "@/components/BrandLogo";
import { VersionSwitchLink } from "@/components/VersionSwitchLink";

type V2SiteHeaderProps = {
  currentHref?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

const navLinks = [
  { href: "/v2/demo", label: "Walkthrough" },
  { href: "/v2/chat", label: "Chat" },
  { href: "/v2/resources", label: "Resources" },
  { href: "/v2/forex", label: "Forex" },
  { href: "/v2/support", label: "Support" },
  { href: "/v2/profile", label: "Profile" },
  { href: "/v2/mentors", label: "Mentors" },
  { href: "/v2/docs", label: "Docs" }
] as const;

export function V2SiteHeader({
  currentHref = "/",
  ctaHref = "/v2/register",
  ctaLabel = "Join V2"
}: V2SiteHeaderProps) {
  return (
    <header className="page-shell pt-safe py-4 tablet:py-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[1.5rem] border border-white/75 bg-white/78 px-4 py-3 shadow-[0_16px_44px_rgba(15,23,42,0.06)] backdrop-blur-xl">
        <Link
          href="/v2"
          className="inline-flex min-h-[44px] items-center rounded-[1.2rem] px-1 py-1"
        >
          <BrandLogo size="sm" priority className="w-[138px] tablet:w-[156px]" />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 laptop:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-slate-950">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 tablet:gap-3">
          <VersionSwitchLink
            href={currentHref}
            label="Current Version"
            fromVersion="v2"
            toVersion="current"
            source="v2_header"
            className="hidden tablet:inline-flex"
          />
          <Link
            href={ctaHref}
            className="inline-flex min-h-[44px] items-center justify-center rounded-[0.95rem] bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-900"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </header>
  );
}
