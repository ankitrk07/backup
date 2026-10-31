import { JsonLd } from "@/components/seo/json-ld";
import { CollectionCard } from "@/components/shop/collection-card";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getCollections } from "@/lib/data";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Collections",
  description: "Explore FINEVERSE collections: numbered drops, the Planet X series and everyday essentials.",
  path: "/collections",
});

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="container pb-16 pt-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Collections", path: "/collections" },
        ])}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Collections" }]} />

      <header className="mt-4">
        <h1 className="font-display text-display-lg uppercase text-fg">Collections</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Numbered drops, signature series and everyday essentials.
        </p>
      </header>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((collection) => (
          <li key={collection.slug}>
            <CollectionCard collection={collection} />
          </li>
        ))}
      </ul>
    </div>
  );
}