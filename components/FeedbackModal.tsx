"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Loader2, MessageSquareText, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

type FeedbackModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  userEmail?: string;
};

function encodeFormData(data: Record<string, string>) {
  return new URLSearchParams(data).toString();
}

function isLocalPreviewHost() {
  if (typeof window === "undefined") {
    return false;
  }

  const { hostname } = window.location;

  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1"
  );
}

export function FeedbackModal({
  isOpen,
  onClose,
  userName,
  userEmail
}: FeedbackModalProps) {
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
      setErrorMessage("Please share your feedback before submitting.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    const payload = {
      "form-name": "feedback-suggestions",
      "bot-field": "",
      page: "dashboard",
      name: userName?.trim() || "Anonymous user",
      email: userEmail?.trim() || "not-provided",
      message: trimmedMessage
    };

    try {
      if (isLocalPreviewHost()) {
        await new Promise((resolve) => {
          setTimeout(resolve, 600);
        });
        console.log("Feedback captured for local preview:", payload);
      } else {
        const response = await fetch("/netlify-feedback-form.html", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: encodeFormData(payload)
        });

        if (!response.ok) {
          throw new Error("Unable to submit feedback right now.");
        }
      }

      setSuccessMessage("Thanks. Your feedback has been received.");
      setMessage("");
    } catch (error) {
      console.error("Feedback submission failed:", error);
      setErrorMessage("Feedback could not be submitted. Please try again.");
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 px-4 py-6 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="surface-ring w-full max-w-lg rounded-[2rem] border border-white/80 bg-white/95 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.18)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700">
                  Feedback & suggestions
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                  Help improve Buddy Ireland
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Share bugs, missing information, or ideas that would make the
                  experience more useful for students planning Ireland.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                aria-label="Close feedback dialog"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/80 p-4">
                <label
                  htmlFor="feedback-message"
                  className="flex items-center gap-2 text-sm font-medium text-slate-800"
                >
                  <MessageSquareText className="h-4 w-4 text-sky-700" />
                  Your message
                </label>
                <textarea
                  id="feedback-message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Tell us what should be improved, clarified, or added."
                  rows={6}
                  className="mt-3 w-full resize-none rounded-[1.25rem] border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition focus:border-sky-400 focus:shadow-[0_0_0_4px_rgba(56,189,248,0.12)]"
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

              <div className="flex flex-col gap-3 tablet:flex-row tablet:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 px-5 text-sm font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send feedback"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
