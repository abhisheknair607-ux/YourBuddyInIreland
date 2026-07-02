import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type DraftPayload = {
  background: string;
  motivation: string;
  goals: string;
  whyIreland: string;
};

type ReviewPayload = {
  score: number;
  overview: string;
  strengths: string[];
  improvements: string[];
  reviewNotes: string[];
  sectionFeedback: DraftPayload;
  readyForExport: boolean;
};

const MODEL_NAME = "gemini-2.5-flash";
const SECTION_KEYS = [
  "background",
  "motivation",
  "goals",
  "whyIreland"
] as const;

let geminiClient: GoogleGenAI | null = null;

function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function clampScore(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.max(0, Math.min(100, Math.round(value)));
  }

  if (typeof value === "string") {
    const parsed = Number(value);

    if (Number.isFinite(parsed)) {
      return Math.max(0, Math.min(100, Math.round(parsed)));
    }
  }

  return 0;
}

function normalizeStringArray(value: unknown, maxItems = 4, maxLength = 180) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((entry) => getString(entry).slice(0, maxLength))
    .filter(Boolean)
    .slice(0, maxItems);
}

function withArrayFallback(
  value: unknown,
  fallback: string[],
  maxItems = 4,
  maxLength = 180
) {
  const normalized = normalizeStringArray(value, maxItems, maxLength);

  return normalized.length ? normalized : fallback;
}

function stripCodeFences(text: string) {
  return text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
}

function extractJsonText(text: string) {
  const cleaned = stripCodeFences(text);

  if (!cleaned) {
    return "";
  }

  if (cleaned.startsWith("{") && cleaned.endsWith("}")) {
    return cleaned;
  }

  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace >= 0 && lastBrace > firstBrace) {
    return cleaned.slice(firstBrace, lastBrace + 1);
  }

  return "";
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

function sanitizeDraft(body: unknown): DraftPayload {
  const raw = typeof body === "object" && body !== null ? body : {};

  return {
    background: getString((raw as Record<string, unknown>).background),
    motivation: getString((raw as Record<string, unknown>).motivation),
    goals: getString((raw as Record<string, unknown>).goals),
    whyIreland: getString((raw as Record<string, unknown>).whyIreland)
  };
}

function buildDraftText(draft: DraftPayload) {
  return [
    `Background:\n${draft.background || "Not provided."}`,
    `Motivation:\n${draft.motivation || "Not provided."}`,
    `Goals:\n${draft.goals || "Not provided."}`,
    `Why Ireland:\n${draft.whyIreland || "Not provided."}`
  ].join("\n\n");
}

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

function heuristicSectionFeedback(
  sectionName: string,
  value: string,
  preferredSignals: RegExp[]
) {
  if (!value) {
    return `Add this section so the SOP does not feel incomplete. ${sectionName} needs at least one specific example.`;
  }

  if (value.length < 120) {
    return `${sectionName} is present, but it still feels brief. Add one concrete detail, outcome, or example to make it more credible.`;
  }

  const hasPreferredSignal = preferredSignals.some((pattern) => pattern.test(value));

  if (!hasPreferredSignal) {
    return `${sectionName} reads clearly, but it would be stronger with one specific detail such as a project, internship, result, or named goal.`;
  }

  return `${sectionName} has enough substance to work as a strong paragraph. Keep the specific details and avoid making it more generic.`;
}

