import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SlotImage } from "@/components/media/slot-image";
import type { Collection } from "@/types/collection";

export function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="group block overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-accent"
    >
      <SlotImage
        slot={collection.banner}
        decorative
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="transition-transform duration-500 ease-out-expo group-hover:scale-[1.03] motion-reduce:transform-none"
      />
      <div className="flex items-start justify-between gap-3 p-4">
        <div>
          <p className="font-display text-eyebrow uppercase text-accent">{collection.tagline}</p>
          <h2 className="mt-1 font-display text-2xl uppercase text-fg">{collection.name}</h2>
          <p className="mt-1 line-clamp-2 text-sm text-muted">{collection.description}</p>
        </div>
        <ArrowUpRight className="mt-1 size-6 shrink-0 text-accent" aria-hidden="true" />
      </div>
    </Link>
  );
}