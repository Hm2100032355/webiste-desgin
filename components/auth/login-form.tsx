"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Link from "next/link"

type LoginStep = "email" | "password" | "otp"

export function LoginForm() {
  const [step, setStep] = useState<LoginStep>("email")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otpResendCountdown, setOtpResendCountdown] = useState(0)

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setStep("password")
    }, 500)
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setStep("otp")
      setOtpSent(true)
      setOtpResendCountdown(60)
    }, 500)
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      // Redirect to dashboard
      window.location.href = "/dashboard"
    }, 500)
  }

  const handleResendOtp = () => {
    setOtpResendCountdown(60)
    // Simulate API call
    setOtpSent(true)
  }

  return (
    <div className="w-full max-w-md">
      <Card className="p-8 border-0 shadow-lg">
        <h2 className="text-2xl font-bold text-foreground mb-2">Sign in</h2>
        <p className="text-muted-foreground text-sm mb-8">Log in to access your personalized HRMS dashboard.</p>

        {step === "email" && (
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              <Input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-10"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Verifying..." : "Continue"}
            </Button>
            <div className="text-center">
              <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot Password?
              </Link>
            </div>
          </form>
        )}

        {step === "password" && (
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              <Input type="email" value={email} disabled className="h-10 bg-muted" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-10"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Verifying..." : "Continue"}
            </Button>
            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setStep("email")
                  setPassword("")
                }}
                className="text-sm text-primary hover:underline"
              >
                Use different email
              </button>
            </div>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
              OTP sent to {email}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Enter OTP</label>
              <Input
                type="text"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                maxLength={6}
                required
                className="h-10 text-center text-2xl tracking-widest"
              />
              <p className="text-xs text-muted-foreground mt-2">OTP is valid for 1 minute</p>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Verifying..." : "Sign In"}
            </Button>
            <div className="text-center">
              {otpResendCountdown > 0 ? (
                <p className="text-sm text-muted-foreground">Resend OTP in {otpResendCountdown}s</p>
              ) : (
                <button type="button" onClick={handleResendOtp} className="text-sm text-primary hover:underline">
                  Resend OTP
                </button>
              )}
            </div>
          </form>
        )}

        <div className="mt-8 p-4 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground">
            <strong>Demo Credentials:</strong>
            <br />
            Role-based login available for Super Admin, Technical Admin, HR, Manager, and Employee
          </p>
        </div>
      </Card>
    </div>
  )
}
