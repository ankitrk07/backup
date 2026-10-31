import { Layers, Shirt, Sparkles } from "lucide-react";
import { SlotImage } from "@/components/media/slot-image";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { siteConfig } from "@/config/site";
import { getBrandMark } from "@/lib/images";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description: `${siteConfig.name} is a cosmic-anime streetwear label from a YouTube creator community. ${siteConfig.tagline}.`,
  path: "/about",
});

const OFFERINGS = [
  {
    icon: Layers,
    title: "Numbered drops",
    text: "Limited, numbered releases that are available for a set window or until stock runs out.",
  },
  {
    icon: Shirt,
    title: "Everyday essentials",
    text: "Oversized tees, regular tees and hoodies in staple colours you can wear on repeat.",
  },
  {
    icon: Sparkles,
    title: "Accessories",
    text: "Caps, stickers and flight tags to carry the universe with you.",
  },
];

const DROP_STEPS = [
  "Join the whitelist to hear about a drop before it goes public.",
  "When the countdown ends, the drop goes live and pieces are available while stock lasts.",
  "Each drop has a fixed amount of stock, so once it is gone, it is gone.",
];

export default function AboutPage() {
  const { eyebrow, heading, paragraphs } = siteConfig.copy.brandStory;

  return (
    <div className="container pb-16 pt-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />

      <header className="mt-4 grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div>
          <p className="font-display text-eyebrow uppercase text-accent">{eyebrow}</p>
          <h1 className="mt-2 text-balance font-display text-display-lg uppercase text-fg">
            About {siteConfig.name}
          </h1>
          <p className="mt-3 font-display text-2xl uppercase text-muted">{heading}</p>
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 max-w-2xl text-lg leading-8 text-muted">
              {paragraph}
            </p>
          ))}
        </div>
        <SlotImage
          slot={getBrandMark()}
          sizes="(min-width: 1024px) 30vw, 70vw"
          className="mx-auto w-full max-w-xs rounded-2xl border border-line shadow-glow-violet"
        />
      </header>

      <section aria-labelledby="offer-heading" className="mt-16">
        <h2 id="offer-heading" className="font-display text-display-sm uppercase text-fg">
          What we make
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {OFFERINGS.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-xl border border-line bg-surface p-6">
              <span className="flex size-12 items-center justify-center rounded-lg bg-raised text-accent">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-xl uppercase tracking-wide text-fg">{title}</h3>
              <p className="mt-2 text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="drops-heading" className="mt-16">
        <h2 id="drops-heading" className="font-display text-display-sm uppercase text-fg">
          How a drop works
        </h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {DROP_STEPS.map((step, index) => (
            <li key={step} className="rounded-xl border border-line bg-surface p-6">
              <span className="font-display text-4xl text-accent">{index + 1}</span>
              <p className="mt-3 text-muted">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-12 flex flex-wrap gap-3">
        <ButtonLink href="/shop" size="lg">
          Shop the universe
        </ButtonLink>
        <ButtonLink href="/contact" variant="outline" size="lg">
          Get in touch
        </ButtonLink>
      </div>
    </div>
  );
}