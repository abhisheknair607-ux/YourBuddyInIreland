import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import { getSmtpConfig, sendSmtpMail } from "@/lib/serverMail";

export const runtime = "nodejs";

type ContactKind = "feedback" | "get-in-touch";

function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isContactKind(value: string): value is ContactKind {
  return value === "feedback" || value === "get-in-touch";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: NextRequest) {
  const session = await auth();
  const senderEmail = getString(session?.user?.email);

  if (!senderEmail) {
    return NextResponse.json(
      { error: "Please sign in before sending a message." },
      { status: 401 }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }

  const payload = body as {
    kind?: unknown;
    message?: unknown;
    page?: unknown;
  };
  const kind = getString(payload.kind);
  const message = getString(payload.message);
  const page = getString(payload.page) || "dashboard";

  if (!isContactKind(kind)) {
    return NextResponse.json(
      { error: "Unknown message type." },
      { status: 400 }
    );
  }

  if (!message) {
    return NextResponse.json(
      { error: "Please add a message before sending." },
      { status: 400 }
    );
  }

  const smtp = getSmtpConfig();

  if (!smtp) {
    return NextResponse.json(
      { error: "Email delivery is not configured yet." },
      { status: 503 }
    );
  }

  const senderName = getString(session?.user?.name) || senderEmail;
  const title =
    kind === "get-in-touch"
      ? "Get in touch request"
      : "Feedback and suggestions";
  const submittedAt = new Date().toISOString();
  const subject = `[Guidon] ${title} from ${senderEmail}`;
  const text = [
    title,
    "",
    `From: ${senderName} <${senderEmail}>`,
    `Page: ${page}`,
    `Submitted: ${submittedAt}`,
    "",
    "Message:",
    message
  ].join("\n");
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#0f172a">
      <h2 style="margin:0 0 12px">${escapeHtml(title)}</h2>
      <p><strong>From:</strong> ${escapeHtml(senderName)} &lt;${escapeHtml(senderEmail)}&gt;</p>
      <p><strong>Page:</strong> ${escapeHtml(page)}</p>
      <p><strong>Submitted:</strong> ${escapeHtml(submittedAt)}</p>
      <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0" />
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    </div>
  `;

  try {
    await sendSmtpMail({
      to: smtp.to,
      replyTo: senderEmail,
      subject,
      text,
      html,
      headers: {
        "X-Guidon-Original-From": senderEmail,
        "X-Guidon-Contact-Kind": kind
      },
      fromName: `Guidon - ${senderName}`
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact email failed:", error);

    return NextResponse.json(
      { error: "Message could not be emailed. Please try again." },
      { status: 500 }
    );
  }
}
