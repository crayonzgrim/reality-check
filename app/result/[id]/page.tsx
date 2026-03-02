import type { Metadata } from "next";
import { Suspense } from "react";
import { ResultPageClient } from "./ResultPageClient";

type ResultPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ d?: string }>;
};

export async function generateMetadata({
  searchParams,
}: ResultPageProps): Promise<Metadata> {
  const { d } = await searchParams;

  let title = "RealityCheck — Analysis Result";
  let description = "See the market saturation analysis for this startup idea.";
  let ogImageUrl = "/api/og";

  if (d) {
    try {
      const decoded = JSON.parse(atob(d));
      const s = decoded.s ?? 50;
      const diff = decoded.d ?? 50;
      const o = decoded.o ?? 50;
      const v = decoded.v ?? "";
      const i = decoded.i ?? "";

      title = `Survival: ${o}% — RealityCheck`;
      description = v || description;
      ogImageUrl = `/api/og?s=${s}&d=${diff}&o=${o}&v=${encodeURIComponent(v)}&i=${encodeURIComponent(i)}`;
    } catch {
      // Use defaults
    }
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function ResultPage({ params }: ResultPageProps) {
  const { id } = await params;

  return (
    <Suspense>
      <ResultPageClient id={id} />
    </Suspense>
  );
}
