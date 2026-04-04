type SpeakTextOptions = {
  lang?: string;
  pitch?: number;
  rate?: number;
  volume?: number;
};

export function getSpeechRecognitionConstructor() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null;
}

export function hasSpeechSynthesisSupport() {
  return (
    typeof window !== "undefined" &&
    "speechSynthesis" in window &&
    typeof SpeechSynthesisUtterance !== "undefined"
  );
}

export function stopSpeaking() {
  if (!hasSpeechSynthesisSupport()) {
    return;
  }

  window.speechSynthesis.cancel();
}

export function speakText(content: string, options: SpeakTextOptions = {}) {
  if (!hasSpeechSynthesisSupport()) {
    return false;
  }

  const text = normalizeSpeechText(content);

  if (!text) {
    return false;
  }

  stopSpeaking();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = options.lang ?? "en-IN";
  utterance.pitch = options.pitch ?? 1;
  utterance.rate = options.rate ?? 1;
  utterance.volume = options.volume ?? 1;

  window.speechSynthesis.speak(utterance);

  return true;
}

function normalizeSpeechText(content: string) {
  return content
    .replace(/```[\s\S]*?```/g, " Code example omitted for voice playback. ")
    .replace(/^\|(?:\s*:?-+:?\s*\|)+\s*$/gm, "")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/^#{1,6}\s*/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/\|/g, ". ")
    .replace(/\n{2,}/g, "\n")
    .replace(/\n/g, ". ")
    .replace(/\s{2,}/g, " ")
    .trim();
}
