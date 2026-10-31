"use client";

import { useCountdown } from "@/hooks/use-countdown";
import { pad2 } from "@/lib/format";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  /** real ISO timestamp the clock ticks towards */
  targetIso: string;
  serverNow: number;
  className?: string;
}

export function CountdownTimer({ targetIso, serverNow, className }: CountdownTimerProps) {
  const time = useCountdown(targetIso, serverNow);

  const segments = [
    { value: time.days, label: "Days" },
    { value: time.hours, label: "Hours" },
    { value: time.minutes, label: "Minutes" },
    { value: time.seconds, label: "Seconds" },
  ];

  return (
    <div
      role="timer"
      aria-label={`${time.days} days, ${time.hours} hours, ${time.minutes} minutes and ${time.seconds} seconds remaining`}
      className={cn("grid grid-cols-4 gap-2 sm:gap-4", className)}
    >
      {segments.map((segment) => (
        <div
          key={segment.label}
          className="rounded-lg border border-line bg-bg px-1 py-3 text-center sm:px-4 sm:py-5"
        >
          <span
            aria-hidden="true"
            className="block font-display text-4xl leading-none text-accent tabular sm:text-6xl"
          >
            {pad2(segment.value)}
          </span>
          <span className="mt-2 block text-[11px] uppercase tracking-widest text-muted sm:text-xs">
            {segment.label}
          </span>
        </div>
      ))}
    </div>
  );
}