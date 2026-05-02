import Link from "next/link";
import { ReactNode } from "react";

import { BrandLogo } from "@/components/BrandLogo";

type CompactMobilePageHeaderProps = {
  trailing?: ReactNode;
  homeHref?: string;
  className?: string;
};

export function CompactMobilePageHeader({
  trailing,
  homeHref = "/",
  className = ""
}: CompactMobilePageHeaderProps) {
  return (
    <div className={`tablet:hidden ${className}`.trim()}>
      <div className="flex items-center justify-between gap-3">
        <Link
          href={homeHref}
          className="inline-flex min-h-[40px] items-center rounded-[1.15rem] border border-white/75 bg-white/88 px-2.5 py-1.5 shadow-[0_10px_28px_rgba(15,23,42,0.06)] backdrop-blur-xl transition hover:border-slate-300 hover:bg-white"
        >
          <BrandLogo size="xs" priority className="w-[116px]" />
        </Link>
        {trailing ? <div className="shrink-0">{trailing}</div> : null}
      </div>
    </div>
  );
}
