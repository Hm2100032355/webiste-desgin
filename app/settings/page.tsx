"use client"

import type React from "react"

import { AdminLayout } from "@/components/layout/admin-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Save, Lock, Bell, Palette } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"branding" | "security" | "notifications">("branding")
  const [saved, setSaved] = useState(false)

  const [settings, setSettings] = useState({
    platformName: "Talla HRMS",
    logoUrl: "https://example.com/logo.png",
    primaryColor: "#3d3d7d",
    secondaryColor: "#5a5a8a",
    supportEmail: "support@talla.com",
    twoFactorEnabled: true,
    ipWhitelistEnabled: false,
    ipWhitelist: "203.0.113.0,198.51.100.0",
    sessionTimeout: "30",
    emailApiKey: "sk_test_...",
    smsApiKey: "sk_test_...",
    whatsappApiKey: "sk_test_...",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-5xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Configure global platform settings and preferences</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-border">
          {["branding", "security", "notifications"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 font-medium border-b-2 transition-colors capitalize flex items-center gap-2 ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "branding" && <Palette size={18} />}
              {tab === "security" && <Lock size={18} />}
              {tab === "notifications" && <Bell size={18} />}
              {tab}
            </button>
          ))}
        </div>

        {/* Branding Settings */}
        {activeTab === "branding" && (
          <div className="space-y-6">
            <Card className="p-8 border-0 shadow-sm">
              <h2 className="text-xl font-bold text-foreground mb-6">Platform Branding</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Platform Name</label>
                  <Input type="text" name="platformName" value={settings.platformName} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Support Email</label>
                  <Input type="email" name="supportEmail" value={settings.supportEmail} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Logo URL</label>
                  <Input type="url" name="logoUrl" value={settings.logoUrl} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Primary Color</label>
                  <div className="flex gap-3">
                    <Input
                      type="color"
                      name="primaryColor"
                      value={settings.primaryColor}
                      onChange={handleInputChange}
                      className="w-16 h-10 p-1"
                    />
                    <Input type="text" value={settings.primaryColor} disabled />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Secondary Color</label>
                  <div className="flex gap-3">
                    <Input
                      type="color"
                      name="secondaryColor"
                      value={settings.secondaryColor}
                      onChange={handleInputChange}
                      className="w-16 h-10 p-1"
                    />
                    <Input type="text" value={settings.secondaryColor} disabled />
                  </div>
                </div>
              </div>

              {/* Color Preview */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-foreground mb-4">Color Preview</h3>
                <div className="flex gap-4">
                  <div className="space-y-2">
                    <div className="w-24 h-24 rounded-lg" style={{ backgroundColor: settings.primaryColor }}></div>
                    <p className="text-xs text-center text-muted-foreground">Primary</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-24 h-24 rounded-lg" style={{ backgroundColor: settings.secondaryColor }}></div>
                    <p className="text-xs text-center text-muted-foreground">Secondary</p>
                  </div>
                </div>
              </div>

              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save size={18} />
                Save Branding Settings
              </Button>
              {saved && <p className="text-sm text-green-600 mt-2">Settings saved successfully!</p>}
            </Card>
          </div>
        )}

        {/* Security Settings */}
        {activeTab === "security" && (
          <div className="space-y-6">
            <Card className="p-8 border-0 shadow-sm">
              <h2 className="text-xl font-bold text-foreground mb-6">Security Configuration</h2>
              <div className="space-y-6 mb-8">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Require 2FA for all admin users</p>
                  </div>
                  <input
                    type="checkbox"
                    name="twoFactorEnabled"
                    checked={settings.twoFactorEnabled}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded"
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">IP Whitelist</p>
                    <p className="text-sm text-muted-foreground">Restrict admin access by IP address</p>
                  </div>
                  <input
                    type="checkbox"
                    name="ipWhitelistEnabled"
                    checked={settings.ipWhitelistEnabled}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded"
                  />
                </div>

                {settings.ipWhitelistEnabled && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Whitelisted IPs (comma-separated)
                    </label>
                    <textarea
                      name="ipWhitelist"
                      value={settings.ipWhitelist}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Session Timeout (minutes)</label>
                  <Input
                    type="number"
                    name="sessionTimeout"
                    value={settings.sessionTimeout}
                    onChange={handleInputChange}
                    min="5"
                    max="480"
                  />
                  <p className="text-xs text-muted-foreground mt-1">How long before inactive sessions expire</p>
                </div>
              </div>

              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save size={18} />
                Save Security Settings
              </Button>
              {saved && <p className="text-sm text-green-600 mt-2">Settings saved successfully!</p>}
            </Card>
          </div>
        )}

        {/* Notification Settings */}
        {activeTab === "notifications" && (
          <div className="space-y-6">
            <Card className="p-8 border-0 shadow-sm">
              <h2 className="text-xl font-bold text-foreground mb-6">Notification Providers</h2>
              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email API Key</label>
                  <div className="flex gap-3">
                    <Input
                      type="password"
                      name="emailApiKey"
                      value={settings.emailApiKey}
                      onChange={handleInputChange}
                      placeholder="Your email service API key"
                    />
                    <Button variant="outline" size="sm">
                      Test
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">SendGrid or equivalent service</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">SMS API Key</label>
                  <div className="flex gap-3">
                    <Input
                      type="password"
                      name="smsApiKey"
                      value={settings.smsApiKey}
                      onChange={handleInputChange}
                      placeholder="Your SMS service API key"
                    />
                    <Button variant="outline" size="sm">
                      Test
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Twilio or equivalent service</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">WhatsApp API Key</label>
                  <div className="flex gap-3">
                    <Input
                      type="password"
                      name="whatsappApiKey"
                      value={settings.whatsappApiKey}
                      onChange={handleInputChange}
                      placeholder="Your WhatsApp API key"
                    />
                    <Button variant="outline" size="sm">
                      Test
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">WhatsApp Business API</p>
                </div>
              </div>

              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save size={18} />
                Save Notification Settings
              </Button>
              {saved && <p className="text-sm text-green-600 mt-2">Settings saved successfully!</p>}
            </Card>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
