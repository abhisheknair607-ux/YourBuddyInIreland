import type { LucideIcon } from "lucide-react";
import Link from "next/link";

import { BrandLogo } from "@/components/BrandLogo";

type PageTopIdentityHeaderProps = {
  label: string;
  icon: LucideIcon;
  homeHref?: string;
};

export function PageTopIdentityHeader({
  label,
  icon: Icon,
  homeHref = "/"
}: PageTopIdentityHeaderProps) {
  return (
    <header className="page-shell shrink-0 py-3 tablet:py-5">
      <div className="grid grid-cols-[132px_minmax(0,132px)] items-center justify-between gap-2 tablet:flex tablet:items-center tablet:justify-between tablet:gap-3">
        <Link
          href={homeHref}
          className="inline-flex h-[48px] w-[132px] shrink-0 items-center justify-center self-start overflow-hidden rounded-[1.2rem] border border-white/70 bg-white/80 px-2.5 py-1.5 shadow-[0_10px_24px_rgba(15,23,42,0.06)] backdrop-blur-xl transition hover:border-slate-300 hover:bg-white tablet:h-[52px] tablet:w-auto tablet:px-3 tablet:py-2"
        >
          <BrandLogo
            size="xs"
            priority
            className="w-[98px] max-w-[98px] shrink-0 tablet:w-[122px] tablet:max-w-[122px]"
          />
        </Link>

        <div className="inline-flex h-[48px] w-[132px] min-w-0 items-center justify-center gap-1 rounded-[1.2rem] border border-sky-200 bg-white/82 px-2 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-sky-700 shadow-[0_10px_24px_rgba(15,23,42,0.06)] backdrop-blur-xl tablet:h-[48px] tablet:w-auto tablet:gap-2 tablet:px-4 tablet:text-xs tablet:tracking-[0.18em]">
          <Icon className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate leading-none">{label}</span>
        </div>
      </div>
    </header>
  );
}
