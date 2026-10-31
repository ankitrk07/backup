"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { trackOrderAction } from "@/app/actions/orders";
import { TrackingTimeline } from "@/components/track/tracking-timeline";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { trackOrderSchema, type TrackOrderValues } from "@/lib/validators";
import type { TrackingResult } from "@/types/order";

type TrackState =
  | { status: "idle" }
  | { status: "success"; result: TrackingResult }
  | { status: "error"; message: string };

interface TrackOrderFormProps {
  defaultOrderId?: string;
}

export function TrackOrderForm({ defaultOrderId = "" }: TrackOrderFormProps) {
  const [state, setState] = useState<TrackState>({ status: "idle" });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TrackOrderValues>({
    resolver: zodResolver(trackOrderSchema),
    defaultValues: { orderId: defaultOrderId, contact: "" },
  });

  async function onSubmit(values: TrackOrderValues) {
    try {
      const response = await trackOrderAction(values);
      setState(
        response.ok
          ? { status: "success", result: response.result }
          : { status: "error", message: response.error },
      );
    } catch {
      setState({ status: "error", message: "Something went wrong. Please try again." });
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="rounded-xl border border-line bg-surface p-5 sm:p-6"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Order number" required error={errors.orderId?.message}>
            {(control) => (
              <Input
                autoComplete="off"
                autoCapitalize="characters"
                placeholder="FV-XXXXXX"
                {...control}
                {...register("orderId")}
              />
            )}
          </Field>
          <Field
            label="Email or mobile number"
            required
            error={errors.contact?.message}
            hint="The one used when ordering"
          >
            {(control) => (
              <Input autoComplete="email" {...control} {...register("contact")} />
            )}
          </Field>
        </div>
        <Button type="submit" size="lg" className="mt-5" loading={isSubmitting}>
          Track order
        </Button>
      </form>

      <div aria-live="polite" className="mt-6">
        {state.status === "error" ? (
          <p className="flex items-start gap-2 rounded-lg border border-danger/40 bg-danger/10 p-4 text-danger">
            <CircleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
            {state.message}
          </p>
        ) : null}
        {state.status === "success" ? <TrackingTimeline result={state.result} /> : null}
      </div>
    </div>
  );
}