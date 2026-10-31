"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import type { Route } from "next"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
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
import { loginSchema, type LoginInput } from "@/lib/validations/auth"

// Auth.js passes callbackUrl as a full absolute URL; our own links use a
// bare path via `redirect`. Normalize to a same-origin relative path so
// router.push() gets a real internal route rather than an absolute URL —
// and so an attacker can't craft a callbackUrl pointing off-site.
function toSafeRelativePath(value: string): string {
  try {
    const url = new URL(value, window.location.origin)
    if (url.origin !== window.location.origin) return "/"
    return `${url.pathname}${url.search}`
  } catch {
    return value.startsWith("/") ? value : "/"
  }
}

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  // `callbackUrl` is Auth.js's own param name when proxy.ts redirects here
  // for an unauthorized route; `redirect` is used by our own links (e.g.
  // "Write a Review"). Support both rather than picking one.
  const rawRedirect = searchParams.get("callbackUrl") ?? searchParams.get("redirect") ?? "/"
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  const onSubmit = async (values: LoginInput) => {
    setError(null)
    setLoading(true)
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    })
    setLoading(false)

    if (result?.error) {
      setError("Invalid email or password")
      return
    }
    router.push(toSafeRelativePath(rawRedirect) as Route)
    router.refresh()
  }

  return (
    <Container className="flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-foreground">Welcome back</h1>
          <p className="text-muted-foreground mt-1.5 text-sm">Sign in to your Fineverse account</p>
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link href="/forgot-password" className="text-brand text-xs font-medium hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input type="password" autoComplete="current-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && <p className="text-sale text-sm">{error}</p>}

            <Button type="submit" size="lg" disabled={loading} className="mt-2">
              {loading && <Loader2 className="size-4 animate-spin" />}
              Sign In
            </Button>
          </form>
        </Form>

        <p className="text-muted-foreground mt-6 text-center text-sm">
          Don&rsquo;t have an account?{" "}
          <Link href="/register" className="text-brand font-medium hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </Container>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
