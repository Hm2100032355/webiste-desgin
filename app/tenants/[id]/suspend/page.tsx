"use client"

import type React from "react"

import { AdminLayout } from "@/components/layout/admin-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, AlertTriangle } from "lucide-react"
import { useState } from "react"

export default function SuspendTenantPage({ params }: { params: { id: string } }) {
  const [reason, setReason] = useState("")
  const [notifyContact, setNotifyContact] = useState(true)
  const [pauseJobs, setPauseJobs] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)

  const tenant = {
    id: params.id,
    name: "Acme Corporation",
    domain: "acme.talla.app",
    status: "active",
    primaryContact: {
      name: "Priya Sharma",
      email: "priya@acme.com",
    },
    lastLogin: "2 minutes ago",
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!confirmed || !reason) return

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert("Tenant suspended successfully!")
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
          <h1 className="text-3xl font-bold text-foreground">Suspend Tenant</h1>
          <p className="text-muted-foreground">Temporarily disable access for {tenant.name}</p>
        </div>

        {/* Warning Alert */}
        <Card className="p-6 border-l-4 border-l-yellow-500 bg-yellow-50 border-0 shadow-sm">
          <div className="flex gap-4">
            <AlertTriangle className="text-yellow-600 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-2">Important Notice</h3>
              <p className="text-sm text-yellow-800">
                Once suspended, all users will be unable to access the system. However, this action is reversible and
                tenant data will remain intact.
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
              <p className="text-sm text-muted-foreground mb-2">Domain</p>
              <p className="font-semibold text-foreground">{tenant.domain}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Primary Contact</p>
              <p className="font-semibold text-foreground">{tenant.primaryContact.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Last Login</p>
              <p className="font-semibold text-foreground">{tenant.lastLogin}</p>
            </div>
          </div>
        </Card>

        {/* Suspension Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="p-8 border-0 shadow-sm">
            <h2 className="text-lg font-bold text-foreground mb-6">Suspension Details</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Reason for Suspension</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g., Billing Issue, Compliance Breach, Security Risk"
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
                        Send suspension notification to {tenant.primaryContact.email}
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 border border-input rounded-lg hover:bg-muted cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pauseJobs}
                      onChange={(e) => setPauseJobs(e.target.checked)}
                      className="w-4 h-4 rounded"
                    />
                    <div>
                      <p className="font-medium text-foreground">Pause Background Jobs</p>
                      <p className="text-sm text-muted-foreground">
                        Pause payroll runs, attendance sync, and other background processes
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
                <p className="font-medium text-foreground">I confirm that I want to suspend this tenant</p>
                <p className="text-sm text-muted-foreground">
                  I understand that all users will be unable to access the system until reactivation
                </p>
              </div>
            </label>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={!confirmed || !reason || loading}
              className="px-8 bg-yellow-600 hover:bg-yellow-700"
            >
              {loading ? "Suspending..." : "Suspend Tenant"}
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
