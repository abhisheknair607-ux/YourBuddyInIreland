"use client";

import { useEffect, useState } from "react";

type TypewriterTextProps = {
  phrases: string[];
};

export function TypewriterText({ phrases }: TypewriterTextProps) {
  const safePhrases = phrases.filter(Boolean);
  const phraseSignature = safePhrases.join("||");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!safePhrases.length) {
      return;
    }

    const currentPhrase = safePhrases[phraseIndex];
    let timeout = 0;

    if (!isDeleting && displayedText.length < currentPhrase.length) {
      timeout = window.setTimeout(() => {
        setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
      }, 70);
    } else if (!isDeleting && displayedText.length === currentPhrase.length) {
      timeout = window.setTimeout(() => {
        setIsDeleting(true);
      }, 1800);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = window.setTimeout(() => {
        setDisplayedText(currentPhrase.slice(0, displayedText.length - 1));
      }, 35);
    } else {
      setIsDeleting(false);
      setPhraseIndex((current) => (current + 1) % safePhrases.length);
    }

    return () => {
      window.clearTimeout(timeout);
    };
  }, [displayedText, isDeleting, phraseIndex, phraseSignature]);

  if (!safePhrases.length) {
    return null;
  }

  return (
    <div className="inline-flex min-h-[2.25rem] items-center text-lg font-semibold text-slate-900 sm:text-xl">
      <span>{displayedText}</span>
      <span className="ml-1 inline-block h-7 w-[2px] animate-pulse rounded-full bg-sky-600" />
    </div>
  );
}
