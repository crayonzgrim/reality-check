"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Sparkles, Lightbulb } from "lucide-react";

type SignalListProps = {
  title: string;
  items: string[];
  variant: "warning" | "positive" | "suggestion";
};

const variantConfig = {
  warning: {
    icon: AlertTriangle,
    iconColor: "text-orange-500",
  },
  positive: {
    icon: Sparkles,
    iconColor: "text-blue-500",
  },
  suggestion: {
    icon: Lightbulb,
    iconColor: "text-yellow-500",
  },
};

export function SignalList({ title, items, variant }: SignalListProps) {
  if (items.length === 0) return null;

  const { icon: Icon, iconColor } = variantConfig[variant];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon className={`h-4 w-4 ${iconColor}`} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-2">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
