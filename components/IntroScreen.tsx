"use client";

import { AnimatePresence, motion } from "framer-motion";
import { GraduationCap, MapPin, Plane, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { BrandLogo } from "@/components/BrandLogo";
import { APP_SLUG } from "@/lib/branding";

const INTRO_KEY = `${APP_SLUG}_intro_v1`;

export function IntroScreen() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }

    return sessionStorage.getItem(INTRO_KEY) !== "1";
  });

  const dismiss = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(INTRO_KEY, "1");
    }

    setVisible(false);
  };

  useEffect(() => {
    if (!visible) {
      return;
    }

    const timer = setTimeout(dismiss, 2100);

    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="intro-overlay"
          className="fixed inset-0 z-[220] flex cursor-pointer items-center justify-center overflow-hidden px-4 py-6"
          style={{
            background:
              "linear-gradient(135deg, #f9fcff 0%, #eef6ff 28%, #e0efff 62%, #eef1ff 100%)"
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, filter: "blur(6px)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={dismiss}
          aria-label="Click anywhere to skip intro"
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              dismiss();
            }
          }}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -left-28 -top-28 h-[20rem] w-[20rem] rounded-full bg-sky-200/55 blur-3xl tablet:-left-40 tablet:-top-40 tablet:h-[500px] tablet:w-[500px]"
              animate={{ x: [0, 34, 0], y: [0, -24, 0] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-16 -right-28 h-[20rem] w-[20rem] rounded-full bg-indigo-200/45 blur-3xl tablet:-bottom-20 tablet:-right-40 tablet:h-[500px] tablet:w-[500px]"
              animate={{ x: [0, -28, 0], y: [0, 24, 0] }}
              transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-[18%] left-[12%] h-56 w-56 rounded-full bg-cyan-100/45 blur-3xl tablet:bottom-1/3 tablet:left-1/4 tablet:h-80 tablet:w-80"
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.45),transparent_45%)]"
              animate={{ opacity: [0.45, 0.82, 0.45] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <motion.div
            className="relative flex w-full max-w-3xl flex-col items-center gap-4 px-2 text-center tablet:gap-6 tablet:px-6"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/75 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700 backdrop-blur-xl tablet:text-xs tablet:tracking-[0.3em]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.18 }}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Launching Your Journey
            </motion.div>

            <motion.div
              className="relative flex items-center justify-center"
              initial={{ scale: 0.7, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="absolute left-1/2 top-1/2 h-24 w-40 -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-sky-200/60 bg-white/45 blur-[1px] tablet:h-28 tablet:w-48"
                animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0, 0.45] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
              <div className="relative rounded-[1.5rem] bg-white/70 px-4 py-3 shadow-[0_22px_60px_rgba(56,132,255,0.2)] backdrop-blur-sm tablet:px-5 tablet:py-4">
                <BrandLogo size="lg" priority className="w-[220px] tablet:w-[280px]" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.34 }}
            >
              <motion.p
                className="mt-1 text-sm font-medium leading-6 text-sky-700 tablet:text-lg"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.48 }}
              >
                Visa guidance, universities, accommodation, loans, and courses
              </motion.p>
            </motion.div>

            <motion.div
              className="grid w-full max-w-xl grid-cols-1 gap-3 tablet:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.58 }}
            >
              {[
                { icon: Plane, label: "Travel prep" },
                { icon: GraduationCap, label: "Study planning" },
                { icon: MapPin, label: "Ireland move" }
              ].map(({ icon: Icon, label }, index) => (
                <motion.div
                  key={label}
                  className="glass-card flex min-h-[44px] flex-col items-center gap-2 rounded-[1.5rem] px-3 py-4"
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.18,
                    ease: "easeInOut"
                  }}
                >
                  <Icon className="h-5 w-5 text-sky-600" />
                  <span className="text-xs font-medium text-slate-600">
                    {label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="glass-card w-full max-w-md rounded-full px-4 py-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.72 }}
            >
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500"
                  initial={{ width: "14%" }}
                  animate={{ width: ["18%", "86%", "100%"] }}
                  transition={{ duration: 1.7, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </motion.div>

            <motion.div
              className="flex gap-2.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
            >
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="h-2.5 w-2.5 rounded-full bg-sky-400"
                  animate={{ scale: [1, 1.45, 1], opacity: [0.45, 1, 0.45] }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    delay: index * 0.16,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>

            <motion.button
              type="button"
              className="button-glow min-h-[44px] rounded-full bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.96 }}
              onClick={(event) => {
                event.stopPropagation();
                dismiss();
              }}
            >
              Skip intro
            </motion.button>

            <motion.p
              className="text-xs text-slate-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.05 }}
            >
              Tap anywhere to skip
            </motion.p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
