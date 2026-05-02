import { GoogleGenAI } from "@google/genai";

import { APP_NAME } from "@/lib/branding";
import {
  formatBlockedSourcesForPrompt,
  formatPreferredSourcesForPrompt
} from "@/lib/preferredSources";
import { ReplyLanguage, replyLanguageProfiles } from "@/lib/replyLanguage";
import {
  formatStudentProfileForPrompt,
  normalizeStudentProfileInput,
  type StudentProfile
} from "@/lib/studentProfile";

const MODEL_NAME = "gemini-2.5-flash";
const GUIDON_INTENTS = [
  "admissions",
  "tuition_fees",
  "cost_of_living",
  "visa",
  "accommodation",
  "part_time_jobs",
  "scholarships",
  "university_comparison",
  "travel",
  "documents",
  "banking",
  "sim_card",
  "health_insurance",
  "student_life",
  "emergency",
  "unclear"
] as const;
const DUBLIN_AREA_MAPS = [
  {
    label: "Student map",
    url: "https://www.google.com/maps/d/viewer?mid=1ObFwqV2vtigkclpjea3sUHNhUuw&ll=53.291859560190396%2C-6.18664934077243&z=13"
  },
  {
    label: "Accommodation map",
    url: "https://www.google.com/maps/d/viewer?mid=12P4oVY7A4w538meuFJUEEuMIJ1paCuE8&ll=53.28668449709923%2C-6.158606121728503&z=12"
  },
  {
    label: "Area demarcation map",
    url: "https://www.google.com/maps/d/viewer?mid=1ObFwqV2vtigkclpjea3sUHNhUuw&ll=53.32837264518767%2C-6.201412219190399&z=13"
  }
] as const;

const SYSTEM_PROMPT = `
You are ${APP_NAME}, a study assistant for Indian students.
Focus on studying in Ireland, including visas, accommodation, education loans, university shortlisting, and course decisions.
Assume the student is an Indian citizen currently applying from India unless they clearly say otherwise.
Default to India-specific application steps, India-based visa workflows, India pricing, and India departure logistics when relevant.
Accuracy is more important than speed, style, or completeness.
Return valid GitHub-flavored Markdown.
Follow these formatting rules strictly:
1. No long paragraphs.
2. Break content into bullets, numbered lists, or short sections.
3. Start with a direct answer in one line.
4. Use markdown tables for comparisons, pros and cons, dates, or concept differences.
5. Use bold for key terms, formulas, and important numbers.
6. Use italics for examples, hints, or side notes.
7. Keep each sentence short and simple.
8. If the answer has steps, use a numbered list.
9. For definitions, write the term in bold, then give a one-line plain English explanation.
10. For formulas, use a fenced code block or bold variables.
11. End with one short summary line or a short "Need more help?" prompt.
12. Do not add long introductions, long conclusions, or decorative greetings.
13. Do not use markdown tables unless the answer is actually a comparison.
14. If facts can change, add one short verification note at the end.
15. Never invent dates, fees, visa rules, deadlines, or work rights.
16. If a fact is missing or uncertain, say so clearly.
17. Preserve exact numbers and dates from the source when available.
Keep answers compact unless the user asks for detail.
`.trim();

let geminiClient: GoogleGenAI | null = null;

export type GuidonIntent = (typeof GUIDON_INTENTS)[number];

export type GeminiConversationMessage = {
  role: "user" | "assistant";
  content: string;
};

export type GeminiIntentResult = {
  primaryIntent: GuidonIntent;
  secondaryIntent: GuidonIntent | "";
  topic: string;
  isFollowUp: boolean;
  missingInformation: string[];
  confidence: number;
  shouldAskClarification: boolean;
  clarificationQuestion: string;
};

export type GeminiRewriteResult = {
  rewrittenQuestion: string;
  assumptionsUsed: string[];
  ambiguityLevel: "low" | "medium" | "high";
};

export type GeminiMemoryUpdate = {
  updatedProfile: Partial<StudentProfile>;
  updatedConversationSummary: string;
  lastTopic: string;
  lastIntent: GuidonIntent | "";
  riskFlags: string[];
  newFactsToSave: string[];
  doNotSave: string[];
};

