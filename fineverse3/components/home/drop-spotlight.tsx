import { SlotImage } from "@/components/media/slot-image";
import { ProductGrid } from "@/components/product/product-grid";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatDate } from "@/lib/format";
import type { Drop } from "@/types/drop";
import type { Product } from "@/types/product";
import { DropStatusBadge } from "./drop-status-badge";
import { DropStockMeter } from "./drop-stock-meter";

interface DropSpotlightProps {
  drop: Drop;
  products: Product[];
  serverNow: number;
}

export function DropSpotlight({ drop, products, serverNow }: DropSpotlightProps) {
  const collectionHref = drop.collectionSlug ? `/collections/${drop.collectionSlug}` : "/shop";

  return (
    <section aria-label="Flagship drop" className="container py-16">
      <Reveal>
        <SectionHeading eyebrow="Flagship drop" title={`${drop.tagline}: ${drop.name}`} />
      </Reveal>

      <Reveal className="mt-8">
        <div className="grid overflow-hidden rounded-xl border border-line bg-surface lg:grid-cols-[1.4fr_1fr]">
          <div className="relative aspect-[2/1] lg:aspect-auto">
            <SlotImage slot={drop.banner} fill sizes="(min-width: 1024px) 58vw, 100vw" />
          </div>

          <div className="flex flex-col justify-center gap-5 p-6 lg:p-10">
            <div>
              <DropStatusBadge drop={drop} serverNow={serverNow} />
            </div>
            <p className="text-lg text-muted">{drop.description}</p>
            <DropStockMeter drop={drop} serverNow={serverNow} />
            <p className="text-sm text-subtle">
              Window: {formatDate(drop.startsAt)} to {formatDate(drop.endsAt)}
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={collectionHref}>Shop the drop</ButtonLink>
            </div>
          </div>
        </div>
      </Reveal>

      {products.length > 0 ? (
        <Reveal className="mt-10">
          <ProductGrid products={products.slice(0, 4)} />
        </Reveal>
      ) : null}
    </section>
  );
}