import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { formatPrice } from "@/lib/formatters";

export const AnnouncementBar: React.FC = () => {
  return (
    <aside
      aria-label="Store Announcement"
      className="bg-void border-b border-white/10 text-xs font-mono tracking-widest uppercase overflow-hidden h-9 flex items-center relative z-40"
    >
      <div className="flex w-full whitespace-nowrap animate-marquee hover:[animation-play-state:paused] py-1">
        {/* Repeated marquee content for seamless infinite scroll */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-8 mx-4 text-zinc-300">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-acid animate-pulse" />
              <Link href="/collections/drop-04-sisters-revenge" className="hover:text-acid transition-colors">
                DROP 04 // SISTERS REVENGE IS LIVE — LIMITED RUN
              </Link>
            </span>
            <span className="text-zinc-600">•</span>
            <span>
              FREE SHIPPING ACROSS INDIA ON ORDERS OVER{" "}
              <strong className="text-acid font-bold">
                {formatPrice(siteConfig.shipping.freeShippingThreshold)}
              </strong>
            </span>
            <span className="text-zinc-600">•</span>
            <span>CASH ON DELIVERY & UPI VERIFIED</span>
            <span className="text-zinc-600">•</span>
            <span className="text-purple-400">240 GSM & 420 GSM PURE COMBED COTTON</span>
            <span className="text-zinc-600">•</span>
          </div>
        ))}
      </div>
    </aside>
  );
};
