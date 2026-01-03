"use client"

import type React from "react"

import { AdminLayout } from "@/components/layout/admin-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, CheckCircle } from "lucide-react"
import { useState } from "react"

export default function ReactivateTenantPage({ params }: { params: { id: string } }) {
  const [reason, setReason] = useState("")
  const [notifyContact, setNotifyContact] = useState(true)
  const [resumeJobs, setResumeJobs] = useState(true)
  const [confirmed, setConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)

  const tenant = {
    id: params.id,
    name: "Innovation Labs",
    domain: "innovate.talla.app",
    status: "suspended",
    primaryContact: {
      name: "John Smith",
      email: "john@innovation.com",
    },
    suspendedOn: "2025-09-15",
    suspendedBy: "Super Admin John",
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!confirmed || !reason) return

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert("Tenant reactivated successfully!")
      window.location.href = "/tenants"
    }, 1000)
  }

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-3xl">
        {/* Header */}
        <div>
          <Link href={`/tenants/${tenant.id}`} className="flex items-center gap-2 text-primary hover:underline mb-4">
            <ChevronLeft size={18} />
            Back to Tenant Details
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Reactivate Tenant</h1>
          <p className="text-muted-foreground">Restore access for {tenant.name}</p>
        </div>

        {/* Info Alert */}
        <Card className="p-6 border-l-4 border-l-green-500 bg-green-50 border-0 shadow-sm">
          <div className="flex gap-4">
            <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-green-900 mb-2">Reactivation Info</h3>
              <p className="text-sm text-green-800">
                Once reactivated, all users will regain access immediately. Background jobs will resume if you enable
                that option.
              </p>
            </div>
          </div>
        </Card>

        {/* Tenant Summary */}
        <Card className="p-8 border-0 shadow-sm">
          <h2 className="text-lg font-bold text-foreground mb-6">Tenant Summary</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Company Name</p>
              <p className="font-semibold text-foreground">{tenant.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Status</p>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700">
                Suspended
              </span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Suspended On</p>
              <p className="font-semibold text-foreground">{tenant.suspendedOn}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Suspended By</p>
              <p className="font-semibold text-foreground">{tenant.suspendedBy}</p>
            </div>
          </div>
        </Card>

        {/* Reactivation Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="p-8 border-0 shadow-sm">
            <h2 className="text-lg font-bold text-foreground mb-6">Reactivation Details</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Reason for Reactivation</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g., Billing cleared, Compliance issue resolved, Client request"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Options</label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border border-input rounded-lg hover:bg-muted cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifyContact}
                      onChange={(e) => setNotifyContact(e.target.checked)}
                      className="w-4 h-4 rounded"
                    />
                    <div>
                      <p className="font-medium text-foreground">Notify Primary Contact</p>
                      <p className="text-sm text-muted-foreground">
                        Send reactivation notification to {tenant.primaryContact.email}
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 border border-input rounded-lg hover:bg-muted cursor-pointer">
                    <input
                      type="checkbox"
                      checked={resumeJobs}
                      onChange={(e) => setResumeJobs(e.target.checked)}
                      className="w-4 h-4 rounded"
                    />
                    <div>
                      <p className="font-medium text-foreground">Resume Background Jobs</p>
                      <p className="text-sm text-muted-foreground">
                        Resume payroll runs, attendance sync, and other background processes
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </Card>

          {/* Confirmation */}
          <Card className="p-8 border-0 shadow-sm">
            <h2 className="text-lg font-bold text-foreground mb-6">Confirmation</h2>
            <label className="flex items-start gap-3 p-4 border border-input rounded-lg hover:bg-muted cursor-pointer">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="w-4 h-4 rounded mt-1"
              />
              <div>
                <p className="font-medium text-foreground">I confirm that I want to reactivate this tenant</p>
                <p className="text-sm text-muted-foreground">
                  I understand that all users will regain immediate access to the system
                </p>
              </div>
            </label>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button type="submit" disabled={!confirmed || !reason || loading} className="px-8">
              {loading ? "Reactivating..." : "Reactivate Tenant"}
            </Button>
            <Link href={`/tenants/${tenant.id}`}>
              <Button variant="outline">Cancel</Button>
            </Link>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
