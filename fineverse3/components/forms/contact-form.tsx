"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/config/site";
import { sendContactMessage } from "@/lib/api/contact";
import { CONTACT_TOPICS, contactSchema, type ContactValues } from "@/lib/validators";
import { toast } from "@/store/toast-store";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    // `topic` has no default on purpose: the placeholder option is shown until the visitor chooses.
    defaultValues: { name: "", email: "", phone: "", message: "", website: "" },
  });

  async function onSubmit(values: ContactValues) {
    try {
      await sendContactMessage(values);
      reset();
      setSent(true);
    } catch {
      toast.error("Could not send your message", "Please check your connection and try again.");
    }
  }

  if (sent) {
    return (
      <div role="status" className="rounded-xl border border-line bg-surface p-8 text-center">
        <CircleCheck className="mx-auto size-12 text-success" aria-hidden="true" />
        <h2 className="mt-4 font-display text-2xl uppercase tracking-wide text-fg">Message sent</h2>
        <p className="mt-2 text-muted">
          Thanks for reaching out. We reply {siteConfig.policies.supportResponseTime}.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setSent(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="relative rounded-xl border border-line bg-surface p-5 sm:p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" required error={errors.name?.message}>
          {(control) => <Input autoComplete="name" {...control} {...register("name")} />}
        </Field>
        <Field label="Email" required error={errors.email?.message}>
          {(control) => (
            <Input
              type="email"
              inputMode="email"
              autoComplete="email"
              {...control}
              {...register("email")}
            />
          )}
        </Field>
        <Field label="Mobile number (optional)" error={errors.phone?.message}>
          {(control) => (
            <Input
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              maxLength={10}
              {...control}
              {...register("phone")}
            />
          )}
        </Field>
        <Field label="Topic" required error={errors.topic?.message}>
          {(control) => (
            <Select {...control} {...register("topic")}>
              <option value="">Choose a topic</option>
              {CONTACT_TOPICS.map((topic) => (
                <option key={topic.value} value={topic.value}>
                  {topic.label}
                </option>
              ))}
            </Select>
          )}
        </Field>
        <Field
          label="Message"
          required
          error={errors.message?.message}
          hint="For order questions, include your order number."
          className="sm:col-span-2"
        >
          {(control) => <Textarea {...control} {...register("message")} />}
        </Field>
      </div>

      {/* Honeypot: invisible to people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-0 overflow-hidden">
        <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <Button type="submit" size="lg" className="mt-5" loading={isSubmitting}>
        Send message
      </Button>
    </form>
  );
}