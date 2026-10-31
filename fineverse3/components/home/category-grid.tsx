import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SlotImage } from "@/components/media/slot-image";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Category } from "@/types/collection";

export function CategoryGrid({ categories }: { categories: Category[] }) {
  if (categories.length === 0) return null;

  return (
    <section aria-label="Shop by category" className="container py-16">
      <Reveal>
        <SectionHeading eyebrow="Shop by category" title="Find your fit" />
      </Reveal>

      <Reveal className="mt-8">
        <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={category.href}
                className="group relative block overflow-hidden rounded-xl border border-line transition-colors hover:border-accent"
              >
                <SlotImage
                  slot={category.image}
                  decorative
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="transition-transform duration-500 ease-out-expo group-hover:scale-105 motion-reduce:transform-none"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-bg via-bg/80 to-transparent p-3 pt-12 sm:p-4 sm:pt-16">
                  <div>
                    <h3 className="font-display text-xl uppercase leading-tight text-fg sm:text-2xl">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted">{category.tagline}</p>
                  </div>
                  <ArrowUpRight
                    className="size-6 shrink-0 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}