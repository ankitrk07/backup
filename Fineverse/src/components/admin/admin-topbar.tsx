"use client"

import { useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { LogOut } from "lucide-react"
import { AdminMobileNav } from "@/components/admin/admin-mobile-nav"
import { Button } from "@/components/ui/button"

export function AdminTopbar() {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <header className="border-border bg-background sticky top-0 z-30 flex h-16 items-center justify-between border-b px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <AdminMobileNav />
        <span className="text-foreground text-sm font-medium lg:hidden">Fineverse Admin</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-muted-foreground hidden text-sm sm:inline">
          {session?.user?.name ?? session?.user?.email}
        </span>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={async () => {
            await signOut({ redirect: false })
            router.push("/")
            router.refresh()
          }}
        >
          <LogOut className="size-3.5" /> Log Out
        </Button>
      </div>
    </header>
  )
}
