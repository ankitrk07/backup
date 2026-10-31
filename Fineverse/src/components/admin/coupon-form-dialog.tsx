"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Loader2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { couponSchema, type CouponInput } from "@/lib/validations/admin"
import type { CouponType } from "@/generated/prisma/client"

// Plain-object shape (Decimal/Date fields pre-converted to number/string) —
// Server Components can't pass Prisma's Decimal instances as props to a
// Client Component, so the page maps Coupon -> CouponRow before rendering this.
export type CouponRow = {
  id: string
  code: string
  description: string | null
  type: CouponType
  value: number
  minOrderValue: number | null
  maxDiscount: number | null
  usageLimit: number | null
  usedCount: number
  isActive: boolean
  startsAt: string | null
  expiresAt: string | null
}

export function CouponFormDialog({ coupon, trigger }: { coupon?: CouponRow; trigger?: React.ReactNode }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const toDefaults = (): CouponInput => ({
    code: coupon?.code ?? "",
    description: coupon?.description ?? "",
    type: coupon?.type ?? "PERCENT",
    value: coupon?.value ?? 10,
    minOrderValue: coupon?.minOrderValue ?? null,
    maxDiscount: coupon?.maxDiscount ?? null,
    usageLimit: coupon?.usageLimit ?? null,
    isActive: coupon?.isActive ?? true,
    startsAt: coupon?.startsAt ? coupon.startsAt.slice(0, 10) : null,
    expiresAt: coupon?.expiresAt ? coupon.expiresAt.slice(0, 10) : null,
  })

  const form = useForm<CouponInput>({ resolver: zodResolver(couponSchema), defaultValues: toDefaults() })

  useEffect(() => {
    if (open) form.reset(toDefaults())
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reset only when the dialog opens for a specific coupon
  }, [open])

  const onSubmit = async (values: CouponInput) => {
    setLoading(true)
    const url = coupon ? `/api/admin/coupons/${coupon.id}` : "/api/admin/coupons"
    const res = await fetch(url, {
      method: coupon ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
    setLoading(false)

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      toast.error(data.error ?? "Failed to save coupon")
      return
    }
    toast.success(coupon ? "Coupon updated" : "Coupon created")
    setOpen(false)
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button size="sm" className="gap-1.5">
            <Plus className="size-3.5" /> Add Coupon
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{coupon ? "Edit Coupon" : "Add Coupon"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input {...field} onChange={(e) => field.onChange(e.target.value.toUpperCase())} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="PERCENT">Percent</SelectItem>
                        <SelectItem value="FIXED">Fixed Amount</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        name={field.name}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="minOrderValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Min Order (₹)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        name={field.name}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value === "" ? null : Number(e.target.value))}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxDiscount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Discount (₹)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        name={field.name}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value === "" ? null : Number(e.target.value))}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="usageLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usage Limit</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      name={field.name}
                      value={field.value ?? ""}
                      placeholder="Unlimited"
                      onChange={(e) => field.onChange(e.target.value === "" ? null : Number(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="startsAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Starts</FormLabel>
                    <FormControl>
                      <Input type="date" name={field.name} value={field.value ?? ""} onChange={(e) => field.onChange(e.target.value || null)} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expiresAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expires</FormLabel>
                    <FormControl>
                      <Input type="date" name={field.name} value={field.value ?? ""} onChange={(e) => field.onChange(e.target.value || null)} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel>Active</FormLabel>
                </FormItem>
              )}
            />

            <DialogFooter className="mt-2">
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="size-4 animate-spin" />}
                {coupon ? "Save Changes" : "Add Coupon"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
