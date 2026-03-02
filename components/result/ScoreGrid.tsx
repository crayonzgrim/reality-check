"use client";

import { ScoreCard } from "./ScoreCard";
import type { Scores } from "@/types";

type ScoreGridProps = {
  scores: Scores;
};

export function ScoreGrid({ scores }: ScoreGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <ScoreCard
        label="Saturation"
        value={scores.saturation}
        color="text-red-500"
        description="How crowded the market is (higher = worse)"
        delay={0}
      />
      <ScoreCard
        label="Differentiation"
        value={scores.differentiation}
        color="text-blue-500"
        description="How unique your positioning is (higher = better)"
        delay={200}
      />
      <ScoreCard
        label="Survival Odds"
        value={scores.survivalOdds}
        color="text-emerald-500"
        description="Your chances of making it (higher = better)"
        delay={400}
      />
    </div>
  );
}
