"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";
import type { Risk } from "@/types";

type RiskListProps = {
  risks: Risk[];
};

function severityColor(severity: number): string {
  if (severity >= 8) return "bg-red-500";
  if (severity >= 5) return "bg-orange-500";
  return "bg-yellow-500";
}

export function RiskList({ risks }: RiskListProps) {
  if (risks.length === 0) return null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <ShieldAlert className="h-4 w-4 text-red-500" />
          Key Risks
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {risks.map((risk, i) => (
          <div key={i} className="flex items-start gap-3">
            <div
              className={`mt-1 h-2 w-2 shrink-0 rounded-full ${severityColor(risk.severity)}`}
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium uppercase text-muted-foreground">
                  {risk.type}
                </span>
                <span className="text-xs text-muted-foreground">
                  Severity: {risk.severity}/10
                </span>
              </div>
              <p className="text-sm">{risk.detail}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
