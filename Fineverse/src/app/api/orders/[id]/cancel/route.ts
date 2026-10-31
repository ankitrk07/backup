import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { cancelOrder } from "@/lib/services/order-service"

export async function POST(request: Request, { params }: RouteContext<"/api/orders/[id]/cancel">) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json().catch(() => ({}))
  const result = await cancelOrder(id, session.user.id, body?.reason)

  if (!result.success) {
    return NextResponse.json(result, { status: 400 })
  }
  return NextResponse.json(result)
}
