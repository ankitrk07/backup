"use client";

import React, { useState, useEffect } from "react";
import { Drop } from "@/types/drop";
import { calculateTimeRemaining } from "@/lib/utils";
import { getDropStatus } from "@/lib/data/drops";
import { Badge } from "@/components/ui/Badge";
import { Clock, ShieldAlert } from "lucide-react";

interface DropCountdownProps {
  drop: Drop;
}

export const DropCountdown: React.FC<DropCountdownProps> = ({ drop }) => {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() =>
    calculateTimeRemaining(drop.endDateTime)
  );

  const status = getDropStatus(drop);
  const remainingStock = Math.max(0, drop.totalUnitsAllocated - drop.unitsClaimed);
  const claimedPercent = Math.min(
    100,
    Math.round((drop.unitsClaimed / drop.totalUnitsAllocated) * 100)
  );

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeRemaining(drop.endDateTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [drop.endDateTime]);

  // Prevent SSR hydration mismatch
  if (!mounted) {
    return (
      <div className="bg-space-900 border border-white/10 p-6 max-w-xl mx-auto space-y-4">
        <div className="h-6 w-36 bg-space-800 animate-pulse" />
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 bg-space-850 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-space-950 border border-white/15 p-6 sm:p-8 max-w-2xl mx-auto relative overflow-hidden shadow-2xl">
      {/* Background Radial Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-acid/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* Header Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-2">
          {status === "live" ? (
            <Badge variant="live" size="md">
              LIVE DROP
            </Badge>
          ) : status === "sold_out" ? (
            <Badge variant="soldOut" size="md">
              SOLD OUT
            </Badge>
          ) : status === "upcoming" ? (
            <Badge variant="upcoming" size="md">
              UPCOMING
            </Badge>
          ) : (
            <Badge variant="soldOut" size="md">
              DROP ENDED
            </Badge>
          )}
          <span className="font-mono text-xs text-zinc-300">
            CHAPTER {drop.number} // {drop.name}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono text-acid">
          <Clock className="w-4 h-4" />
          <span>CLOSES IN</span>
        </div>
      </div>

      {/* Countdown Grid (Live Computed Ticking) */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center mb-6">
        {[
          { label: "DAYS", value: timeLeft.days },
          { label: "HOURS", value: timeLeft.hours },
          { label: "MINS", value: timeLeft.minutes },
          { label: "SECS", value: timeLeft.seconds },
        ].map((unit, idx) => (
          <div
            key={idx}
            className="bg-space-900 border border-white/10 p-3 sm:p-4 rounded-none"
          >
            <span className="block font-mono font-black text-2xl sm:text-4xl text-white tracking-wider">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="block font-mono text-[10px] text-zinc-400 mt-1 uppercase tracking-widest">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      {/* Real Computed Stock Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-mono">
          <span className="text-zinc-400 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-acid" />
            <span>UNITS ALLOCATED: {drop.totalUnitsAllocated}</span>
          </span>
          <span className="font-bold text-acid">
            {remainingStock > 0 ? `${remainingStock} PIECES REMAINING` : "SOLD OUT"}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-space-900 border border-white/10 overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-acid via-acid-hover to-acid transition-all duration-500 shadow-acid"
            style={{ width: `${claimedPercent}%` }}
          />
        </div>
        <div className="text-right text-[10px] font-mono text-zinc-500">
          {claimedPercent}% CLAIMED BY NOCTURNAL COMMUNITY
        </div>
      </div>
    </div>
  );
};
