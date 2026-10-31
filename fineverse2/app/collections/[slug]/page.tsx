import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCollections, getCollectionBySlug, getProducts, getCurrentDrop } from "@/lib/data";
import { ProductCard } from "@/components/product/ProductCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { DropCountdown } from "@/components/home/DropCountdown";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/Badge";
import { Flame } from "lucide-react";

interface CollectionPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const collections = await getCollections();
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const collection = await getCollectionBySlug(params.slug);

  if (!collection) {
    return { title: "Collection Not Found" };
  }

  return {
    title: `${collection.title} — ${collection.tagline}`,
    description: collection.description,
    openGraph: {
      title: `${collection.title} | ${siteConfig.name}`,
      description: collection.description,
    },
  };
}

export const revalidate = 60;

export default async function CollectionDetailPage({ params }: CollectionPageProps) {
  const collection = await getCollectionBySlug(params.slug);

  if (!collection) {
    notFound();
  }

  // Fetch products in this collection
  const allProducts = await getProducts();
  const collectionProducts = allProducts.filter(
    (p) => p.collectionSlug === collection.slug || (collection.slug.includes("drop") && p.dropId)
  );

  const currentDrop = await getCurrentDrop();
  const isDropCollection = Boolean(collection.dropNumber);

  const breadcrumbs = [
    { label: "SHOP", href: "/shop" },
    { label: "COLLECTIONS", href: "/collections" },
    { label: collection.title },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-8">
        <Breadcrumbs items={breadcrumbs} className="mb-4" />
        <div className="border-b border-white/10 pb-6 space-y-3">
          {isDropCollection && (
            <Badge variant="live" size="sm">
              <Flame className="w-3.5 h-3.5 mr-1" />
              CHAPTER 04 // NUMBERED CAPSULE
            </Badge>
          )}

          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
            {collection.title}
          </h1>

          <p className="text-xs sm:text-sm font-mono text-acid font-bold">
            {collection.tagline}
          </p>

          <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed max-w-2xl">
            {collection.description}
          </p>
        </div>
      </div>

      {/* If this is the active Drop collection, render the live dynamic countdown */}
      {isDropCollection && (
        <div className="mb-12">
          <DropCountdown drop={currentDrop} />
        </div>
      )}

      {/* Collection Products Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
            ALLOCATED PIECES IN THIS VAULT
          </span>
          <span className="font-mono text-xs text-acid font-bold">
            {collectionProducts.length} STYLES AVAILABLE
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collectionProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
