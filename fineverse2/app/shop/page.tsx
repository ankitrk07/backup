import { Metadata } from "next";
import { getProducts } from "@/lib/data";
import { ShopCatalogView } from "@/components/shop/ShopCatalogView";
import { siteConfig } from "@/config/site";
import { ProductCategory, GarmentSize } from "@/types/product";

export const metadata: Metadata = {
  title: "Shop All Streetwear & Merch",
  description:
    "Explore the complete FINEVERSE streetwear catalog. Heavyweight 240 GSM boxy oversized tees, 420 GSM French terry hoodies, and tactical anime accessories.",
  openGraph: {
    title: `Shop All Merch | ${siteConfig.name}`,
    description: "240 GSM tees and 420 GSM loopback hoodies engineered in India.",
  },
};

interface ShopPageProps {
  searchParams: {
    category?: string;
    size?: string;
    price?: string;
    sort?: string;
    search?: string;
  };
}

export const revalidate = 60;

export default async function ShopPage({ searchParams }: ShopPageProps) {
  // Parse min and max price from price range parameter (e.g. "1000-2000")
  let minPrice: number | undefined;
  let maxPrice: number | undefined;

  if (searchParams.price) {
    const parts = searchParams.price.split("-");
    if (parts.length === 2) {
      minPrice = parseInt(parts[0], 10);
      maxPrice = parseInt(parts[1], 10);
    }
  }

  const products = await getProducts({
    category: searchParams.category as ProductCategory | undefined,
    size: searchParams.size as GarmentSize | undefined,
    sort: searchParams.sort as any,
    minPrice,
    maxPrice,
    search: searchParams.search,
  });

  const allProducts = await getProducts();

  return (
    <ShopCatalogView
      products={products}
      totalCount={allProducts.length}
    />
  );
}
