"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useCountUp } from "@/hooks/useCountUp";

type ScoreCardProps = {
  label: string;
  value: number;
  color: string;
  description: string;
  delay?: number;
};

export function ScoreCard({ label, value, color, description, delay = 0 }: ScoreCardProps) {
  const animatedValue = useCountUp({ end: value, duration: 1500, delay });

  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-2 pt-6">
        <span className={`text-4xl font-bold ${color}`}>{animatedValue}</span>
        <span className="text-sm font-semibold">{label}</span>
        <span className="text-center text-xs text-muted-foreground">
          {description}
        </span>
      </CardContent>
    </Card>
  );
}
