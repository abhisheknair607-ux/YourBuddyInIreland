"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function TypingIndicator() {
  return (
    <div className="flex w-full justify-start">
      <div className="flex items-end gap-2">
        <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-sky-100 bg-white p-1 shadow-sm">
          <Image
            src="/logo-avatar.png"
            alt="Guidon assistant"
            width={32}
            height={32}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="rounded-[20px] rounded-bl-md border border-white/80 bg-white/92 px-4 py-3 shadow-[0_14px_35px_rgba(15,23,42,0.10)]">
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((dot) => (
              <motion.span
                key={dot}
                className="h-2 w-2 rounded-full bg-sky-500"
                animate={{ y: [0, -4, 0], opacity: [0.45, 1, 0.45] }}
                transition={{
                  duration: 0.9,
                  delay: dot * 0.15,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
