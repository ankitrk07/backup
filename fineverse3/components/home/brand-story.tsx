import { Layers, Sparkles, Users } from "lucide-react";
import { SlotImage } from "@/components/media/slot-image";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";
import { getBrandMark } from "@/lib/images";

const PILLARS = [
  { icon: Layers, label: "Limited, numbered drops" },
  { icon: Sparkles, label: "Cosmic-anime graphics" },
  { icon: Users, label: "Made for the creator community" },
];

export function BrandStory() {
  const { eyebrow, heading, paragraphs } = siteConfig.copy.brandStory;

  return (
    <section aria-label="Our story" className="my-8 border-y border-line bg-surface py-20">
      <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="font-display text-eyebrow uppercase text-accent">{eyebrow}</p>
          <h2 className="mt-2 text-balance font-display text-display-md uppercase text-fg">{heading}</h2>
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 max-w-xl text-lg text-muted">
              {paragraph}
            </p>
          ))}

          <ul className="mt-6 space-y-1">
            {PILLARS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex min-h-tap items-center gap-3 text-fg">
                <Icon className="size-5 shrink-0 text-accent" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>

          <ButtonLink href="/about" variant="outline" className="mt-6">
            About {siteConfig.name}
          </ButtonLink>
        </Reveal>

        <Reveal delay={100}>
          <div className="relative mx-auto w-full max-w-sm">
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-full border border-dashed border-line"
            />
            <div
              aria-hidden="true"
              className="absolute -inset-12 rounded-full border border-line opacity-50"
            />
            <SlotImage
              slot={getBrandMark()}
              sizes="384px"
              className="relative rounded-2xl border border-line shadow-glow-violet"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}