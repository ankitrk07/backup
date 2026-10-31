import type { Metadata } from "next"
import { getAdminCoupons } from "@/lib/services/admin-service"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CouponFormDialog, type CouponRow } from "@/components/admin/coupon-form-dialog"
import { DeleteCouponButton } from "@/components/admin/delete-coupon-button"
import { formatDate, formatPrice } from "@/lib/utils"

export const metadata: Metadata = { title: "Coupons" }

export default async function AdminCouponsPage() {
  const raw = await getAdminCoupons()
  // Prisma's Decimal/Date fields aren't plain objects — Client Components
  // (CouponFormDialog) can't receive them as props, so convert here first.
  const coupons: CouponRow[] = raw.map((c) => ({
    id: c.id,
    code: c.code,
    description: c.description,
    type: c.type,
    value: Number(c.value),
    minOrderValue: c.minOrderValue ? Number(c.minOrderValue) : null,
    maxDiscount: c.maxDiscount ? Number(c.maxDiscount) : null,
    usageLimit: c.usageLimit,
    usedCount: c.usedCount,
    isActive: c.isActive,
    startsAt: c.startsAt ? c.startsAt.toISOString() : null,
    expiresAt: c.expiresAt ? c.expiresAt.toISOString() : null,
  }))

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-foreground text-2xl font-semibold">Coupons</h1>
        <CouponFormDialog />
      </div>

      <Card className="mt-4">
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground border-border border-b text-left">
                <th className="pb-2 font-medium">Code</th>
                <th className="pb-2 font-medium">Discount</th>
                <th className="pb-2 font-medium">Min Order</th>
                <th className="pb-2 font-medium">Usage</th>
                <th className="pb-2 font-medium">Expires</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="border-border border-b last:border-0">
                  <td className="py-2.5">
                    <p className="text-foreground font-mono font-medium">{coupon.code}</p>
                    {coupon.description && <p className="text-muted-foreground text-xs">{coupon.description}</p>}
                  </td>
                  <td className="text-foreground py-2.5">
                    {coupon.type === "PERCENT" ? `${Number(coupon.value)}%` : formatPrice(Number(coupon.value))}
                    {coupon.maxDiscount && <span className="text-muted-foreground"> (max {formatPrice(Number(coupon.maxDiscount))})</span>}
                  </td>
                  <td className="text-muted-foreground py-2.5">
                    {coupon.minOrderValue ? formatPrice(Number(coupon.minOrderValue)) : "—"}
                  </td>
                  <td className="text-muted-foreground py-2.5">
                    {coupon.usedCount}
                    {coupon.usageLimit ? ` / ${coupon.usageLimit}` : ""}
                  </td>
                  <td className="text-muted-foreground py-2.5">{coupon.expiresAt ? formatDate(coupon.expiresAt) : "—"}</td>
                  <td className="py-2.5">
                    <Badge variant={coupon.isActive ? "secondary" : "outline"}>{coupon.isActive ? "Active" : "Inactive"}</Badge>
                  </td>
                  <td className="py-2.5 text-right">
                    <div className="flex justify-end gap-1">
                      <CouponFormDialog
                        coupon={coupon}
                        trigger={
                          <button className="border-border hover:bg-muted rounded-lg border px-2.5 py-1 text-xs font-medium">
                            Edit
                          </button>
                        }
                      />
                      <DeleteCouponButton couponId={coupon.id} code={coupon.code} />
                    </div>
                  </td>
                </tr>
              ))}
              {coupons.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-muted-foreground py-8 text-center">
                    No coupons yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
