"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, Loader2 } from "lucide-react";
import { useAnalysisStore } from "@/lib/store";
import type { AnalyzeInput, Category, PricingModel } from "@/types";

type IdeaFormProps = {
  onSubmit: (input: AnalyzeInput) => void;
};

export function IdeaForm({ onSubmit }: IdeaFormProps) {
  const router = useRouter();
  const { isAnalyzing } = useAnalysisStore();
  const [idea, setIdea] = useState("");
  const [targetCustomer, setTargetCustomer] = useState("");
  const [pricingModel, setPricingModel] = useState<PricingModel | "">("");
  const [category, setCategory] = useState<Category | "">("");
  const [differentiator, setDifferentiator] = useState("");
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim().length < 10) return;

    const input: AnalyzeInput = {
      idea: idea.trim(),
      ...(targetCustomer && { targetCustomer: targetCustomer.trim() }),
      ...(pricingModel && { pricingModel: pricingModel as PricingModel }),
      ...(category && { category: category as Category }),
      ...(differentiator && { differentiator: differentiator.trim() }),
    };

    onSubmit(input);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="idea" className="text-base font-semibold">
          Describe your idea *
        </Label>
        <Textarea
          id="idea"
          placeholder="e.g., An AI-powered tool that generates personalized meal plans based on grocery store sales..."
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          className="min-h-[120px] resize-none"
          maxLength={1000}
          required
        />
        <p className="text-xs text-muted-foreground">
          {idea.length}/1000 &middot; Minimum 10 characters
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="target" className="font-medium">
          Target customer
        </Label>
        <Input
          id="target"
          placeholder="e.g., Busy parents who want to eat healthy"
          value={targetCustomer}
          onChange={(e) => setTargetCustomer(e.target.value)}
          maxLength={200}
        />
      </div>

      <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
        <CollapsibleTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="gap-1 text-muted-foreground"
          >
            Advanced options
            <ChevronDown
              className={`h-4 w-4 transition-transform ${advancedOpen ? "rotate-180" : ""}`}
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="pricing">Pricing model</Label>
              <Select
                value={pricingModel}
                onValueChange={(v) => setPricingModel(v as PricingModel)}
              >
                <SelectTrigger id="pricing">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="subscription">Subscription</SelectItem>
                  <SelectItem value="one-time">One-time purchase</SelectItem>
                  <SelectItem value="usage-based">Usage-based</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={category}
                onValueChange={(v) => setCategory(v as Category)}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="devtools">Developer Tools</SelectItem>
                  <SelectItem value="creator">Creator Economy</SelectItem>
                  <SelectItem value="b2b">B2B / Enterprise</SelectItem>
                  <SelectItem value="productivity">Productivity</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="diff">What makes it different?</Label>
            <Textarea
              id="diff"
              placeholder="e.g., We use real-time grocery API data, not generic nutrition databases..."
              value={differentiator}
              onChange={(e) => setDifferentiator(e.target.value)}
              className="min-h-[80px] resize-none"
              maxLength={500}
            />
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Button
        type="submit"
        size="lg"
        className="w-full text-base"
        disabled={idea.trim().length < 10 || isAnalyzing}
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          "Get my reality check"
        )}
      </Button>
    </form>
  );
}
