"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { getMockUser } from "@/lib/mockAuth";

const INTRO_KEY = "isb_intro_v1";

export function IntroScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(INTRO_KEY);
    const isAuthenticated = Boolean(getMockUser());

    if (!alreadyShown && !isAuthenticated) {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(INTRO_KEY, "1");
    setVisible(false);
  };

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(dismiss, 2800);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro-overlay"
          className="fixed inset-0 z-[200] flex cursor-pointer flex-col items-center justify-center overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 30%, #dbeafe 60%, #ede9fe 100%)"
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.015 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onClick={dismiss}
          aria-label="Click anywhere to skip intro"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") dismiss();
          }}
        >
          {/* Background orbs */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-sky-200/50 blur-3xl"
              animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-20 -right-40 h-[500px] w-[500px] rounded-full bg-indigo-200/45 blur-3xl"
              animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/3 left-1/4 h-80 w-80 rounded-full bg-cyan-100/40 blur-3xl"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Main content */}
          <motion.div
            className="relative flex flex-col items-center gap-6 px-8 text-center"
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Logo icon */}
            <motion.div
              className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-sky-500 to-indigo-600 shadow-[0_20px_50px_rgba(56,132,255,0.38)]"
              initial={{ scale: 0.5, rotate: -12 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Sparkles className="h-9 w-9 text-white" />
            </motion.div>

            {/* Brand name + tagline */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.45 }}
            >
              <h1 className="font-heading text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Your Buddy In Ireland
              </h1>
              <motion.p
                className="mt-2 text-base font-medium text-sky-600 sm:text-lg"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                Your study and move assistant
              </motion.p>
            </motion.div>

            {/* Animated loading dots */}
            <motion.div
              className="flex gap-2.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="h-2 w-2 rounded-full bg-sky-400"
                  animate={{ scale: [1, 1.45, 1], opacity: [0.45, 1, 0.45] }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>

            {/* Skip hint */}
            <motion.p
              className="text-xs text-slate-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              Tap anywhere to skip
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
