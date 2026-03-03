import { GoogleGenAI } from "@google/genai";
import { llmAnalysisSchema } from "@/lib/schemas";
import { SYSTEM_PROMPT, buildUserPrompt } from "@/lib/prompts";
import type { LLMAnalysis, AnalyzeInput } from "@/types";

let client: GoogleGenAI | null = null;

function getClient(): GoogleGenAI {
  if (!client) {
    client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  }
  return client;
}

const llmResponseSchema = {
  type: "object" as const,
  properties: {
    extractedKeywords: { type: "array" as const, items: { type: "string" as const } },
    similarProducts: {
      type: "array" as const,
      items: {
        type: "object" as const,
        properties: {
          name: { type: "string" as const },
          url: { type: "string" as const },
          reason: { type: "string" as const },
          confidence: { type: "number" as const },
        },
        required: ["name", "reason", "confidence"] as const,
      },
    },
    saturationSignals: { type: "array" as const, items: { type: "string" as const } },
    differentiationSignals: { type: "array" as const, items: { type: "string" as const } },
    risks: {
      type: "array" as const,
      items: {
        type: "object" as const,
        properties: {
          type: {
            type: "string" as const,
            enum: ["market", "competition", "execution", "distribution"],
          },
          detail: { type: "string" as const },
          severity: { type: "number" as const },
        },
        required: ["type", "detail", "severity"] as const,
      },
    },
    verdictOneLiner: { type: "string" as const },
    suggestions: { type: "array" as const, items: { type: "string" as const } },
  },
  required: [
    "extractedKeywords",
    "similarProducts",
    "saturationSignals",
    "differentiationSignals",
    "risks",
    "verdictOneLiner",
    "suggestions",
  ] as const,
};

export async function analyzeWithLLM(
  input: AnalyzeInput,
  searchResultsText: string
): Promise<LLMAnalysis> {
  const userPrompt = buildUserPrompt(
    input.idea,
    searchResultsText,
    input.targetCustomer,
    input.pricingModel,
    input.category,
    input.differentiator
  );

  const attempt = async (): Promise<LLMAnalysis> => {
    const response = await getClient().models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: llmResponseSchema,
        temperature: 0.7,
        maxOutputTokens: 8192,
      },
    });

    const content = response.text;
    if (!content) throw new Error("Empty response from LLM");

    const parsed = JSON.parse(content);
    const result = llmAnalysisSchema.safeParse(parsed);

    if (!result.success) {
      throw new Error(`LLM output validation failed: ${JSON.stringify(result.error)}`);
    }

    return result.data as LLMAnalysis;
  };

  // 1회 retry
  try {
    return await attempt();
  } catch (firstError) {
    try {
      return await attempt();
    } catch (retryError) {
      throw new Error(
        `Analysis failed after retry: ${retryError instanceof Error ? retryError.message : "Unknown error"}`
      );
    }
  }
}
