import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";
import type { VideoItem } from "@/types/content";
import { YouTubeFacade } from "./youtube-facade";

interface YouTubeSectionProps {
  videos: VideoItem[];
  /** from config; null until a YouTube handle is filled in */
  channelUrl: string | null;
}

export function YouTubeSection({ videos, channelUrl }: YouTubeSectionProps) {
  if (videos.length === 0) return null;
  const { eyebrow, heading, description, channelCta } = siteConfig.copy.youtube;

  return (
    <section
      aria-label="Videos"
      className="container py-16 [contain-intrinsic-size:auto_760px] [content-visibility:auto]"
    >
      <Reveal>
        <SectionHeading
          eyebrow={eyebrow}
          title={heading}
          description={description}
          action={
            channelUrl ? (
              <ButtonLink href={channelUrl} variant="outline" size="sm">
                {channelCta}
              </ButtonLink>
            ) : undefined
          }
        />
      </Reveal>

      <Reveal className="mt-8">
        <ul className="grid gap-4 md:grid-cols-3 md:gap-5">
          {videos.map((video) => (
            <li key={video.id}>
              <YouTubeFacade video={video} channelUrl={channelUrl} />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}