"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Heart, AlertCircle } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts"

interface DashboardChartsProps {
  pieData: Array<{ name: string; value: number; color: string }>
  donationMethodData: Array<{ method: string; amount: number; count: number }>
  sponsorshipRate: number
  sponsorshipStats: Array<{ isActive: boolean; _count: number }>
}

export function DashboardCharts({
  pieData,
  donationMethodData,
  sponsorshipRate,
  sponsorshipStats,
}: DashboardChartsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Sponsorship Overview */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Sponsorship Overview</CardTitle>
          <CardDescription>Children sponsorship status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
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
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
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
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={donationMethodData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="method" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
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
              <span className="text-sm">Sponsorship Rate</span>
            </div>
            <span className="font-semibold">{sponsorshipRate.toFixed(1)}%</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4 text-red-500" />
              <span className="text-sm">Active Sponsorships</span>
            </div>
            <span className="font-semibold">{sponsorshipStats.find((s) => s.isActive)?._count || 0}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-orange-500" />
              <span className="text-sm">Inactive Sponsorships</span>
            </div>
            <span className="font-semibold">{sponsorshipStats.find((s) => !s.isActive)?._count || 0}</span>
          </div>

          {/* Visual Progress Bars */}
          <div className="space-y-3 pt-4 border-t">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Sponsorship Progress</span>
                <span>{sponsorshipRate.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(sponsorshipRate, 100)}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Monthly Goal</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full w-3/4 transition-all duration-300"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
