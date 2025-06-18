"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    organizationName: "Charity Organization",
    email: "admin@charity.org",
    phone: "+1234567890",
    address: "123 Charity Street, City, Country",
    website: "https://charity.org",
    description: "We help children and families in need.",
    paypalEnabled: true,
    stripeEnabled: false,
    bankTransferEnabled: true,
    mobileMoneyEnabled: true,
    emailNotifications: true,
    smsNotifications: false,
    theme: "light",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSave = async (section: string) => {
    setLoading(true)
    setMessage("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setMessage(`${section} settings saved successfully!`)
    } catch (error) {
      setMessage("Failed to save settings. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings & Configuration</h1>
        <p className="text-gray-600">Manage your organization settings and preferences</p>
      </div>

      {message && (
        <Alert className="mb-6">
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="organization" className="space-y-6">
        <TabsList>
          <TabsTrigger value="organization">Organization</TabsTrigger>
          <TabsTrigger value="payments">Payment Gateways</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="organization">
          <Card>
            <CardHeader>
              <CardTitle>Organization Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="orgName">Organization Name</Label>
                  <Input
                    id="orgName"
                    value={settings.organizationName}
                    onChange={(e) => setSettings({ ...settings, organizationName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={settings.website}
                    onChange={(e) => setSettings({ ...settings, website: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={settings.description}
                  onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                  rows={4}
                />
              </div>

              <Button onClick={() => handleSave("Organization")} disabled={loading}>
                {loading ? "Saving..." : "Save Organization Settings"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment Gateway Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="paypal">PayPal</Label>
                    <p className="text-sm text-gray-600">Accept donations via PayPal</p>
                  </div>
                  <Switch
                    id="paypal"
                    checked={settings.paypalEnabled}
                    onCheckedChange={(checked) => setSettings({ ...settings, paypalEnabled: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="stripe">Stripe</Label>
                    <p className="text-sm text-gray-600">Accept credit card payments via Stripe</p>
                  </div>
                  <Switch
                    id="stripe"
                    checked={settings.stripeEnabled}
                    onCheckedChange={(checked) => setSettings({ ...settings, stripeEnabled: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="bank">Bank Transfer</Label>
                    <p className="text-sm text-gray-600">Accept direct bank transfers</p>
                  </div>
                  <Switch
                    id="bank"
                    checked={settings.bankTransferEnabled}
                    onCheckedChange={(checked) => setSettings({ ...settings, bankTransferEnabled: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="mobile">Mobile Money</Label>
                    <p className="text-sm text-gray-600">Accept mobile money payments</p>
                  </div>
                  <Switch
                    id="mobile"
                    checked={settings.mobileMoneyEnabled}
                    onCheckedChange={(checked) => setSettings({ ...settings, mobileMoneyEnabled: checked })}
                  />
                </div>
              </div>

              <Button onClick={() => handleSave("Payment")} disabled={loading}>
                {loading ? "Saving..." : "Save Payment Settings"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotif">Email Notifications</Label>
                    <p className="text-sm text-gray-600">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="emailNotif"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="smsNotif">SMS Notifications</Label>
                    <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                  </div>
                  <Switch
                    id="smsNotif"
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
                  />
                </div>
              </div>

              <Button onClick={() => handleSave("Notification")} disabled={loading}>
                {loading ? "Saving..." : "Save Notification Settings"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard Appearance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Theme</Label>
                  <div className="flex gap-4 mt-2">
                    <Button
                      variant={settings.theme === "light" ? "default" : "outline"}
                      onClick={() => setSettings({ ...settings, theme: "light" })}
                    >
                      Light
                    </Button>
                    <Button
                      variant={settings.theme === "dark" ? "default" : "outline"}
                      onClick={() => setSettings({ ...settings, theme: "dark" })}
                    >
                      Dark
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logo">Organization Logo URL</Label>
                  <Input id="logo" type="url" placeholder="https://example.com/logo.png" />
                </div>
              </div>

              <Button onClick={() => handleSave("Appearance")} disabled={loading}>
                {loading ? "Saving..." : "Save Appearance Settings"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
