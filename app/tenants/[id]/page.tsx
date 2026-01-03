"use client"

import { AdminLayout } from "@/components/layout/admin-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, Mail, Phone, MapPin, Users } from "lucide-react"
import { useState } from "react"

export default function TenantDetailsPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "subscription" | "activity">("overview")

  const tenant = {
    id: params.id,
    name: "Acme Corporation",
    domain: "acme.talla.app",
    status: "active",
    createdDate: "2024-05-10",
    lastLogin: "2 minutes ago",
    primaryContact: {
      name: "Priya Sharma",
      email: "priya@acme.com",
      phone: "+91 98765 43210",
    },
    address: "123 Business Street, New York, NY 10001",
    users: 125,
    plan: "Enterprise",
    seats: 150,
    subscription: {
      startDate: "2024-05-10",
      endDate: "2025-05-10",
      renewal: "Auto-renew enabled",
      cost: "$5,000/month",
    },
  }

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-5xl">
        {/* Header */}
        <div>
          <Link href="/tenants" className="flex items-center gap-2 text-primary hover:underline mb-4">
            <ChevronLeft size={18} />
            Back to Tenants
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{tenant.name}</h1>
              <div className="flex items-center gap-4 mt-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                  {tenant.status}
                </span>
                <p className="text-muted-foreground">{tenant.domain}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link href={`/tenants/${tenant.id}/suspend`}>
                <Button variant="outline">Suspend</Button>
              </Link>
              <Link href={`/tenants/${tenant.id}/delete`}>
                <Button variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                  Delete
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-border">
          {["overview", "users", "subscription", "activity"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 font-medium border-b-2 transition-colors capitalize ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Company Info */}
            <Card className="lg:col-span-2 p-8 border-0 shadow-sm">
              <h2 className="text-lg font-bold text-foreground mb-6">Company Information</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Created Date</p>
                    <p className="font-medium text-foreground">{tenant.createdDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Last Login</p>
                    <p className="font-medium text-foreground">{tenant.lastLogin}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Address</p>
                  <div className="flex items-start gap-2">
                    <MapPin size={18} className="text-primary mt-1 flex-shrink-0" />
                    <p className="font-medium text-foreground">{tenant.address}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Primary Contact */}
            <Card className="p-8 border-0 shadow-sm h-fit">
              <h2 className="text-lg font-bold text-foreground mb-6">Primary Contact</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Name</p>
                  <p className="font-medium text-foreground">{tenant.primaryContact.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-primary" />
                  <a href={`mailto:${tenant.primaryContact.email}`} className="text-primary hover:underline">
                    {tenant.primaryContact.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-primary" />
                  <a href={`tel:${tenant.primaryContact.phone}`} className="text-primary hover:underline">
                    {tenant.primaryContact.phone}
                  </a>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <Card className="p-8 border-0 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-foreground">Users</h2>
              <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
                <Users size={18} className="text-primary" />
                <span className="font-semibold text-foreground">{tenant.users} users</span>
              </div>
            </div>
            <div className="space-y-3">
              {[
                "Priya Sharma (Super Admin)",
                "Raj Kumar (HR Manager)",
                "Sarah Johnson (Manager)",
                "John Doe (Employee)",
              ].map((user) => (
                <div key={user} className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    {user.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{user}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Subscription Tab */}
        {activeTab === "subscription" && (
          <Card className="p-8 border-0 shadow-sm">
            <h2 className="text-lg font-bold text-foreground mb-6">Subscription Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Plan</p>
                <p className="font-semibold text-foreground">{tenant.plan}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Seats</p>
                <p className="font-semibold text-foreground">{tenant.seats}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Monthly Cost</p>
                <p className="font-semibold text-foreground">{tenant.subscription.cost}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Billing Cycle</p>
                <p className="font-semibold text-foreground">Monthly</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground mb-2">Subscription Period</p>
                <p className="font-semibold text-foreground">
                  {tenant.subscription.startDate} - {tenant.subscription.endDate}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground mb-2">Renewal Status</p>
                <p className="font-semibold text-foreground text-green-600">{tenant.subscription.renewal}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Activity Tab */}
        {activeTab === "activity" && (
          <Card className="p-8 border-0 shadow-sm">
            <h2 className="text-lg font-bold text-foreground mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { action: "User Login", user: "Priya Sharma", time: "2 minutes ago" },
                { action: "Payroll Run Executed", user: "System", time: "1 hour ago" },
                { action: "Subscription Updated", user: "Admin", time: "3 days ago" },
                { action: "Employee Added", user: "Raj Kumar", time: "5 days ago" },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border-b border-border last:border-b-0"
                >
                  <div>
                    <p className="font-medium text-foreground">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">by {activity.user}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
