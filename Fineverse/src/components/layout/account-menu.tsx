"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { LogOut, MapPin, Package, User, UserCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AccountMenu() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === "loading") {
    return <div className="size-9" aria-hidden />
  }

  if (!session?.user) {
    return (
      <Link
        href="/login"
        aria-label="Account"
        className="hover:bg-muted flex size-9 items-center justify-center rounded-full"
      >
        <User className="size-5" />
      </Link>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Account menu"
          className="hover:bg-muted flex size-9 items-center justify-center rounded-full"
        >
          <UserCircle className="size-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="truncate">
          {session.user.name ?? session.user.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/account">
            <UserCircle /> My Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account/orders">
            <Package /> My Orders
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account/addresses">
            <MapPin /> Addresses
          </Link>
        </DropdownMenuItem>
        {session.user.role === "ADMIN" && (
          <DropdownMenuItem asChild>
            <Link href="/admin">
              <UserCircle /> Admin Dashboard
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={async () => {
            await signOut({ redirect: false })
            router.push("/")
            router.refresh()
          }}
        >
          <LogOut /> Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
