import { Star } from "lucide-react";

interface MarqueeProps {
  items: readonly string[];
}

/** Decorative slogan ticker. Pure CSS animation, paused on hover, off under reduced motion. */
export function Marquee({ items }: MarqueeProps) {
  if (items.length === 0) return null;

  // Each group must be wider than the screen so the -50% loop never shows a gap.
  const group = [...items, ...items, ...items];

  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-line bg-accent py-3 text-accent-fg">
      <div className="marquee-track flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {group.map((item, index) => (
              <li
                key={`${copy}-${index}`}
                className="flex items-center whitespace-nowrap font-display text-2xl uppercase tracking-wider sm:text-3xl"
              >
                <span className="px-6">{item}</span>
                <Star className="size-5 fill-current" aria-hidden="true" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}