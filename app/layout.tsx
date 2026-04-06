import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { Providers } from "@/components/Providers";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Your Buddy In Ireland",
  description:
    "A warm, animated frontend for Indian students planning to study in Ireland, with guidance around visas, accommodation, loans, universities, and course choices."
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: true,
  viewportFit: "cover"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className="min-h-screen min-h-[100dvh] max-w-full overflow-x-hidden bg-slate-50 text-slate-950"
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
