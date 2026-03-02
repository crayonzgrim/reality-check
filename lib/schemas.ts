import { z } from "zod/v4";

export const analyzeInputSchema = z.object({
  idea: z.string().min(10, "Describe your idea in at least 10 characters").max(1000),
  targetCustomer: z.string().max(200).optional(),
  pricingModel: z
    .enum(["free", "subscription", "one-time", "usage-based"])
    .optional(),
  category: z
    .enum([
      "marketing",
      "devtools",
      "creator",
      "b2b",
      "productivity",
      "finance",
      "other",
    ])
    .optional(),
  differentiator: z.string().max(500).optional(),
});

export const similarProductSchema = z.object({
  name: z.string(),
  url: z.string().optional(),
  reason: z.string(),
  confidence: z.number().min(0).max(100),
});

export const riskSchema = z.object({
  type: z.enum(["market", "competition", "execution", "distribution"]),
  detail: z.string(),
  severity: z.number().min(1).max(10),
});

export const llmAnalysisSchema = z.object({
  extractedKeywords: z.array(z.string()),
  similarProducts: z.array(similarProductSchema),
  saturationSignals: z.array(z.string()),
  differentiationSignals: z.array(z.string()),
  risks: z.array(riskSchema),
  verdictOneLiner: z.string(),
  suggestions: z.array(z.string()),
});

export const shareableDataSchema = z.object({
  s: z.number(),
  d: z.number(),
  o: z.number(),
  v: z.string(),
  i: z.string(),
  l: z.enum([
    "Undervalued",
    "Competitive but possible",
    "Crowded",
    "Red Ocean",
  ]),
});
