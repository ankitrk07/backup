"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
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
import { profileSchema, type ProfileInput } from "@/lib/validations/auth"

export function ProfileForm({ user }: { user: { name: string; phone: string; email: string } }) {
  const [loading, setLoading] = useState(false)
  const form = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user.name, phone: user.phone },
  })

  const onSubmit = async (values: ProfileInput) => {
    setLoading(true)
    const res = await fetch("/api/account/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
    setLoading(false)

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      toast.error(data.error ?? "Failed to update profile")
      return
    }
    toast.success("Profile updated")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label htmlFor="profile-email" className="mb-1.5 block text-sm font-medium text-foreground">
            Email
          </label>
          <Input id="profile-email" value={user.email} disabled />
          <p className="text-muted-foreground mt-1 text-xs">Your email address can&rsquo;t be changed.</p>
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+91 98765 43210" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading} className="w-fit">
          {loading && <Loader2 className="size-4 animate-spin" />}
          Save Changes
        </Button>
      </form>
    </Form>
  )
}
