"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader2, EyeOff, Eye } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function DeactivateProductButton({ productId, isActive }: { productId: string; isActive: boolean }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  if (!isActive) {
    return (
      <span className="text-muted-foreground flex items-center gap-1.5 text-sm">
        <EyeOff className="size-3.5" /> This product is deactivated and hidden from the storefront.
      </span>
    )
  }

  const handleDeactivate = async () => {
    setLoading(true)
    const res = await fetch(`/api/admin/products/${productId}`, { method: "DELETE" })
    setLoading(false)
    if (!res.ok) {
      toast.error("Failed to deactivate product")
      return
    }
    toast.success("Product deactivated")
    router.refresh()
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Eye className="size-3.5" /> Deactivate
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deactivate this product?</AlertDialogTitle>
          <AlertDialogDescription>
            It will be hidden from the storefront and can no longer be purchased. Past orders that reference it are
            unaffected — products are deactivated rather than deleted to keep order history intact.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeactivate} disabled={loading}>
            {loading && <Loader2 className="size-4 animate-spin" />}
            Deactivate
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
