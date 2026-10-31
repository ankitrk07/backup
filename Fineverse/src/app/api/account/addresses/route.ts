import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { addressSchema } from "@/lib/validations/auth"

export async function GET() {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const addresses = await db.address.findMany({
    where: { userId: session.user.id },
    orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
  })
  return NextResponse.json(addresses)
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const json = await request.json().catch(() => null)
  const parsed = addressSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    )
  }

  if (parsed.data.isDefault) {
    await db.address.updateMany({
      where: { userId: session.user.id, type: parsed.data.type },
      data: { isDefault: false },
    })
  }

  const address = await db.address.create({
    data: { ...parsed.data, line2: parsed.data.line2 || null, userId: session.user.id },
  })
  return NextResponse.json(address, { status: 201 })
}
