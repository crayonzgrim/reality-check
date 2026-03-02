import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="text-6xl font-bold text-muted-foreground/30">404</div>
      <div>
        <h1 className="mb-2 text-2xl font-bold">Page not found</h1>
        <p className="text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
      <Link href="/">
        <Button>Go home</Button>
      </Link>
    </div>
  );
}
