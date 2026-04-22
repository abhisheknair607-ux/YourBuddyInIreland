import { randomUUID } from "crypto";

import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import {
  createChatConversation,
  createChatOwner,
  getChatConversation,
  getRecentChatMessages,
  isChatHistoryConfigured,
  saveChatMessage,
  updateChatConversation,
  type ChatConversationSummary,
  type ChatOwner,
  type StoredChatMessage
} from "@/lib/firestoreChatStore";
import { getMockTutorReply, type TutorMessageSource } from "@/lib/mockChat";
import { isReplyLanguage, ReplyLanguage } from "@/lib/replyLanguage";

export const runtime = "nodejs";

type ChatResponsePayload = {
  reply: string;
  source: TutorMessageSource;
  knowledgeUsed: boolean;
  documents?: string[];
};

type ChatPersistence = {
  owner: ChatOwner;
  conversation: ChatConversationSummary;
  previousMessageCount: number;
};

function getApiErrorStatus(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    typeof (error as { status?: unknown }).status === "number"
  ) {
    return (error as { status: number }).status;
  }

  return null;
}

function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function createStoredMessage(
  role: "user" | "assistant",
  content: string,
  details?: {
    id?: string;
    source?: TutorMessageSource;
    documents?: string[];
    language?: ReplyLanguage;
  }
): StoredChatMessage {
  return {
    id: details?.id || `${role}-${randomUUID()}`,
    role,
    content,
    createdAt: new Date().toISOString(),
    source: details?.source,
    documents: details?.documents,
    language: details?.language
  };
}

async function preparePersistence(details: {
  conversationId: string;
  message: string;
  clientMessageId: string;
  replyLanguage: ReplyLanguage;
}) {
  if (!isChatHistoryConfigured()) {
    return {
      persistence: null,
      history: [] as StoredChatMessage[]
    };
  }

  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    return {
      persistence: null,
      history: [] as StoredChatMessage[]
    };
  }

  try {
    const owner = createChatOwner(email, session.user?.name);
    const conversation = details.conversationId
      ? await getChatConversation(owner, details.conversationId)
      : await createChatConversation(owner, details.message);
    const history = await getRecentChatMessages(owner, conversation.id, 20);
    const userMessage = createStoredMessage("user", details.message, {
      id: details.clientMessageId,
      language: details.replyLanguage
    });

    await saveChatMessage(owner, conversation.id, userMessage);

    return {
      persistence: {
        owner,
        conversation,
        previousMessageCount: conversation.messageCount
      },
      history
    };
  } catch (error) {
    console.error("Chat persistence setup failed:", error);

    return {
      persistence: null,
      history: [] as StoredChatMessage[]
    };
  }
}

async function finalizeResponse(
  payload: ChatResponsePayload,
  persistence: ChatPersistence | null,
  replyLanguage: ReplyLanguage
) {
  let conversation = persistence?.conversation ?? null;
  let assistantMessage: StoredChatMessage | null = null;

  if (persistence) {
    assistantMessage = createStoredMessage("assistant", payload.reply, {
      source: payload.source,
      documents: payload.documents,
      language: replyLanguage
    });

    try {
      await saveChatMessage(
        persistence.owner,
        persistence.conversation.id,
        assistantMessage
      );
      conversation = await updateChatConversation(
        persistence.owner,
        persistence.conversation,
        {
          preview: payload.reply,
          updatedAt: assistantMessage.createdAt,
          messageCount: persistence.previousMessageCount + 2
        }
      );
    } catch (error) {
      console.error("Chat persistence save failed:", error);
    }
  }

  return NextResponse.json({
    ...payload,
    conversation,
    assistantMessage
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      message?: unknown;
      replyLanguage?: unknown;
      conversationId?: unknown;
      clientMessageId?: unknown;
    };
    const message = getString(body.message);
    const replyLanguage: ReplyLanguage = isReplyLanguage(body.replyLanguage)
      ? body.replyLanguage
      : "english";
    const conversationId = getString(body.conversationId);
    const clientMessageId =
      getString(body.clientMessageId) || `user-${randomUUID()}`;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const { persistence, history } = await preparePersistence({
      conversationId,
      message,
      clientMessageId,
      replyLanguage
    });

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

      return finalizeResponse(
        {
          reply,
          source: "mock",
          knowledgeUsed: false
        },
        persistence,
        replyLanguage
      );
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

      return finalizeResponse(
        {
          reply,
          source: "mock-fallback",
          knowledgeUsed: false
        },
        persistence,
        replyLanguage
      );
    }

    const context = history.map((historyMessage) => ({
      role: historyMessage.role,
      content: historyMessage.content
    }));

    if (knowledgeSearch.shouldUseKnowledge) {
      const knowledgeReply = await geminiHelpers.getGeminiKnowledgeReply(
        message,
        knowledgeSearch.matches,
        replyLanguage,
        context
      );

      if (knowledgeReply && !knowledgeReply.needsWebFallback) {
        return finalizeResponse(
          {
            reply: knowledgeReply.reply,
            source: "knowledge",
            knowledgeUsed: true,
            documents: knowledgeSearch.matches.map((match) => match.fileName)
          },
          persistence,
          replyLanguage
        );
      }
    }

    const reply = await geminiHelpers.getGeminiWebReply(
      message,
      replyLanguage,
      context
    );

    if (!reply) {
      return NextResponse.json(
        { error: "Gemini did not return a response." },
        { status: 502 }
      );
    }

    return finalizeResponse(
      {
        reply,
        source: knowledgeSearch.hasDocuments ? "web-fallback" : "web",
        knowledgeUsed: false
      },
      persistence,
      replyLanguage
    );
  } catch (error) {
    console.error("Chat route error:", error);

    const status = getApiErrorStatus(error);

    if (status === 429) {
      return NextResponse.json(
        {
          error:
            "The current Gemini request limit for this key has been reached. Please try again shortly."
        },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Unable to fetch a reply right now." },
      { status: 500 }
    );
  }
}
