"use client";

import {
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Risk } from "@/types";

type RiskRadarChartProps = {
  risks: Risk[];
};

export function RiskRadarChart({ risks }: RiskRadarChartProps) {
  const riskTypes = ["market", "competition", "execution", "distribution"] as const;

  const data = riskTypes.map((type) => {
    const risk = risks.find((r) => r.type === type);
    return {
      type: type.charAt(0).toUpperCase() + type.slice(1),
      severity: risk?.severity ?? 0,
      fullMark: 10,
    };
  });

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Risk Assessment</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <RechartsRadarChart data={data}>
            <PolarGrid stroke="rgba(255,255,255,0.2)" />
            <PolarAngleAxis
              dataKey="type"
              tick={{ fill: "#ffffff", fontSize: 12 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 10]}
              tick={false}
              axisLine={false}
            />
            <Radar
              name="Risk"
              dataKey="severity"
              stroke="hsl(0 84% 60%)"
              fill="hsl(0 84% 60%)"
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </RechartsRadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
