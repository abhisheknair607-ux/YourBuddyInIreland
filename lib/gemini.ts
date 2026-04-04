import { GoogleGenAI } from "@google/genai";

import { ReplyLanguage, replyLanguageProfiles } from "@/lib/replyLanguage";

const MODEL_NAME = "gemini-2.5-flash";

const SYSTEM_PROMPT = `
You are Your Buddy In Ireland, a study assistant for Indian students.
Focus on studying in Ireland, including visas, accommodation, education loans, university shortlisting, and course decisions.
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
Keep answers compact unless the user asks for detail.
`.trim();

let geminiClient: GoogleGenAI | null = null;

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

function addGroundingCitations(response: {
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
  let text = response.text ?? "";
  const supports =
    response.candidates?.[0]?.groundingMetadata?.groundingSupports ?? [];
  const chunks =
    response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];

  const sortedSupports = [...supports].sort(
    (left, right) =>
      (right.segment?.endIndex ?? 0) - (left.segment?.endIndex ?? 0)
  );

  for (const support of sortedSupports) {
    const endIndex = support.segment?.endIndex;

    if (endIndex === undefined || !support.groundingChunkIndices?.length) {
      continue;
    }

    const citationLinks = support.groundingChunkIndices
      .map((chunkIndex) => {
        const uri = chunks[chunkIndex]?.web?.uri;

        return uri ? `[${chunkIndex + 1}](${uri})` : null;
      })
      .filter((citation): citation is string => Boolean(citation));

    if (!citationLinks.length) {
      continue;
    }

    text = `${text.slice(0, endIndex)} ${citationLinks.join(", ")}${text.slice(endIndex)}`;
  }

  return text.trim();
}

export async function getGeminiKnowledgeReply(
  message: string,
  knowledgeMatches: Array<{
    fileName: string;
    text: string;
  }>,
  replyLanguage: ReplyLanguage = "english"
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

  const response = await client.models.generateContent({
    model: MODEL_NAME,
    contents: `${withFormattingRules(
      `
${getReplyLanguageInstruction(replyLanguage)}

Answer the student using only the local document excerpts below.
Do not use outside facts.
If the local documents are not enough, reply with exactly:
__NEED_WEB_FALLBACK__
Then add one short sentence about what is missing.

Local document excerpts:
${knowledgeContext}
      `
    )}\n\nStudent question: ${message}`
  });

  const text = response.text?.trim() || null;

  if (!text) {
    return null;
  }

  return {
    reply: text.replace(/^__NEED_WEB_FALLBACK__\s*/i, "").trim(),
    needsWebFallback: text.startsWith("__NEED_WEB_FALLBACK__")
  };
}

export async function getGeminiWebReply(
  message: string,
  replyLanguage: ReplyLanguage = "english"
) {
  const client = getGeminiClient();

  if (!client) {
    return null;
  }

  const response = await client.models.generateContent({
    model: MODEL_NAME,
    contents: `${withFormattingRules(
      `
${getReplyLanguageInstruction(replyLanguage)}

Use Google Search only when needed for accurate and current information.
Prefer practical answers for Indian students planning to study in Ireland.
Add citations when grounded search results are used.
      `
    )}\n\nStudent question: ${message}`,
    config: {
      tools: [{ googleSearch: {} }]
    }
  });

  return addGroundingCitations(response) || response.text?.trim() || null;
}
