import type { Metadata } from "next"
import { CategoryListingPage } from "@/components/product/category-listing-page"

export const metadata: Metadata = {
  title: "Fashion",
  description: "Shop t-shirts, shirts, jeans, jackets, dresses, and shoes.",
}

export const revalidate = 60

export default function FashionPage({ searchParams }: PageProps<"/fashion">) {
  return (
    <CategoryListingPage
      slug="fashion"
      title="Fashion"
      description="Everyday essentials to statement pieces."
      searchParams={searchParams}
    />
  )
}
