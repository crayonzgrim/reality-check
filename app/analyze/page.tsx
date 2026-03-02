"use client";

import { useRouter } from "next/navigation";
import { IdeaForm } from "@/components/analyze/IdeaForm";
import { AnalysisStepper } from "@/components/analyze/AnalysisStepper";
import { useAnalysisStore } from "@/lib/store";
import { useAnalysis } from "@/hooks/useAnalysis";
import type { AnalyzeInput } from "@/types";

export default function AnalyzePage() {
  const router = useRouter();
  const { isAnalyzing, error } = useAnalysisStore();
  const { runAnalysis, isComplete } = useAnalysis();

  const handleSubmit = async (input: AnalyzeInput) => {
    const result = await runAnalysis(input);
    if (result) {
      router.push(`/result/${result.id}`);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col gap-6 px-4 py-12 md:py-20">
      <div>
        <h1 className="mb-2 text-2xl font-bold md:text-3xl">
          Describe your idea
        </h1>
        <p className="text-muted-foreground">
          Be as specific as you can. The more detail, the better the analysis.
        </p>
      </div>

      <IdeaForm onSubmit={handleSubmit} />

      {error && (
        <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {isAnalyzing && <AnalysisStepper isComplete={isComplete} />}
    </main>
  );
}
