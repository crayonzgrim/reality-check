import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export function ResultNotFound() {
  return (
    <div className="flex flex-col items-center gap-6 py-24 text-center">
      <FileQuestion className="h-16 w-16 text-muted-foreground/50" />
      <div>
        <h1 className="mb-2 text-2xl font-bold">Result not found</h1>
        <p className="text-muted-foreground">
          This analysis doesn&apos;t exist or has expired.
        </p>
      </div>
      <Link href="/analyze">
        <Button size="lg">Try your own idea</Button>
      </Link>
    </div>
  );
}
