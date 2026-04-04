"use client";

import { motion } from "framer-motion";

export function AnimatedGradientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(237,246,255,0.88),rgba(219,234,254,0.92))]" />
      <motion.div
        className="absolute left-[-12%] top-[-8%] h-[24rem] w-[24rem] rounded-full bg-sky-300/35 blur-3xl"
        animate={{
          x: [0, 90, 10, 0],
          y: [0, 40, 90, 0],
          scale: [1, 1.08, 0.96, 1]
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-10%] top-[18%] h-[26rem] w-[26rem] rounded-full bg-cyan-200/35 blur-3xl"
        animate={{
          x: [0, -100, -20, 0],
          y: [0, 60, -30, 0],
          scale: [1, 0.94, 1.08, 1]
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-18%] left-[24%] h-[28rem] w-[28rem] rounded-full bg-indigo-200/25 blur-3xl"
        animate={{
          x: [0, -60, 40, 0],
          y: [0, -60, 10, 0],
          scale: [1, 1.06, 0.92, 1]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="mesh-overlay absolute inset-0 opacity-40" />
    </div>
  );
}
