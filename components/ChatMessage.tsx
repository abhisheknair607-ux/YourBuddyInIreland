"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";
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
  p: ({ children }) => (
    <p className="my-2 whitespace-pre-wrap leading-6 text-slate-700 wrap-anywhere">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="my-2 list-disc space-y-1 pl-5 marker:text-sky-500">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-2 list-decimal space-y-1 pl-5 marker:font-semibold marker:text-slate-500">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="whitespace-pre-wrap text-slate-700 wrap-anywhere">{children}</li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-slate-950">{children}</strong>
  ),
  em: ({ children }) => <em className="italic text-slate-500">{children}</em>,
  table: ({ children }) => (
    <div className="my-3 max-w-full overflow-x-auto rounded-2xl border border-slate-200/90 bg-white/90">
      <table className="min-w-full w-max border-collapse text-left text-sm text-slate-700">
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
    <th className="px-3 py-2 font-semibold text-slate-950">{children}</th>
  ),
  td: ({ children }) => <td className="px-3 py-2 align-top">{children}</td>,
  code: ({ children, className }) => {
    const isBlock = typeof className === "string" && className.includes("language-");

    return isBlock ? (
      <code className="block font-mono text-[0.92em] leading-6 text-slate-100">
        {children}
      </code>
    ) : (
      <code className="wrap-anywhere rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.92em] text-slate-900">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="my-3 overflow-x-auto rounded-2xl bg-slate-900 px-4 py-3 text-sm text-slate-100">
      {children}
    </pre>
  ),
  hr: () => <hr className="my-4 border-slate-200" />,
  blockquote: ({ children }) => (
    <blockquote className="my-3 border-l-4 border-sky-300 pl-4 italic text-slate-500">
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
              ? "Mock Reply"
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
        className={`flex max-w-[92%] items-end gap-2 tablet:max-w-[84%] laptop:max-w-[72%] ${
          isUser ? "flex-row-reverse" : ""
        }`}
      >
        {!isUser ? (
          <div className="mb-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700">
            <Bot className="h-4 w-4" />
          </div>
        ) : null}

        <div
          className={`wrap-anywhere rounded-[20px] px-4 py-3 text-sm shadow-[0_14px_35px_rgba(15,23,42,0.10)] ${
            isUser
              ? "rounded-br-md bg-[#1e3a2f] text-white"
              : "rounded-bl-md border border-white/80 bg-white/88 text-slate-700"
          }`}
        >
          {!isUser && sourceLabel ? (
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                {sourceLabel}
              </span>
              {message.documents?.slice(0, 2).map((document) => (
                <span
                  key={document}
                  className="rounded-full bg-sky-50 px-2.5 py-1 text-[10px] font-medium text-sky-700"
                >
                  {document}
                </span>
              ))}
            </div>
          ) : null}

          {isUser ? (
            <p className="whitespace-pre-wrap break-words leading-6">
              {message.content}
            </p>
          ) : (
            <div className="break-words">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}

          <div
            className={`mt-2 text-[10px] ${
              isUser ? "text-white/60" : "text-slate-400"
            }`}
          >
            {formatMessageTime(message.createdAt)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
