export type PricingModel = "free" | "subscription" | "one-time" | "usage-based";

export type Category =
  | "marketing"
  | "devtools"
  | "creator"
  | "b2b"
  | "productivity"
  | "finance"
  | "other";

export type RiskType = "market" | "competition" | "execution" | "distribution";

export type ScoreLabel =
  | "Undervalued"
  | "Competitive but possible"
  | "Crowded"
  | "Red Ocean";

export type AnalyzeInput = {
  idea: string;
  targetCustomer?: string;
  pricingModel?: PricingModel;
  category?: Category;
  differentiator?: string;
};

export type SimilarProduct = {
  name: string;
  url?: string;
  favicon?: string;
  reason: string;
  confidence: number;
};

export type Risk = {
  type: RiskType;
  detail: string;
  severity: number;
};

export type LLMAnalysis = {
  extractedKeywords: string[];
  similarProducts: SimilarProduct[];
  saturationSignals: string[];
  differentiationSignals: string[];
  risks: Risk[];
  verdictOneLiner: string;
  suggestions: string[];
};

export type Scores = {
  saturation: number;
  differentiation: number;
  survivalOdds: number;
  label: ScoreLabel;
};

export type AnalysisResult = {
  id: string;
  input: AnalyzeInput;
  analysis: LLMAnalysis;
  scores: Scores;
  createdAt: string;
};

export type ShareableData = {
  s: number; // saturation
  d: number; // differentiation
  o: number; // survivalOdds
  v: string; // verdict
  i: string; // idea snippet
  l: ScoreLabel; // label
};
