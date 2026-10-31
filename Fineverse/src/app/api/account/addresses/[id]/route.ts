import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { addressSchema } from "@/lib/validations/auth"

async function assertOwnership(addressId: string, userId: string) {
  const address = await db.address.findUnique({ where: { id: addressId } })
  return address && address.userId === userId ? address : null
}

export async function PATCH(
  request: Request,
  { params }: RouteContext<"/api/account/addresses/[id]">
) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const existing = await assertOwnership(id, session.user.id)
  if (!existing) {
    return NextResponse.json({ error: "Address not found" }, { status: 404 })
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
      where: { userId: session.user.id, type: parsed.data.type, id: { not: id } },
      data: { isDefault: false },
    })
  }

  const address = await db.address.update({
    where: { id },
    data: { ...parsed.data, line2: parsed.data.line2 || null },
  })
  return NextResponse.json(address)
}

export async function DELETE(
  _request: Request,
  { params }: RouteContext<"/api/account/addresses/[id]">
) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const existing = await assertOwnership(id, session.user.id)
  if (!existing) {
    return NextResponse.json({ error: "Address not found" }, { status: 404 })
  }

  await db.address.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
