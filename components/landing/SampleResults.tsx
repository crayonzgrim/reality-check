"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AnalysisResult } from "@/types";

type SampleCardProps = {
  result: AnalysisResult;
};

function SampleCard({ result }: SampleCardProps) {
  const { scores, input, analysis } = result;

  const labelColor: Record<string, string> = {
    Undervalued: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    "Competitive but possible":
      "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    Crowded: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    "Red Ocean": "bg-red-500/10 text-red-500 border-red-500/20",
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-2 text-sm font-medium leading-snug">
            {input.idea}
          </CardTitle>
        </div>
        <Badge
          variant="outline"
          className={labelColor[scores.label] ?? ""}
        >
          {scores.label}
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-2xl font-bold text-red-500">
              {scores.saturation}
            </div>
            <div className="text-xs text-muted-foreground">Saturation</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-500">
              {scores.differentiation}
            </div>
            <div className="text-xs text-muted-foreground">Differentiation</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-500">
              {scores.survivalOdds}
            </div>
            <div className="text-xs text-muted-foreground">Survival</div>
          </div>
        </div>
        <p className="mt-auto text-xs italic text-muted-foreground">
          &ldquo;{analysis.verdictOneLiner}&rdquo;
        </p>
      </CardContent>
    </Card>
  );
}

type SampleResultsProps = {
  results: AnalysisResult[];
};

export function SampleResults({ results }: SampleResultsProps) {
  return (
    <section className="w-full px-4 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-2 text-center text-2xl font-bold md:text-3xl">
          Sample Results
        </h2>
        <p className="mb-10 text-center text-muted-foreground">
          See what a reality check looks like
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {results.map((r) => (
            <SampleCard key={r.id} result={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
