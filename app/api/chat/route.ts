import { randomUUID } from "crypto";

import { NextRequest, NextResponse } from "next/server";

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
import { getRequestUser } from "@/lib/requestUser";
import { isReplyLanguage, ReplyLanguage } from "@/lib/replyLanguage";
import { getStudentProfileMemoryPatch } from "@/lib/studentProfile";
import {
  createStudentProfileOwner,
  getStudentProfile,
  saveStudentProfile
} from "@/lib/studentProfileStore";

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

type FinalizeResponseDetails = {
  detectedIntent?: string;
  conversationUpdates?: {
    conversationSummary?: string;
    lastTopic?: string;
    lastIntent?: string;
    riskFlags?: string[];
    confidenceScore?: number | null;
  };
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
    detectedIntent?: string;
  }
): StoredChatMessage {
  return {
    id: details?.id || `${role}-${randomUUID()}`,
    role,
    content,
    createdAt: new Date().toISOString(),
    source: details?.source,
    documents: details?.documents,
    language: details?.language,
    detectedIntent: details?.detectedIntent
  };
}

async function preparePersistence(details: {
  requestUser: Awaited<ReturnType<typeof getRequestUser>>;
  conversationId: string;
  message: string;
  clientMessageId: string;
  replyLanguage: ReplyLanguage;
}) {
  const userMessage = createStoredMessage("user", details.message, {
    id: details.clientMessageId,
    language: details.replyLanguage
  });

  if (!isChatHistoryConfigured()) {
    return {
      persistence: null,
      history: [] as StoredChatMessage[],
      userMessage
    };
  }

  if (!details.requestUser?.email) {
    return {
      persistence: null,
      history: [] as StoredChatMessage[],
      userMessage
    };
  }

  try {
    const owner = createChatOwner(
      details.requestUser.email,
      details.requestUser.name
    );
    const conversation = details.conversationId
      ? await getChatConversation(owner, details.conversationId)
      : await createChatConversation(owner, details.message);
    const history = await getRecentChatMessages(owner, conversation.id, 20);

    await saveChatMessage(owner, conversation.id, userMessage);

    return {
      persistence: {
        owner,
        conversation,
        previousMessageCount: conversation.messageCount
      },
      history,
      userMessage
    };
  } catch (error) {
    console.error("Chat persistence setup failed:", error);

    return {
      persistence: null,
      history: [] as StoredChatMessage[],
      userMessage
    };
  }
}

