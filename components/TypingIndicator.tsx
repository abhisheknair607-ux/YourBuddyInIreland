"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex w-full justify-start">
      <div className="flex items-end gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700">
          <Bot className="h-4 w-4" />
        </div>
        <div className="rounded-[1.75rem] rounded-bl-md border border-slate-200/80 bg-white/90 px-5 py-4 shadow-sm">
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((dot) => (
              <motion.span
                key={dot}
                className="h-2.5 w-2.5 rounded-full bg-slate-400"
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
