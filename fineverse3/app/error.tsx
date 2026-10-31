"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container flex min-h-[60dvh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-eyebrow uppercase text-danger">Signal lost</p>
      <h1 className="mt-3 text-balance font-display text-display-lg uppercase text-fg">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-md text-lg text-muted">
        We hit an unexpected problem loading this page. Please try again, and if it keeps happening,
        let us know.
      </p>
      {error.digest ? (
        <p className="mt-3 text-sm text-subtle">
          Reference: <code className="rounded bg-raised px-1.5 py-0.5">{error.digest}</code>
        </p>
      ) : null}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button size="lg" onClick={reset}>
          Try again
        </Button>
        <ButtonLink href="/" variant="outline" size="lg">
          Back to home
        </ButtonLink>
        <ButtonLink href="/contact" variant="ghost" size="lg">
          Contact support
        </ButtonLink>
      </div>
    </div>
  );
}