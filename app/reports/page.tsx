"use client"

import { AdminLayout } from "@/components/layout/admin-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, Download, Calendar } from "lucide-react"
import { useState } from "react"

interface ReportData {
  name: string
  value: string | number
}

export default function ReportsPage() {
  const [reportType, setReportType] = useState<"usage" | "revenue" | "performance">("usage")
  const [dateRange, setDateRange] = useState("30d")

  const usageReport = [
    { name: "Total Tenants", value: 16 },
    { name: "Active Users", value: "8,542" },
    { name: "Total Employees Managed", value: "45,230" },
    { name: "Payroll Runs", value: 892 },
    { name: "Documents Generated", value: "234,891" },
    { name: "API Calls", value: "12.5M" },
  ]

  const revenueReport = [
    { name: "Total Revenue", value: "$124,560" },
    { name: "MRR (Monthly Recurring Revenue)", value: "$87,450" },
    { name: "New Subscriptions", value: 4 },
    { name: "Churn Rate", value: "2.5%" },
    { name: "ARPU (Average Revenue Per User)", value: "$145" },
    { name: "Expansion Revenue", value: "$8,200" },
  ]

  const performanceReport = [
    { name: "Average API Response Time", value: "142ms" },
    { name: "System Uptime", value: "99.97%" },
    { name: "Average Error Rate", value: "0.05%" },
    { name: "Database Query Avg", value: "234ms" },
    { name: "Slowest Endpoint", value: "Payroll Report (1.2s)" },
    { name: "Most Used Feature", value: "Attendance Tracking" },
  ]

  const getReportData = () => {
    switch (reportType) {
      case "revenue":
        return revenueReport
      case "performance":
        return performanceReport
      default:
        return usageReport
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports</h1>
            <p className="text-muted-foreground">SaaS metrics and performance analytics</p>
          </div>
          <Button>
            <Download size={18} className="mr-2" />
            Export Report
          </Button>
        </div>

        {/* Report Type Selection */}
        <Card className="p-6 border-0 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground mb-3">Report Type</p>
              <div className="flex gap-2 flex-wrap">
                {["usage", "revenue", "performance"].map((type) => (
                  <Button
                    key={type}
                    variant={reportType === type ? "default" : "outline"}
                    onClick={() => setReportType(type as any)}
                    className="capitalize"
                  >
                    {type === "usage" && "Tenant Usage"}
                    {type === "revenue" && "Revenue Analytics"}
                    {type === "performance" && "System Performance"}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-3">Date Range</p>
              <div className="flex gap-2 items-center">
                <Calendar size={18} className="text-muted-foreground" />
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-input bg-background text-foreground"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                  <option value="custom">Custom range</option>
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* Report Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getReportData().map((item) => (
            <Card key={item.name} className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-sm font-medium text-muted-foreground mb-2">{item.name}</p>
              <p className="text-3xl font-bold text-foreground mb-4">{item.value}</p>
              <div className="w-full h-16 bg-muted rounded-lg"></div>
            </Card>
          ))}
        </div>

        {/* Detailed Report */}
        <Card className="p-8 border-0 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="text-primary" size={24} />
            <h2 className="text-xl font-bold text-foreground">
              {reportType === "usage"
                ? "Tenant Usage Analytics"
                : reportType === "revenue"
                  ? "Revenue Analytics"
                  : "System Performance Metrics"}
            </h2>
          </div>

          <div className="space-y-4">
            {reportType === "usage" && (
              <>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-foreground">Platform Adoption</p>
                    <span className="text-sm text-primary">↑ 12%</span>
                  </div>
                  <div className="w-full h-2 bg-input rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-primary"></div>
                  </div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-foreground">Feature Utilization</p>
                    <span className="text-sm text-primary">↑ 8%</span>
                  </div>
                  <div className="w-full h-2 bg-input rounded-full overflow-hidden">
                    <div className="h-full w-4/5 bg-primary"></div>
                  </div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-foreground">API Usage Rate</p>
                    <span className="text-sm text-primary">↑ 15%</span>
                  </div>
                  <div className="w-full h-2 bg-input rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-primary"></div>
                  </div>
                </div>
              </>
            )}

            {reportType === "revenue" && (
              <>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-foreground">Monthly Growth</p>
                    <span className="text-2xl font-bold text-green-600">+12%</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Revenue increased from $111K to $124.5K this month
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-foreground">Annual Recurring Revenue</p>
                    <span className="text-2xl font-bold text-primary">$1.05M</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Projection based on current MRR</p>
                </div>
              </>
            )}

            {reportType === "performance" && (
              <>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-foreground">System Health</p>
                    <span className="text-sm text-green-600">Excellent</span>
                  </div>
                  <p className="text-sm text-muted-foreground">All systems operating normally</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-foreground">Reliability</p>
                    <span className="text-sm text-green-600">99.97% uptime</span>
                  </div>
                  <p className="text-sm text-muted-foreground">SLA target exceeded</p>
                </div>
              </>
            )}
          </div>
        </Card>

        {/* Export Options */}
        <Card className="p-8 border-0 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-4">Export Options</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline">
              <Download size={16} className="mr-2" />
              Export as PDF
            </Button>
            <Button variant="outline">
              <Download size={16} className="mr-2" />
              Export as CSV
            </Button>
            <Button variant="outline">
              <Download size={16} className="mr-2" />
              Export as Excel
            </Button>
          </div>
        </Card>
      </div>
    </AdminLayout>
  )
}
