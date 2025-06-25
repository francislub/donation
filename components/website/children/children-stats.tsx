"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Globe, GraduationCap, TrendingUp, Award } from "lucide-react"

interface ChildrenStats {
  total: number
  available: number
  sponsored: number
  countries: number
  successRate: number
  newThisMonth: number
}

export function ChildrenStats() {
  const [stats, setStats] = useState<ChildrenStats>({
    total: 0,
    available: 0,
    sponsored: 0,
    countries: 15,
    successRate: 95,
    newThisMonth: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/children/stats")
        if (response.ok) {
          const data = await response.json()
          setStats({
            total: data.total || 0,
            available: data.available || 0,
            sponsored: data.sponsored || 0,
            countries: 15,
            successRate: 95,
            newThisMonth: Math.floor(data.total * 0.1) || 0,
          })
        }
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statsData = [
    {
      title: "Total Children",
      value: stats.total,
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      description: "Children in our program",
    },
    {
      title: "Available for Sponsorship",
      value: stats.available,
      icon: Heart,
      color: "from-pink-500 to-rose-500",
      description: "Waiting for sponsors",
    },
    {
      title: "Currently Sponsored",
      value: stats.sponsored,
      icon: GraduationCap,
      color: "from-green-500 to-emerald-500",
      description: "Receiving support",
    },
    {
      title: "Countries Served",
      value: stats.countries,
      icon: Globe,
      color: "from-purple-500 to-violet-500",
      description: "Across the globe",
    },
    {
      title: "Success Rate",
      value: `${stats.successRate}%`,
      icon: Award,
      color: "from-yellow-500 to-orange-500",
      description: "Complete education",
    },
    {
      title: "New This Month",
      value: stats.newThisMonth,
      icon: TrendingUp,
      color: "from-indigo-500 to-blue-500",
      description: "Recently joined",
    },
  ]

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Impact in Numbers</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See the real difference we're making in children's lives around the world
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-20 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Impact in Numbers</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See the real difference we're making in children's lives around the world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statsData.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gray-900 group-hover:scale-105 transition-transform duration-300">
                        {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{stat.title}</h3>
                  <p className="text-gray-600 text-sm">{stat.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Progress Bar */}
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Sponsorship Progress</h3>
            <p className="text-gray-600">Help us reach our goal of sponsoring all children</p>
          </div>

          <div className="relative">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Sponsored: {stats.sponsored}</span>
              <span>Goal: {stats.total}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: stats.total > 0 ? `${(stats.sponsored / stats.total) * 100}%` : "0%",
                }}
              ></div>
            </div>
            <div className="text-center mt-4">
              <span className="text-2xl font-bold text-gray-900">
                {stats.total > 0 ? Math.round((stats.sponsored / stats.total) * 100) : 0}%
              </span>
              <span className="text-gray-600 ml-2">of children sponsored</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
