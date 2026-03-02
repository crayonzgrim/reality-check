"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="flex flex-col items-center gap-8 px-4 py-24 text-center md:py-32 lg:py-40">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground"
      >
        <Zap className="h-3.5 w-3.5" />
        <span>Powered by AI market analysis</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
      >
        Is your idea{" "}
        <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          already taken
        </span>
        ?
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-xl text-lg text-muted-foreground md:text-xl"
      >
        Find out how saturated your market really is. Get an instant reality
        check with AI-powered analysis, competitor mapping, and a brutally
        honest survival score.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Link href="/analyze">
          <Button size="lg" className="gap-2 text-base">
            Check your idea
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
