import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Guidon V2",
  description:
    "Parallel V2 experience for Guidon with live planning flows and expanded prototype pages."
};

export default function V2Layout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
