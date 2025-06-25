"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, BookOpen, Home, Utensils, Stethoscope, Check, Star, ArrowRight } from "lucide-react"
import Link from "next/link"

interface FeaturedChild {
  id: string
  name: string
  age: number
  country: string
  image: string
  story: string
}

export function SponsorshipPlans() {
  const [featuredChildren, setFeaturedChildren] = useState<FeaturedChild[]>([])

  useEffect(() => {
    fetchFeaturedChildren()
  }, [])

  const fetchFeaturedChildren = async () => {
    try {
      const response = await fetch("/api/children/public?limit=3&featured=true")
      if (response.ok) {
        const data = await response.json()
        setFeaturedChildren(data.slice(0, 3))
      }
    } catch (error) {
      console.error("Error fetching featured children:", error)
    }
  }

  const plans = [
    {
      name: "Full Sponsorship",
      price: 50,
      period: "month",
      description: "Complete support for one child's education, healthcare, and basic needs",
      features: [
        "School fees and supplies",
        "Healthcare and medical care",
        "Nutritious meals",
        "Safe housing support",
        "Monthly progress reports",
        "Direct communication with child",
        "Annual visit opportunity",
      ],
      icon: Heart,
      color: "pink",
      popular: true,
      cta: "Choose a Child to Sponsor",
    },
    {
      name: "Education Support",
      price: 25,
      period: "month",
      description: "Focus on educational needs including school fees, books, and supplies",
      features: [
        "School tuition fees",
        "Books and supplies",
        "School uniforms",
        "Educational activities",
        "Progress reports",
        "Group updates",
      ],
      icon: BookOpen,
      color: "purple",
      popular: false,
      cta: "Support Education",
    },
    {
      name: "Basic Needs",
      price: 15,
      period: "month",
      description: "Help provide essential needs like food, clothing, and shelter",
      features: ["Nutritious meals", "Clean water access", "Basic clothing", "Hygiene supplies", "Community updates"],
      icon: Home,
      color: "blue",
      popular: false,
      cta: "Provide Basic Needs",
    },
  ]

  const oneTimeDonations = [
    { amount: 25, description: "School supplies for one child", icon: BookOpen },
    { amount: 50, description: "Medical checkup and treatment", icon: Stethoscope },
    { amount: 100, description: "Three months of nutritious meals", icon: Utensils },
    { amount: 250, description: "Emergency family support", icon: Heart },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Choose Your Impact</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every contribution makes a difference. Choose the sponsorship plan that fits your heart and budget.
          </p>
        </div>

        {/* Monthly Sponsorship Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon
            return (
              <Card
                key={index}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                  plan.popular ? "ring-2 ring-pink-500 shadow-lg" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-center py-2 text-sm font-semibold">
                    <Star className="inline-block w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                )}

                <CardHeader className={`text-center ${plan.popular ? "pt-12" : "pt-8"}`}>
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-gradient-to-br ${
                      plan.color === "pink"
                        ? "from-pink-500 to-purple-600"
                        : plan.color === "purple"
                          ? "from-purple-500 to-blue-600"
                          : "from-blue-500 to-cyan-600"
                    }`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    ${plan.price}
                    <span className="text-lg font-normal text-gray-600">/{plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/children?filter=available">
                    <Button
                      className={`w-full py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 ${
                        plan.popular
                          ? "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-lg"
                          : "border-2 border-gray-300 hover:border-pink-600 text-gray-700 hover:text-pink-600"
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Featured Children Section */}
        {featuredChildren.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Meet Some Children Waiting for Sponsors</h3>
              <p className="text-lg text-gray-600">
                These children are ready to start their journey with a caring sponsor like you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredChildren.map((child) => (
                <Card key={child.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="relative">
                    <img
                      src={child.image || "/placeholder.svg?height=250&width=300"}
                      alt={child.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-pink-500 text-white">Available</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{child.name}</h4>
                    <p className="text-gray-600 text-sm mb-2">
                      {child.age} years old • {child.country}
                    </p>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{child.story}</p>
                    <div className="flex flex-col gap-2">
                      <Link href={`/sponsor/${child.id}`}>
                        <Button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700">
                          <Heart className="h-4 w-4 mr-2" />
                          Sponsor {child.name}
                        </Button>
                      </Link>
                      <Link href={`/children/${child.id}`}>
                        <Button variant="outline" className="w-full">
                          Learn More
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/children?filter=available">
                <Button size="lg" variant="outline" className="px-8">
                  View All Available Children
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* One-time Donations */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">One-Time Donations</h3>
            <p className="text-lg text-gray-600">
              Can't commit to monthly sponsorship? Your one-time gift still makes a huge impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {oneTimeDonations.map((donation, index) => {
              const IconComponent = donation.icon
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">${donation.amount}</div>
                    <p className="text-gray-600 text-sm mb-4">{donation.description}</p>
                    <Button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700">
                      Donate ${donation.amount}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
