"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Container } from "@/components/shared/container"
import { resetPasswordSchema, type ResetPasswordInput } from "@/lib/validations/auth"

function ResetPasswordForm() {
  const router = useRouter()
  const token = useSearchParams().get("token") ?? ""
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token, password: "", confirmPassword: "" },
  })

  const onSubmit = async (values: ResetPasswordInput) => {
    setError(null)
    setLoading(true)
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError(data.error ?? "Something went wrong")
      return
    }
    setSuccess(true)
    setTimeout(() => router.push("/login"), 2000)
  }

  if (!token) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-foreground">Invalid reset link</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          This password reset link is missing or malformed.
        </p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/forgot-password">Request a new link</Link>
        </Button>
      </div>
    )
  }

  if (success) {
    return (
      <div className="flex flex-col items-center gap-3 text-center">
        <CheckCircle2 className="text-success size-10" />
        <h1 className="text-2xl font-semibold text-foreground">Password reset</h1>
        <p className="text-muted-foreground text-sm">Redirecting you to sign in...</p>
      </div>
    )
  }

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold text-foreground">Set a new password</h1>
        <p className="text-muted-foreground mt-1.5 text-sm">Choose a strong password for your account.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="new-password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="new-password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <p className="text-sale text-sm">{error}</p>}
          <Button type="submit" size="lg" disabled={loading} className="mt-2">
            {loading && <Loader2 className="size-4 animate-spin" />}
            Reset Password
          </Button>
        </form>
      </Form>
    </>
  )
}

export default function ResetPasswordPage() {
  return (
    <Container className="flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-sm">
        <Suspense>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </Container>
  )
}
