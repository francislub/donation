"use client"

import { useState, useEffect } from "react"
import { Heart, MapPin, Calendar, BookOpen, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import Link from "next/link"

interface Child {
  id: string
  name: string
  age: number
  location: string
  school: string
  grade: string
  story: string
  image: string
  needs: string[]
  monthlySupport: number
  sponsored: boolean
}

export function FeaturedChildren() {
  const [children, setChildren] = useState<Child[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedChild, setSelectedChild] = useState<Child | null>(null)

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await fetch("/api/children/public?limit=6&featured=true")
        if (response.ok) {
          const data = await response.json()
          setChildren(data)
        }
      } catch (error) {
        console.error("Error fetching featured children:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchChildren()
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(children.length / 3))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(children.length / 3)) % Math.ceil(children.length / 3))
  }

  const visibleChildren = children.slice(currentIndex * 3, currentIndex * 3 + 3)

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
            <span className="ml-2 text-gray-600">Loading featured children...</span>
          </div>
        </div>
      </section>
    )
  }

  if (children.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No featured children available</h3>
          <p className="text-gray-600">Check back soon for new children waiting for sponsors.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fillOpacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v20h40V20H20z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-pink-50 rounded-full border border-pink-200 mb-6">
            <Heart className="h-4 w-4 text-pink-600 mr-2" />
            <span className="text-sm font-medium text-pink-600">Children Waiting for Sponsors</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet the Children
            <span className="block bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Who Need Your Help
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Each child has a unique story, dreams, and potential. Your sponsorship can provide the education and support
            they need to build a brighter future.
          </p>
        </div>

        {/* Children Cards */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {visibleChildren.map((child) => (
              <div
                key={child.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={child.image || "/placeholder.svg?height=400&width=300"}
                    alt={child.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Status Badge */}
                  <div
                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold ${
                      child.sponsored
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-pink-100 text-pink-800 border border-pink-200"
                    }`}
                  >
                    {child.sponsored ? "Sponsored" : "Available"}
                  </div>

                  {!child.sponsored && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-pink-600">
                      ${child.monthlySupport}/month
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{child.name}</h3>
                      <div className="flex items-center text-gray-600 text-sm mb-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{child.age} years old</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{child.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <BookOpen className="h-4 w-4 mr-1" />
                      <span>
                        {child.grade} at {child.school}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">{child.story}</p>

                  {/* Needs */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Current Needs:</h4>
                    <div className="flex flex-wrap gap-2">
                      {child.needs.slice(0, 3).map((need, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-pink-50 text-pink-600 text-xs font-medium rounded-full"
                        >
                          {need}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col gap-3">
                    {!child.sponsored ? (
                      <Link
                        href={`/sponsor/${child.id}`}
                        className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center"
                      >
                        <Heart className="inline-block mr-2 h-4 w-4" />
                        Sponsor {child.name}
                      </Link>
                    ) : (
                      <div className="w-full bg-green-100 text-green-800 py-3 rounded-xl font-semibold text-center border border-green-200">
                        <Heart className="inline-block mr-2 h-4 w-4" />
                        Sponsored
                      </div>
                    )}
                    <button
                      onClick={() => setSelectedChild(child)}
                      className="w-full border-2 border-gray-300 hover:border-pink-600 text-gray-700 hover:text-pink-600 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          {children.length > 3 && (
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={prevSlide}
                className="w-12 h-12 bg-white hover:bg-pink-50 rounded-full shadow-lg border border-gray-200 hover:border-pink-300 flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>

              <div className="flex space-x-2">
                {Array.from({ length: Math.ceil(children.length / 3) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex ? "bg-pink-600 scale-125" : "bg-gray-300 hover:bg-pink-400"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="w-12 h-12 bg-white hover:bg-pink-50 rounded-full shadow-lg border border-gray-200 hover:border-pink-300 flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-8 border border-pink-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Can't Choose Just One?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Browse all our children waiting for sponsors, or let us match you with a child based on your preferences
              and interests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/children"
                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                View All Children
              </Link>
              <Link
                href="/children?filter=available"
                className="border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                Find My Match
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for child details */}
      {selectedChild && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-gray-900">About {selectedChild.name}</h3>
                <button
                  onClick={() => setSelectedChild(null)}
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <img
                  src={selectedChild.image || "/placeholder.svg?height=400&width=300"}
                  alt={selectedChild.name}
                  className="w-full h-64 object-cover rounded-xl"
                />
                <div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Age</h4>
                      <p className="text-gray-600">{selectedChild.age} years old</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Location</h4>
                      <p className="text-gray-600">{selectedChild.location}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Education</h4>
                      <p className="text-gray-600">
                        {selectedChild.grade} at {selectedChild.school}
                      </p>
                    </div>
                    {!selectedChild.sponsored && (
                      <div>
                        <h4 className="font-semibold text-gray-900">Monthly Support</h4>
                        <p className="text-pink-600 font-bold">${selectedChild.monthlySupport}/month</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-2">Story</h4>
                <p className="text-gray-600 leading-relaxed">{selectedChild.story}</p>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-2">Current Needs</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedChild.needs.map((need, index) => (
                    <span key={index} className="px-3 py-1 bg-pink-50 text-pink-600 text-sm font-medium rounded-full">
                      {need}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                {!selectedChild.sponsored ? (
                  <Link
                    href={`/sponsor/${selectedChild.id}`}
                    className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                  >
                    <Heart className="inline-block mr-2 h-4 w-4" />
                    Sponsor {selectedChild.name}
                  </Link>
                ) : (
                  <div className="flex-1 bg-green-100 text-green-800 py-3 rounded-xl font-semibold text-center border border-green-200">
                    <Heart className="inline-block mr-2 h-4 w-4" />
                    Sponsored
                  </div>
                )}
                <button
                  onClick={() => setSelectedChild(null)}
                  className="px-6 border-2 border-gray-300 hover:border-pink-600 text-gray-700 hover:text-pink-600 py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
