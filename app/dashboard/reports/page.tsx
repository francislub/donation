import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, TrendingUp, Users, DollarSign } from "lucide-react"

async function getReportsData() {
  const [totalDonations, monthlyDonations, sponsorshipStats, childrenStats] = await Promise.all([
    prisma.donation.aggregate({
      _sum: { amount: true },
      _count: true,
    }),
    prisma.donation.groupBy({
      by: ["date"],
      _sum: { amount: true },
      orderBy: { date: "desc" },
      take: 12,
    }),
    prisma.sponsorship.groupBy({
      by: ["isActive"],
      _count: true,
    }),
    prisma.child.groupBy({
      by: ["isSponsored"],
      _count: true,
    }),
  ])

  return {
    totalDonations,
    monthlyDonations,
    sponsorshipStats,
    childrenStats,
  }
}

export default async function ReportsPage() {
  const data = await getReportsData()

  const activeSponsorship = data.sponsorshipStats.find((s) => s.isActive)?._count || 0
  const inactiveSponsorship = data.sponsorshipStats.find((s) => !s.isActive)?._count || 0

  const sponsoredChildren = data.childrenStats.find((c) => c.isSponsored)?._count || 0
  const unsponsored = data.childrenStats.find((c) => !c.isSponsored)?._count || 0

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">View comprehensive reports and analytics</p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
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

      {/* Detailed Reports */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Donation Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total Amount:</span>
                <span className="font-semibold">${(data.totalDonations._sum.amount || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Donations:</span>
                <span className="font-semibold">{data.totalDonations._count}</span>
              </div>
              <div className="flex justify-between">
                <span>Average Donation:</span>
                <span className="font-semibold">
                  $
                  {data.totalDonations._count > 0
                    ? Math.round((data.totalDonations._sum.amount || 0) / data.totalDonations._count)
                    : 0}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sponsorship Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Active Sponsorships:</span>
                <span className="font-semibold text-green-600">{activeSponsorship}</span>
              </div>
              <div className="flex justify-between">
                <span>Inactive Sponsorships:</span>
                <span className="font-semibold text-red-600">{inactiveSponsorship}</span>
              </div>
              <div className="flex justify-between">
                <span>Children Sponsored:</span>
                <span className="font-semibold text-blue-600">{sponsoredChildren}</span>
              </div>
              <div className="flex justify-between">
                <span>Awaiting Sponsorship:</span>
                <span className="font-semibold text-orange-600">{unsponsored}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Export Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Donations (CSV)
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Sponsors (CSV)
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Children (CSV)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
