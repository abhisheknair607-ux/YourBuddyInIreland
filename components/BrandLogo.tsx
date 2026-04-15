import Image from "next/image";

import { APP_NAME } from "@/lib/branding";

type BrandLogoSize = "xs" | "sm" | "md" | "lg" | "xl";

const logoSizes: Record<BrandLogoSize, { width: number; height: number }> = {
  xs: { width: 88, height: 28 },
  sm: { width: 128, height: 42 },
  md: { width: 168, height: 56 },
  lg: { width: 240, height: 80 },
  xl: { width: 320, height: 108 }
};

type BrandLogoProps = {
  size?: BrandLogoSize;
  className?: string;
  priority?: boolean;
};

export function BrandLogo({
  size = "md",
  className = "",
  priority = false
}: BrandLogoProps) {
  const dimensions = logoSizes[size];

  return (
    <Image
      src="/logo-transparent.png"
      alt={APP_NAME}
      width={dimensions.width}
      height={dimensions.height}
      priority={priority}
      className={`h-auto max-w-full object-contain ${className}`.trim()}
    />
  );
}
