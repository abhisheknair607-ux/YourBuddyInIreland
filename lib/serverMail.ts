import nodemailer from "nodemailer";

const DEFAULT_CONTACT_EMAIL = "abhisheknair607@gmail.com";

function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  rejectUnauthorized: boolean;
  user: string;
  pass: string;
  from: string;
  to: string;
};

export function getSmtpConfig(): SmtpConfig | null {
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

export function isEmailDeliveryConfigured() {
  return Boolean(getSmtpConfig());
}

export async function sendSmtpMail(options: {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  headers?: Record<string, string>;
  fromName?: string;
}) {
  const smtp = getSmtpConfig();

  if (!smtp) {
    throw new Error("Email delivery is not configured.");
  }

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
    from: options.fromName
      ? `"${options.fromName.replace(/"/g, "'")}" <${smtp.from}>`
      : smtp.from,
    to: options.to,
    replyTo: options.replyTo,
    subject: options.subject,
    text: options.text,
    html: options.html,
    headers: options.headers
  });
}
