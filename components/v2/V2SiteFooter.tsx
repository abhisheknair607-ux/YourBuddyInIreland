import Link from "next/link";

import { BrandLogo } from "@/components/BrandLogo";
import { VersionSwitchLink } from "@/components/VersionSwitchLink";

type V2SiteFooterProps = {
  currentHref?: string;
};

export function V2SiteFooter({ currentHref = "/" }: V2SiteFooterProps) {
  return (
    <footer className="page-shell pb-safe pb-8 pt-4 tablet:pb-10">
      <div className="rounded-[2rem] border border-white/75 bg-white/82 px-5 py-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur-xl tablet:px-6">
        <div className="flex flex-col gap-6 tablet:flex-row tablet:items-center tablet:justify-between">
          <div>
            <BrandLogo size="sm" className="w-[138px]" />
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
              Guidon V2 keeps the same calm planning experience while opening up
              the expanded product surface for walkthroughs, mentors, and
              document-building prototypes.
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm font-medium text-slate-600 tablet:items-end">
            <Link href="/v2/demo" className="transition hover:text-slate-950">
              See the walkthrough
            </Link>
            <Link href="/v2/support" className="transition hover:text-slate-950">
              Open support
            </Link>
            <Link href="/v2/profile" className="transition hover:text-slate-950">
              Open profile
            </Link>
            <Link href="/v2/mentors" className="transition hover:text-slate-950">
              Explore Mentor Connect
            </Link>
            <Link href="/v2/docs" className="transition hover:text-slate-950">
              Explore Document Builder
            </Link>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 border-t border-slate-200 pt-5 text-xs text-slate-500 tablet:flex-row tablet:items-center tablet:justify-between">
          <span>Parallel V2 preview for Guidon.</span>
          <VersionSwitchLink
            href={currentHref}
            label="Return to Current Version"
            fromVersion="v2"
            toVersion="current"
            source="v2_footer"
          />
        </div>
      </div>
    </footer>
  );
}
