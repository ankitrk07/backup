import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { profileSchema } from "@/lib/validations/auth"

export async function PATCH(request: Request) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const json = await request.json().catch(() => null)
  const parsed = profileSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    )
  }

  const user = await db.user.update({
    where: { id: session.user.id },
    data: { name: parsed.data.name, phone: parsed.data.phone || null },
  })

  return NextResponse.json({ name: user.name, phone: user.phone })
}
