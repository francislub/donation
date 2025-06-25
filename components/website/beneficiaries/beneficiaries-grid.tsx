"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Heart, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Child {
  id: string
  name: string
  age: number
  class?: string
  bio?: string
  location: string
  needs: string[]
  photo?: string
  gallery: string[]
  isActive: boolean
  isSponsored: boolean
  createdAt: string
  updatedAt: string
}

export function BeneficiariesGrid() {
  const [children, setChildren] = useState<Child[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchChildren()
  }, [])

  const fetchChildren = async () => {
    try {
      const response = await fetch("/api/children/public")
      if (!response.ok) {
        throw new Error("Failed to fetch children")
      }
      const data = await response.json()
      setChildren(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-lg text-gray-600">Loading children...</span>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-red-600 text-lg">Error: {error}</p>
            <Button onClick={fetchChildren} className="mt-4">
              Try Again
            </Button>
          </div>
        </div>
      </section>
    )
  }

  const availableChildren = children.filter((child) => child.isActive && !child.isSponsored)

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Children Waiting for Sponsors</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each child has unique dreams and potential. Your sponsorship provides education, healthcare, and hope for a
            brighter future.
          </p>
        </div>

        {availableChildren.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Children Available</h3>
            <p className="text-gray-500">All children are currently sponsored. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {availableChildren.map((child) => (
              <Card key={child.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={child.photo || "/placeholder.svg?height=300&width=300"}
                    alt={child.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  {child.isSponsored && (
                    <Badge className="absolute top-4 right-4 bg-green-500 hover:bg-green-600">Sponsored</Badge>
                  )}
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{child.name}</h3>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {child.age} years old
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{child.location}</span>
                  </div>

                  {child.class && (
                    <div className="mb-3">
                      <span className="text-sm text-gray-600">Class: </span>
                      <span className="text-sm font-medium text-gray-800">{child.class}</span>
                    </div>
                  )}

                  <p className="text-gray-700 mb-4 text-sm leading-relaxed line-clamp-3">
                    {child.bio || "A wonderful child waiting for your support to achieve their dreams."}
                  </p>

                  {child.needs.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Primary Needs:</p>
                      <div className="flex flex-wrap gap-2">
                        {child.needs.slice(0, 3).map((need, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {need}
                          </Badge>
                        ))}
                        {child.needs.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{child.needs.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-4 border-t">
                    <Link href={`/children/${child.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        Learn More
                      </Button>
                    </Link>
                    <Link href={`/sponsor/${child.id}`} className="flex-1">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <Heart className="mr-2 h-4 w-4" />
                        Sponsor
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/beneficiaries">
            <Button variant="outline" size="lg" className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              View All Children
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
