import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Forgot Password - Talla HRMS",
  description: "Reset your Talla HRMS password",
}

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side - Brand Section */}
      <div className="hidden lg:flex flex-col justify-between bg-primary p-12 text-primary-foreground">
        <div>
          <h1 className="text-4xl font-bold mb-6">Talla HRMS</h1>
          <p className="text-lg opacity-90 mb-8 max-w-md leading-relaxed">
            Your all-in-one Human Resource Management platform for smarter, faster, and secure workforce management.
          </p>
        </div>
        <p className="text-xs opacity-75">© 2025 Talla HRMS. All rights reserved.</p>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center p-8 bg-background">
        <ForgotPasswordForm />
      </div>
    </div>
  )
}
