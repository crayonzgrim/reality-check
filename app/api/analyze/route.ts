import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { nanoid } from "nanoid";
import { analyzeInputSchema } from "@/lib/schemas";
import { searchMarket } from "@/lib/tavily";
import { analyzeWithLLM } from "@/lib/gemini";
import { calculateScores } from "@/lib/scoring";
import { isRateLimited } from "@/lib/rate-limit";
import type { AnalysisResult } from "@/types";

export async function POST(request: Request) {
  try {
    // Rate limiting
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headersList.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = analyzeInputSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error },
        { status: 400 }
      );
    }

    const input = parsed.data;

    // 1. Search market
    const searchResults = await searchMarket(
      input.idea,
      input.category,
      input.targetCustomer
    );

    const searchResultsText = searchResults
      .map(
        (r, i) =>
          `[${i + 1}] ${r.title}\nURL: ${r.url}\n${r.content.slice(0, 300)}`
      )
      .join("\n\n");

    // 2. LLM analysis
    const analysis = await analyzeWithLLM(input, searchResultsText);

    // Enrich similarProducts with favicons from search results
    for (const product of analysis.similarProducts) {
      if (!product.favicon) {
        const match = searchResults.find(
          (r) =>
            r.url.includes(product.name.toLowerCase().replace(/\s+/g, "")) ||
            r.title.toLowerCase().includes(product.name.toLowerCase())
        );
        if (match?.favicon) {
          product.favicon = match.favicon;
        }
      }
    }

    // 3. Calculate scores
    const scores = calculateScores(analysis, input);

    // 4. Build result
    const result: AnalysisResult = {
      id: nanoid(10),
      input,
      analysis,
      scores,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Analysis failed:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Analysis failed. Please try again.",
      },
      { status: 500 }
    );
  }
}
