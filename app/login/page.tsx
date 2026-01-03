import { LoginForm } from "@/components/auth/login-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign In - Talla HRMS",
  description: "Sign in to your Talla HRMS account",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side - Brand Section */}
      <div className="hidden lg:flex flex-col justify-between bg-primary p-12 text-primary-foreground">
        <div>
          <h1 className="text-4xl font-bold mb-6">Talla HRMS</h1>
          <p className="text-lg opacity-90 mb-8 max-w-md leading-relaxed">
            Your all-in-one Human Resource Management platform for smarter, faster, and secure workforce management.
          </p>
          <ul className="space-y-4 text-sm opacity-85">
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary-foreground"></div>
              Manage employees, payroll, attendance, and leaves seamlessly
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary-foreground"></div>
              Secure login with password + OTP verification
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary-foreground"></div>
              Empowering Admins, HR, Managers, and Employees
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary-foreground"></div>
              Cloud-first, reliable, and always available
            </li>
          </ul>
        </div>
        <p className="text-xs opacity-75">© 2025 Talla HRMS. All rights reserved.</p>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex items-center justify-center p-8 bg-background">
        <LoginForm />
      </div>
    </div>
  )
}
