export const replyLanguageProfiles = {
  english: {
    label: "English",
    compactLabel: "EN",
    recognitionLang: "en-IN",
    speechLang: "en-IN",
    helperText: "Best for English questions with an Indian accent.",
    replyInstruction: "Reply in clear English.",
    mockFallback: "english"
  },
  hinglish: {
    label: "Hinglish",
    compactLabel: "HG",
    recognitionLang: "en-IN",
    speechLang: "en-IN",
    helperText:
      "Best for a natural English-Hindi mix spoken in Roman script.",
    replyInstruction:
      "Reply in simple Hinglish. Use a natural mix of English and Hindi written in Latin script. Do not use Devanagari unless the student asks.",
    mockFallback: "hinglish"
  },
  hindi: {
    label: "Hindi",
    compactLabel: "HI",
    recognitionLang: "hi-IN",
    speechLang: "hi-IN",
    helperText: "Best when the question is spoken mostly in Hindi.",
    replyInstruction:
      "Reply in simple Hindi. Use Devanagari script where natural.",
    mockFallback: "hindi"
  },
  bengali: {
    label: "Bengali",
    compactLabel: "BN",
    recognitionLang: "bn-IN",
    speechLang: "bn-IN",
    helperText:
      "Best for Bengali questions. Voice support can vary by browser.",
    replyInstruction:
      "Reply in simple Bengali. Use Bengali script where natural.",
    mockFallback: "english"
  },
  marathi: {
    label: "Marathi",
    compactLabel: "MR",
    recognitionLang: "mr-IN",
    speechLang: "mr-IN",
    helperText:
      "Best for Marathi questions. Voice support can vary by browser.",
    replyInstruction:
      "Reply in simple Marathi. Use Devanagari script where natural.",
    mockFallback: "english"
  },
  punjabi: {
    label: "Punjabi",
    compactLabel: "PA",
    recognitionLang: "pa-IN",
    speechLang: "pa-IN",
    helperText:
      "Best for Punjabi questions. Voice support can vary by browser.",
    replyInstruction:
      "Reply in simple Punjabi. Use Gurmukhi script where natural.",
    mockFallback: "english"
  },
  tamil: {
    label: "Tamil",
    compactLabel: "TA",
    recognitionLang: "ta-IN",
    speechLang: "ta-IN",
    helperText:
      "Best for Tamil questions. Voice support can vary by browser.",
    replyInstruction:
      "Reply in simple Tamil. Use Tamil script where natural.",
    mockFallback: "english"
  },
  telugu: {
    label: "Telugu",
    compactLabel: "TE",
    recognitionLang: "te-IN",
    speechLang: "te-IN",
    helperText:
      "Best for Telugu questions. Voice support can vary by browser.",
    replyInstruction:
      "Reply in simple Telugu. Use Telugu script where natural.",
    mockFallback: "english"
  },
  malayalam: {
    label: "Malayalam",
    compactLabel: "ML",
    recognitionLang: "ml-IN",
    speechLang: "ml-IN",
    helperText:
      "Best for Malayalam questions. Voice support can vary by browser.",
    replyInstruction:
      "Reply in simple Malayalam. Use Malayalam script where natural.",
    mockFallback: "english"
  }
} as const;

export type ReplyLanguage = keyof typeof replyLanguageProfiles;
export type MockReplyLanguage =
  (typeof replyLanguageProfiles)[ReplyLanguage]["mockFallback"];

export const replyLanguageOptions = Object.entries(replyLanguageProfiles).map(
  ([value, profile]) => ({
    value: value as ReplyLanguage,
    ...profile
  })
);

export function isReplyLanguage(value: unknown): value is ReplyLanguage {
  return typeof value === "string" && value in replyLanguageProfiles;
}

export function getMockReplyLanguage(
  replyLanguage: ReplyLanguage
): MockReplyLanguage {
  return replyLanguageProfiles[replyLanguage].mockFallback;
}
