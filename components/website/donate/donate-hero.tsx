"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Users, Globe, ArrowRight } from "lucide-react"
import Link from "next/link"

export function DonateHero() {
  const [stats, setStats] = useState({
    totalChildren: 0,
    sponsoredChildren: 0,
    availableChildren: 0,
    countries: 0,
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/children/stats")
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  return (
    <section className="relative py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000' fillOpacity='0.1'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3Ccircle cx='53' cy='7' r='7'/%3E%3Ccircle cx='7' cy='53' r='7'/%3E%3Ccircle cx='53' cy='53' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-pink-100 rounded-full border border-pink-200">
              <Heart className="h-4 w-4 text-pink-600 mr-2" />
              <span className="text-sm font-medium text-pink-600">Make a Difference Today</span>
            </div>

            {/* Main Heading */}
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
                Transform Lives
                <span className="block bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Through Giving
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                Your donation provides education, healthcare, and hope to children around the world. Every contribution
                makes a lasting impact on a child's future.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/children?filter=available">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-lg px-8 py-6 w-full sm:w-auto"
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Sponsor a Child
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/children">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-lg px-8 py-6 w-full sm:w-auto"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Browse Children
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600 mb-1">{stats.totalChildren}</div>
                <div className="text-sm text-gray-600">Total Children</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">{stats.availableChildren}</div>
                <div className="text-sm text-gray-600">Need Sponsors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">{stats.sponsoredChildren}</div>
                <div className="text-sm text-gray-600">Sponsored</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">{stats.countries}</div>
                <div className="text-sm text-gray-600">Countries</div>
              </div>
            </div>
          </div>

          {/* Interactive Card */}
          <div className="relative">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">Quick Impact</h3>
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-pink-50 rounded-xl border border-pink-100">
                    <div>
                      <div className="font-semibold text-gray-900">Full Sponsorship</div>
                      <div className="text-sm text-gray-600">Complete support for one child</div>
                    </div>
                    <div className="text-2xl font-bold text-pink-600">$50/mo</div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-100">
                    <div>
                      <div className="font-semibold text-gray-900">Education Support</div>
                      <div className="text-sm text-gray-600">School fees and supplies</div>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">$25/mo</div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div>
                      <div className="font-semibold text-gray-900">One-time Donation</div>
                      <div className="text-sm text-gray-600">Any amount helps</div>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">$10+</div>
                  </div>
                </div>

                <Link href="/children?filter=available">
                  <Button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-lg text-lg py-3">
                    Start Sponsoring Today
                  </Button>
                </Link>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl animate-float">
              <Users className="h-8 w-8 text-white" />
            </div>

            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl animate-float-delayed">
              <Globe className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
