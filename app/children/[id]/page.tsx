"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Heart, ArrowLeft, Loader2, GraduationCap } from "lucide-react"
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

export default function ChildDetailPage() {
  const params = useParams()
  const [child, setChild] = useState<Child | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string>("")

  useEffect(() => {
    if (params.id) {
      fetchChild(params.id as string)
    }
  }, [params.id])

  const fetchChild = async (id: string) => {
    try {
      const response = await fetch(`/api/children/public/${id}`)
      if (!response.ok) {
        throw new Error("Child not found")
      }
      const data = await response.json()
      setChild(data)
      setSelectedImage(data.photo || "/placeholder.svg?height=400&width=400")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-lg text-gray-600">Loading child details...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error || !child) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <p className="text-red-600 text-lg mb-4">Error: {error || "Child not found"}</p>
            <Link href="/beneficiaries">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Children
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/beneficiaries">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Children
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt={child.name}
                width={600}
                height={400}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              {child.isSponsored && (
                <Badge className="absolute top-4 right-4 bg-green-500 hover:bg-green-600">Already Sponsored</Badge>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {child.gallery.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => setSelectedImage(child.photo || "/placeholder.svg?height=400&width=400")}
                  className={`relative h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === child.photo ? "border-blue-500" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={child.photo || "/placeholder.svg?height=80&width=80"}
                    alt="Main photo"
                    fill
                    className="object-cover"
                  />
                </button>
                {child.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`relative h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === image ? "border-blue-500" : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Gallery ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Child Information */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-3xl font-bold text-gray-900">{child.name}</h1>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span className="text-lg">{child.age} years old</span>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span className="text-lg">{child.location}</span>
                </div>

                {child.class && (
                  <div className="flex items-center text-gray-600 mb-6">
                    <GraduationCap className="h-5 w-5 mr-2" />
                    <span className="text-lg">Class: {child.class}</span>
                  </div>
                )}

                {child.bio && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">About {child.name}</h3>
                    <p className="text-gray-700 leading-relaxed">{child.bio}</p>
                  </div>
                )}

                {child.needs.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Primary Needs</h3>
                    <div className="flex flex-wrap gap-2">
                      {child.needs.map((need, index) => (
                        <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                          {need}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sponsorship Action */}
                <div className="pt-6 border-t">
                  {child.isSponsored ? (
                    <div className="text-center">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                        <Heart className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <p className="text-green-800 font-semibold">This child is already sponsored!</p>
                        <p className="text-green-600 text-sm">Thank you to their sponsor for making a difference.</p>
                      </div>
                      <Link href="/beneficiaries">
                        <Button variant="outline">Find Another Child to Sponsor</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <Heart className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-blue-800 font-semibold">Help {child.name} achieve their dreams</p>
                        <p className="text-blue-600 text-sm">
                          Your sponsorship provides education, healthcare, and hope.
                        </p>
                      </div>
                      <Link href={`/sponsor/${child.id}`}>
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
                          <Heart className="mr-2 h-5 w-5" />
                          Sponsor {child.name}
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Impact Information */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Impact</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-700">Provide quality education and school supplies</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-700">Ensure access to healthcare and nutrition</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-700">Support family and community development</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-700">Create opportunities for a brighter future</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
