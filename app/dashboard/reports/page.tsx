"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, TrendingUp, Users, DollarSign, FileText, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { toast } from "sonner"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"

interface ReportsData {
  totalDonations: {
    _sum: { amount: number | null }
    _count: number
  }
  monthlyDonations: Array<{
    date: Date
    _sum: { amount: number | null }
  }>
  sponsorshipStats: Array<{
    isActive: boolean
    _count: number
  }>
  childrenStats: Array<{
    isSponsored: boolean
    _count: number
  }>
  children: Array<{
    id: string
    name: string
    age: number
    location: string
    isSponsored: boolean
    createdAt: Date
  }>
  sponsors: Array<{
    id: string
    name: string
    email: string
    phone: string | null
    status: string
    createdAt: Date
  }>
  donations: Array<{
    id: string
    amount: number
    donorName: string
    donorEmail: string
    status: string
    date: Date
  }>
}

export default function ReportsPage() {
  const [data, setData] = useState<ReportsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [exportLoading, setExportLoading] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [reportType, setReportType] = useState<string>("all")

  useEffect(() => {
    fetchReportsData()
  }, [dateRange, reportType])

  const fetchReportsData = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()

      if (dateRange?.from) {
        params.append("from", dateRange.from.toISOString())
      }
      if (dateRange?.to) {
        params.append("to", dateRange.to.toISOString())
      }
      if (reportType !== "all") {
        params.append("type", reportType)
      }

      const response = await fetch(`/api/reports?${params.toString()}`)
      if (!response.ok) throw new Error("Failed to fetch reports data")

      const reportsData = await response.json()
      setData(reportsData)
    } catch (error) {
      console.error("Error fetching reports data:", error)
      toast.error("Failed to load reports data")
    } finally {
      setLoading(false)
    }
  }

  const handleExport = async (type: "children" | "sponsors" | "donations", format: "csv" | "pdf") => {
    try {
      setExportLoading(`${type}-${format}`)

      const params = new URLSearchParams()
      params.append("type", type)
      params.append("format", format)

      if (dateRange?.from) {
        params.append("from", dateRange.from.toISOString())
      }
      if (dateRange?.to) {
        params.append("to", dateRange.to.toISOString())
      }

      const response = await fetch(`/api/reports/export?${params.toString()}`)
      if (!response.ok) throw new Error("Export failed")

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.style.display = "none"
      a.href = url
      a.download = `${type}-report-${format === "pdf" ? "pdf" : "csv"}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} report exported successfully`)
    } catch (error) {
      console.error("Export error:", error)
      toast.error("Failed to export report")
    } finally {
      setExportLoading(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading reports...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Failed to load reports data</p>
        <Button onClick={fetchReportsData} className="mt-4">
          Retry
        </Button>
      </div>
    )
  }

  const activeSponsorship = data.sponsorshipStats.find((s) => s.isActive)?._count || 0
  const inactiveSponsorship = data.sponsorshipStats.find((s) => !s.isActive)?._count || 0
  const sponsoredChildren = data.childrenStats.find((c) => c.isSponsored)?._count || 0
  const unsponsored = data.childrenStats.find((c) => !c.isSponsored)?._count || 0

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">View comprehensive reports and analytics</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium mb-2 block">Date Range</label>
              <DatePickerWithRange date={dateRange} setDate={setDateRange} />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium mb-2 block">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reports</SelectItem>
                  <SelectItem value="donations">Donations Only</SelectItem>
                  <SelectItem value="sponsorships">Sponsorships Only</SelectItem>
                  <SelectItem value="children">Children Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(data.totalDonations._sum.amount || 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{data.totalDonations._count} donations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sponsorships</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSponsorship}</div>
            <p className="text-xs text-muted-foreground">{inactiveSponsorship} inactive</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sponsored Children</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sponsoredChildren}</div>
            <p className="text-xs text-muted-foreground">{unsponsored} awaiting sponsorship</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sponsorship Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sponsoredChildren + unsponsored > 0
                ? Math.round((sponsoredChildren / (sponsoredChildren + unsponsored)) * 100)
                : 0}
              %
            </div>
            <p className="text-xs text-muted-foreground">of children sponsored</p>
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              Children Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">Export detailed information about all children in the program</p>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleExport("children", "csv")}
                disabled={exportLoading === "children-csv"}
              >
                {exportLoading === "children-csv" ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
                ) : (
                  <Download className="mr-2 h-4 w-4" />
                )}
                Export CSV
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleExport("children", "pdf")}
                disabled={exportLoading === "children-pdf"}
              >
                {exportLoading === "children-pdf" ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
                ) : (
                  <FileText className="mr-2 h-4 w-4" />
                )}
                Export PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Sponsors Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">Export comprehensive sponsor information and contact details</p>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleExport("sponsors", "csv")}
                disabled={exportLoading === "sponsors-csv"}
              >
                {exportLoading === "sponsors-csv" ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
                ) : (
                  <Download className="mr-2 h-4 w-4" />
                )}
                Export CSV
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleExport("sponsors", "pdf")}
                disabled={exportLoading === "sponsors-pdf"}
              >
                {exportLoading === "sponsors-pdf" ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
                ) : (
                  <FileText className="mr-2 h-4 w-4" />
                )}
                Export PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Donations Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">Export donation history and financial summaries</p>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleExport("donations", "csv")}
                disabled={exportLoading === "donations-csv"}
              >
                {exportLoading === "donations-csv" ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
                ) : (
                  <Download className="mr-2 h-4 w-4" />
                )}
                Export CSV
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleExport("donations", "pdf")}
                disabled={exportLoading === "donations-pdf"}
              >
                {exportLoading === "donations-pdf" ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
                ) : (
                  <FileText className="mr-2 h-4 w-4" />
                )}
                Export PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Tables Preview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Children ({data.children.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {data.children.slice(0, 5).map((child) => (
                <div key={child.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{child.name}</p>
                    <p className="text-sm text-gray-600">
                      {child.age} years • {child.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        child.isSponsored ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {child.isSponsored ? "Sponsored" : "Available"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Donations ({data.donations.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {data.donations.slice(0, 5).map((donation) => (
                <div key={donation.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{donation.donorName}</p>
                    <p className="text-sm text-gray-600">{donation.donorEmail}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">${donation.amount}</p>
                    <p className="text-xs text-gray-500">{format(new Date(donation.date), "MMM dd, yyyy")}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
