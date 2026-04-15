"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Banknote,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileCheck2,
  Globe2,
  GraduationCap,
  Home,
  House,
  LogOut,
  Menu,
  MessageSquareText,
  Mic,
  MicOff,
  MapPinned,
  Phone,
  Plus,
  Send,
  Volume2,
  VolumeX,
  X
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";

import { ChatMessage } from "@/components/ChatMessage";
import { BrandLogo } from "@/components/BrandLogo";
import { FeedbackModal } from "@/components/FeedbackModal";
import { PageTransition } from "@/components/PageTransition";
import { TypingIndicator } from "@/components/TypingIndicator";
import { APP_NAME, APP_SHORT_NAME } from "@/lib/branding";
import {
  getSpeechRecognitionConstructor,
  hasSpeechSynthesisSupport,
  speakText,
  stopSpeaking
} from "@/lib/browserSpeech";
import {
  TutorMessage,
  TutorMessageSource,
  createTutorMessage
} from "@/lib/mockChat";
import { getMockUser, mockLogout } from "@/lib/mockAuth";
import {
  ReplyLanguage,
  replyLanguageOptions,
  replyLanguageProfiles
} from "@/lib/replyLanguage";
import { DASHBOARD_STARTER_PROMPT_KEY } from "@/lib/starterPrompts";

const sidebarShortcuts: Array<{
  title: string;
  description: string;
  prompt: string;
  icon: LucideIcon;
}> = [
  {
    title: "Visa checklist",
    description: "Documents, SOP, finances",
    prompt:
      "Create a simple Ireland student visa checklist for me, with the documents I should prepare first.",
    icon: FileCheck2
  },
  {
    title: "Accommodation",
    description: "Rent, commute, safe areas",
    prompt:
      "Help me compare student accommodation options in Ireland and tell me what I should check first.",
    icon: House
  },
  {
    title: "Universities",
    description: "Compare city and career fit",
    prompt:
      "Help me shortlist universities in Ireland based on cost, location, and career outcomes.",
    icon: GraduationCap
  },
  {
    title: "Education loans",
    description: "Budget and funding plan",
    prompt:
      "Help me understand how to plan education loans and living costs for studying in Ireland.",
    icon: Banknote
  }
];

const landingPrompts = [
  "Compare MSc Data Analytics options in Dublin and Limerick.",
  "What documents do I need first for an Ireland student visa?",
  "How should I shortlist affordable accommodation near campus?"
];

const importantLinks: Array<{
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}> = [
  {
    title: "PPSN application",
    description: "Start the official PPS number process through gov.ie.",
    href: "https://www.gov.ie/en/service/12e6de-get-a-personal-public-service-pps-number/",
    icon: FileCheck2
  },
  {
    title: "IRP booking",
    description: "Book or manage your Burgh Quay registration appointment.",
    href: "https://www.irishimmigration.ie/burgh-quay-appointments/",
    icon: FileCheck2
  },
  {
    title: "Visa booking",
    description: "Use the official VFS Ireland centre flow for appointments.",
    href: "https://visa.vfsglobal.com/ind/en/irl/attend-centre",
    icon: FileCheck2
  },
  {
    title: "AVATS",
    description: "Complete the Irish visa application form online.",
    href: "https://www.visas.inis.gov.ie/avats/Default.aspx",
    icon: FileCheck2
  },
  {
    title: "Taxi booking in Ireland",
    description: "Open FREENOW for taxi booking across major Irish cities.",
    href: "https://www.free-now.com/ie/",
    icon: MapPinned
  },
  {
    title: "Vodafone Ireland",
    description: "Compare Vodafone pay-as-you-go and SIM options.",
    href: "https://www.vodafone.ie/mobile/pay-as-you-go",
    icon: Phone
  },
  {
    title: "Three Ireland",
    description: "Browse Three Ireland mobile plans and prepaid options.",
    href: "https://www.three.ie/",
    icon: Phone
  },
  {
    title: "eir mobile",
    description: "Check eir SIM-only and mobile plan options.",
    href: "https://www.eir.ie/mobile/",
    icon: Phone
  },
  {
    title: "Tesco Mobile Ireland",
    description: "View Tesco Mobile Ireland plans and prepay offers.",
    href: "https://www.tescomobile.ie/",
    icon: Phone
  },
  {
    title: "Lyca Mobile Ireland",
    description: "Check Lyca Mobile Ireland SIM and bundle options.",
    href: "https://www.lycamobile.ie/en/",
    icon: Phone
  },
  {
    title: "Student map",
    description: "Open the shared Ireland student map for campuses and planning.",
    href: "https://www.google.com/maps/d/viewer?mid=1ObFwqV2vtigkclpjea3sUHNhUuw&ll=53.291859560190396%2C-6.18664934077243&z=13",
    icon: MapPinned
  },
  {
    title: "Accommodation map",
    description: "Compare student areas and day-to-day access around Dublin.",
    href: "https://www.google.com/maps/d/viewer?mid=12P4oVY7A4w538meuFJUEEuMIJ1paCuE8&ll=53.28668449709923%2C-6.158606121728503&z=12",
    icon: MapPinned
  },
  {
    title: "Area demarcation map",
    description: "Use this Dublin boundary view for clearer area comparisons.",
    href: "https://www.google.com/maps/d/viewer?mid=1ObFwqV2vtigkclpjea3sUHNhUuw&ll=53.32837264518767%2C-6.201412219190399&z=13",
    icon: MapPinned
  }
];

