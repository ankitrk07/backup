"use client";

import "./globals.css";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/** Last-resort boundary: replaces the root layout, so it renders its own <html> and <body>. */
export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html lang="en-IN">
      <body className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
        <main>
          <h1 className="text-balance font-display text-5xl uppercase text-fg">
            Something went wrong
          </h1>
          <p className="mx-auto mt-4 max-w-md text-lg text-muted">
            The site hit an unexpected error. Please try again or return to the home page.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="inline-flex h-12 items-center justify-center rounded bg-accent px-6 font-display text-base uppercase tracking-wider text-accent-fg"
            >
              Try again
            </button>
            <a
              href="/"
              className="inline-flex h-12 items-center justify-center rounded border border-line px-6 font-display text-base uppercase tracking-wider text-fg"
            >
              Back to home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}