import { NextResponse } from "next/server";

import { auth } from "@/auth";
import {
  createChatOwner,
  isChatHistoryConfigured,
  listChatConversations
} from "@/lib/firestoreChatStore";

export const runtime = "nodejs";

export async function GET() {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    return NextResponse.json(
      { error: "Sign in to load chat history." },
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
    const owner = createChatOwner(email, session.user?.name);
    const conversations = await listChatConversations(owner);

    return NextResponse.json({ conversations });
  } catch (error) {
    console.error("Chat history list error:", error);

    return NextResponse.json(
      { error: "Unable to load chat history." },
      { status: 500 }
    );
  }
}
