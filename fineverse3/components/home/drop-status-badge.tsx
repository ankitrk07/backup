"use client";

import { Badge, type BadgeVariant } from "@/components/ui/badge";
import { useDropStatus } from "@/hooks/use-drop-status";
import { DROP_STATUS_LABEL } from "@/lib/drop-state";
import type { Drop, DropStatus } from "@/types/drop";

const VARIANT: Record<DropStatus, BadgeVariant> = {
  live: "accent",
  upcoming: "violet",
  "sold-out": "danger",
  ended: "muted",
};

interface DropStatusBadgeProps {
  drop: Pick<Drop, "startsAt" | "endsAt" | "stockRemaining">;
  /** timestamp from the server render, keeps hydration stable */
  serverNow: number;
  className?: string;
}

export function DropStatusBadge({ drop, serverNow, className }: DropStatusBadgeProps) {
  const { status } = useDropStatus(drop, serverNow);

  return (
    <Badge variant={VARIANT[status]} className={className}>
      {status === "live" ? (
        <span className="size-2 animate-pulse-dot rounded-full bg-accent-fg" aria-hidden="true" />
      ) : null}
      {DROP_STATUS_LABEL[status]}
    </Badge>
  );
}