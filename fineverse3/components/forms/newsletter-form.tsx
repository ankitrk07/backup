"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/config/site";
import { subscribeToNewsletter } from "@/lib/api/newsletter";
import { newsletterSchema, type NewsletterValues } from "@/lib/validators";
import { toast } from "@/store/toast-store";

export function NewsletterForm() {
  const [subscribed, setSubscribed] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "", website: "" },
  });

  async function onSubmit(values: NewsletterValues) {
    try {
      await subscribeToNewsletter(values.email);
      reset();
      setSubscribed(true);
    } catch {
      toast.error("Could not join the whitelist", "Please check your connection and try again.");
    }
  }

  return (
    <div>
      {/* Persistent live region so screen readers announce the success message. */}
      <div aria-live="polite">
        {subscribed ? (
          <p className="flex items-center gap-2 text-base font-semibold text-success">
            <CircleCheck className="size-5 shrink-0" aria-hidden="true" />
            {siteConfig.copy.newsletter.success}
          </p>
        ) : null}
      </div>

      {!subscribed ? (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
            <Field label="Email address" hideLabel error={errors.email?.message} className="flex-1">
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
            <Button type="submit" size="md" loading={isSubmitting} className="sm:shrink-0">
              {siteConfig.copy.newsletter.cta}
            </Button>
          </div>

          {/* Honeypot: invisible to people, tempting to bots. */}
          <div aria-hidden="true" className="absolute -left-[9999px] size-0 overflow-hidden">
            <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
          </div>
        </form>
      ) : null}
    </div>
  );
}