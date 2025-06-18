import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Users, Baby, Heart, DollarSign, TrendingUp, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

async function getDashboardData() {
  const [
    childrenStats,
    beneficiariesCount,
    sponsorsCount,
    donationsData,
    recentChildren,
    monthlyDonations,
    sponsorshipStats,
  ] = await Promise.all([
    prisma.child.groupBy({
      by: ["isSponsored"],
      _count: true,
    }),
    prisma.beneficiary.count(),
    prisma.sponsor.count(),
    prisma.donation.aggregate({
      _sum: { amount: true },
      _count: true,
    }),
    prisma.child.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        sponsorships: {
          include: { sponsor: true },
        },
      },
    }),
    prisma.donation.groupBy({
      by: ["method"],
      _sum: { amount: true },
      _count: true,
    }),
    prisma.sponsorship.groupBy({
      by: ["isActive"],
      _count: true,
    }),
  ])

  const sponsoredChildren = childrenStats.find((s) => s.isSponsored)?._count || 0
  const unsponsored = childrenStats.find((s) => !s.isSponsored)?._count || 0
  const totalChildren = sponsoredChildren + unsponsored

  return {
    children: { sponsored: sponsoredChildren, unsponsored, total: totalChildren },
    beneficiaries: beneficiariesCount,
    sponsors: sponsorsCount,
    donations: donationsData,
    recentChildren,
    monthlyDonations,
    sponsorshipStats,
  }
}

export default async function DashboardPage() {
  const data = await getDashboardData()

  const sponsorshipRate = data.children.total > 0 ? (data.children.sponsored / data.children.total) * 100 : 0

  const pieData = [
    { name: "Sponsored", value: data.children.sponsored, color: "#10b981" },
    { name: "Awaiting Sponsorship", value: data.children.unsponsored, color: "#f59e0b" },
  ]

  const donationMethodData = data.monthlyDonations.map((item) => ({
    method: item.method.replace("_", " "),
    amount: item._sum.amount || 0,
    count: item._count,
  }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your charity today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Children</CardTitle>
            <Baby className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{data.children.total}</div>
            <p className="text-xs text-muted-foreground">
              {data.children.sponsored} sponsored, {data.children.unsponsored} waiting
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sponsors</CardTitle>
            <Heart className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{data.sponsors}</div>
            <p className="text-xs text-muted-foreground">Supporting our mission</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Beneficiaries</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{data.beneficiaries}</div>
            <p className="text-xs text-muted-foreground">Families receiving aid</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <DollarSign className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              ${(data.donations._sum.amount || 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">From {data.donations._count} donations</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Sponsorship Overview */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Sponsorship Overview</CardTitle>
            <CardDescription>Children sponsorship status</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                sponsored: { label: "Sponsored", color: "#10b981" },
                unsponsored: { label: "Awaiting", color: "#f59e0b" },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span>Sponsorship Rate</span>
                <span className="font-medium">{sponsorshipRate.toFixed(1)}%</span>
              </div>
              <Progress value={sponsorshipRate} className="mt-2" />
            </div>
          </CardContent>
        </Card>

        {/* Donation Methods */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Donation Methods</CardTitle>
            <CardDescription>Breakdown by payment method</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                amount: { label: "Amount", color: "#3b82f6" },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={donationMethodData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="method" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm">Avg. Donation</span>
              </div>
              <span className="font-semibold">
                ${data.donations._count > 0 ? Math.round((data.donations._sum.amount || 0) / data.donations._count) : 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-red-500" />
                <span className="text-sm">Active Sponsorships</span>
              </div>
              <span className="font-semibold">{data.sponsorshipStats.find((s) => s.isActive)?._count || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-orange-500" />
                <span className="text-sm">Needs Attention</span>
              </div>
              <span className="font-semibold">{data.children.unsponsored}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Children Added</CardTitle>
            <CardDescription>Latest children profiles awaiting sponsorship</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentChildren.map((child) => (
                <div key={child.id} className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {child.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{child.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Age {child.age} • {child.location}
                    </p>
                  </div>
                  <Badge variant={child.isSponsored ? "default" : "secondary"}>
                    {child.isSponsored ? "Sponsored" : "Available"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
            <CardDescription>Important notifications and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Children Awaiting Sponsorship</p>
                  <p className="text-xs text-muted-foreground">
                    {data.children.unsponsored} children are still waiting for sponsors
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Monthly Goal Progress</p>
                  <p className="text-xs text-muted-foreground">Great progress on this month's fundraising goals</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Heart className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">New Sponsor Registrations</p>
                  <p className="text-xs text-muted-foreground">Welcome new sponsors to our community</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
