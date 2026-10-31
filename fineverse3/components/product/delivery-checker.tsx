"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, MapPin, Truck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { siteConfig, type ShippingMethodConfig } from "@/config/site";
import { formatINR } from "@/lib/format";
import { estimateDelivery, type DeliveryEstimate } from "@/lib/shipping";
import { pincodeSchema, type PincodeValues } from "@/lib/validators";

interface CheckResult {
  pincode: string;
  entries: Array<{ method: ShippingMethodConfig; estimate: DeliveryEstimate }>;
}

export function DeliveryChecker() {
  const [result, setResult] = useState<CheckResult | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PincodeValues>({
    resolver: zodResolver(pincodeSchema),
    defaultValues: { pincode: "" },
  });

  function onSubmit({ pincode }: PincodeValues) {
    setResult({
      pincode,
      entries: siteConfig.shipping.methods.map((method) => ({
        method,
        estimate: estimateDelivery(pincode, method.id),
      })),
    });
  }

  const unavailable = result?.entries.find((entry) => !entry.estimate.serviceable);
  const codAvailable = result?.entries.some(
    (entry) => entry.estimate.serviceable && entry.estimate.codAvailable,
  );

  return (
    <section aria-label="Check delivery" className="rounded-lg border border-line bg-surface p-4">
      <h2 className="flex items-center gap-2 font-display text-lg uppercase tracking-wide text-fg">
        <MapPin className="size-5 text-accent" aria-hidden="true" />
        Check delivery
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-3 flex items-start gap-2">
        <Field label="PIN code" hideLabel error={errors.pincode?.message} className="flex-1">
          {(control) => (
            <Input
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={6}
              placeholder="Enter 6-digit PIN code"
              {...control}
              {...register("pincode")}
            />
          )}
        </Field>
        <Button type="submit" variant="outline" className="shrink-0">
          Check
        </Button>
      </form>

      <div aria-live="polite" className="mt-3">
        {result && unavailable && !unavailable.estimate.serviceable ? (
          <p className="flex items-start gap-2 text-sm text-danger">
            <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {unavailable.estimate.message}
          </p>
        ) : null}

        {result && !unavailable ? (
          <ul className="space-y-2.5 text-sm">
            {result.entries.map(({ method, estimate }) =>
              estimate.serviceable ? (
                <li key={method.id} className="flex items-start gap-2 text-muted">
                  <Truck className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                  <span>
                    <strong className="text-fg">{method.label}:</strong> {estimate.label} (
                    {formatINR(method.fee)})
                  </span>
                </li>
              ) : null,
            )}
            <li className="text-subtle">
              {codAvailable
                ? `Cash on Delivery is available for ${result.pincode}.`
                : `Cash on Delivery is not available for ${result.pincode}.`}
            </li>
          </ul>
        ) : null}
      </div>
    </section>
  );
}