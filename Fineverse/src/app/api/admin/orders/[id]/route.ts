import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { updateOrderStatus } from "@/lib/services/admin-service"
import { orderStatusUpdateSchema } from "@/lib/validations/admin"

export async function PATCH(request: Request, { params }: RouteContext<"/api/admin/orders/[id]">) {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json().catch(() => null)
  const parsed = orderStatusUpdateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 })
  }

  const result = await updateOrderStatus(id, parsed.data.status, parsed.data.note)
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }
  return NextResponse.json({ success: true })
}
