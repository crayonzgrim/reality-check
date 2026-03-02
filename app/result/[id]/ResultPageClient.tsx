"use client";

import { useSearchParams } from "next/navigation";
import { useAnalysisStore } from "@/lib/store";
import { decodeShareData } from "@/lib/share";
import { ResultView } from "@/components/result/ResultView";
import { ResultNotFound } from "@/components/result/ResultNotFound";
import type { AnalysisResult } from "@/types";

type ResultPageClientProps = {
  id: string;
};

export function ResultPageClient({ id }: ResultPageClientProps) {
  const searchParams = useSearchParams();
  const getResult = useAnalysisStore((s) => s.getResult);

  // 1순위: zustand store
  const storeResult = getResult(id);
  if (storeResult) {
    return <ResultView result={storeResult} />;
  }

  // 2순위: URL searchParams.d (공유 링크)
  const encoded = searchParams.get("d");
  if (encoded) {
    const shared = decodeShareData(encoded);
    if (shared) {
      const reconstructed: AnalysisResult = {
        id,
        input: { idea: shared.i },
        analysis: {
          extractedKeywords: [],
          similarProducts: [],
          saturationSignals: [],
          differentiationSignals: [],
          risks: [],
          verdictOneLiner: shared.v,
          suggestions: [],
        },
        scores: {
          saturation: shared.s,
          differentiation: shared.d,
          survivalOdds: shared.o,
          label: shared.l,
        },
        createdAt: new Date().toISOString(),
      };
      return <ResultView result={reconstructed} />;
    }
  }

  return <ResultNotFound />;
}
