"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type PageTransitionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function PageTransition({
  children,
  className = "",
  delay = 0
}: PageTransitionProps) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 26, scale: 0.985, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{
        duration: 0.58,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={className}
    >
      {children}
    </motion.main>
  );
}
