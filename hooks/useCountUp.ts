"use client";

import { useState, useEffect, useRef } from "react";

type UseCountUpOptions = {
  end: number;
  duration?: number;
  delay?: number;
};

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function useCountUp({ end, duration = 1500, delay = 0 }: UseCountUpOptions): number {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      startTimeRef.current = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);

        setValue(Math.round(eased * end));

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        }
      };

      rafRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafRef.current);
    };
  }, [end, duration, delay]);

  return value;
}