export type GeminiAnswerContext = {
  conversationSummary?: string;
  intentResult?: GeminiIntentResult | null;
  rewriteResult?: GeminiRewriteResult | null;
};

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return null;
  }

  if (!geminiClient) {
    geminiClient = new GoogleGenAI({ apiKey });
  }

  return geminiClient;
}

function withFormattingRules(extraInstructions: string) {
  return `${SYSTEM_PROMPT}\n\n${extraInstructions}`.trim();
}

function getReplyLanguageInstruction(replyLanguage: ReplyLanguage) {
  return replyLanguageProfiles[replyLanguage].replyInstruction;
}

function clampConfidence(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.max(0, Math.min(1, value));
  }

  if (typeof value === "string") {
    const parsed = Number(value);

    if (Number.isFinite(parsed)) {
      return Math.max(0, Math.min(1, parsed));
    }
  }

  return 0;
}

function normalizeString(value: unknown, maxLength = 240) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function normalizeStringArray(value: unknown, maxItems = 8, maxLength = 160) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((entry) => normalizeString(entry, maxLength))
    .filter(Boolean)
    .slice(0, maxItems);
}

function isGuidonIntent(value: unknown): value is GuidonIntent {
  return typeof value === "string" && GUIDON_INTENTS.includes(value as GuidonIntent);
}

function normalizeIntent(value: unknown): GuidonIntent {
  return isGuidonIntent(value) ? value : "unclear";
}

function normalizeOptionalIntent(value: unknown): GuidonIntent | "" {
  return isGuidonIntent(value) ? value : "";
}

function stripCodeFences(text: string) {
  return text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
}

function extractJsonText(text: string) {
  const cleaned = stripCodeFences(text.trim());

  if (!cleaned) {
    return "";
  }

  if (
    (cleaned.startsWith("{") && cleaned.endsWith("}")) ||
    (cleaned.startsWith("[") && cleaned.endsWith("]"))
  ) {
    return cleaned;
  }

  const firstObject = cleaned.indexOf("{");
  const lastObject = cleaned.lastIndexOf("}");

  if (firstObject >= 0 && lastObject > firstObject) {
    return cleaned.slice(firstObject, lastObject + 1);
  }

  const firstArray = cleaned.indexOf("[");
  const lastArray = cleaned.lastIndexOf("]");

  if (firstArray >= 0 && lastArray > firstArray) {
    return cleaned.slice(firstArray, lastArray + 1);
  }

  return cleaned;
}

function parseJsonResponse(text: string) {
  const jsonText = extractJsonText(text);

  if (!jsonText) {
    return null;
  }

  try {
    return JSON.parse(jsonText) as unknown;
  } catch {
    return null;
  }
}

function formatConversationContext(history: GeminiConversationMessage[] = []) {
  const recentHistory = history
    .filter((message) => message.content.trim())
    .slice(-12);

  if (!recentHistory.length) {
    return "Recent conversation: None yet.";
  }

  return `Recent conversation context, oldest to newest:
${recentHistory
  .map((message) => {
    const speaker = message.role === "user" ? "Student" : "Assistant";

    return `${speaker}: ${message.content.trim()}`;
  })
  .join("\n\n")}

Use this context only to understand follow-up questions. Do not repeat earlier answers unless useful.`;
}

function formatConversationSummary(summary = "") {
  const normalizedSummary = summary.replace(/\s+/g, " ").trim();

  return `Conversation summary:
${normalizedSummary || "No saved conversation summary yet."}`;
}

function formatIntentContext(intentResult?: GeminiIntentResult | null) {
  if (!intentResult) {
    return "";
  }

  return `Detected intent:
- Primary intent: ${intentResult.primaryIntent}
- Secondary intent: ${intentResult.secondaryIntent || "None"}
- Topic: ${intentResult.topic || "Unknown"}
- Follow-up: ${intentResult.isFollowUp ? "Yes" : "No"}
- Confidence: ${intentResult.confidence.toFixed(2)}
- Missing information: ${
    intentResult.missingInformation.length
      ? intentResult.missingInformation.join(", ")
      : "None"
  }`;
}

