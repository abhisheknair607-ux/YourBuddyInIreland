import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import type { ReactNode } from "react";

import { Providers } from "@/components/Providers";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Your Buddy In Ireland",
  description:
    "A warm, animated frontend for Indian students planning to study in Ireland, with guidance around visas, accommodation, loans, universities, and course choices."
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: true
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${inter.variable} ${poppins.variable} min-h-screen max-w-full overflow-x-hidden bg-slate-50 text-slate-950`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
