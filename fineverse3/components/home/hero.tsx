import { SlotImage } from "@/components/media/slot-image";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { pad2 } from "@/lib/format";
import { getHeroImage } from "@/lib/images";
import type { Drop } from "@/types/drop";
import { DropStatusBadge } from "./drop-status-badge";

interface HeroProps {
  /** the drop to promote, or null when there is none */
  drop: Drop | null;
  serverNow: number;
}

export function Hero({ drop, serverNow }: HeroProps) {
  const { headline, subheadline, primaryCta, secondaryCta } = siteConfig.copy.hero;

  const words = headline.split(" ");
  const accentWord = words.pop() ?? "";
  const lead = words.join(" ");
  const primaryHref = drop?.collectionSlug ? `/collections/${drop.collectionSlug}` : "/shop";

  return (
    <section aria-label="Introduction" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="starfield absolute inset-0 -z-10 opacity-70" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 85% 10%, rgb(var(--c-violet) / 0.35), transparent 55%), radial-gradient(ellipse at 0% 100%, rgb(var(--c-accent) / 0.12), transparent 50%)",
        }}
      />

      <div className="container grid items-center gap-8 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-16">
        <div>
          {drop ? (
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <DropStatusBadge drop={drop} serverNow={serverNow} />
              <p className="font-display text-eyebrow uppercase text-muted">
                Drop {pad2(drop.number)} · {drop.name}
              </p>
            </div>
          ) : null}

          <h1 className="font-display text-display-xl uppercase text-fg">
            {lead ? <span className="block">{lead}</span> : null}
            <span className="block text-accent">{accentWord}</span>
          </h1>

          <p className="mt-5 max-w-xl text-lg text-muted sm:text-xl">{subheadline}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={primaryHref} size="lg">
              {primaryCta}
            </ButtonLink>
            <ButtonLink href="/shop" variant="outline" size="lg">
              {secondaryCta}
            </ButtonLink>
          </div>
        </div>

        <SlotImage
          slot={getHeroImage()}
          priority
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="mx-auto max-w-md rounded-xl border border-line shadow-glow-violet lg:max-w-none"
        />
      </div>
    </section>
  );
}