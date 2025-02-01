import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "@/components/disable-draft-mode";
import { GoogleTagManager } from "@/components/google-tag-manager";
import { GOOGLE_TAG_MANAGER_ID } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Saint Maria Goretti Catholic School",
  description: "Saint Maria Goretti Catholic School",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {draftMode().isEnabled && <DisableDraftMode />}
        {draftMode().isEnabled && <VisualEditing />}
        <GoogleTagManager gaId={GOOGLE_TAG_MANAGER_ID} />
      </body>
    </html>
  );
}