function formatRewriteContext(rewriteResult?: GeminiRewriteResult | null) {
  if (!rewriteResult?.rewrittenQuestion) {
    return "";
  }

  return `Rewritten standalone question:
${rewriteResult.rewrittenQuestion}

Assumptions used: ${
    rewriteResult.assumptionsUsed.length
      ? rewriteResult.assumptionsUsed.join(", ")
      : "None"
  }
Ambiguity level: ${rewriteResult.ambiguityLevel}`;
}

function getLastAssistantMessage(history: GeminiConversationMessage[] = []) {
  return (
    history
      .slice()
      .reverse()
      .find((message) => message.role === "assistant" && message.content.trim())
      ?.content.trim() || ""
  );
}

function getClarificationFallback(result: GeminiIntentResult, message: string) {
  if (result.clarificationQuestion) {
    return result.clarificationQuestion;
  }

  if (message.toLowerCase().includes("how much")) {
    return "Do you mean tuition fees, rent, visa cost, or monthly living cost?";
  }

  return "Could you tell me which part you mean so I can help accurately?";
}

async function generateJson<T>(
  prompt: string,
  maxOutputTokens = 600
): Promise<T | null> {
  const client = getGeminiClient();

  if (!client) {
    return null;
  }

  const response = await client.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      temperature: 0.1,
      maxOutputTokens
    }
  });

  return parseJsonResponse(response.text ?? "") as T | null;
}

function sanitizeIntentResult(value: unknown): GeminiIntentResult {
  const raw = typeof value === "object" && value !== null ? value : {};
  const confidence = clampConfidence(
    (raw as { confidence?: unknown }).confidence
  );
  const shouldAskClarification =
    confidence < 0.45 ||
    Boolean((raw as { shouldAskClarification?: unknown }).shouldAskClarification);

  return {
    primaryIntent: normalizeIntent(
      (raw as { primaryIntent?: unknown }).primaryIntent
    ),
    secondaryIntent: normalizeOptionalIntent(
      (raw as { secondaryIntent?: unknown }).secondaryIntent
    ),
    topic: normalizeString((raw as { topic?: unknown }).topic),
    isFollowUp: Boolean((raw as { isFollowUp?: unknown }).isFollowUp),
    missingInformation: normalizeStringArray(
      (raw as { missingInformation?: unknown }).missingInformation,
      6,
      80
    ),
    confidence,
    shouldAskClarification,
    clarificationQuestion: normalizeString(
      (raw as { clarificationQuestion?: unknown }).clarificationQuestion,
      180
    )
  };
}

function sanitizeRewriteResult(
  value: unknown,
  fallbackQuestion: string
): GeminiRewriteResult {
  const raw = typeof value === "object" && value !== null ? value : {};
  const ambiguityLevel = normalizeString(
    (raw as { ambiguityLevel?: unknown }).ambiguityLevel,
    12
  );

  return {
    rewrittenQuestion:
      normalizeString(
        (raw as { rewrittenQuestion?: unknown }).rewrittenQuestion,
        500
      ) || fallbackQuestion,
    assumptionsUsed: normalizeStringArray(
      (raw as { assumptionsUsed?: unknown }).assumptionsUsed,
      6,
      120
    ),
    ambiguityLevel:
      ambiguityLevel === "low" ||
      ambiguityLevel === "medium" ||
      ambiguityLevel === "high"
        ? ambiguityLevel
        : "medium"
  };
}

