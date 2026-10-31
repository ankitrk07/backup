import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { deleteAdminReview } from "@/lib/services/admin-service"

export async function DELETE(_request: Request, { params }: RouteContext<"/api/admin/reviews/[id]">) {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const result = await deleteAdminReview(id)
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }
  return NextResponse.json({ success: true })
}
