import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";

export const runtime = "nodejs";

const DEFAULT_CONTACT_EMAIL = "abhisheknair607@gmail.com";

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

function getSmtpConfig() {
  const host = getString(process.env.SMTP_HOST);
  const user = getString(process.env.SMTP_USER);
  const pass = getString(process.env.SMTP_PASS).replace(/\s/g, "");

  if (!host || !user || !pass) {
    return null;
  }

  const configuredPort = Number(process.env.SMTP_PORT || "");
  const secure =
    process.env.SMTP_SECURE === "true" ||
    (Number.isFinite(configuredPort) && configuredPort === 465);
  const port = Number.isFinite(configuredPort)
    ? configuredPort
    : secure
      ? 465
      : 587;

  return {
    host,
    port,
    secure,
    rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== "false",
    user,
    pass,
    from: getString(process.env.SMTP_FROM) || user,
    to: getString(process.env.CONTACT_EMAIL_TO) || DEFAULT_CONTACT_EMAIL
  };
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
    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: {
        user: smtp.user,
        pass: smtp.pass
      },
      tls: {
        rejectUnauthorized: smtp.rejectUnauthorized
      }
    });

    await transporter.sendMail({
      from: `"Guidon - ${senderName.replace(/"/g, "'")}" <${smtp.from}>`,
      to: smtp.to,
      replyTo: senderEmail,
      subject,
      text,
      html,
      headers: {
        "X-Guidon-Original-From": senderEmail,
        "X-Guidon-Contact-Kind": kind
      }
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
