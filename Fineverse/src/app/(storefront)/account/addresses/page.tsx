"use client"

import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"
import { MapPin, Pencil, Star, Trash2 } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"
import { AddressFormDialog } from "@/components/account/address-form-dialog"
import type { Address } from "@/generated/prisma/client"

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[] | null>(null)

  const load = useCallback(() => {
    fetch("/api/account/addresses")
      .then((res) => res.json())
      .then(setAddresses)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/account/addresses/${id}`, { method: "DELETE" })
    if (!res.ok) {
      toast.error("Failed to delete address")
      return
    }
    toast.success("Address removed")
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-foreground text-lg font-semibold">Saved Addresses</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage shipping and billing addresses for faster checkout.
          </p>
        </div>
        <AddressFormDialog onSaved={load} />
      </div>

      {addresses === null ? (
        <p className="text-muted-foreground mt-6 text-sm">Loading...</p>
      ) : addresses.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-12 text-center">
          <MapPin className="text-muted-foreground size-8" />
          <p className="text-muted-foreground text-sm">You haven&rsquo;t saved any addresses yet.</p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {addresses.map((address) => (
            <div key={address.id} className="border-border relative rounded-xl border p-4">
              <div className="mb-2 flex items-center gap-2">
                <Badge variant="secondary">{address.type === "SHIPPING" ? "Shipping" : "Billing"}</Badge>
                {address.isDefault && (
                  <Badge className="gap-1">
                    <Star className="size-3" /> Default
                  </Badge>
                )}
              </div>
              <p className="text-foreground text-sm font-medium">{address.fullName}</p>
              <p className="text-muted-foreground mt-0.5 text-sm">
                {address.line1}
                {address.line2 && `, ${address.line2}`}
                <br />
                {address.city}, {address.state} {address.postalCode}
                <br />
                {address.country}
              </p>
              <p className="text-muted-foreground mt-1 text-sm">{address.phone}</p>

              <div className="mt-3 flex items-center gap-3">
                <AddressFormDialog
                  address={address}
                  onSaved={load}
                  trigger={
                    <button className="text-brand flex items-center gap-1 text-xs font-medium hover:underline">
                      <Pencil className="size-3" /> Edit
                    </button>
                  }
                />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="text-muted-foreground hover:text-sale flex items-center gap-1 text-xs font-medium">
                      <Trash2 className="size-3" /> Remove
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Remove this address?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action can&rsquo;t be undone. You&rsquo;ll need to re-enter these details next time.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(address.id)}>Remove</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