function sanitizeMemoryUpdate(value: unknown): GeminiMemoryUpdate {
  const raw = typeof value === "object" && value !== null ? value : {};

  return {
    updatedProfile: normalizeStudentProfileInput(
      (raw as { updatedProfile?: Partial<StudentProfile> }).updatedProfile
    ),
    updatedConversationSummary: normalizeString(
      (raw as { updatedConversationSummary?: unknown }).updatedConversationSummary,
      1200
    ),
    lastTopic: normalizeString((raw as { lastTopic?: unknown }).lastTopic, 120),
    lastIntent: normalizeOptionalIntent(
      (raw as { lastIntent?: unknown }).lastIntent
    ),
    riskFlags: normalizeStringArray(
      (raw as { riskFlags?: unknown }).riskFlags,
      8,
      80
    ),
    newFactsToSave: normalizeStringArray(
      (raw as { newFactsToSave?: unknown }).newFactsToSave,
      8,
      160
    ),
    doNotSave: normalizeStringArray(
      (raw as { doNotSave?: unknown }).doNotSave,
      8,
      160
    )
  };
}

function getGroundingSourceLinks(response: {
  text?: string;
  candidates?: Array<{
    groundingMetadata?: {
      groundingSupports?: Array<{
        segment?: { endIndex?: number };
        groundingChunkIndices?: number[];
      }>;
      groundingChunks?: Array<{
        web?: { uri?: string };
      }>;
    };
  }>;
}) {
  const chunks =
    response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];

  return Array.from(
    new Set(
      chunks
        .map((chunk) => chunk.web?.uri?.trim())
        .filter((uri): uri is string => Boolean(uri))
    )
  ).slice(0, 5);
}

function appendSourceDocList(text: string, fileNames: string[]) {
  const uniqueFileNames = Array.from(new Set(fileNames)).slice(0, 4);

  if (!uniqueFileNames.length) {
    return text.trim();
  }

  return `${text.trim()}\n\n**Source Docs:**\n${uniqueFileNames
    .map((fileName) => `- ${fileName}`)
    .join("\n")}`.trim();
}

function appendWebSourceList(text: string, urls: string[]) {
  if (!urls.length) {
    return text.trim();
  }

  return `${text.trim()}\n\n**Web Sources:**\n${urls
    .map((url, index) => `- [Source ${index + 1}](${url})`)
    .join("\n")}`.trim();
}

function isDublinAreaQuestion(message: string) {
  const normalizedMessage = message.toLowerCase();
  const mentionsDublin = normalizedMessage.includes("dublin");
  const areaKeywords = [
    "area",
    "areas",
    "neighbourhood",
    "neighborhood",
    "desirable",
    "desirability",
    "safe",
    "safety",
    "where should i live",
    "where to live",
    "best place",
    "best area",
    "commute",
    "rent",
    "accommodation",
    "stay",
    "staying"
  ];

  return mentionsDublin && areaKeywords.some((keyword) => normalizedMessage.includes(keyword));
}

function getDublinAreaInstruction(message: string) {
  if (!isDublinAreaQuestion(message)) {
    return "";
  }

  return `
For Dublin area desirability, neighbourhood, rent, safety, commute, or accommodation questions, use these shared planning maps as important user-provided context:
- Student map: ${DUBLIN_AREA_MAPS[0].url}
- Accommodation map: ${DUBLIN_AREA_MAPS[1].url}
- Area demarcation map: ${DUBLIN_AREA_MAPS[2].url}
Use them to guide area comparisons alongside official and trusted sources.
If relevant, mention them briefly as helpful planning maps at the end of the answer.
  `.trim();
}

function appendHelpfulMapLinks(text: string, message: string) {
  if (!isDublinAreaQuestion(message)) {
    return text.trim();
  }

  return `${text.trim()}\n\n**Helpful Maps:**\n${DUBLIN_AREA_MAPS.map(
    (map) => `- [${map.label}](${map.url})`
  ).join("\n")}`.trim();
}

export async function classifyGuidonIntent(
  message: string,
  history: GeminiConversationMessage[] = [],
  studentProfile: StudentProfile | null = null,
  conversationSummary = ""
) {
  const prompt = `
You are an intent classifier for Guidon, a student-support chatbot for international students moving to Ireland.

Classify the user message into ONE primary intent.

Allowed intents:
${GUIDON_INTENTS.map((intent) => `- ${intent}`).join("\n")}

${formatStudentProfileForPrompt(studentProfile)}
${formatConversationSummary(conversationSummary)}
${formatConversationContext(history)}

Latest user message:
${message}

Return JSON only:
{
  "primaryIntent": "",
  "secondaryIntent": "",
  "topic": "",
  "isFollowUp": true,
  "missingInformation": [],
  "confidence": 0,
  "shouldAskClarification": false,
  "clarificationQuestion": ""
}
  `.trim();

  const parsed = await generateJson<unknown>(prompt, 320);

  return sanitizeIntentResult(parsed);
}

