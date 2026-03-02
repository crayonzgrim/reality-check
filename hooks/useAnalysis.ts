"use client";

import { useState, useCallback } from "react";
import { useAnalysisStore } from "@/lib/store";
import type { AnalyzeInput, AnalysisResult } from "@/types";

export function useAnalysis() {
  const { setResult, setAnalyzing, setError } = useAnalysisStore();
  const [isComplete, setIsComplete] = useState(false);

  const runAnalysis = useCallback(
    async (input: AnalyzeInput): Promise<AnalysisResult | null> => {
      setAnalyzing(true);
      setIsComplete(false);

      try {
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Analysis failed");
        }

        const result: AnalysisResult = await response.json();
        setResult(result);
        setIsComplete(true);

        // Brief delay for stepper completion animation
        await new Promise((resolve) => setTimeout(resolve, 500));

        setAnalyzing(false);
        return result;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong"
        );
        return null;
      }
    },
    [setResult, setAnalyzing, setError]
  );

  return { runAnalysis, isComplete };
}
