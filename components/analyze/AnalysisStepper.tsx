"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Loader2, Check } from "lucide-react";

const STEPS = [
  { label: "Extracting keywords from your idea...", delay: 0 },
  { label: "Scanning the market for competitors...", delay: 2000 },
  { label: "Calculating saturation scores...", delay: 4500 },
  { label: "Generating your verdict...", delay: 7000 },
];

type AnalysisStepperProps = {
  isComplete: boolean;
};

export function AnalysisStepper({ isComplete }: AnalysisStepperProps) {
  const [activeStep, setActiveStep] = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isComplete) {
      setActiveStep(STEPS.length);
      return;
    }

    STEPS.forEach((step, i) => {
      const timer = setTimeout(() => {
        setActiveStep(i + 1);
      }, step.delay);
      timersRef.current.push(timer);
    });

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [isComplete]);

  // GSAP 애니메이션: 각 step이 활성화될 때 슬라이드 인
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const steps = containerRef.current?.querySelectorAll(".stepper-step");
      if (!steps) return;

      steps.forEach((step, i) => {
        if (i < activeStep) {
          gsap.to(step, {
            x: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        } else if (i === activeStep) {
          gsap.fromTo(
            step,
            { x: -30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeStep]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div
        ref={containerRef}
        className="mx-4 w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-lg"
      >
        <h2 className="mb-6 text-center text-lg font-semibold">
          Analyzing your idea...
        </h2>
        <div className="flex flex-col gap-4">
          {STEPS.map((step, i) => {
            const isDone = activeStep > i;
            const isCurrent = activeStep === i;
            const isHidden = activeStep < i;

            return (
              <div
                key={step.label}
                className="stepper-step flex items-center gap-3"
                style={{
                  opacity: isHidden ? 0 : 1,
                  transform: isHidden ? "translateX(-30px)" : "translateX(0)",
                }}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border">
                  {isDone ? (
                    <Check className="h-4 w-4 text-emerald-500" />
                  ) : isCurrent ? (
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                  )}
                </div>
                <span
                  className={`text-sm transition-colors ${
                    isDone
                      ? "text-foreground"
                      : isCurrent
                        ? "text-foreground"
                        : "text-muted-foreground/50"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
