import type { UseFormRegisterReturn } from "react-hook-form";
import { RadioCard } from "@/components/ui/radio-card";
import { siteConfig } from "@/config/site";
import { formatINR } from "@/lib/format";
import { getShippingFee } from "@/lib/shipping";

interface ShippingMethodPickerProps {
  register: UseFormRegisterReturn;
  subtotal: number;
  error?: string;
}

export function ShippingMethodPicker({ register, subtotal, error }: ShippingMethodPickerProps) {
  return (
    <fieldset className="min-w-0">
      <legend className="font-display text-2xl uppercase tracking-wide text-fg">
        Delivery method
      </legend>
      <div className="mt-4 space-y-3">
        {siteConfig.shipping.methods.map((method) => {
          const fee = getShippingFee(subtotal, method.id);
          return (
            <RadioCard
              key={method.id}
              value={method.id}
              title={method.label}
              description={`${method.description} · ${method.minDays}–${method.maxDays} days`}
              trailing={fee === 0 ? <span className="text-success">Free</span> : formatINR(fee)}
              {...register}
            />
          );
        })}
      </div>
      {error ? (
        <p role="alert" className="mt-2 text-sm text-danger">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}