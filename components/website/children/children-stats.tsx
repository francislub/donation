"use client"

import { useState, useEffect } from "react"
import { Heart, Users, MapPin, GraduationCap } from "lucide-react"

interface Stats {
  totalChildren: number
  sponsoredChildren: number
  availableChildren: number
  countries: number
}

export function ChildrenStats() {
  const [stats, setStats] = useState<Stats>({
    totalChildren: 0,
    sponsoredChildren: 0,
    availableChildren: 0,
    countries: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/children/stats")
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statItems = [
    {
      icon: Users,
      label: "Total Children",
      value: stats.totalChildren,
      color: "from-blue-500 to-purple-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      icon: Heart,
      label: "Sponsored Children",
      value: stats.sponsoredChildren,
      color: "from-pink-500 to-red-600",
      bgColor: "bg-pink-50",
      textColor: "text-pink-600",
    },
    {
      icon: GraduationCap,
      label: "Waiting for Sponsors",
      value: stats.availableChildren,
      color: "from-green-500 to-teal-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      icon: MapPin,
      label: "Countries",
      value: stats.countries,
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
  ]

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-2xl mx-auto mb-4 animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Impact in Numbers</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See the difference we're making together in children's lives around the world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statItems.map((item, index) => (
            <div
              key={index}
              className={`${item.bgColor} rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100`}
            >
              <div
                className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
              >
                <item.icon className="h-10 w-10 text-white" />
              </div>
              <div className={`text-4xl font-bold ${item.textColor} mb-2`}>{item.value.toLocaleString()}</div>
              <div className="text-gray-600 font-medium">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
