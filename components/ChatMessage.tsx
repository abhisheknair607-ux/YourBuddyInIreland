"use client";

import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";

import { TutorMessage } from "@/lib/mockChat";

type ChatMessageProps = {
  message: TutorMessage;
};

const markdownComponents: Components = {
  p: ({ children }) => <p className="my-2 leading-6">{children}</p>,
  ul: ({ children }) => (
    <ul className="my-2 list-disc space-y-1 pl-5 marker:text-sky-500">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-2 list-decimal space-y-1 pl-5 marker:font-semibold">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-slate-950">{children}</strong>
  ),
  em: ({ children }) => <em className="italic text-slate-600">{children}</em>,
  table: ({ children }) => (
    <div className="my-3 overflow-x-auto rounded-2xl border border-slate-200/90">
      <table className="min-w-full border-collapse text-left text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-slate-100/90">{children}</thead>,
  tbody: ({ children }) => <tbody className="bg-white">{children}</tbody>,
  tr: ({ children }) => (
    <tr className="border-b border-slate-200 last:border-b-0">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="px-3 py-2 font-semibold text-slate-900">{children}</th>
  ),
  td: ({ children }) => <td className="px-3 py-2 align-top">{children}</td>,
  code: ({ children, className }) => {
    const isBlock = typeof className === "string" && className.includes("language-");

    return isBlock ? (
      <code className="block font-mono text-[0.92em] leading-6 text-slate-100">
        {children}
      </code>
    ) : (
      <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.92em] text-slate-900">
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
    <blockquote className="my-3 border-l-4 border-sky-300 pl-4 italic text-slate-600">
      {children}
    </blockquote>
  )
};

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: "easeOut" }}
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex max-w-[85%] items-end gap-3 md:max-w-[70%] ${
          isUser ? "flex-row-reverse" : ""
        }`}
      >
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
            isUser
              ? "bg-sky-600 text-white"
              : "border border-slate-200 bg-white text-slate-700"
          }`}
        >
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </div>
        <div
          className={`rounded-[1.75rem] px-4 py-3 text-sm leading-6 shadow-sm sm:px-5 ${
            isUser
              ? "rounded-br-md bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 text-white"
              : "rounded-bl-md border border-slate-200/80 bg-white/90 text-slate-700"
          }`}
        >
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.22em] opacity-70">
            {isUser ? "You" : "AI Tutor"}
          </p>
          {isUser ? (
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
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
        </div>
      </div>
    </motion.div>
  );
}
