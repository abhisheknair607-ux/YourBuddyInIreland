"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";

import { hasAcceptedPrivacy, setPrivacyAccepted } from "@/lib/mockAuth";

type PrivacyNoticeProps = {
  isOpen: boolean;
  onClose: () => void;
  onAccepted?: () => void;
  allowDismiss?: boolean;
};

const privacyPoints = [
  "No personal data sold",
  "Chats anonymized for improvement",
  "Can delete account anytime"
];

export function PrivacyNotice({
  isOpen,
  onClose,
  onAccepted,
  allowDismiss = true
}: PrivacyNoticeProps) {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAccepted(hasAcceptedPrivacy());
    }
  }, [isOpen]);

  const handleContinue = () => {
    setPrivacyAccepted(true);
    setAccepted(true);
    onAccepted?.();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/35 p-2 backdrop-blur-md tablet:items-center tablet:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="glass-card surface-ring thin-scrollbar relative max-h-[calc(100dvh-0.5rem)] w-full max-w-lg overflow-y-auto rounded-[1.35rem] p-4 tablet:max-h-[85vh] tablet:rounded-[2rem] tablet:p-8"
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            {allowDismiss ? (
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-slate-200/80 bg-white/90 p-2 text-slate-500 transition hover:text-slate-900"
                aria-label="Close privacy notice"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}

            <div className="mb-5 flex flex-col items-start gap-3 text-left tablet:mb-6 tablet:flex-row tablet:items-center">
              <div className="rounded-2xl bg-sky-100 p-3 text-sky-700">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">
                  Privacy Notice
                </p>
                <h2 className="mt-1 text-xl font-semibold leading-tight text-slate-950 tablet:text-2xl">
                  Safe study support, with clear privacy rules
                </h2>
              </div>
            </div>

            <div className="space-y-3">
              {privacyPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4 text-left"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
                  <p className="text-sm leading-6 text-slate-700">{point}</p>
                </div>
              ))}
            </div>

            <label className="mt-5 flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-4 text-sm text-slate-700 tablet:mt-6">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(event) => setAccepted(event.target.checked)}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
              />
              <span>
                I accept the Privacy Policy and understand how my study support
                information may be handled.
              </span>
            </label>

            <button
              type="button"
              onClick={handleContinue}
              disabled={!accepted}
              className="mt-5 min-h-[48px] w-full rounded-2xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:scale-[1.01] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 tablet:mt-6"
            >
              Continue
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
