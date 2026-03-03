import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RealityCheck — Is your idea already taken?",
  description:
    "Get an instant market saturation analysis for your startup idea. AI-powered competitor mapping, saturation scores, and a brutally honest survival verdict.",
  openGraph: {
    title: "RealityCheck — Is your idea already taken?",
    description:
      "Get an instant market saturation analysis for your startup idea.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RealityCheck — Is your idea already taken?",
    description:
      "Get an instant market saturation analysis for your startup idea.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col bg-background font-sans text-foreground antialiased`}
      >
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
