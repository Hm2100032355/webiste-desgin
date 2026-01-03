"use client"

import { AdminLayout } from "@/components/layout/admin-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Download, MoreHorizontal, TrendingUp, DollarSign, Users } from "lucide-react"
import { useState } from "react"
import { Suspense } from "react"

interface Invoice {
  id: string
  company: string
  plan: string
  amount: number
  status: "paid" | "pending" | "overdue"
  date: string
  dueDate: string
}

interface SubscriptionPlan {
  name: string
  tenants: number
  mrr: number
  growth: number
}

function BillingPageContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "paid" | "pending" | "overdue">("all")
  const [menuOpen, setMenuOpen] = useState<string | null>(null)

  const subscriptionSummary = [
    { name: "Basic", tenants: 5, mrr: 2500, growth: 20 },
    { name: "Pro", tenants: 8, mrr: 8000, growth: 15 },
    { name: "Enterprise", tenants: 3, mrr: 15000, growth: 30 },
  ]

  const invoices: Invoice[] = [
    {
      id: "INV-2025-001",
      company: "Acme Corporation",
      plan: "Enterprise",
      amount: 5000,
      status: "paid",
      date: "2025-01-01",
      dueDate: "2025-01-15",
    },
    {
      id: "INV-2025-002",
      company: "TechStart Inc",
      plan: "Pro",
      amount: 1000,
      status: "paid",
      date: "2025-01-01",
      dueDate: "2025-01-15",
    },
    {
      id: "INV-2025-003",
      company: "Global Solutions",
      plan: "Enterprise",
      amount: 5000,
      status: "pending",
      date: "2025-01-15",
      dueDate: "2025-02-01",
    },
    {
      id: "INV-2025-004",
      company: "Innovation Labs",
      plan: "Pro",
      amount: 1000,
      status: "overdue",
      date: "2024-12-15",
      dueDate: "2025-01-01",
    },
  ]

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || invoice.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0)
  const pendingRevenue = invoices.filter((inv) => inv.status === "pending").reduce((sum, inv) => sum + inv.amount, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Billing & Subscriptions</h1>
        <p className="text-muted-foreground">Manage billing, invoices, and subscription plans</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 border-0 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground mb-2">Monthly Recurring Revenue</p>
              <p className="text-3xl font-bold text-foreground">${(totalRevenue / 1000).toFixed(1)}K</p>
              <p className="text-xs text-primary mt-2">+12% from last month</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <TrendingUp className="text-primary" size={24} />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground mb-2">Total Subscriptions</p>
              <p className="text-3xl font-bold text-foreground">16</p>
              <p className="text-xs text-primary mt-2">Active subscriptions</p>
            </div>
            <div className="p-3 bg-secondary/10 rounded-lg">
              <Users className="text-secondary" size={24} />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground mb-2">Pending Invoices</p>
              <p className="text-3xl font-bold text-foreground">${pendingRevenue}</p>
              <p className="text-xs text-accent mt-2">${(pendingRevenue * 0.05).toFixed(0)} overdue</p>
            </div>
            <div className="p-3 bg-accent/10 rounded-lg">
              <DollarSign className="text-accent" size={24} />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-sm">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-2">Plan Distribution</p>
            <div className="space-y-2 mt-4">
              {subscriptionSummary.map((plan) => (
                <div key={plan.name} className="flex items-center justify-between text-sm">
                  <span className="text-foreground font-medium">{plan.name}</span>
                  <span className="text-muted-foreground">{plan.tenants} tenants</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Subscription Plans */}
      <Card className="p-8 border-0 shadow-sm">
        <h2 className="text-xl font-bold text-foreground mb-6">Subscription Plans Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subscriptionSummary.map((plan) => (
            <div key={plan.name} className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-foreground mb-4">{plan.name}</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Active Tenants</span>
                  <span className="font-bold text-foreground">{plan.tenants}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">MRR</span>
                  <span className="font-bold text-foreground">${plan.mrr.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Growth</span>
                  <span className="font-bold text-green-600">+{plan.growth}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Invoices */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Invoices</h2>
          <Button variant="outline" size="sm">
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 border-0 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Search by company or invoice number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {["all", "paid", "pending", "overdue"].map((status) => (
                <Button
                  key={status}
                  variant={filterStatus === status ? "default" : "outline"}
                  onClick={() => setFilterStatus(status as any)}
                  size="sm"
                  className="capitalize"
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Invoices Table */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Invoice ID</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Company</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Plan</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Amount</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Date</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Due Date</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Status</th>
                  <th className="text-right px-6 py-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{invoice.id}</td>
                    <td className="px-6 py-4 text-foreground">{invoice.company}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                        {invoice.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-foreground">${invoice.amount}</td>
                    <td className="px-6 py-4 text-muted-foreground">{invoice.date}</td>
                    <td className="px-6 py-4 text-muted-foreground">{invoice.dueDate}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize ${
                          invoice.status === "paid"
                            ? "bg-green-100 text-green-700"
                            : invoice.status === "pending"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="relative inline-block">
                        <button
                          onClick={() => setMenuOpen(menuOpen === invoice.id ? null : invoice.id)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                        >
                          <MoreHorizontal size={18} className="text-muted-foreground" />
                        </button>
                        {menuOpen === invoice.id && (
                          <div className="absolute right-0 mt-2 w-40 bg-card rounded-lg shadow-lg border border-border z-10">
                            <button className="w-full text-left px-4 py-2 hover:bg-muted transition-colors text-foreground rounded-t-lg text-sm">
                              View Invoice
                            </button>
                            <button className="w-full text-left px-4 py-2 hover:bg-muted transition-colors text-foreground text-sm">
                              Download PDF
                            </button>
                            <button className="w-full text-left px-4 py-2 hover:bg-muted transition-colors text-foreground rounded-b-lg text-sm">
                              Send Email
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default function BillingPage() {
  return (
    <AdminLayout>
      <Suspense fallback={null}>
        <BillingPageContent />
      </Suspense>
    </AdminLayout>
  )
}
