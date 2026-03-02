"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { Verdict } from "./Verdict";
import { ScoreGrid } from "./ScoreGrid";
import { RiskRadarChart } from "./RadarChart";
import { SimilarProducts } from "./SimilarProducts";
import { SignalList } from "./SignalList";
import { RiskList } from "./RiskList";
import { ShareButtons } from "@/components/share/ShareButtons";
import type { AnalysisResult } from "@/types";

type ResultViewProps = {
  result: AnalysisResult;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0, 0, 0.2, 1] as const } },
};

export function ResultView({ result }: ResultViewProps) {
  const { scores, analysis, input } = result;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-8 md:py-12"
    >
      <motion.div variants={item} className="flex items-center justify-between">
        <Link href="/analyze">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            New analysis
          </Button>
        </Link>
        <ShareButtons result={result} />
      </motion.div>

      <motion.div variants={item}>
        <h1 className="mb-1 text-lg font-semibold text-muted-foreground">
          Reality Check
        </h1>
        <p className="line-clamp-2 text-sm text-muted-foreground/70">
          {input.idea}
        </p>
      </motion.div>

      <motion.div variants={item}>
        <Verdict oneLiner={analysis.verdictOneLiner} label={scores.label} />
      </motion.div>

      <motion.div variants={item}>
        <ScoreGrid scores={scores} />
      </motion.div>

      <motion.div variants={item} className="grid gap-4 md:grid-cols-2">
        <RiskRadarChart risks={analysis.risks} />
        <SimilarProducts products={analysis.similarProducts} />
      </motion.div>

      <motion.div variants={item}>
        <Separator />
      </motion.div>

      <motion.div variants={item} className="grid gap-4 md:grid-cols-2">
        <SignalList
          title="Saturation Signals"
          items={analysis.saturationSignals}
          variant="warning"
        />
        <SignalList
          title="Differentiation Signals"
          items={analysis.differentiationSignals}
          variant="positive"
        />
      </motion.div>

      <motion.div variants={item}>
        <SignalList
          title="Suggestions"
          items={analysis.suggestions}
          variant="suggestion"
        />
      </motion.div>

      <motion.div variants={item}>
        <RiskList risks={analysis.risks} />
      </motion.div>

      <motion.div
        variants={item}
        className="rounded-lg bg-muted p-4 text-center text-xs text-muted-foreground"
      >
        Data is indicative, not absolute. Use this as a starting point for your
        own research.
      </motion.div>
    </motion.div>
  );
}
