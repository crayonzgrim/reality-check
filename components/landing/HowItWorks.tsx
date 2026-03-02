import { Search, Brain, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "1. Describe your idea",
    description:
      "Tell us what you're building, who it's for, and what makes it different.",
  },
  {
    icon: Brain,
    title: "2. AI analyzes the market",
    description:
      "We scan the web, identify competitors, and assess market saturation signals.",
  },
  {
    icon: BarChart3,
    title: "3. Get your reality check",
    description:
      "Receive a detailed report with scores, risks, and actionable suggestions.",
  },
];

export function HowItWorks() {
  return (
    <section className="w-full border-t border-border px-4 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-2 text-center text-2xl font-bold md:text-3xl">
          How It Works
        </h2>
        <p className="mb-10 text-center text-muted-foreground">
          Three steps to brutal honesty
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.title}
              className="flex flex-col items-center gap-3 text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
