import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import {
  createChatOwner,
  deleteChatConversation,
  getChatConversation,
  isChatHistoryConfigured,
  listChatMessages
} from "@/lib/firestoreChatStore";

export const runtime = "nodejs";

type RouteContext = {
  params: {
    conversationId: string;
  };
};

async function getOwner() {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    return null;
  }

  return createChatOwner(email, session.user?.name);
}

export async function GET(_request: NextRequest, { params }: RouteContext) {
  const owner = await getOwner();

  if (!owner) {
    return NextResponse.json(
      { error: "Sign in to load this chat." },
      { status: 401 }
    );
  }

  if (!isChatHistoryConfigured()) {
    return NextResponse.json(
      { error: "Firestore chat history is not configured yet." },
      { status: 503 }
    );
  }

  try {
    const conversation = await getChatConversation(owner, params.conversationId);
    const messages = await listChatMessages(owner, params.conversationId);

    return NextResponse.json({ conversation, messages });
  } catch (error) {
    console.error("Chat history load error:", error);

    return NextResponse.json(
      { error: "Unable to load this chat." },
      { status: 404 }
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  const owner = await getOwner();

  if (!owner) {
    return NextResponse.json(
      { error: "Sign in to delete this chat." },
      { status: 401 }
    );
  }

  if (!isChatHistoryConfigured()) {
    return NextResponse.json(
      { error: "Firestore chat history is not configured yet." },
      { status: 503 }
    );
  }

  try {
    await deleteChatConversation(owner, params.conversationId);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Chat history delete error:", error);

    return NextResponse.json(
      { error: "Unable to delete this chat." },
      { status: 500 }
    );
  }
}
