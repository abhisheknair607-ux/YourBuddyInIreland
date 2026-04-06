"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex w-full justify-start">
      <div className="flex items-end gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sky-700">
          <Bot className="h-4 w-4" />
        </div>
        <div className="rounded-[20px] rounded-bl-md border border-white/80 bg-white/88 px-5 py-4 shadow-[0_14px_35px_rgba(15,23,42,0.10)]">
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((dot) => (
              <motion.span
                key={dot}
                className="h-2.5 w-2.5 rounded-full bg-sky-500"
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
