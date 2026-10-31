import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SlotImage } from "@/components/media/slot-image";
import { ProductGrid } from "@/components/product/product-grid";
import { JsonLd } from "@/components/seo/json-ld";
import { CollectionCard } from "@/components/shop/collection-card";
import { CollectionDropPanel } from "@/components/shop/collection-drop-panel";
import { ButtonLink } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  getCollection,
  getCollectionSlugs,
  getCollections,
  getDrop,
  getProducts,
} from "@/lib/data";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

// Stock and drop state change, so refresh the server-rendered page every minute.
export const revalidate = 60;

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getCollectionSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getCollection(slug);
  if (!collection) return { title: "Collection not found", robots: { index: false } };

  return buildMetadata({
    title: collection.name,
    description: collection.description,
    path: `/collections/${collection.slug}`,
  });
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = await getCollection(slug);
  if (!collection) notFound();

  const serverNow = Date.now();
  const [products, drop, allCollections] = await Promise.all([
    getProducts({ collection: collection.slug }),
    collection.dropId ? getDrop(collection.dropId) : Promise.resolve(null),
    getCollections(),
  ]);
  const others = allCollections.filter((item) => item.slug !== collection.slug);

  return (
    <div className="container pb-16 pt-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Collections", path: "/collections" },
          { name: collection.name, path: `/collections/${collection.slug}` },
        ])}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Collections", href: "/collections" },
          { label: collection.name },
        ]}
      />

      <SlotImage
        slot={collection.banner}
        priority
        decorative
        sizes="(min-width: 1360px) 1296px, 100vw"
        className="mt-4 rounded-xl border border-line"
      />

      <header className="mt-6">
        <p className="font-display text-eyebrow uppercase text-accent">{collection.tagline}</p>
        <h1 className="mt-1 font-display text-display-lg uppercase text-fg">{collection.name}</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">{collection.description}</p>
      </header>

      {drop ? (
        <div className="mt-6">
          <CollectionDropPanel drop={drop} serverNow={serverNow} />
        </div>
      ) : null}

      <section aria-label={`${collection.name} products`} className="mt-10">
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="rounded-xl border border-dashed border-line px-6 py-16 text-center">
            <h2 className="font-display text-2xl uppercase text-fg">Nothing here yet</h2>
            <p className="mt-2 text-muted">Products for this collection have not been added.</p>
            <ButtonLink href="/shop" variant="outline" className="mt-6">
              Browse the shop
            </ButtonLink>
          </div>
        )}
      </section>

      {others.length > 0 ? (
        <section aria-label="More collections" className="mt-16">
          <SectionHeading title="More collections" as="h2" />
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.slice(0, 3).map((item) => (
              <li key={item.slug}>
                <CollectionCard collection={item} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}