type DashboardUser = {
  name: string;
  email: string;
};

const LOCAL_HOST_PATTERNS = [/^localhost$/i, /^127(?:\.\d{1,3}){3}$/, /^192\.168(?:\.\d{1,3}){2}$/, /^10(?:\.\d{1,3}){3}$/];

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");

const getDisplayNameFromEmail = (email: string) =>
  email
    .split("@")[0]
    .split(/[._-]+/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");

function isLocalPreviewHost() {
  if (typeof window === "undefined") {
    return false;
  }

  const { hostname } = window.location;

  if (hostname === "::1") {
    return true;
  }

  if (LOCAL_HOST_PATTERNS.some((pattern) => pattern.test(hostname))) {
    return true;
  }

  const private172Match = hostname.match(/^172\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);

  if (!private172Match) {
    return false;
  }

  const secondOctet = Number(private172Match[1]);

  return secondOctet >= 16 && secondOctet <= 31;
}

function getSessionUser(sessionUser?: {
  name?: string | null;
  email?: string | null;
}) {
  if (!sessionUser?.email) {
    return null;
  }

  return {
    name: sessionUser.name?.trim() || getDisplayNameFromEmail(sessionUser.email),
    email: sessionUser.email
  } satisfies DashboardUser;
}

async function parseChatResponse(response: Response) {
  const contentType = response.headers.get("content-type") ?? "";
  const rawBody = await response.text();

  if (contentType.includes("application/json")) {
    try {
      return JSON.parse(rawBody) as {
        error?: string;
        reply?: string;
        source?: TutorMessageSource;
        documents?: string[];
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

function getDeploymentHeaders() {
  const deploymentId = process.env.NEXT_PUBLIC_DEPLOYMENT_ID;
  const headers: Record<string, string> = {};

  if (deploymentId) {
    headers["x-deployment-id"] = deploymentId;
  }

  return headers;
}

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [user, setUser] = useState<DashboardUser | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [messages, setMessages] = useState<TutorMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [chatError, setChatError] = useState("");
  const [voiceError, setVoiceError] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState("");
  const [isVoiceInputSupported, setIsVoiceInputSupported] = useState(false);
  const [isVoiceOutputSupported, setIsVoiceOutputSupported] = useState(false);
  const [isVoiceRepliesEnabled, setIsVoiceRepliesEnabled] = useState(false);
  const [replyLanguage, setReplyLanguage] = useState<ReplyLanguage>("hinglish");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isImportantLinksOpen, setIsImportantLinksOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const chatScrollRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const transcriptRef = useRef("");
  const shouldSubmitVoiceRef = useRef(false);
  const suppressVoiceErrorRef = useRef(false);
  const starterPromptHandledRef = useRef(false);
  const sendMessageRef = useRef<((messageText?: string) => Promise<void>) | null>(
    null
  );
  const lastSpokenMessageIdRef = useRef("");

  useEffect(() => {
    const mockUser = getMockUser();
    const sessionUser = getSessionUser(session?.user);

    if (status === "loading") {
      if (mockUser) {
        setUser({
          name: mockUser.name,
          email: mockUser.email
        });
        setIsCheckingAuth(false);
      }
      return;
    }

    const activeUser =
      sessionUser ??
      (mockUser
        ? {
            name: mockUser.name,
            email: mockUser.email
          }
        : null);

    if (!activeUser) {
      if (isLocalPreviewHost()) {
        setUser({
          name: "Guest Preview",
          email: "guest@guidon.local"
        });
        setIsCheckingAuth(false);
        return;
      }

      router.replace("/login");
      return;
    }

    setUser(activeUser);
    setIsCheckingAuth(false);
  }, [router, session, status]);

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
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = "0px";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
  }, [draft, liveTranscript]);

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

  const hasConversation = messages.length > 0;

  const sidebarGroups = useMemo(
    () => [
      {
        title: "Quick actions",
        items: sidebarShortcuts
      }
    ],
    []
  );

  const beginNewChat = () => {
    if (isListening && recognitionRef.current) {
      suppressVoiceErrorRef.current = true;
      shouldSubmitVoiceRef.current = false;
      recognitionRef.current.abort();
    }

    stopSpeaking();
    setMessages([]);
    setDraft("");
    setChatError("");
    setVoiceError("");
    setLiveTranscript("");
    lastSpokenMessageIdRef.current = "";
    setIsSidebarOpen(false);
  };

  const goHome = () => {
    setIsSidebarOpen(false);
    router.push("/");
  };

  const handleLogout = async () => {
    mockLogout();
    stopSpeaking();

    if (session?.user) {
      await signOut({ callbackUrl: "/login" });
      return;
    }

    router.push("/login");
  };

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
          "Content-Type": "application/json",
          ...getDeploymentHeaders()
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
        createTutorMessage("assistant", data.reply as string, {
          source: data.source,
          documents: data.documents
        })
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

  useEffect(() => {
    if (isCheckingAuth || !user || starterPromptHandledRef.current || isSending) {
      return;
    }

    if (typeof window === "undefined") {
      return;
    }

    const starterPrompt = window.sessionStorage
      .getItem(DASHBOARD_STARTER_PROMPT_KEY)
      ?.trim();

    if (!starterPrompt) {
      return;
    }

    starterPromptHandledRef.current = true;
    window.sessionStorage.removeItem(DASHBOARD_STARTER_PROMPT_KEY);
    void sendMessage(starterPrompt);
  }, [isCheckingAuth, isSending, sendMessage, user]);

  const handlePromptSend = async (prompt: string) => {
    setIsSidebarOpen(false);
    await sendMessage(prompt);
  };

  const cycleReplyLanguage = () => {
    const currentIndex = replyLanguageOptions.findIndex(
      (option) => option.value === replyLanguage
    );
    const nextOption =
      replyLanguageOptions[(currentIndex + 1) % replyLanguageOptions.length];

    setReplyLanguage(nextOption.value);
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

  const handleKeyDown = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      await sendMessage();
    }
  };

  const renderSidebarContent = (compact: boolean) => {
    const showLabels = !compact;

    return (
      <div className="flex h-full flex-col text-slate-700">
        <div
          className={`flex items-center border-b border-slate-200/80 px-3 py-3 ${
            showLabels ? "justify-between" : "justify-center"
          }`}
        >
          <div
            className={`inline-flex items-center rounded-full border border-white/80 bg-white/80 ${
              showLabels ? "px-3 py-2" : "px-2 py-2"
            }`}
          >
            <BrandLogo size="xs" className={showLabels ? "w-[104px]" : "w-12"} />
          </div>

          {showLabels ? (
            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/80 text-slate-500 transition hover:border-slate-300 hover:bg-white laptop:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>

        <div className={`thin-scrollbar flex-1 overflow-y-auto ${showLabels ? "px-3 py-3" : "px-2.5 py-3"}`}>
          <section className="mb-3">
            {showLabels ? (
              <div className="rounded-[1.3rem] border border-slate-200/80 bg-white/75 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700">
                  Connect with us
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Jump home or send feedback without leaving the dashboard.
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={goHome}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-white"
                  >
                    <Home className="h-4 w-4" />
                    Home
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSidebarOpen(false);
                      setIsFeedbackModalOpen(true);
                    }}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-white"
                  >
                    <MessageSquareText className="h-4 w-4" />
                    Feedback
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={goHome}
                  title="Home"
                  className="flex h-10 w-full items-center justify-center rounded-xl border border-slate-200/80 bg-white/70 text-slate-600 transition hover:border-slate-300 hover:bg-white"
                >
                  <Home className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsSidebarOpen(false);
                    setIsFeedbackModalOpen(true);
                  }}
                  title="Feedback"
                  className="flex h-10 w-full items-center justify-center rounded-xl border border-slate-200/80 bg-white/70 text-slate-600 transition hover:border-slate-300 hover:bg-white"
                >
                  <MessageSquareText className="h-4 w-4" />
                </button>
              </div>
            )}
          </section>

          <button
            type="button"
            onClick={beginNewChat}
            title="New chat"
            className={`inline-flex items-center justify-center rounded-[1.15rem] bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-sm font-semibold text-white transition hover:scale-[1.01] ${
              showLabels ? "w-full gap-2 px-4 py-2.5" : "h-10 w-full"
            }`}
          >
            <Plus className="h-4 w-4" />
            {showLabels ? <span>New chat</span> : null}
          </button>

          <div className="mt-4 space-y-5">
            {sidebarGroups.map((group) => (
              <section key={group.title}>
                {showLabels ? (
                  <p className="mb-3 px-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700">
                    {group.title}
                  </p>
                ) : null}
                <div className="space-y-2">
                  {group.items.map((item) => {
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.title}
                        type="button"
                        title={item.title}
                        onClick={() => void handlePromptSend(item.prompt)}
                        className={`flex rounded-[1.15rem] border border-slate-200/80 bg-white/70 text-left transition hover:border-slate-300 hover:bg-white ${
                          showLabels
                            ? "w-full items-start gap-2.5 px-3 py-2.5"
                            : "h-10 w-full items-center justify-center"
                        }`}
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[0.95rem] bg-sky-50 text-sky-700">
                          <Icon className="h-4 w-4" />
                        </div>
                        {showLabels ? (
                          <div className="min-w-0">
                            <p className="text-[13px] font-medium text-slate-900">
                              {item.title}
                            </p>
                            <p className="mt-1 text-xs leading-5 text-slate-500">
                              {item.description}
                            </p>
                          </div>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}

            <section>
              {showLabels ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsImportantLinksOpen((current) => !current)}
                    className="mb-3 flex w-full items-center justify-between rounded-[1.15rem] border border-slate-200/80 bg-white/70 px-3 py-2.5 text-left transition hover:border-slate-300 hover:bg-white"
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700">
                      Important links
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-slate-500 transition ${
                        isImportantLinksOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isImportantLinksOpen ? (
                    <div className="space-y-2">
                      {importantLinks.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          title={item.title}
                          onClick={() => setIsSidebarOpen(false)}
                          className="flex w-full items-start gap-2.5 rounded-[1.15rem] border border-slate-200/80 bg-white/70 px-3 py-2.5 text-left transition hover:border-slate-300 hover:bg-white"
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[0.95rem] bg-sky-50 text-sky-700">
                            <item.icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-[13px] font-medium text-slate-900">
                                {item.title}
                              </p>
                              <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
                            </div>
                            <p className="mt-1 text-xs leading-5 text-slate-500">
                              {item.description}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  ) : null}
                </>
              ) : (
                <div className="space-y-2">
                  {importantLinks.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      title={item.title}
                      onClick={() => setIsSidebarOpen(false)}
                      className="flex h-10 w-full items-center justify-center rounded-[1.05rem] border border-slate-200/80 bg-white/70 text-left transition hover:border-slate-300 hover:bg-white"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[0.95rem] bg-sky-50 text-sky-700">
                        <item.icon className="h-4 w-4" />
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </section>

            <section>
              {showLabels ? (
                <p className="mb-3 px-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700">
                  Reply language
                </p>
              ) : null}
              <div className={`${showLabels ? "grid grid-cols-2 gap-2" : "flex flex-col gap-2"}`}>
                {replyLanguageOptions.map((option) => {
                  const isSelected = option.value === replyLanguage;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setReplyLanguage(option.value)}
                      title={option.label}
                      className={`rounded-full border text-xs font-semibold transition ${
                        showLabels ? "px-3 py-2" : "h-9 w-full px-0"
                      } ${
                        isSelected
                          ? "border-sky-300 bg-sky-50 text-sky-700"
                          : "border-slate-200 bg-white/70 text-slate-600 hover:border-slate-300 hover:bg-white"
                      }`}
                    >
                      {showLabels ? option.label : option.compactLabel}
                    </button>
                  );
                })}
              </div>
              {showLabels ? (
                <p className="mt-3 text-xs leading-5 text-slate-500">
                  {replyLanguageProfiles[replyLanguage].helperText}
                </p>
              ) : null}
            </section>

            <section>
              {showLabels ? (
                <p className="mb-3 px-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700">
                  Voice replies
                </p>
              ) : null}
              <button
                type="button"
                onClick={toggleVoiceReplies}
                disabled={!isVoiceOutputSupported}
                title={isVoiceRepliesEnabled ? "Spoken replies on" : "Spoken replies off"}
                className={`flex rounded-[1.15rem] border transition disabled:cursor-not-allowed disabled:opacity-45 ${
                  showLabels
                    ? "w-full items-center justify-between px-3 py-2.5 text-left text-sm"
                    : "h-10 w-full items-center justify-center"
                } ${
                  isVoiceRepliesEnabled
                    ? "border-sky-300 bg-sky-50 text-sky-700"
                    : "border-slate-200 bg-white/70 text-slate-600 hover:border-slate-300 hover:bg-white"
                }`}
              >
                {showLabels ? (
                  <span>
                    {isVoiceRepliesEnabled ? "Spoken replies on" : "Spoken replies off"}
                  </span>
                ) : null}
                {isVoiceRepliesEnabled ? (
                  <Volume2 className="h-4 w-4" />
                ) : (
                  <VolumeX className="h-4 w-4" />
                )}
              </button>
            </section>
          </div>
        </div>

        <div className={`border-t border-slate-200/80 ${showLabels ? "px-3 py-3" : "px-2.5 py-3"}`}>
          <div
            className={`rounded-[1.15rem] border border-white/80 bg-white/80 ${
              showLabels
                ? "flex items-center gap-3 px-3 py-2.5"
                : "flex justify-center px-0 py-2.5"
            }`}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 text-sm font-semibold text-white">
              {getInitials(user?.name ?? "Student")}
            </div>
            {showLabels ? (
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-900">
                  {user?.name ?? "Student"}
                </p>
                <p className="truncate text-xs text-slate-500">{user?.email}</p>
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => void handleLogout()}
            title="Logout"
            className={`mt-3 inline-flex items-center justify-center gap-2 rounded-[1.15rem] border border-slate-200 bg-white/80 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-white ${
              showLabels ? "h-10 w-full" : "h-10 w-full"
            }`}
          >
            <LogOut className="h-4 w-4" />
            {showLabels ? <span>Logout</span> : null}
          </button>
        </div>
      </div>
    );
  };

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-br from-white via-sky-50 to-blue-50 px-6">
        <div className="glass-card rounded-[28px] px-8 py-7 text-center">
          <div className="mx-auto mb-4 h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-sky-500" />
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
            Loading
          </p>
          <h1 className="mt-2 text-xl font-semibold text-slate-950">
            Opening your dashboard...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] overflow-hidden bg-gradient-to-br from-white via-sky-50 to-blue-50 text-slate-950">
      <PageTransition className="relative flex h-[100dvh] max-h-[100dvh] gap-2 px-1 py-1.5 pt-safe tablet:page-shell tablet:gap-3 tablet:py-3">
        <AnimatePresence>
          {isSidebarOpen ? (
            <>
              <motion.button
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsSidebarOpen(false)}
                className="absolute inset-0 z-30 bg-slate-950/20 backdrop-blur-sm laptop:hidden"
                aria-label="Close sidebar overlay"
              />
              <motion.aside
                initial={{ x: -320, opacity: 0.4 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -320, opacity: 0.4 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                className="glass-card absolute inset-y-0 left-0 z-40 w-[264px] rounded-[1.75rem] border border-white/80 shadow-[0_24px_70px_rgba(15,23,42,0.14)] laptop:hidden"
              >
                {renderSidebarContent(false)}
              </motion.aside>
            </>
          ) : null}
        </AnimatePresence>

        <aside
          className={`glass-card surface-ring hidden h-full shrink-0 overflow-hidden rounded-[1.75rem] transition-all duration-300 laptop:block ${
            isSidebarCollapsed ? "w-[80px]" : "w-[264px]"
          }`}
        >
          {renderSidebarContent(isSidebarCollapsed)}
        </aside>

        <div className="flex min-w-0 flex-1 gap-3 tablet:gap-4">
          <div className="glass-card surface-ring flex min-w-0 flex-1 flex-col overflow-hidden rounded-[1.4rem] tablet:rounded-[1.75rem]">
            <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200/80 px-2.5 tablet:px-4">
              <div className="flex min-w-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsSidebarOpen(true)}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/80 bg-white/80 text-slate-600 transition hover:border-slate-300 hover:bg-white laptop:hidden"
                  aria-label="Open sidebar"
                >
                  <Menu className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsSidebarCollapsed((current) => !current)}
                  className="hidden h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/80 text-slate-600 transition hover:border-slate-300 hover:bg-white laptop:inline-flex"
                  aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                  title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                  {isSidebarCollapsed ? (
                    <ChevronRight className="h-4 w-4" />
                  ) : (
                    <ChevronLeft className="h-4 w-4" />
                  )}
                </button>

                <Link
                  href="/"
                  className="inline-flex min-w-0 items-center rounded-[1.15rem] border border-white/80 bg-white/80 px-3 py-2 transition hover:border-slate-300 hover:bg-white"
                  title={`Go to home page for ${APP_NAME}`}
                >
                  <BrandLogo size="sm" className="w-[132px] tablet:w-[156px]" />
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={beginNewChat}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/80 text-slate-600 transition hover:border-slate-300 hover:bg-white"
                  aria-label="New chat"
                  title="New chat"
                >
                  <Plus className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsSidebarOpen(true)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/80 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white laptop:hidden"
                  aria-label="Open profile and actions"
                  title={user?.name ?? "Student"}
                >
                  {getInitials(user?.name ?? "Student")}
                </button>

                <div className="hidden items-center gap-2 rounded-full border border-white/80 bg-white/80 px-3 py-1 laptop:flex">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 text-xs font-semibold text-white">
                    {getInitials(user?.name ?? "Student")}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-800">
                      {user?.name?.split(" ")[0]}
                    </p>
                  </div>
                </div>
              </div>
            </header>

            <main className="flex min-h-0 flex-1 flex-col">
              <div ref={chatScrollRef} className="thin-scrollbar min-h-0 flex-1 overflow-y-auto">
                <div
                  className={`mx-auto flex min-h-full w-full max-w-[52rem] flex-col px-2 pb-6 pt-3 tablet:px-5 ${
                    hasConversation || isSending ? "" : "justify-center"
                  }`}
                >
                  {hasConversation || isSending ? (
                    <div className="space-y-4 pb-32 pt-2 tablet:space-y-5">
                      {messages.map((message) => (
                        <ChatMessage key={message.id} message={message} />
                      ))}
                      {isSending ? <TypingIndicator /> : null}
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="mx-auto flex w-full max-w-2xl flex-col items-center text-center"
                    >
                      <Link
                        href="/"
                        className="group flex flex-col items-center"
                        title={`Go to home page for ${APP_NAME}`}
                      >
                        <div className="rounded-[1.5rem] bg-white/70 px-4 py-3 shadow-[0_24px_60px_rgba(59,130,246,0.12)] transition group-hover:scale-[1.02]">
                          <BrandLogo size="md" className="w-[200px] tablet:w-[240px]" />
                        </div>
                      </Link>
                      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-950 tablet:text-[3.1rem]">
                        How can I assist you?
                      </h1>
                      <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 tablet:text-base">
                        Ask about visas, universities, accommodation, loans, and
                        course decisions for studying in Ireland.
                      </p>
                      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                        {landingPrompts.map((prompt) => (
                          <button
                            key={prompt}
                            type="button"
                            onClick={() => void handlePromptSend(prompt)}
                            className="rounded-full border border-white/80 bg-white/80 px-4 py-2 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-white"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="shrink-0 px-2 pb-[calc(env(safe-area-inset-bottom)+8px)] pt-2 tablet:px-5">
                <div className="mx-auto w-full max-w-[44rem]">
                  {chatError ? (
                    <p className="mb-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                      {chatError}
                    </p>
                  ) : null}
                  {voiceError ? (
                    <p className="mb-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                      {voiceError}
                    </p>
                  ) : null}

                  <form
                    onSubmit={handleSubmit}
                    className="surface-ring rounded-[20px] border border-white/80 bg-white/85 p-1.5 shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
                  >
                    <textarea
                      ref={textareaRef}
                      value={draft}
                      onChange={(event) => setDraft(event.target.value)}
                      onKeyDown={(event) => void handleKeyDown(event)}
                      rows={1}
                      placeholder={`Message ${APP_SHORT_NAME}`}
                      className="min-h-[32px] max-h-24 w-full resize-none overflow-y-auto bg-transparent px-1.5 py-0.5 text-[14px] text-slate-900 outline-none placeholder:text-slate-400"
                    />

                    <div className="mt-1 flex items-center justify-between gap-1.5">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={cycleReplyLanguage}
                          className="inline-flex h-8 min-w-[34px] items-center justify-center rounded-full border border-white/80 bg-white px-2 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                          title={`Reply language: ${replyLanguageProfiles[replyLanguage].label}`}
                          aria-label={`Reply language: ${replyLanguageProfiles[replyLanguage].label}`}
                        >
                          <Globe2 className="h-3.5 w-3.5" />
                        </button>
                        <span className="text-[11px] font-medium text-slate-500">
                          {replyLanguageProfiles[replyLanguage].label}
                        </span>

                        <button
                          type="button"
                          onClick={handleVoiceToggle}
                          disabled={!isVoiceInputSupported || isSending}
                          className={`inline-flex h-8 min-w-[34px] items-center justify-center rounded-full border px-2 transition ${
                            isListening
                              ? "border-rose-200 bg-rose-50 text-rose-600"
                              : "border-white/80 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                          } disabled:cursor-not-allowed disabled:opacity-45`}
                          aria-label={isListening ? "Stop voice input" : "Start voice input"}
                          title={
                            isVoiceInputSupported
                              ? isListening
                                ? "Stop and send voice question"
                                : "Start voice input"
                              : "Voice input works best in Chrome"
                          }
                        >
                          {isListening ? (
                            <MicOff className="h-3.5 w-3.5" />
                          ) : (
                            <Mic className="h-3.5 w-3.5" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={toggleVoiceReplies}
                          disabled={!isVoiceOutputSupported}
                          className={`hidden h-8 min-w-[34px] items-center justify-center rounded-full border px-2 transition min-[380px]:inline-flex ${
                            isVoiceRepliesEnabled
                              ? "border-sky-300 bg-sky-50 text-sky-700"
                              : "border-white/80 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                          } disabled:cursor-not-allowed disabled:opacity-45`}
                          aria-label={
                            isVoiceRepliesEnabled
                              ? "Mute spoken replies"
                              : "Enable spoken replies"
                          }
                          title={
                            isVoiceRepliesEnabled
                              ? "Mute spoken replies"
                              : "Read assistant replies aloud"
                          }
                        >
                          {isVoiceRepliesEnabled ? (
                            <Volume2 className="h-3.5 w-3.5" />
                          ) : (
                            <VolumeX className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>

                      <button
                        type="submit"
                        disabled={!draft.trim() || isSending}
                        className="inline-flex h-8 min-w-[36px] items-center justify-center rounded-full bg-[#4e67dd] px-3 text-white transition hover:bg-[#6077e7] disabled:cursor-not-allowed disabled:opacity-45"
                        aria-label="Send message"
                      >
                        <Send className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    {isListening ? (
                      <div className="mt-1.5 px-1 text-[11px] leading-5 text-slate-500">
                        {liveTranscript ? `Listening: "${liveTranscript}"` : "Listening..."}
                      </div>
                    ) : null}
                  </form>
                </div>
              </div>
            </main>
          </div>

        </div>
      </PageTransition>

      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        userName={user?.name}
        userEmail={user?.email}
      />
    </div>
  );
}
