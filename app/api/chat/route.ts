import { NextRequest, NextResponse } from "next/server";

import { getMockTutorReply } from "@/lib/mockChat";
import { isReplyLanguage, ReplyLanguage } from "@/lib/replyLanguage";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      message?: unknown;
      replyLanguage?: unknown;
    };
    const message =
      typeof body.message === "string" ? body.message.trim() : "";
    const replyLanguage: ReplyLanguage = isReplyLanguage(body.replyLanguage)
      ? body.replyLanguage
      : "english";

    if (!message) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    let knowledgeSearch: {
      matches: Array<{
        fileName: string;
        relativePath: string;
        text: string;
        score: number;
      }>;
      hasDocuments: boolean;
      shouldUseKnowledge: boolean;
    } = {
      matches: [],
      hasDocuments: false,
      shouldUseKnowledge: false
    };

    try {
      const { searchKnowledgeBase } = await import("@/lib/knowledgeBase");
      knowledgeSearch = await searchKnowledgeBase(message);
    } catch (error) {
      console.error("Knowledge base load error:", error);
    }

    if (!process.env.GEMINI_API_KEY) {
      const reply = await getMockTutorReply(message, replyLanguage);

      return NextResponse.json({
        reply,
        source: "mock",
        knowledgeUsed: false
      });
    }

    let geminiHelpers:
      | typeof import("@/lib/gemini")
      | null = null;

    try {
      geminiHelpers = await import("@/lib/gemini");
    } catch (error) {
      console.error("Gemini helper load error:", error);
    }

    if (!geminiHelpers) {
      const reply = await getMockTutorReply(message, replyLanguage);

      return NextResponse.json({
        reply,
        source: "mock-fallback",
        knowledgeUsed: false
      });
    }

    if (knowledgeSearch.shouldUseKnowledge) {
      const knowledgeReply = await geminiHelpers.getGeminiKnowledgeReply(
        message,
        knowledgeSearch.matches,
        replyLanguage
      );

      if (knowledgeReply && !knowledgeReply.needsWebFallback) {
        return NextResponse.json({
          reply: knowledgeReply.reply,
          source: "knowledge",
          knowledgeUsed: true,
          documents: knowledgeSearch.matches.map((match) => match.fileName)
        });
      }
    }

    const reply = await geminiHelpers.getGeminiWebReply(
      message,
      replyLanguage
    );

    if (!reply) {
      return NextResponse.json(
        { error: "Gemini did not return a response." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      reply,
      source: knowledgeSearch.hasDocuments ? "web-fallback" : "web",
      knowledgeUsed: false
    });
  } catch (error) {
    console.error("Chat route error:", error);

    return NextResponse.json(
      { error: "Unable to fetch a reply right now." },
      { status: 500 }
    );
  }
}
