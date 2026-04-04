"use client";

import { MotionConfig } from "framer-motion";
import { ReactNode } from "react";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
