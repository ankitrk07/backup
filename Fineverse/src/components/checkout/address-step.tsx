"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { AddressFormDialog } from "@/components/account/address-form-dialog"
import { cn } from "@/lib/utils"
import type { Address } from "@/generated/prisma/client"

export function AddressStep({
  addresses,
  loading,
  shippingId,
  billingId,
  sameAsShipping,
  onSelectShipping,
  onSelectBilling,
  onToggleSameAsShipping,
  onAddressSaved,
  onContinue,
}: {
  addresses: Address[]
  loading: boolean
  shippingId: string | null
  billingId: string | null
  sameAsShipping: boolean
  onSelectShipping: (id: string) => void
  onSelectBilling: (id: string) => void
  onToggleSameAsShipping: (checked: boolean) => void
  onAddressSaved: () => void
  onContinue: () => void
}) {
  const shippingAddresses = addresses.filter((a) => a.type === "SHIPPING")
  const billingAddresses = addresses.filter((a) => a.type === "BILLING")

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-foreground text-lg font-semibold">Shipping Address</h2>
        <AddressFormDialog onSaved={onAddressSaved} />
      </div>

      {loading ? (
        <p className="text-muted-foreground mt-4 text-sm">Loading addresses...</p>
      ) : shippingAddresses.length === 0 ? (
        <p className="text-muted-foreground mt-4 text-sm">
          You don&rsquo;t have any saved addresses yet. Add one to continue.
        </p>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {shippingAddresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              selected={shippingId === address.id}
              onSelect={() => onSelectShipping(address.id)}
            />
          ))}
        </div>
      )}

      <label className="mt-6 flex cursor-pointer items-center gap-2 text-sm">
        <Checkbox checked={sameAsShipping} onCheckedChange={(checked) => onToggleSameAsShipping(!!checked)} />
        Billing address is the same as shipping
      </label>

      {!sameAsShipping && (
        <div className="mt-4">
          <h3 className="text-foreground text-sm font-semibold">Billing Address</h3>
          {billingAddresses.length === 0 ? (
            <p className="text-muted-foreground mt-2 text-sm">No billing addresses saved yet. Add one above.</p>
          ) : (
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {billingAddresses.map((address) => (
                <AddressCard
                  key={address.id}
                  address={address}
                  selected={billingId === address.id}
                  onSelect={() => onSelectBilling(address.id)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <Button
        size="lg"
        className="mt-6"
        disabled={!shippingId || (!sameAsShipping && !billingId)}
        onClick={onContinue}
      >
        Continue to Delivery
      </Button>
    </div>
  )
}

function AddressCard({
  address,
  selected,
  onSelect,
}: {
  address: Address
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "rounded-xl border p-4 text-left text-sm transition-colors",
        selected ? "border-primary ring-1 ring-primary" : "border-border hover:border-primary/50"
      )}
    >
      <p className="text-foreground font-medium">{address.fullName}</p>
      <p className="text-muted-foreground mt-1">
        {address.line1}
        {address.line2 && `, ${address.line2}`}
        <br />
        {address.city}, {address.state} {address.postalCode}
      </p>
      <p className="text-muted-foreground mt-1">{address.phone}</p>
    </button>
  )
}
