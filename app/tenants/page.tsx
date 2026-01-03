"use client"

import { AdminLayout } from "@/components/layout/admin-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Search, Plus, MoreHorizontal, Play, Pause, Trash2 } from "lucide-react"
import { useState } from "react"

interface Tenant {
  id: string
  name: string
  domain: string
  status: "active" | "suspended"
  users: number
  plan: string
  lastLogin: string
}

export default function TenantsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState<"all" | "active" | "suspended">("all")
  const [menuOpen, setMenuOpen] = useState<string | null>(null)

  const tenants: Tenant[] = [
    {
      id: "TEN-001",
      name: "Acme Corporation",
      domain: "acme.talla.app",
      status: "active",
      users: 125,
      plan: "Enterprise",
      lastLogin: "2 minutes ago",
    },
    {
      id: "TEN-002",
      name: "TechStart Inc",
      domain: "techstart.talla.app",
      status: "active",
      users: 45,
      plan: "Pro",
      lastLogin: "1 hour ago",
    },
    {
      id: "TEN-003",
      name: "Global Solutions",
      domain: "global.talla.app",
      status: "active",
      users: 230,
      plan: "Enterprise",
      lastLogin: "30 minutes ago",
    },
    {
      id: "TEN-004",
      name: "Innovation Labs",
      domain: "innovate.talla.app",
      status: "suspended",
      users: 67,
      plan: "Pro",
      lastLogin: "5 days ago",
    },
  ]

  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch =
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.domain.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === "all" || tenant.status === filter
    return matchesSearch && matchesFilter
  })

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Tenants</h1>
            <p className="text-muted-foreground">Manage client companies and their subscriptions</p>
          </div>
          <Link href="/tenants/create">
            <Button>
              <Plus size={18} className="mr-2" />
              Create Tenant
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 border-0 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Search by company name or domain..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {["all", "active", "suspended"].map((status) => (
                <Button
                  key={status}
                  variant={filter === status ? "default" : "outline"}
                  onClick={() => setFilter(status as any)}
                  className="capitalize"
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Tenants Table */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Company Name</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Domain</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Plan</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Users</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Status</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Last Login</th>
                  <th className="text-right px-6 py-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredTenants.map((tenant) => (
                  <tr key={tenant.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-foreground">{tenant.name}</p>
                        <p className="text-sm text-muted-foreground">{tenant.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-foreground">{tenant.domain}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                        {tenant.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-foreground font-medium">{tenant.users}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          tenant.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        {tenant.status === "active" ? "Active" : "Suspended"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground text-sm">{tenant.lastLogin}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="relative">
                        <button
                          onClick={() => setMenuOpen(menuOpen === tenant.id ? null : tenant.id)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                        >
                          <MoreHorizontal size={18} className="text-muted-foreground" />
                        </button>
                        {menuOpen === tenant.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-card rounded-lg shadow-lg border border-border z-10">
                            <Link href={`/tenants/${tenant.id}`}>
                              <button className="w-full text-left px-4 py-2 hover:bg-muted transition-colors text-foreground rounded-t-lg">
                                View Details
                              </button>
                            </Link>
                            {tenant.status === "active" ? (
                              <Link href={`/tenants/${tenant.id}/suspend`}>
                                <button className="w-full text-left px-4 py-2 hover:bg-muted transition-colors text-foreground flex items-center gap-2">
                                  <Pause size={16} /> Suspend
                                </button>
                              </Link>
                            ) : (
                              <Link href={`/tenants/${tenant.id}/reactivate`}>
                                <button className="w-full text-left px-4 py-2 hover:bg-muted transition-colors text-foreground flex items-center gap-2">
                                  <Play size={16} /> Reactivate
                                </button>
                              </Link>
                            )}
                            <Link href={`/tenants/${tenant.id}/delete`}>
                              <button className="w-full text-left px-4 py-2 hover:bg-red-50 transition-colors text-red-600 flex items-center gap-2 rounded-b-lg">
                                <Trash2 size={16} /> Delete
                              </button>
                            </Link>
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

        {/* No Results */}
        {filteredTenants.length === 0 && (
          <Card className="p-12 border-0 shadow-sm text-center">
            <p className="text-muted-foreground mb-4">No tenants found matching your search</p>
            <Link href="/tenants/create">
              <Button>Create Your First Tenant</Button>
            </Link>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
