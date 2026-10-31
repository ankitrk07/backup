import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { productCardInclude, toProductCardData } from "@/lib/services/product-mapper"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get("q")?.trim()

  if (!q || q.length < 2) {
    return NextResponse.json({ products: [], categories: [] })
  }

  const [products, categories] = await Promise.all([
    db.product.findMany({
      where: {
        isActive: true,
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
          { brand: { name: { contains: q, mode: "insensitive" } } },
        ],
      },
      include: productCardInclude,
      take: 5,
    }),
    db.category.findMany({
      where: { name: { contains: q, mode: "insensitive" } },
      take: 4,
      select: { name: true, slug: true },
    }),
  ])

  return NextResponse.json({
    products: products.map(toProductCardData),
    categories,
  })
}
