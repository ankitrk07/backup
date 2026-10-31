import { redirect } from "next/navigation"
import type { Metadata } from "next"
import { auth } from "@/lib/auth"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminTopbar } from "@/components/admin/admin-topbar"

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Fineverse Admin" },
  robots: { index: false, follow: false },
}

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/login?redirect=/admin")
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}
