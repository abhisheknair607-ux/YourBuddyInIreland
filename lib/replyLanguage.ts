export type ReplyLanguage = "english" | "hinglish" | "hindi";

export const replyLanguageProfiles: Record<
  ReplyLanguage,
  {
    label: string;
    recognitionLang: string;
    speechLang: string;
    helperText: string;
    replyInstruction: string;
  }
> = {
  english: {
    label: "English",
    recognitionLang: "en-IN",
    speechLang: "en-IN",
    helperText: "Best for English questions with an Indian accent.",
    replyInstruction: "Reply in clear English."
  },
  hinglish: {
    label: "Hinglish",
    recognitionLang: "en-IN",
    speechLang: "en-IN",
    helperText:
      "Best for a natural English-Hindi mix spoken in Roman script.",
    replyInstruction:
      "Reply in simple Hinglish. Use a natural mix of English and Hindi written in Latin script. Do not use Devanagari unless the student asks."
  },
  hindi: {
    label: "Hindi",
    recognitionLang: "hi-IN",
    speechLang: "hi-IN",
    helperText: "Best when the question is spoken mostly in Hindi.",
    replyInstruction:
      "Reply in simple Hindi. Use Devanagari script where natural."
  }
};

export const replyLanguageOptions = Object.entries(replyLanguageProfiles).map(
  ([value, profile]) => ({
    value: value as ReplyLanguage,
    ...profile
  })
);

export function isReplyLanguage(value: unknown): value is ReplyLanguage {
  return (
    value === "english" || value === "hinglish" || value === "hindi"
  );
}
