import { AdminLayout } from "@/components/layout/admin-layout"
import type { Metadata } from "next"
import { BarChart3, Building2, CreditCard, Database, AlertCircle, Users } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Super Admin Dashboard - Talla HRMS",
  description: "Super Admin dashboard and system overview",
}

export default function DashboardPage() {
  const statsCards = [
    {
      title: "Total Tenants",
      value: "12",
      icon: Building2,
      color: "primary",
      trend: "+2 this month",
    },
    {
      title: "Active Users",
      value: "8,542",
      icon: Users,
      color: "secondary",
      trend: "+485 this month",
    },
    {
      title: "Monthly Revenue",
      value: "$124,560",
      icon: CreditCard,
      color: "accent",
      trend: "+12% growth",
    },
    {
      title: "System Uptime",
      value: "99.97%",
      icon: BarChart3,
      color: "primary",
      trend: "Last 30 days",
    },
  ]

  const healthStatus = [
    { name: "Application", status: "healthy" },
    { name: "Database", status: "healthy" },
    { name: "Email Service", status: "healthy" },
    { name: "Payment Gateway", status: "healthy" },
  ]

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Here's your system overview and key metrics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title} className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground mb-2">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground mb-2">{stat.value}</p>
                    <p className="text-xs text-accent">{stat.trend}</p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon className="text-primary" size={24} />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* System Health & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* System Health */}
          <Card className="lg:col-span-2 p-6 border-0 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground mb-6">System Health</h2>
            <div className="space-y-4">
              {healthStatus.map((service) => (
                <div key={service.name} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${service.status === "healthy" ? "bg-green-500" : "bg-red-500"}`}
                    ></div>
                    <span className="font-medium text-foreground">{service.name}</span>
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      service.status === "healthy" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {service.status === "healthy" ? "Healthy" : "Issues"}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6 border-0 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <Link href="/tenants">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Building2 size={18} className="mr-2" />
                  Create Tenant
                </Button>
              </Link>
              <Link href="/billing">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <CreditCard size={18} className="mr-2" />
                  View Billing
                </Button>
              </Link>
              <Link href="/monitoring">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Database size={18} className="mr-2" />
                  Check Monitoring
                </Button>
              </Link>
              <Link href="/issues">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <AlertCircle size={18} className="mr-2" />
                  View Issues
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="p-6 border-0 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-6">Recent Tenant Activity</h2>
          <div className="space-y-3">
            {[
              { company: "Acme Corp", action: "Login", time: "2 minutes ago" },
              { company: "TechStart Inc", action: "Payroll Run", time: "1 hour ago" },
              { company: "Global Solutions", action: "Updated Subscription", time: "3 hours ago" },
              { company: "Innovation Labs", action: "Employee Added", time: "5 hours ago" },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-border last:border-b-0"
              >
                <div>
                  <p className="font-medium text-foreground">{activity.company}</p>
                  <p className="text-sm text-muted-foreground">{activity.action}</p>
                </div>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AdminLayout>
  )
}
