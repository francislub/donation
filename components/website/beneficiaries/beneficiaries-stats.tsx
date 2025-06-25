"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users, Heart, Globe, Award, Loader2 } from "lucide-react"

interface Stats {
  totalChildren: number
  sponsoredChildren: number
  availableChildren: number
  totalBeneficiaries: number
}

export function BeneficiariesStats() {
  const [stats, setStats] = useState<Stats>({
    totalChildren: 0,
    sponsoredChildren: 0,
    availableChildren: 0,
    totalBeneficiaries: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [childrenResponse, beneficiariesResponse] = await Promise.all([
        fetch("/api/children/public"),
        fetch("/api/beneficiaries/public"),
      ])

      const children = await childrenResponse.json()
      const beneficiaries = await beneficiariesResponse.json()

      const totalChildren = children.length
      const sponsoredChildren = children.filter((child: any) => child.isSponsored).length
      const availableChildren = children.filter((child: any) => !child.isSponsored && child.isActive).length

      setStats({
        totalChildren,
        sponsoredChildren,
        availableChildren,
        totalBeneficiaries: beneficiaries.length,
      })
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const statsData = [
    {
      icon: Users,
      label: "Children in Program",
      value: stats.totalChildren,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Heart,
      label: "Children Sponsored",
      value: stats.sponsoredChildren,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      icon: Globe,
      label: "Waiting for Sponsors",
      value: stats.availableChildren,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: Award,
      label: "Total Beneficiaries",
      value: stats.totalBeneficiaries,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center min-h-[200px]">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-lg text-gray-600">Loading statistics...</span>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Impact in Numbers</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See the difference we're making together in communities around the world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className={`w-16 h-16 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
