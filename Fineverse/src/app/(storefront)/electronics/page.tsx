import type { Metadata } from "next"
import { CategoryListingPage } from "@/components/product/category-listing-page"

export const metadata: Metadata = {
  title: "Electronics",
  description: "Shop smartphones, laptops, headphones, smart watches, speakers, and accessories.",
}

export const revalidate = 60

export default function ElectronicsPage({ searchParams }: PageProps<"/electronics">) {
  return (
    <CategoryListingPage
      slug="electronics"
      title="Electronics"
      description="Phones, laptops, audio, wearables & more."
      searchParams={searchParams}
    />
  )
}
