import { AuthLayout } from "@/components/layout/AuthLayout"
import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm"

export function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  )
}