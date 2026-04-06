"use client";

import { motion } from "framer-motion";
import { Clock3, RefreshCcw, ShieldCheck, X } from "lucide-react";
import { KeyboardEvent, useEffect, useRef, useState } from "react";

type OtpInputProps = {
  email: string;
  onSubmit: (otp: string) => Promise<boolean>;
  onResend: () => Promise<void> | void;
  onClose: () => void;
};

const OTP_LENGTH = 6;
const OTP_TIMER = 120;

export function OtpInput({
  email,
  onSubmit,
  onResend,
  onClose
}: OtpInputProps) {
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [timeLeft, setTimeLeft] = useState(OTP_TIMER);
  const [shakeCount, setShakeCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const otpValue = digits.join("");

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 0) {
          window.clearInterval(interval);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) {
      return;
    }

    const nextDigits = [...digits];
    nextDigits[index] = value;
    setDigits(nextDigits);
    setErrorMessage("");

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (event.key === "Enter" && otpValue.length === OTP_LENGTH) {
      void handleVerify();
    }
  };

  const handlePaste = (value: string) => {
    const pastedDigits = value.replace(/\D/g, "").slice(0, OTP_LENGTH).split("");

    if (!pastedDigits.length) {
      return;
    }

    const nextDigits = Array(OTP_LENGTH)
      .fill("")
      .map((_, index) => pastedDigits[index] ?? "");

    setDigits(nextDigits);

    const focusIndex = Math.min(pastedDigits.length, OTP_LENGTH - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleVerify = async () => {
    if (otpValue.length !== OTP_LENGTH) {
      setErrorMessage("Enter all 6 digits to continue.");
      return;
    }

    setIsSubmitting(true);
    const isValid = await onSubmit(otpValue);
    setIsSubmitting(false);

    if (!isValid) {
      setShakeCount((current) => current + 1);
      setErrorMessage("Incorrect OTP. Try 123456 for this demo.");
      setDigits(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    }
  };

  const handleResend = async () => {
    await onResend();
    setTimeLeft(OTP_TIMER);
    setDigits(Array(OTP_LENGTH).fill(""));
    setErrorMessage("");
    inputRefs.current[0]?.focus();
  };

  const formattedTime = `${Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0")}:${(timeLeft % 60).toString().padStart(2, "0")}`;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/35 p-3 backdrop-blur-md tablet:items-center tablet:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        key={shakeCount}
        className="glass-card surface-ring relative max-h-[calc(100dvh-1rem)] w-full max-w-xl overflow-y-auto rounded-[1.75rem] p-5 tablet:max-h-[85vh] tablet:rounded-[2rem] tablet:p-8"
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          x: shakeCount ? [0, -10, 10, -8, 8, 0] : 0
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-slate-200/80 bg-white/90 p-2 text-slate-500 transition hover:text-slate-900"
          aria-label="Close OTP modal"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-6 flex flex-col items-center gap-3 text-center tablet:flex-row tablet:items-center tablet:text-left">
          <div className="rounded-2xl bg-sky-100 p-3 text-sky-700">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">
              OTP Verification
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-950">
              Enter the 6-digit code
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              We sent a demo OTP to <span className="font-medium">{email}</span>
            </p>
          </div>
        </div>

        <div className="mb-5 flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
          <Clock3 className="h-4 w-4" />
          Demo timer: <span className="font-semibold">{formattedTime}</span>
        </div>

        <div className="grid grid-cols-6 gap-2 tablet:gap-3">
          {digits.map((digit, index) => (
            <input
              key={`${index}-${shakeCount}`}
              ref={(element) => {
                inputRefs.current[index] = element;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(event) => handleChange(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              onPaste={(event) => {
                event.preventDefault();
                handlePaste(event.clipboardData.getData("text"));
              }}
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white text-center text-lg font-semibold text-slate-950 outline-none transition focus:border-sky-400 focus:shadow-[0_0_0_4px_rgba(56,189,248,0.12)] tablet:h-14 tablet:text-xl"
            />
          ))}
        </div>

        {errorMessage ? (
          <p className="mt-4 text-center text-sm font-medium text-rose-600">
            {errorMessage}
          </p>
        ) : (
          <p className="mt-4 text-center text-sm text-slate-500">
            Use <span className="font-semibold text-slate-700">123456</span> for
            the demo.
          </p>
        )}

        <div className="mt-6 flex flex-col gap-3 tablet:flex-row">
          <button
            type="button"
            onClick={() => void handleVerify()}
            disabled={isSubmitting}
            className="button-glow min-h-[44px] flex-1 rounded-2xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Verifying..." : "Verify & Continue"}
          </button>
          <button
            type="button"
            onClick={() => void handleResend()}
            disabled={timeLeft > 0}
            className="flex min-h-[44px] items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-55"
          >
            <RefreshCcw className="h-4 w-4" />
            Resend OTP
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
