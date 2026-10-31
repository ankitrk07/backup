import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className, iconOnly = false }) => {
  return (
    <Link
      href="/"
      aria-label="FINEVERSE Home"
      className={cn("inline-flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-acid", className)}
    >
      {/* Planetary Orbit Vector Emblem (Accurately mirrored from provided brand image) */}
      <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#060913" stroke="rgba(255,255,255,0.08)" />
          {/* Planetary rings */}
          <ellipse cx="50" cy="50" rx="38" ry="14" transform="rotate(-26 50 50)" stroke="#00F0FF" strokeWidth="2.5" fill="none" />
          <circle cx="50" cy="50" r="21" fill="#0B132B" stroke="#CCFF00" strokeWidth="1.5" />
          {/* Crescent highlight */}
          <path d="M 40 35 A 21 21 0 0 1 65 55 A 21 21 0 0 0 40 35" fill="#38EF7D" opacity="0.8" />
          {/* Satellite Moon */}
          <circle cx="38" cy="22" r="4" fill="#00F0FF" />
        </svg>
      </div>

      {!iconOnly && (
        <div className="flex flex-col">
          <span className="font-display font-black text-xl sm:text-2xl tracking-[0.2em] uppercase text-white group-hover:text-acid transition-colors leading-none">
            FINEVERSE
          </span>
          <span className="font-mono text-[9px] tracking-[0.25em] text-acid font-bold mt-1 uppercase">
            WEAR THE UNIVERSE
          </span>
        </div>
      )}
    </Link>
  );
};
