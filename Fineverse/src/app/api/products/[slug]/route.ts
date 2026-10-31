import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { productDetailInclude, toProductDetail } from "@/lib/services/product-mapper"

export async function GET(_request: Request, { params }: RouteContext<"/api/products/[slug]">) {
  const { slug } = await params

  const product = await db.product.findUnique({
    where: { slug, isActive: true },
    include: productDetailInclude,
  })

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  return NextResponse.json(toProductDetail(product))
}
