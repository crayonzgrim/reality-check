import { Hero } from "@/components/landing/Hero";
import { SampleResults } from "@/components/landing/SampleResults";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { mockResults } from "@/lib/mock-data";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Hero />
      <SampleResults results={mockResults} />
      <HowItWorks />
    </main>
  );
}