function createHeuristicReview(draft: DraftPayload): ReviewPayload {
  const values = SECTION_KEYS.map((key) => draft[key]);
  const completedSections = values.filter(Boolean).length;
  const totalLength = values.reduce((sum, value) => sum + value.length, 0);
  const concreteSignalCount = values.reduce((sum, value) => {
    const signals = [
      /\b\d{2,}\b/,
      /\bproject\b/i,
      /\binternship\b/i,
      /\bresearch\b/i,
      /\bexperience\b/i,
      /\bgoal\b/i,
      /\bcareer\b/i,
      /\bIreland\b/i,
      /\bmodule\b/i,
      /\bprogramme\b/i
    ];

    return (
      sum +
      signals.reduce(
        (signalCount, pattern) => signalCount + (pattern.test(value) ? 1 : 0),
        0
      )
    );
  }, 0);

  let score = completedSections * 18;

  if (totalLength >= 450) score += 12;
  else if (totalLength >= 320) score += 8;
  else if (totalLength >= 220) score += 4;

  if (concreteSignalCount >= 8) score += 14;
  else if (concreteSignalCount >= 5) score += 9;
  else if (concreteSignalCount >= 3) score += 5;

  if (/Ireland/i.test(draft.whyIreland) && /\bcareer|goal|future\b/i.test(draft.goals)) {
    score += 4;
  }

  const strengths: string[] = [];
  const improvements: string[] = [];
  const reviewNotes: string[] = [];

  if (completedSections >= 4) {
    strengths.push("All core SOP sections are present, so the draft already has a complete narrative arc.");
  } else {
    improvements.push("Finish all four core sections so the SOP reads like one complete story instead of separate notes.");
  }

  if (concreteSignalCount >= 5) {
    strengths.push("The draft includes concrete signals like projects, internships, or goals, which makes the story feel more credible.");
  } else {
    improvements.push("Add concrete evidence such as one project, internship, achievement, or measurable outcome.");
  }

  if (/Ireland/i.test(draft.whyIreland)) {
    strengths.push("The Ireland section is anchored to the destination, which helps the application feel intentional.");
  } else {
    improvements.push("Explain why Ireland specifically fits your plan, not just why you want to study abroad.");
  }

  if (draft.goals.length >= 120) {
    strengths.push("Your goals section already points toward a future path, which helps the SOP feel purposeful.");
  } else {
    improvements.push("Clarify your short-term and longer-term goals so the programme choice feels linked to a real plan.");
  }

  reviewNotes.push(
    completedSections >= 4
      ? "The structure is solid. Focus next on specificity and proof."
      : "The main priority is to complete the missing sections before polishing tone."
  );
  reviewNotes.push(
    concreteSignalCount >= 5
      ? "Keep the concrete examples. They make the draft feel believable."
      : "One concrete project or internship detail would raise the draft quality quickly."
  );
  reviewNotes.push(
    /Ireland/i.test(draft.whyIreland)
      ? "Make sure the Ireland reasons stay tied to your goals, not just general reputation."
      : "Add one Ireland-specific reason such as programme fit, industry links, or post-study pathway."
  );

  return {
    score: Math.max(28, Math.min(100, score)),
    overview:
      completedSections >= 4
        ? "This draft has the right structure and is ready for a stronger specificity pass."
        : "This draft is heading in the right direction, but it still needs a few core sections completed.",
    strengths: strengths.slice(0, 4),
    improvements: improvements.slice(0, 4),
    reviewNotes: reviewNotes.slice(0, 4),
    sectionFeedback: {
      background: heuristicSectionFeedback("Background", draft.background, [
        /\bdegree\b/i,
        /\bproject\b/i,
        /\bcoursework\b/i,
        /\binternship\b/i
      ]),
      motivation: heuristicSectionFeedback("Motivation", draft.motivation, [
        /\binternship\b/i,
        /\binterest\b/i,
        /\bexperience\b/i,
        /\breal\b/i
      ]),
      goals: heuristicSectionFeedback("Goals", draft.goals, [
        /\bcareer\b/i,
        /\brole\b/i,
        /\bshort-term\b/i,
        /\blong-term\b/i
      ]),
      whyIreland: heuristicSectionFeedback("Why Ireland", draft.whyIreland, [
        /\bIreland\b/i,
        /\bprogramme\b/i,
        /\bindustry\b/i,
        /\bpost-study\b/i
      ])
    },
    readyForExport: completedSections === 4 && totalLength >= 260
  };
}

function sanitizeReview(value: unknown, fallback: ReviewPayload): ReviewPayload {
  const raw = typeof value === "object" && value !== null ? value : {};
  const sectionFeedbackRaw =
    typeof (raw as { sectionFeedback?: unknown }).sectionFeedback === "object" &&
    (raw as { sectionFeedback?: unknown }).sectionFeedback !== null
      ? ((raw as { sectionFeedback: Record<string, unknown> }).sectionFeedback as Record<
          string,
          unknown
        >)
      : {};

  return {
    score: clampScore((raw as { score?: unknown }).score) || fallback.score,
    overview: getString((raw as { overview?: unknown }).overview) || fallback.overview,
    strengths: withArrayFallback(
      (raw as { strengths?: unknown }).strengths,
      fallback.strengths
    ),
    improvements: withArrayFallback(
      (raw as { improvements?: unknown }).improvements,
      fallback.improvements
    ),
    reviewNotes: withArrayFallback(
      (raw as { reviewNotes?: unknown }).reviewNotes,
      fallback.reviewNotes
    ),
    sectionFeedback: {
      background:
        getString(sectionFeedbackRaw.background) || fallback.sectionFeedback.background,
      motivation:
        getString(sectionFeedbackRaw.motivation) || fallback.sectionFeedback.motivation,
      goals: getString(sectionFeedbackRaw.goals) || fallback.sectionFeedback.goals,
      whyIreland:
        getString(sectionFeedbackRaw.whyIreland) || fallback.sectionFeedback.whyIreland
    },
    readyForExport:
      typeof (raw as { readyForExport?: unknown }).readyForExport === "boolean"
        ? (raw as { readyForExport: boolean }).readyForExport
        : fallback.readyForExport
  };
}

async function getAiReview(draft: DraftPayload, fallback: ReviewPayload) {
  const client = getGeminiClient();

  if (!client) {
    return fallback;
  }

  const prompt = `
You are reviewing a Statement of Purpose draft for an Indian student planning to study in Ireland.
Return valid JSON with this exact shape:
{
  "score": number,
  "overview": string,
  "strengths": string[],
  "improvements": string[],
  "reviewNotes": string[],
  "sectionFeedback": {
    "background": string,
    "motivation": string,
    "goals": string,
    "whyIreland": string
  },
  "readyForExport": boolean
}

Rules:
- Keep every string concise and actionable.
- Use 2 to 4 items for strengths, improvements, and reviewNotes.
- Score from 0 to 100.
- Judge clarity, specificity, structure, and Ireland relevance.
- Be honest. Do not overpraise weak writing.

Draft:
${buildDraftText(draft)}
`.trim();

  const response = await client.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      temperature: 0.2,
      maxOutputTokens: 900
    }
  });

  return sanitizeReview(parseJsonResponse(response.text ?? ""), fallback);
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }

  const draft = sanitizeDraft(body);

  if (!SECTION_KEYS.some((key) => draft[key])) {
    return NextResponse.json(
      { error: "Add some draft content before requesting a review." },
      { status: 400 }
    );
  }

  try {
    const fallback = createHeuristicReview(draft);
    const review = await getAiReview(draft, fallback);

    return NextResponse.json(review);
  } catch (error) {
    console.error("Document review failed:", error);

    return NextResponse.json(createHeuristicReview(draft));
  }
}
