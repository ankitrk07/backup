"use client";

import React, { useState } from "react";
import { Play, Youtube, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { FineverseImage } from "@/components/ui/FineverseImage";

export const YouTubeSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = siteConfig.creator.featuredVideoId || "dQw4w9WgXcQ";

  return (
    <section aria-label="Creator Studio Broadcast" className="py-20 border-b border-white/10 bg-void">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="font-mono text-xs text-red-400 tracking-widest uppercase">
                CREATOR LABS BROADCAST
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
              BEHIND THE DROP
            </h2>
          </div>

          <a
            href={siteConfig.socials.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-acid transition-colors min-h-[44px]"
          >
            <Youtube className="w-4 h-4 text-red-500" />
            <span>SUBSCRIBE ON YOUTUBE ({siteConfig.creator.subscriberCount})</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Video Player Box with Click-to-Load Facade (Zero Layout Shift) */}
        <div
          className="relative w-full max-w-5xl mx-auto bg-space-950 border border-white/15 overflow-hidden shadow-2xl surface-card"
          style={{ aspectRatio: "16/9" }}
        >
          {isPlaying ? (
            /* Render YouTube Iframe on Click */
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
              title="FINEVERSE Behind The Scenes Studio Vlog"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            /* Click-to-load Facade (No third-party scripts loaded initially) */
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              aria-label="Play Behind The Scenes Video"
              className="group relative w-full h-full block text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid"
            >
              <FineverseImage
                slotKey="yt-thumb-drop04"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              />

              {/* Pulsing Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-void/90 border border-acid flex items-center justify-center text-acid shadow-acid group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1.5 fill-current" />
                </div>
              </div>

              {/* Bottom Video Spec Banner */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <span className="font-mono text-[10px] sm:text-xs text-acid uppercase tracking-wider block">
                  EPISODE 04 // 4K STUDIO VLOG
                </span>
                <span className="font-display font-black text-lg sm:text-2xl text-white uppercase tracking-wider block mt-0.5">
                  FROM 240 GSM SKETCHES TO PRINTED RUN // SISTERS REVENGE
                </span>
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
