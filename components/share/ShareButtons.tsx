"use client";

import { Button } from "@/components/ui/button";
import { Share2, Link2, Twitter } from "lucide-react";
import { encodeShareData } from "@/lib/share";
import type { AnalysisResult } from "@/types";

type ShareButtonsProps = {
  result: AnalysisResult;
};

export function ShareButtons({ result }: ShareButtonsProps) {
  const { scores, analysis, input } = result;

  const handleCopyLink = async () => {
    const encoded = encodeShareData({
      s: scores.saturation,
      d: scores.differentiation,
      o: scores.survivalOdds,
      v: analysis.verdictOneLiner,
      i: input.idea.slice(0, 100),
      l: scores.label,
    });
    const url = `${window.location.origin}/result/${result.id}?d=${encoded}`;
    await navigator.clipboard.writeText(url);
  };

  const handleShareX = () => {
    const text = `My idea got a ${scores.survivalOdds}% survival score on RealityCheck 💀\n\n"${analysis.verdictOneLiner}"\n\nCheck yours:`;
    const encoded = encodeShareData({
      s: scores.saturation,
      d: scores.differentiation,
      o: scores.survivalOdds,
      v: analysis.verdictOneLiner,
      i: input.idea.slice(0, 100),
      l: scores.label,
    });
    const url = `${window.location.origin}/result/${result.id}?d=${encoded}`;
    const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(intentUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" className="gap-1.5" onClick={handleShareX}>
        <Twitter className="h-3.5 w-3.5" />
        Share
      </Button>
      <Button variant="outline" size="sm" className="gap-1.5" onClick={handleCopyLink}>
        <Link2 className="h-3.5 w-3.5" />
        Copy link
      </Button>
    </div>
  );
}
