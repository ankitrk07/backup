"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { siteConfig } from "@/config/site";
import { placeOrder } from "@/lib/api/orders";
import { getCartCompareAtSubtotal, getCartSubtotal } from "@/lib/cart";
import { formatINR } from "@/lib/format";
import { INDIAN_STATES } from "@/lib/india";
import { saveLastOrder } from "@/lib/order-session";
import { calculateOrderTotals, getEnabledPaymentMethods } from "@/lib/shipping";
import { checkoutSchema, type CheckoutValues } from "@/lib/validators";
import { toast } from "@/store/toast-store";
import type { CartLine } from "@/types/cart";
import { CheckoutOrderSummary } from "./order-summary";
import { PaymentMethodPicker } from "./payment-method-picker";
import { ShippingMethodPicker } from "./shipping-method-picker";

const LEGEND = "font-display text-2xl uppercase tracking-wide text-fg";

interface CheckoutFormProps {
  lines: CartLine[];
  /** called after the order is saved, before navigating to the confirmation page */
  onPlaced: () => void;
}

export function CheckoutForm({ lines, onPlaced }: CheckoutFormProps) {
  const router = useRouter();
  const subtotal = getCartSubtotal(lines);
  const compareAtSubtotal = getCartCompareAtSubtotal(lines);
  const defaultPayment = getEnabledPaymentMethods()[0]?.id ?? "upi";

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "",
      phone: "",
      fullName: "",
      addressLine1: "",
      addressLine2: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
      shippingMethod: "standard",
      paymentMethod: defaultPayment,
      acceptTerms: false,
    },
  });

  const shippingMethod = useWatch({ control, name: "shippingMethod" });
  const paymentMethod = useWatch({ control, name: "paymentMethod" });
  const totals = calculateOrderTotals({ subtotal, compareAtSubtotal, shippingMethod, paymentMethod });

  async function onSubmit(values: CheckoutValues) {
    try {
      const order = await placeOrder(values, lines);
      saveLastOrder(order);
      onPlaced();
      router.push("/order/confirmation");
    } catch {
      toast.error("Could not place your order", "Please check your connection and try again.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid gap-8 lg:grid-cols-[1fr_26rem] lg:items-start lg:gap-12"
    >
      <div className="space-y-10">
        <fieldset className="min-w-0">
          <legend className={LEGEND}>Contact</legend>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Email" required error={errors.email?.message}>
              {(control) => (
                <Input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  {...control}
                  {...register("email")}
                />
              )}
            </Field>
            <Field
              label="Mobile number"
              required
              error={errors.phone?.message}
              hint="10-digit Indian mobile number"
            >
              {(control) => (
                <Input
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  maxLength={10}
                  placeholder="9876543210"
                  {...control}
                  {...register("phone")}
                />
              )}
            </Field>
          </div>
        </fieldset>

        <fieldset className="min-w-0">
          <legend className={LEGEND}>Shipping address</legend>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field
              label="Full name"
              required
              error={errors.fullName?.message}
              className="sm:col-span-2"
            >
              {(control) => (
                <Input autoComplete="name" {...control} {...register("fullName")} />
              )}
            </Field>
            <Field
              label="House / flat / street"
              required
              error={errors.addressLine1?.message}
              className="sm:col-span-2"
            >
              {(control) => (
                <Input autoComplete="address-line1" {...control} {...register("addressLine1")} />
              )}
            </Field>
            <Field
              label="Area / locality (optional)"
              error={errors.addressLine2?.message}
              className="sm:col-span-2"
            >
              {(control) => (
                <Input autoComplete="address-line2" {...control} {...register("addressLine2")} />
              )}
            </Field>
            <Field
              label="Landmark (optional)"
              error={errors.landmark?.message}
              className="sm:col-span-2"
            >
              {(control) => <Input {...control} {...register("landmark")} />}
            </Field>
            <Field label="City" required error={errors.city?.message}>
              {(control) => (
                <Input autoComplete="address-level2" {...control} {...register("city")} />
              )}
            </Field>
            <Field label="State" required error={errors.state?.message}>
              {(control) => (
                <Select autoComplete="address-level1" {...control} {...register("state")}>
                  <option value="">Select state</option>
                  {INDIAN_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </Select>
              )}
            </Field>
            <Field label="PIN code" required error={errors.pincode?.message}>
              {(control) => (
                <Input
                  inputMode="numeric"
                  autoComplete="postal-code"
                  maxLength={6}
                  placeholder="834001"
                  {...control}
                  {...register("pincode")}
                />
              )}
            </Field>
          </div>
        </fieldset>

        <ShippingMethodPicker
          register={register("shippingMethod")}
          subtotal={subtotal}
          error={errors.shippingMethod?.message}
        />

        <PaymentMethodPicker
          register={register("paymentMethod")}
          error={errors.paymentMethod?.message}
        />
      </div>

      <CheckoutOrderSummary lines={lines} totals={totals}>
        <div>
          <Checkbox
            aria-invalid={errors.acceptTerms ? true : undefined}
            label={
              <>
                I agree to the{" "}
                <Link
                  href="/policies/terms"
                  target="_blank"
                  className="text-accent underline underline-offset-4"
                >
                  Terms
                  <span className="sr-only"> (opens in a new tab)</span>
                </Link>{" "}
                and{" "}
                <Link
                  href="/policies/privacy"
                  target="_blank"
                  className="text-accent underline underline-offset-4"
                >
                  Privacy policy
                  <span className="sr-only"> (opens in a new tab)</span>
                </Link>
              </>
            }
            {...register("acceptTerms")}
          />
          {errors.acceptTerms ? (
            <p role="alert" className="mt-1 text-sm text-danger">
              {errors.acceptTerms.message}
            </p>
          ) : null}
        </div>

        {siteConfig.dataMode === "mock" ? (
          <p className="rounded-lg border border-warning/40 bg-warning/10 p-3 text-sm text-warning">
            Demo checkout: no payment is taken and no real order is created.
          </p>
        ) : null}

        <Button type="submit" size="lg" fullWidth loading={isSubmitting}>
          Place order · {formatINR(totals.total)}
        </Button>

        <p className="text-center text-sm">
          <Link href="/cart" className="text-muted underline underline-offset-4 hover:text-accent">
            Back to cart
          </Link>
        </p>
      </CheckoutOrderSummary>
    </form>
  );
}