import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "@/components/disable-draft-mode";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Saint Maria Goretti Catholic School",
  description: "Saint Maria Goretti Catholic School",
};

const Ga = (props: { gaId: string }) => {
  const script = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${props.gaId}', {debug_mode: true});
  `;

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(props.gaId)}`}
      ></script>
      <script dangerouslySetInnerHTML={{ __html: script }}></script>
    </>
  );
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
        <Ga gaId="G-WW9E92XGYR" />
      </body>
    </html>
  );
}
