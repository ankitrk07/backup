"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, MailCheck } from "lucide-react"
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
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/lib/validations/auth"

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  })

  const onSubmit = async (values: ForgotPasswordInput) => {
    setLoading(true)
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Container className="flex min-h-[70vh] flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="bg-secondary flex size-14 items-center justify-center rounded-full">
          <MailCheck className="text-muted-foreground size-6" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Check your email</h1>
          <p className="text-muted-foreground mt-2 max-w-sm text-sm">
            If an account exists for that email, we&rsquo;ve sent a link to reset your password.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/login">Back to Sign In</Link>
        </Button>
      </Container>
    )
  }

  return (
    <Container className="flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-foreground">Forgot your password?</h1>
          <p className="text-muted-foreground mt-1.5 text-sm">
            Enter your email and we&rsquo;ll send you a reset link.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" autoComplete="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" disabled={loading} className="mt-2">
              {loading && <Loader2 className="size-4 animate-spin" />}
              Send Reset Link
            </Button>
          </form>
        </Form>

        <p className="text-muted-foreground mt-6 text-center text-sm">
          <Link href="/login" className="text-brand font-medium hover:underline">
            Back to Sign In
          </Link>
        </p>
      </div>
    </Container>
  )
}
