"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tabs } from "@/components/ui/tabs";
import { submitAuthForm } from "@/lib/api/auth";
import {
  signInSchema,
  signUpSchema,
  type SignInValues,
  type SignUpValues,
} from "@/lib/validators";

function PreviewNotice({ message }: { message: string | null }) {
  return (
    <div aria-live="polite">
      {message ? (
        <p className="mt-4 flex items-start gap-2 rounded-lg border border-line bg-raised p-3 text-sm text-muted">
          <Info className="mt-0.5 size-4 shrink-0 text-violet-soft" aria-hidden="true" />
          {message}
        </p>
      ) : null}
    </div>
  );
}

function SignInForm() {
  const [notice, setNotice] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit() {
    const response = await submitAuthForm();
    setNotice(response.message);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <Field label="Email" required error={errors.email?.message}>
        {(control) => (
          <Input type="email" autoComplete="email" {...control} {...register("email")} />
        )}
      </Field>
      <Field label="Password" required error={errors.password?.message}>
        {(control) => (
          <Input
            type="password"
            autoComplete="current-password"
            {...control}
            {...register("password")}
          />
        )}
      </Field>
      <Button type="submit" fullWidth size="lg" loading={isSubmitting}>
        Sign in
      </Button>
      <PreviewNotice message={notice} />
    </form>
  );
}

function SignUpForm() {
  const [notice, setNotice] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  async function onSubmit() {
    const response = await submitAuthForm();
    setNotice(response.message);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <Field label="Full name" required error={errors.name?.message}>
        {(control) => <Input autoComplete="name" {...control} {...register("name")} />}
      </Field>
      <Field label="Email" required error={errors.email?.message}>
        {(control) => (
          <Input type="email" autoComplete="email" {...control} {...register("email")} />
        )}
      </Field>
      <Field
        label="Password"
        required
        error={errors.password?.message}
        hint="At least 8 characters"
      >
        {(control) => (
          <Input
            type="password"
            autoComplete="new-password"
            {...control}
            {...register("password")}
          />
        )}
      </Field>
      <Field label="Confirm password" required error={errors.confirmPassword?.message}>
        {(control) => (
          <Input
            type="password"
            autoComplete="new-password"
            {...control}
            {...register("confirmPassword")}
          />
        )}
      </Field>
      <Button type="submit" fullWidth size="lg" loading={isSubmitting}>
        Create account
      </Button>
      <PreviewNotice message={notice} />
    </form>
  );
}

export function AuthTabs() {
  return (
    <Tabs
      ariaLabel="Account"
      tabs={[
        { id: "sign-in", label: "Sign in", content: <SignInForm /> },
        { id: "sign-up", label: "Create account", content: <SignUpForm /> },
      ]}
    />
  );
}