"use client";

import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { useDropStatus } from "@/hooks/use-drop-status";
import { getDropCountdownTarget } from "@/lib/drop-state";
import { formatDate } from "@/lib/format";
import type { Drop, DropStatus } from "@/types/drop";
import { CountdownTimer } from "./countdown-timer";

interface DropCountdownProps {
  /** the drop the clock is about */
  drop: Drop;
  /** a later drop to tease underneath, if one exists */
  next: Drop | null;
  serverNow: number;
}

const HEADING: Record<DropStatus, string> = {
  live: "ends in",
  upcoming: "starts in",
  "sold-out": "is sold out",
  ended: "has ended",
};

const BLURB: Record<DropStatus, string> = {
  live: "Available until the timer ends or stock runs out.",
  upcoming: "Join the whitelist to get early access before the drop goes public.",
  "sold-out": "This drop has sold out. Join the whitelist so you do not miss the next one.",
  ended: "This drop has ended. Browse the rest of the universe.",
};

export function DropCountdown({ drop, next, serverNow }: DropCountdownProps) {
  const { status } = useDropStatus(drop, serverNow);
  const target = getDropCountdownTarget(drop, status);
  const collectionHref = drop.collectionSlug ? `/collections/${drop.collectionSlug}` : "/shop";
  const showNext = next !== null && next.id !== drop.id;

  return (
    <section aria-label="Drop countdown" className="container py-16">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-2xl border border-line bg-surface px-5 py-10 text-center sm:px-12 sm:py-14">
          <div aria-hidden="true" className="halftone absolute inset-0 -z-10 opacity-60" />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 50% 0%, rgb(var(--c-violet) / 0.35), transparent 65%)",
            }}
          />

          <p className="font-display text-eyebrow uppercase text-accent">
            {drop.tagline} · {drop.name}
          </p>
          <h2 className="mt-2 text-balance font-display text-display-md uppercase text-fg">
            {drop.tagline} {HEADING[status]}
          </h2>

          {target ? (
            <CountdownTimer targetIso={target} serverNow={serverNow} className="mx-auto mt-8 max-w-xl" />
          ) : null}

          <p className="mx-auto mt-6 max-w-md text-muted">{BLURB[status]}</p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {status === "live" ? (
              <ButtonLink href={collectionHref} size="lg">
                Shop the drop
              </ButtonLink>
            ) : status === "upcoming" || status === "sold-out" ? (
              <ButtonLink href="#whitelist" size="lg">
                Join the whitelist
              </ButtonLink>
            ) : (
              <ButtonLink href="/shop" size="lg">
                Browse the shop
              </ButtonLink>
            )}
          </div>

          {showNext && next ? (
            <p className="mt-8 border-t border-line pt-6 text-sm text-muted">
              Next up: <strong className="text-fg">{next.tagline}</strong> · {next.name}, starts{" "}
              {formatDate(next.startsAt)}.{" "}
              <a href="#whitelist" className="font-semibold text-accent underline underline-offset-4">
                Get early access
              </a>
            </p>
          ) : null}
        </div>
      </Reveal>
    </section>
  );
}