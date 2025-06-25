"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Heart, Home, Users, Globe, TrendingUp, ArrowRight } from "lucide-react"
import Link from "next/link"

export function DonationImpact() {
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

  const impactAreas = [
    {
      icon: BookOpen,
      title: "Education",
      description: "School fees, supplies, and educational support",
      impact: "95% of sponsored children complete primary education",
      color: "blue",
    },
    {
      icon: Heart,
      title: "Healthcare",
      description: "Medical care, checkups, and health education",
      impact: "Regular health monitoring for all sponsored children",
      color: "pink",
    },
    {
      icon: Home,
      title: "Basic Needs",
      description: "Food, clean water, and safe shelter",
      impact: "100% of children receive nutritious meals daily",
      color: "green",
    },
    {
      icon: Users,
      title: "Community",
      description: "Family support and community development",
      impact: "Entire communities benefit from child sponsorship programs",
      color: "purple",
    },
  ]

  const successStories = [
    {
      name: "Maria's Story",
      age: "Now 18",
      country: "Guatemala",
      story: "Sponsored since age 8, Maria graduated high school and is now studying to become a teacher.",
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=300&h=300&fit=crop&crop=face",
    },
    {
      name: "James's Journey",
      age: "Now 16",
      country: "Kenya",
      story: "With sponsorship support, James excelled in school and dreams of becoming a doctor.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    },
    {
      name: "Aisha's Achievement",
      age: "Now 20",
      country: "Bangladesh",
      story: "Former sponsored child Aisha now works as a nurse, helping her community.",
      image: "https://images.unsplash.com/photo-1494790108755-2616c9c0b8d3?w=300&h=300&fit=crop&crop=face",
    },
  ]

  const sponsorshipProgress = stats.totalChildren > 0 ? (stats.sponsoredChildren / stats.totalChildren) * 100 : 0

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">See Your Impact in Action</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every donation creates ripple effects that transform not just individual lives, but entire communities.
          </p>
        </div>

        {/* Current Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="text-center hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stats.totalChildren}</div>
              <div className="text-gray-600">Children in Program</div>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stats.sponsoredChildren}</div>
              <div className="text-gray-600">Children Sponsored</div>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stats.countries}</div>
              <div className="text-gray-600">Countries Served</div>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{Math.round(sponsorshipProgress)}%</div>
              <div className="text-gray-600">Sponsorship Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Sponsorship Progress */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Progress</h3>
            <p className="text-lg text-gray-600">Help us reach our goal of sponsoring every child in our program</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{stats.sponsoredChildren} children sponsored</span>
              <span>{stats.availableChildren} still waiting</span>
            </div>
            <Progress value={sponsorshipProgress} className="h-4 mb-4" />
            <div className="text-center">
              <Link href="/children?filter=available">
                <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700">
                  Help Us Reach Our Goal
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Impact Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {impactAreas.map((area, index) => {
            const IconComponent = area.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-gradient-to-br ${
                      area.color === "blue"
                        ? "from-blue-500 to-cyan-600"
                        : area.color === "pink"
                          ? "from-pink-500 to-purple-600"
                          : area.color === "green"
                            ? "from-green-500 to-blue-600"
                            : "from-purple-500 to-pink-600"
                    }`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{area.title}</h3>
                  <p className="text-gray-600 mb-4">{area.description}</p>
                  <div className="text-sm font-semibold text-gray-900 bg-gray-50 rounded-lg p-3">{area.impact}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Success Stories */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h3>
            <p className="text-lg text-gray-600">
              Meet some of the children whose lives have been transformed through sponsorship
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  <img src={story.image || "/placeholder.svg"} alt={story.name} className="w-full h-48 object-cover" />
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Success Story
                  </div>
                </div>
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{story.name}</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    {story.age} • {story.country}
                  </p>
                  <p className="text-gray-700">{story.story}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl p-12 text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">Ready to Change a Life?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of sponsors who are making a lasting difference in children's lives around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/children?filter=available">
              <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                <Heart className="mr-2 h-5 w-5" />
                Sponsor a Child Today
              </Button>
            </Link>
            <Link href="/children">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-pink-600 px-8 py-4 text-lg font-semibold"
              >
                Browse All Children
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
