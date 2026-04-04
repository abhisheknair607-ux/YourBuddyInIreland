"use client";

import { motion } from "framer-motion";
import {
  LogOut,
  MessageSquare,
  Mic,
  MicOff,
  Send,
  Sparkles,
  Volume2,
  VolumeX
} from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

import { ChatMessage } from "@/components/ChatMessage";
import { PageTransition } from "@/components/PageTransition";
import { TypingIndicator } from "@/components/TypingIndicator";
import {
  getSpeechRecognitionConstructor,
  hasSpeechSynthesisSupport,
  speakText,
  stopSpeaking
} from "@/lib/browserSpeech";
import {
  INITIAL_TUTOR_MESSAGE,
  TutorMessage,
  createTutorMessage
} from "@/lib/mockChat";
import { MockStudentUser, getMockUser, mockLogout } from "@/lib/mockAuth";
import {
  ReplyLanguage,
  replyLanguageOptions,
  replyLanguageProfiles
} from "@/lib/replyLanguage";

const quickPrompts = [
  "What documents should I prepare first for an Ireland student visa?",
  "Help me compare affordable student accommodation options near Dublin campuses",
  "Which suits me better in Ireland: MSc Data Analytics or MSc Business Analytics?"
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");

async function parseChatResponse(response: Response) {
  const contentType = response.headers.get("content-type") ?? "";
  const rawBody = await response.text();

  if (contentType.includes("application/json")) {
    try {
      return JSON.parse(rawBody) as {
        error?: string;
        reply?: string;
      };
    } catch {
      throw new Error("The chat API returned invalid JSON.");
    }
  }

  if (rawBody.startsWith("<!DOCTYPE") || rawBody.startsWith("<html")) {
    throw new Error(
      "The chat API returned an HTML page instead of JSON. This usually means the server is stale, the route failed, or the deployment does not have the API route wired correctly."
    );
  }

  throw new Error(
    rawBody.trim() || "The chat API returned an unexpected response."
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<MockStudentUser | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [messages, setMessages] = useState<TutorMessage[]>([
    INITIAL_TUTOR_MESSAGE
  ]);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [chatError, setChatError] = useState("");
  const [voiceError, setVoiceError] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState("");
  const [isVoiceInputSupported, setIsVoiceInputSupported] = useState(false);
  const [isVoiceOutputSupported, setIsVoiceOutputSupported] = useState(false);
  const [isVoiceRepliesEnabled, setIsVoiceRepliesEnabled] = useState(false);
  const [replyLanguage, setReplyLanguage] = useState<ReplyLanguage>("hinglish");
  const chatScrollRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const transcriptRef = useRef("");
  const shouldSubmitVoiceRef = useRef(false);
  const suppressVoiceErrorRef = useRef(false);
  const sendMessageRef = useRef<((messageText?: string) => Promise<void>) | null>(
    null
  );
  const lastSpokenMessageIdRef = useRef(INITIAL_TUTOR_MESSAGE.id);

  useEffect(() => {
    const mockUser = getMockUser();

    if (!mockUser) {
      router.replace("/login");
      return;
    }

    setUser(mockUser);
    setIsCheckingAuth(false);
  }, [router]);

  useEffect(() => {
    const chatContainer = chatScrollRef.current;

    if (!chatContainer) {
      return;
    }

    chatContainer.scrollTo({
      top: chatContainer.scrollHeight,
      behavior: "smooth"
    });
  }, [messages, isSending]);

  useEffect(() => {
    const SpeechRecognitionCtor = getSpeechRecognitionConstructor();

    setIsVoiceInputSupported(Boolean(SpeechRecognitionCtor));
    setIsVoiceOutputSupported(hasSpeechSynthesisSupport());

    if (!SpeechRecognitionCtor) {
      return;
    }

    const recognition = new SpeechRecognitionCtor();

    recognition.lang = replyLanguageProfiles[replyLanguage].recognitionLang;
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setVoiceError("");
      setLiveTranscript("");
      transcriptRef.current = "";
    };

    recognition.onresult = (event) => {
      let finalTranscript = "";
      let interimTranscript = "";

      for (let index = 0; index < event.results.length; index += 1) {
        const result = event.results[index];
        const resultText = result[0]?.transcript?.trim();

        if (!resultText) {
          continue;
        }

        if (result.isFinal) {
          finalTranscript += `${resultText} `;
        } else {
          interimTranscript += `${resultText} `;
        }
      }

      const finalValue = finalTranscript.trim();
      const interimValue = interimTranscript.trim();
      const combinedTranscript = [finalValue, interimValue]
        .filter(Boolean)
        .join(" ");

      transcriptRef.current = finalValue || combinedTranscript;
      setLiveTranscript(combinedTranscript);
      setDraft(combinedTranscript);
    };

    recognition.onerror = (event) => {
      if (event.error === "aborted" && suppressVoiceErrorRef.current) {
        return;
      }

      shouldSubmitVoiceRef.current = false;

      const nextError =
        event.error === "not-allowed"
          ? "Microphone access was blocked. Please allow mic access in Chrome."
          : event.error === "no-speech"
            ? "I could not hear anything. Try again and speak a little closer to the mic."
            : "Voice input hit a browser issue. Please try again.";

      setVoiceError(nextError);
    };

    recognition.onend = () => {
      setIsListening(false);
      setLiveTranscript("");
      suppressVoiceErrorRef.current = false;

      const transcript = transcriptRef.current.trim();
      const shouldSubmit = shouldSubmitVoiceRef.current;

      transcriptRef.current = "";
      shouldSubmitVoiceRef.current = false;

      if (shouldSubmit && transcript) {
        setDraft("");
        void sendMessageRef.current?.(transcript);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
      recognitionRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!recognitionRef.current) {
      return;
    }

    recognitionRef.current.lang = replyLanguageProfiles[replyLanguage].recognitionLang;
  }, [replyLanguage]);

  useEffect(() => {
    sendMessageRef.current = sendMessage;
  });

  useEffect(() => {
    if (!isVoiceOutputSupported || !isVoiceRepliesEnabled) {
      stopSpeaking();
      return;
    }

    const latestAssistantMessage = [...messages]
      .reverse()
      .find((message) => message.role === "assistant");

    if (!latestAssistantMessage) {
      return;
    }

    if (latestAssistantMessage.id === lastSpokenMessageIdRef.current) {
      return;
    }

    lastSpokenMessageIdRef.current = latestAssistantMessage.id;
    speakText(latestAssistantMessage.content, {
      lang: replyLanguageProfiles[replyLanguage].speechLang,
      rate: 1.02
    });
  }, [isVoiceOutputSupported, isVoiceRepliesEnabled, messages, replyLanguage]);

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const sendMessage = async (messageText?: string) => {
    const content = (messageText ?? draft).trim();

    if (!content || isSending) {
      return;
    }

    const userMessage = createTutorMessage("user", content);

    setMessages((current) => [...current, userMessage]);
    setDraft("");
    setIsSending(true);
    setChatError("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: content,
          replyLanguage
        })
      });
      const data = await parseChatResponse(response);

      if (!response.ok || !data.reply) {
        throw new Error(data.error || "Unable to fetch a reply right now.");
      }

      setMessages((current) => [
        ...current,
        createTutorMessage("assistant", data.reply as string)
      ]);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to fetch a reply right now.";

      setChatError(message);
      setMessages((current) => [
        ...current,
        createTutorMessage(
          "assistant",
          "I ran into a connection issue while trying to help. Please try again in a moment."
        )
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleVoiceToggle = () => {
    if (!recognitionRef.current || isSending) {
      if (!isVoiceInputSupported) {
        setVoiceError("Voice input works in Chrome and other supported browsers.");
      }

      return;
    }

    setVoiceError("");

    if (isListening) {
      suppressVoiceErrorRef.current = true;
      shouldSubmitVoiceRef.current = true;
      recognitionRef.current.stop();
      return;
    }

    try {
      shouldSubmitVoiceRef.current = true;
      setLiveTranscript("");
      setDraft("");

      if (isVoiceOutputSupported) {
        setIsVoiceRepliesEnabled(true);
      }

      recognitionRef.current.start();
    } catch (error) {
      console.error("Voice input start error:", error);
      setVoiceError("Voice input is already active. Give it a second and try again.");
    }
  };

  const toggleVoiceReplies = () => {
    setIsVoiceRepliesEnabled((current) => {
      const next = !current;

      if (!next) {
        stopSpeaking();
      }

      return next;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await sendMessage();
  };

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      await sendMessage();
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="flex h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-white to-sky-50 px-6">
        <div className="glass-card rounded-[2rem] px-8 py-6 text-center">
          <div className="mx-auto mb-4 h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-sky-500" />
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
            Loading
          </p>
          <h1 className="mt-2 text-xl font-semibold text-slate-950 sm:text-2xl">
            Preparing your Ireland planning dashboard...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-white via-sky-50 to-blue-50">
      <PageTransition className="mx-auto flex h-full w-full max-w-7xl flex-col px-4 py-4 sm:px-6 sm:py-6">
        <header className="glass-card mb-4 flex shrink-0 flex-col gap-4 rounded-[2rem] p-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-sky-500 to-indigo-600 text-lg font-semibold text-white">
              {getInitials(user?.name ?? "Student")}
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
                Your Buddy In Ireland
              </p>
              <h1 className="mt-1 text-2xl font-semibold text-slate-950">
                Welcome back, {user?.name?.split(" ")[0]}
              </h1>
              <p className="text-sm text-slate-500">{user?.email}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              mockLogout();
              router.push("/login");
            }}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </header>

        <div className="flex min-h-0 flex-1 gap-4 lg:gap-6">
          <aside className="glass-card thin-scrollbar hidden min-h-0 w-[280px] shrink-0 overflow-y-auto rounded-[2rem] p-5 lg:block xl:w-[300px]">
            <div className="rounded-[1.75rem] bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 p-5 text-white">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-sky-100">
                <Sparkles className="h-3.5 w-3.5" />
                Ireland Journey Snapshot
              </div>
              <h2 className="mt-3 text-xl font-semibold leading-snug">
                Plan your move with less confusion.
              </h2>
              <p className="mt-2 text-sm leading-6 text-sky-50/90">
                One calm assistant for visa, accommodation, loan, and course
                questions - built for Indian students exploring Ireland.
              </p>
            </div>

            <div className="mt-4 rounded-[1.75rem] border border-slate-200/80 bg-white/85 p-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-sky-700" />
                <p className="text-sm font-semibold text-slate-900">
                  Try asking
                </p>
              </div>
              <div className="thin-scrollbar mt-3 max-h-[18rem] space-y-2.5 overflow-y-auto pr-1">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => {
                      setDraft(prompt);
                    }}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-left text-sm leading-6 text-slate-700 transition hover:border-slate-300 hover:bg-white"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <section className="glass-card flex min-h-0 flex-1 flex-col rounded-[2rem] p-3 sm:p-4">
            <div className="min-h-0 flex-1 overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/70">
              <div
                ref={chatScrollRef}
                className="thin-scrollbar h-full overflow-y-auto px-4 py-4 sm:px-6 sm:py-6"
              >
                <div className="space-y-5">
                  {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                  {isSending ? <TypingIndicator /> : null}
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="shrink-0 pb-safe pt-4">
              {chatError ? (
                <p className="mb-3 px-2 text-sm font-medium text-rose-600">
                  {chatError}
                </p>
              ) : null}
              {voiceError ? (
                <p className="mb-3 px-2 text-sm font-medium text-amber-600">
                  {voiceError}
                </p>
              ) : null}
              <div
                className={`rounded-[1.75rem] border border-slate-200 bg-white p-3 transition ${
                  inputFocused ? "chat-input-focus" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={(event) => void handleKeyDown(event)}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    placeholder="Ask about Ireland student visas, accommodation, education loans, universities, or course choices..."
                    className="h-12 flex-1 rounded-2xl bg-transparent px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />
                  <motion.button
                    type="button"
                    whileHover={{ scale: isVoiceInputSupported ? 1.03 : 1 }}
                    whileTap={{ scale: isVoiceInputSupported ? 0.97 : 1 }}
                    onClick={handleVoiceToggle}
                    disabled={!isVoiceInputSupported || isSending}
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border text-sm font-semibold transition ${
                      isListening
                        ? "border-rose-200 bg-rose-50 text-rose-600 shadow-[0_12px_30px_rgba(244,63,94,0.18)]"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white"
                    } disabled:cursor-not-allowed disabled:opacity-45`}
                    aria-label={isListening ? "Stop voice input" : "Start voice input"}
                    title={
                      isVoiceInputSupported
                        ? isListening
                          ? "Stop and send voice question"
                          : "Start voice input"
                        : "Voice input works in supported browsers like Chrome"
                    }
                  >
                    {isListening ? (
                      <MicOff className="h-4 w-4" />
                    ) : (
                      <Mic className="h-4 w-4" />
                    )}
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: isVoiceOutputSupported ? 1.03 : 1 }}
                    whileTap={{ scale: isVoiceOutputSupported ? 0.97 : 1 }}
                    onClick={toggleVoiceReplies}
                    disabled={!isVoiceOutputSupported}
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border text-sm font-semibold transition ${
                      isVoiceRepliesEnabled
                        ? "border-sky-200 bg-sky-50 text-sky-700 shadow-[0_12px_30px_rgba(59,130,246,0.14)]"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white"
                    } disabled:cursor-not-allowed disabled:opacity-45`}
                    aria-label={
                      isVoiceRepliesEnabled
                        ? "Mute spoken replies"
                        : "Enable spoken replies"
                    }
                    title={
                      isVoiceOutputSupported
                        ? isVoiceRepliesEnabled
                          ? "Mute spoken replies"
                          : "Read assistant replies aloud"
                        : "Speech playback is not supported in this browser"
                    }
                  >
                    {isVoiceRepliesEnabled ? (
                      <Volume2 className="h-4 w-4" />
                    ) : (
                      <VolumeX className="h-4 w-4" />
                    )}
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={!draft.trim() || isSending}
                    className="button-glow inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 px-5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-55"
                  >
                    <Send className="h-4 w-4" />
                    Send
                  </motion.button>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 px-2">
                  {replyLanguageOptions.map((option) => {
                    const isSelected = option.value === replyLanguage;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setReplyLanguage(option.value)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                          isSelected
                            ? "border-sky-300 bg-sky-50 text-sky-700"
                            : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-white"
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-3 flex flex-col gap-2 px-2 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                  <p>
                    {isVoiceInputSupported
                      ? isListening
                        ? `Listening now${liveTranscript ? `: "${liveTranscript}"` : "..."}`
                        : `Voice mode: ${replyLanguageProfiles[replyLanguage].helperText}`
                      : "Voice input is unavailable in this browser. Chrome works best for this mode."}
                  </p>
                  <p>
                    {isVoiceOutputSupported
                      ? isVoiceRepliesEnabled
                        ? "Spoken replies are on."
                        : "Spoken replies are off."
                      : "Spoken replies are unavailable here."}
                  </p>
                </div>
              </div>
            </form>
          </section>
        </div>
      </PageTransition>
    </div>
  );
}
