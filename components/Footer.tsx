import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto max-w-screen-xl px-4 py-6 text-center text-sm text-muted-foreground">
        <p className="inline-flex items-center gap-1.5">
          <Mail className="h-3.5 w-3.5" />
          Have an issue or a request? Reach out at{" "}
          <a
            href="mailto:crayonzgrim@gmail.com"
            className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
          >
            crayonzgrim@gmail.com
          </a>
        </p>
      </div>
    </footer>
  );
}
