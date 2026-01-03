"use client"

import type React from "react"

import { AdminLayout } from "@/components/layout/admin-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"
import { ChevronLeft } from "lucide-react"

export default function CreateTenantPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    domain: "",
    industry: "",
    size: "",
    address: "",
    country: "",
    timezone: "",
    contactName: "",
    email: "",
    phone: "",
    plan: "Pro",
    seats: "50",
    billingCycle: "monthly",
    autoRenew: true,
    adminUsername: "",
    adminPassword: "",
  })

  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      alert("Tenant created successfully!")
      window.location.href = "/tenants"
    }, 1000)
  }

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-4xl">
        {/* Header */}
        <div>
          <Link href="/tenants" className="flex items-center gap-2 text-primary hover:underline mb-4">
            <ChevronLeft size={18} />
            Back to Tenants
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Create New Tenant</h1>
          <p className="text-muted-foreground">Onboard a new client company to Talla HRMS</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Tenant Information */}
          <Card className="p-8 border-0 shadow-sm">
            <h2 className="text-xl font-bold text-foreground mb-6">Tenant Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Company Name</label>
                <Input
                  type="text"
                  name="companyName"
                  placeholder="e.g., Acme Corporation"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Domain</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    name="domain"
                    placeholder="companyname"
                    value={formData.domain}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="text-muted-foreground">.talla.app</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Industry</label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground"
                >
                  <option value="">Select Industry</option>
                  <option value="it">IT</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="education">Education</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="retail">Retail</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Company Size</label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground"
                >
                  <option value="">Select Size</option>
                  <option value="<50">&lt;50 employees</option>
                  <option value="50-200">50-200 employees</option>
                  <option value="200-500">200-500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                <Input
                  type="text"
                  name="address"
                  placeholder="Company address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Country</label>
                <Input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Timezone</label>
                <select
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground"
                >
                  <option value="">Select Timezone</option>
                  <option value="UTC">UTC</option>
                  <option value="EST">EST</option>
                  <option value="IST">IST</option>
                  <option value="PST">PST</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Primary Contact */}
          <Card className="p-8 border-0 shadow-sm">
            <h2 className="text-xl font-bold text-foreground mb-6">Primary Contact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                <Input
                  type="text"
                  name="contactName"
                  placeholder="Full name"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                <Input
                  type="email"
                  name="email"
                  placeholder="contact@company.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </Card>

          {/* Subscription Plan */}
          <Card className="p-8 border-0 shadow-sm">
            <h2 className="text-xl font-bold text-foreground mb-6">Subscription Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Plan Type</label>
                <select
                  name="plan"
                  value={formData.plan}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground"
                >
                  <option value="Basic">Basic</option>
                  <option value="Pro">Pro</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Employee Seats</label>
                <Input
                  type="number"
                  name="seats"
                  placeholder="50"
                  value={formData.seats}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Billing Cycle</label>
                <select
                  name="billingCycle"
                  value={formData.billingCycle}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground"
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="autoRenew"
                  checked={formData.autoRenew}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded border-input"
                />
                <label className="text-sm font-medium text-foreground">Auto-Renew Subscription</label>
              </div>
            </div>
          </Card>

          {/* Tenant Admin */}
          <Card className="p-8 border-0 shadow-sm">
            <h2 className="text-xl font-bold text-foreground mb-6">Assign Tenant Technical Admin</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Username (Email)</label>
                <Input
                  type="email"
                  name="adminUsername"
                  placeholder={formData.email || "admin@company.com"}
                  value={formData.adminUsername}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                <Input
                  type="password"
                  name="adminPassword"
                  placeholder="Auto-generated or manual"
                  value={formData.adminPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button type="submit" disabled={loading} className="px-8">
              {loading ? "Creating..." : "Save & Create Tenant"}
            </Button>
            <Link href="/tenants">
              <Button variant="outline">Cancel</Button>
            </Link>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
