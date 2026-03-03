import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import { KakaoAdFit } from "@/components/ui/KakaoAdFit";
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
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
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
        {/* Mobile top banner ad */}
        <div className="sticky top-0 z-20 flex justify-center bg-background xl:hidden">
          <KakaoAdFit unit="DAN-w6CABwzq6DdICuCx" width={320} height={100} />
        </div>

        {/* Desktop left sidebar ad */}
        <div className="fixed left-4 top-1/2 z-20 hidden -translate-y-1/2 xl:block">
          <KakaoAdFit unit="DAN-vF9S7xnBxQgs0MGE" width={160} height={600} />
        </div>

        {/* Desktop right sidebar ad */}
        <div className="fixed right-4 top-1/2 z-20 hidden -translate-y-1/2 xl:block">
          <KakaoAdFit unit="DAN-kh0s2sWg6AnwjhlS" width={160} height={600} />
        </div>

        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