async function finalizeResponse(
  payload: ChatResponsePayload,
  persistence: ChatPersistence | null,
  replyLanguage: ReplyLanguage,
  details: FinalizeResponseDetails = {}
) {
  let conversation = persistence?.conversation ?? null;
  let assistantMessage: StoredChatMessage | null = null;

  if (persistence) {
    assistantMessage = createStoredMessage("assistant", payload.reply, {
      source: payload.source,
      documents: payload.documents,
      language: replyLanguage,
      detectedIntent: details.detectedIntent
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
          messageCount: persistence.previousMessageCount + 2,
          conversationSummary: details.conversationUpdates?.conversationSummary,
          lastTopic: details.conversationUpdates?.lastTopic,
          lastIntent: details.conversationUpdates?.lastIntent,
          riskFlags: details.conversationUpdates?.riskFlags,
          confidenceScore: details.conversationUpdates?.confidenceScore
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
    const requestUser = await getRequestUser(request);
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

    const { persistence, history, userMessage } = await preparePersistence({
      requestUser,
      conversationId,
      message,
      clientMessageId,
      replyLanguage
    });
    const context = history.map((historyMessage) => ({
      role: historyMessage.role,
      content: historyMessage.content
    }));
    const conversationSummary = persistence?.conversation.conversationSummary || "";
    const profileOwner =
      requestUser?.email
        ? createStudentProfileOwner(requestUser.email, requestUser.name)
        : null;
    let studentProfile = null;

    if (profileOwner) {
      try {
        studentProfile = await getStudentProfile(profileOwner);
      } catch (error) {
        console.error("Student profile load failed:", error);
      }
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
    let intentResult: Awaited<
      ReturnType<typeof geminiHelpers.classifyGuidonIntent>
    > | null = null;

    try {
      intentResult = await geminiHelpers.classifyGuidonIntent(
        message,
        context,
        studentProfile,
        conversationSummary
      );
    } catch (error) {
      console.error("Intent classification failed:", error);
    }

    const safeIntentResult = intentResult ?? {
      primaryIntent: "unclear" as const,
      secondaryIntent: "",
      topic: "",
      isFollowUp: false,
      missingInformation: [],
      confidence: 0,
      shouldAskClarification: false,
      clarificationQuestion: ""
    };

    if (persistence) {
      try {
        await saveChatMessage(
          persistence.owner,
          persistence.conversation.id,
          {
            ...userMessage,
            detectedIntent: safeIntentResult.primaryIntent
          }
        );
      } catch (error) {
        console.error("User intent save failed:", error);
      }
    }

    if (safeIntentResult.shouldAskClarification) {
      const clarificationQuestion =
        safeIntentResult.clarificationQuestion ||
        "Could you tell me which part you mean so I can help accurately?";

      return finalizeResponse(
        {
          reply: clarificationQuestion,
          source: "web",
          knowledgeUsed: false
        },
        persistence,
        replyLanguage,
        {
          detectedIntent: safeIntentResult.primaryIntent,
          conversationUpdates: {
            lastTopic: safeIntentResult.topic,
            lastIntent: safeIntentResult.primaryIntent,
            confidenceScore: safeIntentResult.confidence
          }
        }
      );
    }

    let rewriteResult: Awaited<
      ReturnType<typeof geminiHelpers.rewriteGuidonQuestion>
    > | null = null;

    try {
      rewriteResult = await geminiHelpers.rewriteGuidonQuestion(
        message,
        safeIntentResult,
        context,
        studentProfile,
        conversationSummary
      );
    } catch (error) {
      console.error("Query rewrite failed:", error);
    }

    const safeRewriteResult = rewriteResult ?? {
      rewrittenQuestion: message,
      assumptionsUsed: [],
      ambiguityLevel: "medium" as const
    };
    const searchQuery = safeRewriteResult.rewrittenQuestion || message;
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
      knowledgeSearch = await searchKnowledgeBase(searchQuery);
    } catch (error) {
      console.error("Knowledge base load error:", error);
    }

    const answerContext = {
      conversationSummary,
      intentResult: safeIntentResult,
      rewriteResult: safeRewriteResult
    };
    const finalizeMetadata = {
      detectedIntent: safeIntentResult.primaryIntent,
      conversationUpdates: {
        lastTopic: safeIntentResult.topic,
        lastIntent: safeIntentResult.primaryIntent,
        confidenceScore: safeIntentResult.confidence
      }
    };

    if (knowledgeSearch.shouldUseKnowledge) {
      const knowledgeReply = await geminiHelpers.getGeminiKnowledgeReply(
        message,
        knowledgeSearch.matches,
        replyLanguage,
        context,
        studentProfile,
        answerContext
      );

      if (knowledgeReply && !knowledgeReply.needsWebFallback) {
        let memoryUpdate: Awaited<
          ReturnType<typeof geminiHelpers.updateGuidonMemory>
        > | null = null;

        try {
          memoryUpdate = await geminiHelpers.updateGuidonMemory(
            message,
            knowledgeReply.reply,
            safeIntentResult,
            studentProfile,
            conversationSummary
          );
        } catch (error) {
          console.error("Memory update failed:", error);
        }

        const nextConversationSummary =
          memoryUpdate?.updatedConversationSummary || conversationSummary;
        const nextLastTopic =
          memoryUpdate?.lastTopic || safeIntentResult.topic || "";
        const nextLastIntent =
          memoryUpdate?.lastIntent || safeIntentResult.primaryIntent;

        if (profileOwner && studentProfile && memoryUpdate?.updatedProfile) {
          const profilePatch = getStudentProfileMemoryPatch(
            studentProfile,
            memoryUpdate.updatedProfile
          );

          if (Object.keys(profilePatch).length) {
            try {
              await saveStudentProfile(profileOwner, profilePatch);
            } catch (error) {
              console.error("Student profile memory save failed:", error);
            }
          }
        }

        return finalizeResponse(
          {
            reply: knowledgeReply.reply,
            source: "knowledge",
            knowledgeUsed: true,
            documents: knowledgeSearch.matches.map((match) => match.fileName)
          },
          persistence,
          replyLanguage,
          {
            ...finalizeMetadata,
            conversationUpdates: {
              conversationSummary: nextConversationSummary,
              lastTopic: nextLastTopic,
              lastIntent: nextLastIntent,
              riskFlags: memoryUpdate?.riskFlags ?? [],
              confidenceScore: safeIntentResult.confidence
            }
          }
        );
      }
    }

    const reply = await geminiHelpers.getGeminiWebReply(
      message,
      replyLanguage,
      context,
      studentProfile,
      answerContext
    );

    if (!reply) {
      return NextResponse.json(
        { error: "Gemini did not return a response." },
        { status: 502 }
      );
    }

    let memoryUpdate: Awaited<
      ReturnType<typeof geminiHelpers.updateGuidonMemory>
    > | null = null;

    try {
      memoryUpdate = await geminiHelpers.updateGuidonMemory(
        message,
        reply,
        safeIntentResult,
        studentProfile,
        conversationSummary
      );
    } catch (error) {
      console.error("Memory update failed:", error);
    }

    const nextConversationSummary =
      memoryUpdate?.updatedConversationSummary || conversationSummary;
    const nextLastTopic =
      memoryUpdate?.lastTopic || safeIntentResult.topic || "";
    const nextLastIntent =
      memoryUpdate?.lastIntent || safeIntentResult.primaryIntent;

    if (profileOwner && studentProfile && memoryUpdate?.updatedProfile) {
      const profilePatch = getStudentProfileMemoryPatch(
        studentProfile,
        memoryUpdate.updatedProfile
      );

      if (Object.keys(profilePatch).length) {
        try {
          await saveStudentProfile(profileOwner, profilePatch);
        } catch (error) {
          console.error("Student profile memory save failed:", error);
        }
      }
    }

    return finalizeResponse(
      {
        reply,
        source: knowledgeSearch.hasDocuments ? "web-fallback" : "web",
        knowledgeUsed: false
      },
      persistence,
      replyLanguage,
      {
        ...finalizeMetadata,
        conversationUpdates: {
          conversationSummary: nextConversationSummary,
          lastTopic: nextLastTopic,
          lastIntent: nextLastIntent,
          riskFlags: memoryUpdate?.riskFlags ?? [],
          confidenceScore: safeIntentResult.confidence
        }
      }
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
