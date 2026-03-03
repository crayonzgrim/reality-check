"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link2, Twitter, Check } from "lucide-react";
import { encodeShareData } from "@/lib/share";
import type { AnalysisResult } from "@/types";

type ShareButtonsProps = {
  result: AnalysisResult;
};

export function ShareButtons({ result }: ShareButtonsProps) {
  const { scores, analysis, input } = result;
  const [copied, setCopied] = useState(false);

  function buildShareUrl() {
    const encoded = encodeShareData({
      s: scores.saturation,
      d: scores.differentiation,
      o: scores.survivalOdds,
      v: analysis.verdictOneLiner,
      i: input.idea.slice(0, 100),
      l: scores.label,
    });
    return `${window.location.origin}/result/${result.id}?d=${encoded}`;
  }

  const handleCopyLink = async () => {
    try {
      const url = buildShareUrl();
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      try {
        const url = buildShareUrl();
        const textarea = document.createElement("textarea");
        textarea.value = url;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        alert("Failed to copy link. Please copy the URL from the address bar.");
      }
    }
  };

  const handleShareX = () => {
    try {
      const url = buildShareUrl();
      const text = `My idea got a ${scores.survivalOdds}% survival score on RealityCheck\n\n"${analysis.verdictOneLiner}"`;
      const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
      window.open(intentUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" className="gap-1.5" onClick={handleShareX}>
        <Twitter className="h-3.5 w-3.5" />
        Share
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="gap-1.5"
        onClick={handleCopyLink}
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-500" />
            Copied!
          </>
        ) : (
          <>
            <Link2 className="h-3.5 w-3.5" />
            Copy link
          </>
        )}
      </Button>
    </div>
  );
}
