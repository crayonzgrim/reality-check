"use client";

import { Badge } from "@/components/ui/badge";
import type { ScoreLabel } from "@/types";

type VerdictProps = {
  oneLiner: string;
  label: ScoreLabel;
};

const labelStyles: Record<ScoreLabel, string> = {
  Undervalued: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  "Competitive but possible":
    "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  Crowded: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  "Red Ocean": "bg-red-500/10 text-red-500 border-red-500/20",
};

export function Verdict({ oneLiner, label }: VerdictProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-6 text-center">
      <Badge
        variant="outline"
        className={`px-4 py-1.5 text-sm font-semibold ${labelStyles[label]}`}
      >
        {label}
      </Badge>
      <p className="max-w-lg text-lg font-medium italic text-foreground md:text-xl">
        &ldquo;{oneLiner}&rdquo;
      </p>
    </div>
  );
}
