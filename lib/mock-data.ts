import type { AnalysisResult } from "@/types";

export const mockResults: AnalysisResult[] = [
  {
    id: "mock-1",
    input: {
      idea: "AI-powered resume builder that tailors resumes to job descriptions",
      targetCustomer: "Job seekers",
      pricingModel: "subscription",
      category: "productivity",
    },
    analysis: {
      extractedKeywords: [
        "AI",
        "resume",
        "builder",
        "job description",
        "tailored",
      ],
      similarProducts: [
        {
          name: "Resumake",
          url: "https://resumake.io",
          reason: "AI resume generation with templates",
          confidence: 85,
        },
        {
          name: "Kickresume",
          url: "https://kickresume.com",
          reason: "AI-assisted resume builder",
          confidence: 80,
        },
        {
          name: "Teal",
          url: "https://tealhq.com",
          reason: "Job-tailored resume optimization",
          confidence: 90,
        },
      ],
      saturationSignals: [
        "Over 50 AI resume tools launched in 2024-2025",
        "Major players (LinkedIn, Indeed) adding AI features",
        "Keywords are highly generic in the AI+productivity space",
      ],
      differentiationSignals: [
        "Job description matching is common but execution varies",
      ],
      risks: [
        {
          type: "competition",
          detail: "Established players with massive user bases",
          severity: 8,
        },
        {
          type: "market",
          detail: "Market fatigue from too many AI writing tools",
          severity: 7,
        },
        {
          type: "distribution",
          detail: "High CAC in competitive SEM landscape",
          severity: 6,
        },
        {
          type: "execution",
          detail: "Quality differentiation is hard to communicate",
          severity: 5,
        },
      ],
      verdictOneLiner:
        "You're bringing a knife to a gunfight — in a room full of gunsmiths.",
      suggestions: [
        "Niche down to a specific industry (e.g., healthcare, engineering)",
        "Focus on the interview prep angle, not just resume building",
        "Consider B2B: sell to career coaches or universities",
      ],
    },
    scores: {
      saturation: 82,
      differentiation: 25,
      survivalOdds: 28,
      label: "Red Ocean",
    },
    createdAt: "2026-02-27T10:00:00Z",
  },
  {
    id: "mock-2",
    input: {
      idea: "Subscription service for artisanal fermented hot sauces with live cultures",
      targetCustomer: "Health-conscious foodies aged 25-40",
      pricingModel: "subscription",
      category: "other",
      differentiator: "Live probiotic cultures in every bottle, small-batch fermented",
    },
    analysis: {
      extractedKeywords: [
        "fermented",
        "hot sauce",
        "subscription",
        "probiotic",
        "artisanal",
      ],
      similarProducts: [
        {
          name: "Hot Ones",
          url: "https://heatonist.com",
          reason: "Premium hot sauce subscription",
          confidence: 60,
        },
        {
          name: "Fuego Box",
          url: "https://fuegobox.com",
          reason: "Artisanal hot sauce subscription",
          confidence: 55,
        },
      ],
      saturationSignals: [
        "Hot sauce market growing but subscription niche is small",
        "Few direct competitors in fermented/probiotic angle",
      ],
      differentiationSignals: [
        "Probiotic angle is unique in the hot sauce space",
        "Health-conscious positioning differentiates from pure heat chasers",
        "Specific target demo (25-40 health foodies) is well-defined",
      ],
      risks: [
        {
          type: "market",
          detail: "Niche market size may limit growth",
          severity: 5,
        },
        {
          type: "execution",
          detail: "Shelf stability of live cultures is a challenge",
          severity: 7,
        },
        {
          type: "distribution",
          detail: "Cold chain logistics increase costs",
          severity: 6,
        },
        {
          type: "competition",
          detail: "Low barrier if concept proves out",
          severity: 4,
        },
      ],
      verdictOneLiner:
        "Spicy, tangy, and surprisingly uncrowded — your gut (bacteria) says yes.",
      suggestions: [
        "Partner with gut-health influencers for organic reach",
        "Start local farmers markets before scaling subscription",
        "Offer a 'Starter Culture Kit' as a viral entry product",
      ],
    },
    scores: {
      saturation: 35,
      differentiation: 72,
      survivalOdds: 74,
      label: "Competitive but possible",
    },
    createdAt: "2026-02-27T10:05:00Z",
  },
  {
    id: "mock-3",
    input: {
      idea: "Browser extension that detects dark patterns on e-commerce sites and warns users",
      targetCustomer: "Privacy-conscious online shoppers",
      pricingModel: "free",
      category: "devtools",
      differentiator:
        "Real-time ML detection of manipulative UI patterns with crowd-sourced pattern database",
    },
    analysis: {
      extractedKeywords: [
        "dark patterns",
        "browser extension",
        "e-commerce",
        "consumer protection",
        "ML detection",
      ],
      similarProducts: [
        {
          name: "Dark Pattern Tipline",
          reason: "Crowdsourced dark pattern reporting",
          confidence: 40,
        },
      ],
      saturationSignals: [
        "Very few commercial products in this space",
        "Academic research exists but few consumer tools",
      ],
      differentiationSignals: [
        "ML-based real-time detection is novel",
        "Crowd-sourced database creates network effects",
        "Strong regulatory tailwinds (EU Digital Services Act)",
        "Clear ethical positioning attracts organic press",
      ],
      risks: [
        {
          type: "market",
          detail: "Monetization unclear for a consumer protection tool",
          severity: 7,
        },
        {
          type: "execution",
          detail: "ML accuracy across diverse site designs is hard",
          severity: 8,
        },
        {
          type: "competition",
          detail: "Browser vendors may build this natively",
          severity: 5,
        },
        {
          type: "distribution",
          detail: "Extension install friction limits adoption",
          severity: 4,
        },
      ],
      verdictOneLiner:
        "A noble crusade with real whitespace — if you can figure out who pays the hero.",
      suggestions: [
        "B2B pivot: sell compliance auditing to e-commerce brands",
        "Freemium: free extension, paid detailed reports for researchers",
        "Partner with consumer advocacy organizations for distribution",
      ],
    },
    scores: {
      saturation: 18,
      differentiation: 85,
      survivalOdds: 81,
      label: "Undervalued",
    },
    createdAt: "2026-02-27T10:10:00Z",
  },
];
