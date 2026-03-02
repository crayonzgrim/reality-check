import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { AnalysisResult } from "@/types";

type AnalysisStore = {
  results: Record<string, AnalysisResult>;
  isAnalyzing: boolean;
  error: string | null;

  setResult: (result: AnalysisResult) => void;
  getResult: (id: string) => AnalysisResult | undefined;
  setAnalyzing: (value: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
};

export const useAnalysisStore = create<AnalysisStore>()(
  immer((set, get) => ({
    results: {},
    isAnalyzing: false,
    error: null,

    setResult: (result) =>
      set((state) => {
        state.results[result.id] = result;
      }),

    getResult: (id) => get().results[id],

    setAnalyzing: (value) =>
      set((state) => {
        state.isAnalyzing = value;
        if (value) state.error = null;
      }),

    setError: (error) =>
      set((state) => {
        state.error = error;
        state.isAnalyzing = false;
      }),

    reset: () =>
      set((state) => {
        state.isAnalyzing = false;
        state.error = null;
      }),
  }))
);
