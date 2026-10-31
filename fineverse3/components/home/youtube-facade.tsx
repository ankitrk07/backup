"use client";

import { Play } from "lucide-react";
import { useState } from "react";
import { SlotImage } from "@/components/media/slot-image";
import type { VideoItem } from "@/types/content";

const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;
const THUMB_SIZES = "(min-width: 768px) 33vw, 100vw";

interface YouTubeFacadeProps {
  video: VideoItem;
  channelUrl: string | null;
}

/**
 * Click-to-load player. The thumbnail renders first with a reserved 16:9 box,
 * and the YouTube iframe is only added after a click, so nothing from
 * YouTube is downloaded until the shopper asks for it.
 */
export function YouTubeFacade({ video, channelUrl }: YouTubeFacadeProps) {
  const [playing, setPlaying] = useState(false);
  const videoId = video.youtubeId;
  const canPlay = videoId !== null && YOUTUBE_ID.test(videoId);

  return (
    <article className="overflow-hidden rounded-xl border border-line bg-surface">
      {playing && canPlay ? (
        <div className="relative aspect-video bg-black">
          <iframe
            className="absolute inset-0 size-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      ) : (
        <div className="relative">
          <SlotImage slot={video.thumbnail} decorative sizes={THUMB_SIZES} />
          {canPlay ? (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play video: ${video.title}`}
              className="group absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/40"
            >
              <span className="flex size-16 items-center justify-center rounded-full bg-accent text-accent-fg shadow-glow-accent transition-transform group-hover:scale-110 motion-reduce:transform-none">
                <Play className="size-7 translate-x-0.5 fill-current" aria-hidden="true" />
              </span>
            </button>
          ) : channelUrl ? (
            <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Watch ${video.title} on YouTube (opens in a new tab)`}
              className="group absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/40"
            >
              <span className="flex size-16 items-center justify-center rounded-full bg-accent text-accent-fg shadow-glow-accent transition-transform group-hover:scale-110 motion-reduce:transform-none">
                <Play className="size-7 translate-x-0.5 fill-current" aria-hidden="true" />
              </span>
            </a>
          ) : (
            <span className="absolute left-3 top-3 rounded-sm bg-bg/80 px-2 py-1 font-display text-xs uppercase tracking-wider text-muted">
              Coming soon
            </span>
          )}
        </div>
      )}

      <div className="p-4">
        <h3 className="text-base font-semibold leading-snug text-fg">{video.title}</h3>
        <p className="mt-1 text-sm text-muted">{video.description}</p>
      </div>
    </article>
  );
}