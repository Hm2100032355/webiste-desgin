"use client"

import type React from "react"

import { AdminLayout } from "@/components/layout/admin-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, Database, AlertCircle, Zap, Download } from "lucide-react"
import { useState } from "react"

interface MetricData {
  timestamp: string
  value: number
}

interface SystemMetric {
  name: string
  status: "healthy" | "warning" | "critical"
  value: string
  unit: string
  icon: React.ReactNode
  trend: string
}

export default function MonitoringPage() {
  const [timeRange, setTimeRange] = useState<"1h" | "6h" | "24h" | "7d">("24h")

  const systemMetrics: SystemMetric[] = [
    {
      name: "API Response Time",
      status: "healthy",
      value: "142",
      unit: "ms",
      icon: <Zap size={24} />,
      trend: "-8% from last week",
    },
    {
      name: "Database CPU",
      status: "healthy",
      value: "32",
      unit: "%",
      icon: <Database size={24} />,
      trend: "Normal",
    },
    {
      name: "Error Rate",
      status: "healthy",
      value: "0.05",
      unit: "%",
      icon: <AlertCircle size={24} />,
      trend: "Very low",
    },
    {
      name: "System Uptime",
      status: "healthy",
      value: "99.97",
      unit: "%",
      icon: <Activity size={24} />,
      trend: "30-day average",
    },
  ]

  const serviceStatuses = [
    { name: "API Gateway", status: "healthy", uptime: "99.99%" },
    { name: "Database Server", status: "healthy", uptime: "99.95%" },
    { name: "Email Service", status: "healthy", uptime: "99.98%" },
    { name: "File Storage", status: "healthy", uptime: "99.99%" },
    { name: "Payment Gateway", status: "healthy", uptime: "99.97%" },
    { name: "Background Jobs", status: "healthy", uptime: "99.94%" },
  ]

  const recentAlerts = [
    {
      id: 1,
      message: "High API response time detected",
      service: "API Gateway",
      severity: "warning",
      time: "2 hours ago",
    },
    {
      id: 2,
      message: "Database query slow - optimization recommended",
      service: "Database",
      severity: "info",
      time: "5 hours ago",
    },
    {
      id: 3,
      message: "Memory usage above 80%",
      service: "Application Server",
      severity: "warning",
      time: "12 hours ago",
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Monitoring & System Health</h1>
            <p className="text-muted-foreground">Real-time system performance and health metrics</p>
          </div>
          <div className="flex gap-2">
            {["1h", "6h", "24h", "7d"].map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(range as any)}
              >
                {range}
              </Button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemMetrics.map((metric) => (
            <Card key={metric.name} className="p-6 border-0 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-lg ${
                    metric.status === "healthy"
                      ? "bg-green-100"
                      : metric.status === "warning"
                        ? "bg-yellow-100"
                        : "bg-red-100"
                  }`}
                >
                  <div
                    className={
                      metric.status === "healthy"
                        ? "text-green-600"
                        : metric.status === "warning"
                          ? "text-yellow-600"
                          : "text-red-600"
                    }
                  >
                    {metric.icon}
                  </div>
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded capitalize ${
                    metric.status === "healthy"
                      ? "bg-green-100 text-green-700"
                      : metric.status === "warning"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {metric.status}
                </span>
              </div>
              <p className="text-sm font-medium text-muted-foreground mb-2">{metric.name}</p>
              <div className="flex items-baseline gap-2 mb-2">
                <p className="text-3xl font-bold text-foreground">{metric.value}</p>
                <p className="text-sm text-muted-foreground">{metric.unit}</p>
              </div>
              <p className="text-xs text-muted-foreground">{metric.trend}</p>
            </Card>
          ))}
        </div>

        {/* Service Status */}
        <Card className="p-8 border-0 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Service Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {serviceStatuses.map((service) => (
              <div key={service.name} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground">{service.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs font-medium text-green-600">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Uptime</span>
                  <span className="font-semibold text-foreground">{service.uptime}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Alerts */}
        <Card className="p-8 border-0 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">Recent Alerts</h2>
            <Button variant="outline" size="sm">
              <Download size={16} className="mr-2" />
              Export Logs
            </Button>
          </div>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border-l-4 flex items-start justify-between ${
                  alert.severity === "critical"
                    ? "border-l-red-500 bg-red-50"
                    : alert.severity === "warning"
                      ? "border-l-yellow-500 bg-yellow-50"
                      : "border-l-blue-500 bg-blue-50"
                }`}
              >
                <div className="flex-1">
                  <p
                    className={`font-medium ${
                      alert.severity === "critical"
                        ? "text-red-700"
                        : alert.severity === "warning"
                          ? "text-yellow-700"
                          : "text-blue-700"
                    }`}
                  >
                    {alert.message}
                  </p>
                  <p
                    className={`text-sm mt-1 ${
                      alert.severity === "critical"
                        ? "text-red-600"
                        : alert.severity === "warning"
                          ? "text-yellow-600"
                          : "text-blue-600"
                    }`}
                  >
                    {alert.service}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground ml-4">{alert.time}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Database Metrics */}
        <Card className="p-8 border-0 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Database Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-border rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">Total Queries/min</p>
              <p className="text-3xl font-bold text-foreground">15,234</p>
              <p className="text-xs text-muted-foreground mt-2">Peak: 18,950</p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">Avg Query Time</p>
              <p className="text-3xl font-bold text-foreground">234ms</p>
              <p className="text-xs text-muted-foreground mt-2">Max: 1,245ms</p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">DB Storage</p>
              <p className="text-3xl font-bold text-foreground">156 GB</p>
              <p className="text-xs text-muted-foreground mt-2">45% of allocated</p>
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  )
}
