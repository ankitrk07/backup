import type { Metadata } from "next"
import { CategoryListingPage } from "@/components/product/category-listing-page"

export const metadata: Metadata = {
  title: "Toys",
  description: "Shop remote control vehicles, building blocks, action figures, and more.",
}

export const revalidate = 60

export default function ToysPage({ searchParams }: PageProps<"/toys">) {
  return (
    <CategoryListingPage
      slug="toys"
      title="Toys"
      description="Play, learn, and grow."
      searchParams={searchParams}
    />
  )
}
