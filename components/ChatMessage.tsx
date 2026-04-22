"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";

import { TutorMessage } from "@/lib/mockChat";

type ChatMessageProps = {
  message: TutorMessage;
};

const formatMessageTime = (value: string) =>
  new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="mb-2 mt-3 text-[1.05rem] font-semibold leading-snug text-slate-950 first:mt-0 tablet:text-lg">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-1.5 mt-3 text-base font-semibold leading-snug text-slate-950 first:mt-0 tablet:text-[1.05rem]">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-1.5 mt-2.5 text-[0.95rem] font-semibold leading-snug text-slate-900 first:mt-0 tablet:text-base">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="my-1.5 whitespace-pre-wrap text-[13.5px] leading-[1.55] text-slate-700 wrap-anywhere first:mt-0 last:mb-0 tablet:text-sm">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="my-2 list-disc space-y-1 pl-5 text-[13.5px] leading-[1.5] marker:text-sky-500 tablet:text-sm">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-2 list-decimal space-y-1 pl-5 text-[13.5px] leading-[1.5] marker:font-semibold marker:text-slate-500 tablet:text-sm">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="pl-0.5 text-slate-700 wrap-anywhere [&>p]:my-0">
      {children}
    </li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-slate-950">{children}</strong>
  ),
  em: ({ children }) => <em className="italic text-slate-500">{children}</em>,
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-medium text-sky-700 underline decoration-sky-300 decoration-1 underline-offset-2 transition hover:text-sky-900"
    >
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="my-2.5 max-w-full overflow-x-auto rounded-2xl border border-slate-200/90 bg-white/90">
      <table className="w-max min-w-full border-collapse text-left text-[13px] text-slate-700 tablet:text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-slate-100/90">{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className="border-b border-slate-200/80 last:border-b-0">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="whitespace-nowrap px-3 py-2 font-semibold text-slate-950">
      {children}
    </th>
  ),
  td: ({ children }) => <td className="px-3 py-2 align-top">{children}</td>,
  code: ({ children, className }) => {
    const isBlock = typeof className === "string" && className.includes("language-");

    return isBlock ? (
      <code className="block font-mono text-[0.82rem] leading-[1.55] text-slate-100 tablet:text-[0.86rem]">
        {children}
      </code>
    ) : (
      <code className="wrap-anywhere rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-slate-900">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="my-2.5 overflow-x-auto rounded-2xl bg-slate-900 px-3.5 py-3 text-sm text-slate-100 tablet:px-4">
      {children}
    </pre>
  ),
  hr: () => <hr className="my-3 border-slate-200" />,
  blockquote: ({ children }) => (
    <blockquote className="my-2.5 rounded-r-2xl border-l-4 border-sky-300 bg-sky-50/70 py-1.5 pl-3 pr-2 text-slate-600">
      {children}
    </blockquote>
  )
};

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const sourceLabel =
    message.source === "knowledge"
      ? "Knowledge Docs"
      : message.source === "web-fallback"
        ? "Verified Answer"
        : message.source === "web"
          ? "Verified Answer"
          : message.source === "mock-fallback"
            ? "Safe Fallback"
            : message.source === "mock"
              ? "Assistant Reply"
              : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.26, ease: "easeOut" }}
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex max-w-[94%] items-end gap-2 tablet:max-w-[84%] laptop:max-w-[72%] ${
          isUser ? "flex-row-reverse" : ""
        }`}
      >
        {!isUser ? (
          <div className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-sky-100 bg-white p-1 shadow-sm">
            <Image
              src="/logo-avatar.png"
              alt="Guidon assistant"
              width={32}
              height={32}
              className="h-full w-full object-contain"
            />
          </div>
        ) : null}

        <div
          className={`wrap-anywhere rounded-[20px] px-3.5 py-2.5 text-sm shadow-[0_14px_35px_rgba(15,23,42,0.10)] tablet:px-4 tablet:py-3 ${
            isUser
              ? "rounded-br-md bg-gradient-to-br from-[#2563eb] via-[#1d4ed8] to-[#1e3a8a] text-white"
              : "rounded-bl-md border border-white/80 bg-white/92 text-slate-700"
          }`}
        >
          {!isUser && sourceLabel ? (
            <div className="mb-2 flex flex-wrap items-center gap-1.5">
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                {sourceLabel}
              </span>
              {message.documents?.slice(0, 2).map((document) => (
                <span
                  key={document}
                  className="rounded-full bg-sky-50 px-2.5 py-0.5 text-[10px] font-medium text-sky-700"
                >
                  {document}
                </span>
              ))}
            </div>
          ) : null}

          {isUser ? (
            <p className="whitespace-pre-wrap break-words text-[13.5px] leading-[1.55] tablet:text-sm">
              {message.content}
            </p>
          ) : (
            <div className="break-words [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}

          <div
            className={`mt-1.5 text-[10px] ${
              isUser ? "text-white/70" : "text-slate-400"
            }`}
          >
            {formatMessageTime(message.createdAt)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
