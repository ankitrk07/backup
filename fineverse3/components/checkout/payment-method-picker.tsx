import type { UseFormRegisterReturn } from "react-hook-form";
import { RadioCard } from "@/components/ui/radio-card";
import { formatINR } from "@/lib/format";
import { getEnabledPaymentMethods } from "@/lib/shipping";

interface PaymentMethodPickerProps {
  register: UseFormRegisterReturn;
  error?: string;
}

/** Methods come from config, so what the shopper sees always matches what the site promises. */
export function PaymentMethodPicker({ register, error }: PaymentMethodPickerProps) {
  return (
    <fieldset className="min-w-0">
      <legend className="font-display text-2xl uppercase tracking-wide text-fg">Payment</legend>
      <div className="mt-4 space-y-3">
        {getEnabledPaymentMethods().map((method) => (
          <RadioCard
            key={method.id}
            value={method.id}
            title={method.label}
            description={method.description}
            trailing={method.fee > 0 ? `+${formatINR(method.fee)}` : undefined}
            {...register}
          />
        ))}
      </div>
      {error ? (
        <p role="alert" className="mt-2 text-sm text-danger">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}