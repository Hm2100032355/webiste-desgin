"use client"

import type React from "react"

import { AdminLayout } from "@/components/layout/admin-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ChevronLeft, AlertTriangle } from "lucide-react"
import { useState } from "react"

export default function DeleteTenantPage({ params }: { params: { id: string } }) {
  const [reason, setReason] = useState("")
  const [archiveData, setArchiveData] = useState(true)
  const [notifyContact, setNotifyContact] = useState(true)
  const [confirmText, setConfirmText] = useState("")
  const [confirmed, setConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)

  const tenant = {
    id: params.id,
    name: "Acme Corporation",
    domain: "acme.talla.app",
    createdOn: "2024-05-10",
    lastLogin: "2 minutes ago",
    primaryContact: {
      name: "Priya Sharma",
      email: "priya@acme.com",
    },
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!confirmed || confirmText !== tenant.name || !reason) return

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert("Tenant deleted successfully!")
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
          <h1 className="text-3xl font-bold text-foreground">Delete Tenant</h1>
          <p className="text-muted-foreground">Permanently remove {tenant.name} from the system</p>
        </div>

        {/* Warning Alert */}
        <Card className="p-6 border-l-4 border-l-red-500 bg-red-50 border-0 shadow-sm">
          <div className="flex gap-4">
            <AlertTriangle className="text-red-600 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-red-900 mb-2">Danger Zone</h3>
              <p className="text-sm text-red-800">
                This action is irreversible. Once deleted, all tenant data will be lost or archived based on your
                retention policy.
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
              <p className="text-sm text-muted-foreground mb-2">Created On</p>
              <p className="font-semibold text-foreground">{tenant.createdOn}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Last Login</p>
              <p className="font-semibold text-foreground">{tenant.lastLogin}</p>
            </div>
          </div>
        </Card>

        {/* Deletion Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="p-8 border-0 shadow-sm">
            <h2 className="text-lg font-bold text-foreground mb-6">Deletion Details</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Reason for Deletion</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g., Client offboarded, Contract ended, Security request"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Data Handling</label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border border-input rounded-lg hover:bg-muted cursor-pointer">
                    <input
                      type="checkbox"
                      checked={archiveData}
                      onChange={(e) => setArchiveData(e.target.checked)}
                      className="w-4 h-4 rounded"
                    />
                    <div>
                      <p className="font-medium text-foreground">Archive Data</p>
                      <p className="text-sm text-muted-foreground">
                        Keep data for 90 days for compliance and recovery purposes (recommended)
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <div>
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
                      Send deletion notification to {tenant.primaryContact.email}
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </Card>

          {/* Confirmation */}
          <Card className="p-8 border-0 shadow-sm">
            <h2 className="text-lg font-bold text-foreground mb-6">Double Confirmation Required</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Type tenant name to confirm: <span className="font-bold">{tenant.name}</span>
                </label>
                <Input
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder={tenant.name}
                  className="border-destructive focus:border-destructive"
                  required
                />
              </div>

              <label className="flex items-start gap-3 p-4 border border-input rounded-lg hover:bg-muted cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  className="w-4 h-4 rounded mt-1"
                />
                <div>
                  <p className="font-medium text-foreground">I confirm that I want to permanently delete this tenant</p>
                  <p className="text-sm text-muted-foreground">
                    I understand that this action is irreversible and all data will be lost
                  </p>
                </div>
              </label>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={!confirmed || confirmText !== tenant.name || !reason || loading}
              className="px-8 bg-red-600 hover:bg-red-700"
            >
              {loading ? "Deleting..." : "Permanently Delete Tenant"}
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
