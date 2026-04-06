import { GoogleGenAI } from "@google/genai";

import {
  formatBlockedSourcesForPrompt,
  formatPreferredSourcesForPrompt
} from "@/lib/preferredSources";
import { ReplyLanguage, replyLanguageProfiles } from "@/lib/replyLanguage";

const MODEL_NAME = "gemini-2.5-flash";

const SYSTEM_PROMPT = `
You are Your Buddy In Ireland, a study assistant for Indian students.
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
Do not use outside facts or your own memory.
Use only facts that are explicitly supported by the local excerpts.
If a number, date, policy, or rule is not clearly present in the excerpts, do not guess.
If the excerpts partially answer the question, answer only the covered part and clearly say what is missing.
Prefer answering from the local documents whenever they are relevant.
Only trigger fallback if the excerpts contain no meaningful information for the student's main question.
If the local documents truly cannot answer the main question, reply with exactly:
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
    reply: appendSourceDocList(
      text.replace(/^__NEED_WEB_FALLBACK__\s*/i, "").trim(),
      knowledgeMatches.map((match) => match.fileName)
    ),
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

  const preferredSourcesBlock = formatPreferredSourcesForPrompt();
  const blockedSourcesBlock = formatBlockedSourcesForPrompt();

  const response = await client.models.generateContent({
    model: MODEL_NAME,
    contents: `${withFormattingRules(
      `
${getReplyLanguageInstruction(replyLanguage)}

Use Google Search only when needed for accurate and current information.
Prefer practical answers for Indian students planning to study in Ireland.
Assume the student is an Indian citizen based in India unless the question says otherwise.
For visa and pre-departure questions, prioritize India-specific official pages over general global pages.
Do not place source numbers or inline citations inside sentences.
Keep the answer clean, then list sources separately at the end.
Only state a visa rule, fee, date, or work right if grounded search supports it.
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
      `
    )}\n\nStudent question: ${message}`,
    config: {
      tools: [{ googleSearch: {} }]
    }
  });

  const text = response.text?.trim() || null;

  if (!text) {
    return null;
  }

  return appendWebSourceList(text, getGroundingSourceLinks(response));
}
