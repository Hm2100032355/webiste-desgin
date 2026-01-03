"use client"

import { AdminLayout } from "@/components/layout/admin-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, AlertCircle, Clock, CheckCircle } from "lucide-react"
import { useState } from "react"
import { Suspense } from "react"

interface Issue {
  id: string
  company: string
  title: string
  severity: "critical" | "high" | "medium" | "low"
  status: "open" | "in-progress" | "resolved"
  createdDate: string
  responseTime: string
}

function IssuesPageContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "open" | "in-progress" | "resolved">("all")
  const [filterSeverity, setFilterSeverity] = useState<"all" | "critical" | "high" | "medium" | "low">("all")

  const issues: Issue[] = [
    {
      id: "TKT-001",
      company: "Acme Corporation",
      title: "Payroll processing failed",
      severity: "critical",
      status: "in-progress",
      createdDate: "2025-01-28",
      responseTime: "15 minutes",
    },
    {
      id: "TKT-002",
      company: "TechStart Inc",
      title: "Email notifications not sending",
      severity: "high",
      status: "open",
      createdDate: "2025-01-27",
      responseTime: "4 hours",
    },
    {
      id: "TKT-003",
      company: "Global Solutions",
      title: "Dashboard performance slow",
      severity: "medium",
      status: "in-progress",
      createdDate: "2025-01-26",
      responseTime: "2 hours",
    },
    {
      id: "TKT-004",
      company: "Innovation Labs",
      title: "Feature request: Custom reports",
      severity: "low",
      status: "resolved",
      createdDate: "2025-01-25",
      responseTime: "24 hours",
    },
  ]

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || issue.status === filterStatus
    const matchesSeverity = filterSeverity === "all" || issue.severity === filterSeverity
    return matchesSearch && matchesStatus && matchesSeverity
  })

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-700"
      case "high":
        return "bg-orange-100 text-orange-700"
      case "medium":
        return "bg-yellow-100 text-yellow-700"
      case "low":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle size={16} className="text-red-600" />
      case "in-progress":
        return <Clock size={16} className="text-yellow-600" />
      case "resolved":
        return <CheckCircle size={16} className="text-green-600" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Support Issues & Escalations</h1>
        <p className="text-muted-foreground">Manage tenant support tickets and SLA tracking</p>
      </div>

      {/* Search and Filters */}
      <Card className="p-6 border-0 shadow-sm">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search by issue title or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex gap-2">
              {["all", "open", "in-progress", "resolved"].map((status) => (
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
            <div className="flex gap-2">
              {["all", "critical", "high", "medium", "low"].map((severity) => (
                <Button
                  key={severity}
                  variant={filterSeverity === severity ? "default" : "outline"}
                  onClick={() => setFilterSeverity(severity as any)}
                  size="sm"
                  className={`capitalize ${filterSeverity === severity ? "" : "text-muted-foreground"}`}
                >
                  {severity}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Issues Table */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-foreground">Ticket ID</th>
                <th className="text-left px-6 py-4 font-semibold text-foreground">Company</th>
                <th className="text-left px-6 py-4 font-semibold text-foreground">Issue Title</th>
                <th className="text-left px-6 py-4 font-semibold text-foreground">Severity</th>
                <th className="text-left px-6 py-4 font-semibold text-foreground">Status</th>
                <th className="text-left px-6 py-4 font-semibold text-foreground">Created</th>
                <th className="text-right px-6 py-4 font-semibold text-foreground">Response Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredIssues.map((issue) => (
                <tr key={issue.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{issue.id}</td>
                  <td className="px-6 py-4 text-foreground">{issue.company}</td>
                  <td className="px-6 py-4 text-foreground">{issue.title}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize ${getSeverityColor(issue.severity)}`}
                    >
                      {issue.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 capitalize text-foreground">
                      {getStatusIcon(issue.status)}
                      {issue.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{issue.createdDate}</td>
                  <td className="px-6 py-4 text-right text-muted-foreground">{issue.responseTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* SLA Summary */}
      <Card className="p-8 border-0 shadow-sm">
        <h2 className="text-xl font-bold text-foreground mb-6">SLA Compliance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-2">Avg Response Time</p>
            <p className="text-2xl font-bold text-primary">45 minutes</p>
            <p className="text-xs text-green-600 mt-2">✓ Within SLA target</p>
          </div>
          <div className="border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-2">Avg Resolution Time</p>
            <p className="text-2xl font-bold text-primary">12 hours</p>
            <p className="text-xs text-green-600 mt-2">✓ Within SLA target</p>
          </div>
          <div className="border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-2">SLA Compliance Rate</p>
            <p className="text-2xl font-bold text-primary">98.5%</p>
            <p className="text-xs text-green-600 mt-2">✓ Exceeds target (95%)</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default function IssuesPage() {
  return (
    <AdminLayout>
      <Suspense fallback={null}>
        <IssuesPageContent />
      </Suspense>
    </AdminLayout>
  )
}
