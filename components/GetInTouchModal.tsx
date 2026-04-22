"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Loader2,
  MessageSquareText,
  Target,
  X,
  Zap
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

type GetInTouchModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  userEmail?: string;
};

const mentorshipBookingUrl =
  process.env.NEXT_PUBLIC_MENTORSHIP_BOOKING_URL || "https://calendly.com/";

export function GetInTouchModal({
  isOpen,
  onClose,
  userName,
  userEmail
}: GetInTouchModalProps) {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setMessage("");
      setIsSubmitting(false);
      setErrorMessage("");
      setSuccessMessage("");
    }
  }, [isOpen]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      setErrorMessage("Please tell us what you need before submitting.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    const payload = {
      kind: "get-in-touch",
      page: "dashboard-get-in-touch",
      name: userName?.trim() || "Anonymous user",
      email: userEmail?.trim() || "not-provided",
      message: trimmedMessage
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        throw new Error(result?.error || "Unable to submit request right now.");
      }

      setSuccessMessage("Thanks. Your request has been emailed.");
      setMessage("");
    } catch (error) {
      console.error("Get in touch submission failed:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Request could not be submitted. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/30 px-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-3 backdrop-blur-sm tablet:items-center tablet:px-4 tablet:py-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 22, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="surface-ring thin-scrollbar max-h-[calc(100dvh-1rem)] w-full overflow-y-auto rounded-[1.5rem] border border-white/80 bg-white/95 p-4 shadow-[0_30px_80px_rgba(15,23,42,0.18)] tablet:max-h-[85vh] tablet:max-w-lg tablet:rounded-[2rem] tablet:p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold leading-tight text-slate-950 tablet:text-2xl">
                  Get guidance or tell us what you need
                </h2>
                <p className="mt-2 text-[13px] leading-5 text-slate-500 tablet:mt-3 tablet:text-sm tablet:leading-6">
                  Book time with mentors or share your questions
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-700 tablet:h-10 tablet:w-10"
                aria-label="Close get in touch dialog"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form className="mt-4 space-y-3 tablet:mt-6 tablet:space-y-4" onSubmit={handleSubmit}>
              <div className="rounded-[1.25rem] border border-sky-100 bg-sky-50/70 p-3 tablet:rounded-[1.5rem] tablet:p-4">
                <div className="flex items-start gap-2.5 tablet:gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sky-700 shadow-sm tablet:h-10 tablet:w-10">
                    <Target className="h-4 w-4 tablet:h-5 tablet:w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[15px] font-semibold leading-tight text-slate-950 tablet:text-base">
                      Book mentorship hours
                    </h3>
                    <p className="mt-1 text-[13px] leading-5 text-slate-600 tablet:text-sm">
                      Speak directly with someone who's been through it
                    </p>
                  </div>
                </div>

                <a
                  href={mentorshipBookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex h-10 items-center justify-center gap-2 rounded-full bg-slate-950 px-4 text-sm font-semibold text-white transition hover:scale-[1.01] hover:bg-slate-800 tablet:mt-4 tablet:h-11 tablet:px-5"
                >
                  Book a session
                  <ArrowRight className="h-4 w-4" />
                </a>

                <p className="mt-2.5 flex items-center gap-2 text-[11px] font-medium text-slate-600 tablet:mt-3 tablet:text-xs">
                  <Zap className="h-4 w-4 text-amber-500" />
                  Most students book 20-30 mins
                </p>
              </div>

              <div className="rounded-[1.25rem] border border-slate-200/80 bg-slate-50/80 p-3 tablet:rounded-[1.5rem] tablet:p-4">
                <label
                  htmlFor="get-in-touch-message"
                  className="flex items-center gap-2 text-[13px] font-medium text-slate-800 tablet:text-sm"
                >
                  <MessageSquareText className="h-4 w-4 text-sky-700" />
                  Not ready to book?
                </label>
                <textarea
                  id="get-in-touch-message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Tell us what you're struggling with..."
                  rows={4}
                  className="mt-2 h-28 w-full resize-none rounded-[1rem] border border-slate-200 bg-white px-3 py-2.5 text-[13px] leading-5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:shadow-[0_0_0_4px_rgba(56,189,248,0.12)] tablet:mt-3 tablet:h-36 tablet:rounded-[1.25rem] tablet:px-4 tablet:py-3 tablet:text-sm tablet:leading-6"
                />
              </div>

              {errorMessage ? (
                <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {errorMessage}
                </p>
              ) : null}

              {successMessage ? (
                <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {successMessage}
                </p>
              ) : null}

              <div className="grid grid-cols-2 gap-2 tablet:flex tablet:justify-end tablet:gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 px-4 text-sm font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 tablet:h-11 tablet:gap-2 tablet:px-5"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send request"
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-10 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 tablet:h-11 tablet:px-5"
                >
                  Close
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
