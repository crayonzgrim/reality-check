import type { LLMAnalysis, Scores, ScoreLabel, AnalyzeInput } from "@/types";

const GENERIC_KEYWORDS = [
  "saas",
  "tool",
  "platform",
  "ai",
  "app",
  "software",
  "service",
  "solution",
  "automation",
  "dashboard",
];

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function getLabel(survivalOdds: number): ScoreLabel {
  if (survivalOdds >= 80) return "Undervalued";
  if (survivalOdds >= 60) return "Competitive but possible";
  if (survivalOdds >= 40) return "Crowded";
  return "Red Ocean";
}

export function calculateScores(
  analysis: LLMAnalysis,
  input: AnalyzeInput
): Scores {
  // --- Saturation ---
  const genericKeywordCount = analysis.extractedKeywords.filter((kw) =>
    GENERIC_KEYWORDS.some((g) => kw.toLowerCase().includes(g))
  ).length;
  const genericKeywordScore = Math.min(genericKeywordCount * 5, 20);

  const avgConfidence =
    analysis.similarProducts.length > 0
      ? analysis.similarProducts.reduce((sum, p) => sum + p.confidence, 0) /
        analysis.similarProducts.length
      : 0;
  const confidenceScore = (avgConfidence / 100) * 40;

  const productCountScore = Math.min(analysis.similarProducts.length * 5, 30);

  const saturation = clamp(
    Math.round(genericKeywordScore + confidenceScore + productCountScore),
    0,
    100
  );

  // --- Differentiation ---
  const hasSpecificTarget =
    input.targetCustomer && input.targetCustomer.length > 20;
  const targetScore = hasSpecificTarget ? 20 : input.targetCustomer ? 10 : 0;

  const hasDifferentiator =
    input.differentiator && input.differentiator.length > 20;
  const differentiatorScore = hasDifferentiator
    ? 30
    : input.differentiator
      ? 15
      : 0;

  const avgCompetitionSeverity =
    analysis.risks
      .filter((r) => r.type === "competition")
      .reduce((sum, r) => sum + r.severity, 0) /
    Math.max(
      analysis.risks.filter((r) => r.type === "competition").length,
      1
    );
  const lowCompetitionScore = avgCompetitionSeverity < 5 ? 10 : 0;

  const diffSignalBonus = Math.min(
    analysis.differentiationSignals.length * 5,
    20
  );

  const differentiation = clamp(
    Math.round(
      targetScore + differentiatorScore + lowCompetitionScore + diffSignalBonus
    ),
    0,
    100
  );

  // --- Survival Odds ---
  const avgRiskSeverity =
    analysis.risks.reduce((sum, r) => sum + r.severity, 0) /
    Math.max(analysis.risks.length, 1);

  const survivalOdds = clamp(
    Math.round(
      100 - saturation * 0.6 - avgRiskSeverity * 8 + differentiation * 0.4
    ),
    0,
    100
  );

  return {
    saturation,
    differentiation,
    survivalOdds,
    label: getLabel(survivalOdds),
  };
}
