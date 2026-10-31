"use client";

import { CountdownTimer } from "@/components/home/countdown-timer";
import { DropStatusBadge } from "@/components/home/drop-status-badge";
import { DropStockMeter } from "@/components/home/drop-stock-meter";
import { useDropStatus } from "@/hooks/use-drop-status";
import { getDropCountdownTarget } from "@/lib/drop-state";
import type { Drop } from "@/types/drop";

interface CollectionDropPanelProps {
  drop: Drop;
  serverNow: number;
}

/** Drop state for a drop collection. Everything is computed from the drop data. */
export function CollectionDropPanel({ drop, serverNow }: CollectionDropPanelProps) {
  const { status } = useDropStatus(drop, serverNow);
  const target = getDropCountdownTarget(drop, status);

  return (
    <section
      aria-label={`${drop.name} drop status`}
      className="rounded-xl border border-line bg-surface p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-center gap-3">
        <DropStatusBadge drop={drop} serverNow={serverNow} />
        <p className="font-display text-eyebrow uppercase text-muted">
          {drop.tagline} · {drop.name}
        </p>
      </div>

      {target ? (
        <div className="mt-5">
          <p className="mb-2 text-sm text-muted">{status === "live" ? "Ends in" : "Starts in"}</p>
          <CountdownTimer targetIso={target} serverNow={serverNow} className="max-w-md" />
        </div>
      ) : null}

      <DropStockMeter drop={drop} serverNow={serverNow} className="mt-5 max-w-md" />
    </section>
  );
}