export async function rewriteGuidonQuestion(
  message: string,
  detectedIntent: GeminiIntentResult,
  history: GeminiConversationMessage[] = [],
  studentProfile: StudentProfile | null = null,
  conversationSummary = ""
) {
  const prompt = `
You are a query rewriter for Guidon.

Your job is to rewrite the student's latest message into a complete, standalone question using the available context.

Do not answer the question.
Do not add facts that are not in context.
If the user message is vague, infer the most likely meaning from the previous topic.

${formatStudentProfileForPrompt(studentProfile)}
${formatConversationSummary(conversationSummary)}
${formatConversationContext(history)}

Last assistant message:
${getLastAssistantMessage(history) || "None yet."}

Latest student message:
${message}

Detected intent:
${detectedIntent.primaryIntent}

Return JSON only:
{
  "rewrittenQuestion": "",
  "assumptionsUsed": [],
  "ambiguityLevel": "low"
}
  `.trim();

  const parsed = await generateJson<unknown>(prompt, 320);

  return sanitizeRewriteResult(parsed, message);
}

export async function updateGuidonMemory(
  userMessage: string,
  assistantResponse: string,
  detectedIntent: GeminiIntentResult,
  studentProfile: StudentProfile | null = null,
  conversationSummary = ""
) {
  const prompt = `
You are a memory updater for Guidon.

Extract only useful long-term or session-level context from the conversation.

Do not store sensitive personal data unless directly needed for student support.
Do not store random details.
Prefer compact summaries.

Current user profile:
${formatStudentProfileForPrompt(studentProfile)}

${formatConversationSummary(conversationSummary)}

Latest user message:
${userMessage}

Assistant response:
${assistantResponse}

Detected intent:
${detectedIntent.primaryIntent}

Return JSON only:
{
  "updatedProfile": {
    "originCountry": "",
    "destinationCountry": "",
    "currentLocation": "",
    "targetUniversity": "",
    "targetCity": "",
    "courseInterest": "",
    "studyLevel": "",
    "intake": "",
    "budgetRange": "",
    "visaStage": "",
    "accommodationStage": "",
    "languagePreference": "",
    "supportStyle": "",
    "notes": ""
  },
  "updatedConversationSummary": "",
  "lastTopic": "",
  "lastIntent": "",
  "riskFlags": [],
  "newFactsToSave": [],
  "doNotSave": []
}
  `.trim();

  const parsed = await generateJson<unknown>(prompt, 520);

  return sanitizeMemoryUpdate(parsed);
}

export async function getGeminiKnowledgeReply(
  message: string,
  knowledgeMatches: Array<{
    fileName: string;
    text: string;
  }>,
  replyLanguage: ReplyLanguage = "english",
  history: GeminiConversationMessage[] = [],
  studentProfile: StudentProfile | null = null,
  answerContext: GeminiAnswerContext = {}
) {
  const client = getGeminiClient();

  if (!client) {
    return null;
  }

  const knowledgeContext = knowledgeMatches
    .map(
      (match, index) =>
        `[Document ${index + 1}: ${match.fileName}]\n${match.text}`
    )
    .join("\n\n");
  const questionForAnswer =
    answerContext.rewriteResult?.rewrittenQuestion?.trim() || message;

  const response = await client.models.generateContent({
    model: MODEL_NAME,
    contents: `${withFormattingRules(
      `
${getReplyLanguageInstruction(replyLanguage)}
${formatStudentProfileForPrompt(studentProfile)}
${formatConversationSummary(answerContext.conversationSummary)}
${formatConversationContext(history)}
${formatIntentContext(answerContext.intentResult)}
${formatRewriteContext(answerContext.rewriteResult)}

Answer the student using only the local document excerpts below.
Do not use outside facts or your own memory.
Use only facts that are explicitly supported by the local excerpts.
If a number, date, policy, or rule is not clearly present in the excerpts, do not guess.
If the excerpts partially answer the question, answer only the covered part and clearly say what is missing.
Prefer answering from the local documents whenever they are relevant.
Only trigger fallback if the excerpts contain no meaningful information for the student's main question.
If the local documents truly cannot answer the main question, reply with exactly:
__NEED_WEB_FALLBACK__
Then add one short sentence about what is missing.
If the detected intent confidence is between 0.45 and 0.74, it is acceptable to start with "Assuming you mean..." when that helps connect a vague follow-up to the context.

Original student message:
${message}

Standalone question to answer:
${questionForAnswer}

Local document excerpts:
${knowledgeContext}
      `
    )}`
  });

  const text = response.text?.trim() || null;

  if (!text) {
    return null;
  }

  return {
    reply: appendSourceDocList(
      text.replace(/^__NEED_WEB_FALLBACK__\s*/i, "").trim(),
      knowledgeMatches.map((match) => match.fileName)
    ),
    needsWebFallback: text.startsWith("__NEED_WEB_FALLBACK__")
  };
}

