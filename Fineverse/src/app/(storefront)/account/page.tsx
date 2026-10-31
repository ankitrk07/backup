import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { ProfileForm } from "@/components/account/profile-form"
import { ChangePasswordForm } from "@/components/account/change-password-form"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = { title: "My Profile" }

export default async function ProfilePage() {
  const session = await auth()
  if (!session?.user) redirect("/login?redirect=/account")

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, name: true, email: true, phone: true, passwordHash: true },
  })
  if (!user) redirect("/login?redirect=/account")

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl border border-border/70 bg-card/60 p-6 backdrop-blur-sm shadow-xs">
        <h2 className="text-foreground text-base font-semibold">Profile Details</h2>
        <p className="text-muted-foreground mt-0.5 text-xs sm:text-sm">Update your personal contact information.</p>
        <div className="mt-5 max-w-md">
          <ProfileForm user={{ name: user.name ?? "", phone: user.phone ?? "", email: user.email }} />
        </div>
      </div>

      {user.passwordHash && (
        <div className="rounded-2xl border border-border/70 bg-card/60 p-6 backdrop-blur-sm shadow-xs">
          <h2 className="text-foreground text-base font-semibold">Password & Security</h2>
          <p className="text-muted-foreground mt-0.5 text-xs sm:text-sm">Manage and update your account password.</p>
          <div className="mt-5 max-w-md">
            <ChangePasswordForm />
          </div>
        </div>
      )}
    </div>
  )
}