export async function getGeminiWebReply(
  message: string,
  replyLanguage: ReplyLanguage = "english",
  history: GeminiConversationMessage[] = [],
  studentProfile: StudentProfile | null = null,
  answerContext: GeminiAnswerContext = {}
) {
  const client = getGeminiClient();

  if (!client) {
    return null;
  }

  const preferredSourcesBlock = formatPreferredSourcesForPrompt();
  const blockedSourcesBlock = formatBlockedSourcesForPrompt();
  const questionForAnswer =
    answerContext.rewriteResult?.rewrittenQuestion?.trim() || message;

  const response = await client.models.generateContent({
    model: MODEL_NAME,
    contents: `${withFormattingRules(
      `
${getReplyLanguageInstruction(replyLanguage)}
${formatStudentProfileForPrompt(studentProfile)}
${formatConversationSummary(answerContext.conversationSummary)}
${formatConversationContext(history)}
${formatIntentContext(answerContext.intentResult)}
${formatRewriteContext(answerContext.rewriteResult)}
${getDublinAreaInstruction(message)}

Use Google Search only when needed for accurate and current information.
Prefer practical answers for Indian students planning to study in Ireland.
Assume the student is an Indian citizen based in India unless the question says otherwise.
For visa and pre-departure questions, prioritize India-specific official pages over general global pages.
Do not place source numbers or inline citations inside sentences.
Keep the answer clean, then list sources separately at the end.
Only state a visa rule, fee, date, or work right if grounded search supports it.
If the detected intent confidence is between 0.45 and 0.74, it is acceptable to start with "Assuming you mean..." when that helps connect a vague follow-up to the context.
Prioritize these trusted websites first when they are relevant:
${preferredSourcesBlock || "- No preferred sites configured"}
For Ireland visa questions from Indian students, prefer these in order when relevant:
- ireland.ie/en/india/newdelhi/
- ireland.ie/en/india/newdelhi/services/visas/visas-for-ireland/
- irishimmigration.ie
- visas.inis.gov.ie
- visa.vfsglobal.com/ind/en/irl/
- passportindia.gov.in
- mea.gov.in
For university-specific questions, prefer the official university or college website directly.
Do not treat consultancy websites, admission agents, coaching portals, or recruitment blogs as authoritative sources.
Do not cite consultancy websites unless the user explicitly asks for them.
Avoid these consultancy or agent-style sources unless the user explicitly asks:
${blockedSourcesBlock || "- No blocked sources configured"}
Use other websites only if the preferred sites do not contain the needed answer.

Original student message:
${message}

Standalone question to answer:
${questionForAnswer}
      `
    )}`,
    config: {
      tools: [{ googleSearch: {} }]
    }
  });

  const text = response.text?.trim() || null;

  if (!text) {
    return null;
  }

  return appendWebSourceList(
    appendHelpfulMapLinks(text, message),
    getGroundingSourceLinks(response)
  );
}
