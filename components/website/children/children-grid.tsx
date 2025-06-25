"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, MapPin, Calendar, Search, Filter, Users, Globe, Loader2 } from "lucide-react"

interface Child {
  id: string
  name: string
  age: number
  country: string
  city: string
  description: string
  image: string
  isSponsored: boolean
  sponsorshipAmount: number
  education: string
  interests: string[]
  story: string
}

export function ChildrenGrid() {
  const [children, setChildren] = useState<Child[]>([])
  const [filteredChildren, setFilteredChildren] = useState<Child[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("all")
  const [selectedAge, setSelectedAge] = useState("all")
  const [activeFilter, setActiveFilter] = useState("all")

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const filter = searchParams.get("filter") || "all"
    setActiveFilter(filter)
  }, [searchParams])

  useEffect(() => {
    fetchChildren()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [children, activeFilter, searchTerm, selectedCountry, selectedAge])

  const fetchChildren = async () => {
    try {
      const response = await fetch("/api/children/public")
      if (response.ok) {
        const data = await response.json()
        setChildren(data)
      }
    } catch (error) {
      console.error("Error fetching children:", error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...children]

    // Filter by sponsorship status
    if (activeFilter === "available") {
      filtered = filtered.filter((child) => !child.isSponsored)
    } else if (activeFilter === "sponsored") {
      filtered = filtered.filter((child) => child.isSponsored)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (child) =>
          child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          child.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
          child.city.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by country
    if (selectedCountry !== "all") {
      filtered = filtered.filter((child) => child.country === selectedCountry)
    }

    // Filter by age
    if (selectedAge !== "all") {
      const [minAge, maxAge] = selectedAge.split("-").map(Number)
      filtered = filtered.filter((child) => {
        if (maxAge) {
          return child.age >= minAge && child.age <= maxAge
        } else {
          return child.age >= minAge
        }
      })
    }

    setFilteredChildren(filtered)
  }

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
    const params = new URLSearchParams(searchParams.toString())
    if (filter === "all") {
      params.delete("filter")
    } else {
      params.set("filter", filter)
    }
    router.push(`/children?${params.toString()}`)
  }

  const handleSponsorClick = (childId: string) => {
    router.push(`/sponsor/${childId}`)
  }

  const handleViewProfile = (childId: string) => {
    router.push(`/children/${childId}`)
  }

  const countries = [...new Set(children.map((child) => child.country))]

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
            <span className="ml-2 text-gray-600">Loading children...</span>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Meet the Children</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every child has a unique story and dreams for the future. Your sponsorship can help make those dreams come
            true.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button
            variant={activeFilter === "all" ? "default" : "outline"}
            onClick={() => handleFilterChange("all")}
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            All Children ({children.length})
          </Button>
          <Button
            variant={activeFilter === "available" ? "default" : "outline"}
            onClick={() => handleFilterChange("available")}
            className="flex items-center gap-2"
          >
            <Heart className="h-4 w-4" />
            Available for Sponsorship ({children.filter((c) => !c.isSponsored).length})
          </Button>
          <Button
            variant={activeFilter === "sponsored" ? "default" : "outline"}
            onClick={() => handleFilterChange("sponsored")}
            className="flex items-center gap-2"
          >
            <Globe className="h-4 w-4" />
            Currently Sponsored ({children.filter((c) => c.isSponsored).length})
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger>
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedAge} onValueChange={setSelectedAge}>
              <SelectTrigger>
                <SelectValue placeholder="Select Age Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ages</SelectItem>
                <SelectItem value="5-8">5-8 years</SelectItem>
                <SelectItem value="9-12">9-12 years</SelectItem>
                <SelectItem value="13-16">13-16 years</SelectItem>
                <SelectItem value="17-18">17-18 years</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600">
            Showing {filteredChildren.length} of {children.length} children
            {activeFilter !== "all" && (
              <span className="ml-2">
                • Filtered by: <span className="font-semibold capitalize">{activeFilter}</span>
              </span>
            )}
          </p>
        </div>

        {/* Children Grid */}
        {filteredChildren.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No children found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search terms to find more children.</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCountry("all")
                setSelectedAge("all")
                handleFilterChange("all")
              }}
            >
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredChildren.map((child) => (
              <Card key={child.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative">
                  <img
                    src={child.image || "/placeholder.svg"}
                    alt={child.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=300&width=400"
                    }}
                  />
                  <div className="absolute top-4 right-4">
                    {child.isSponsored ? (
                      <Badge className="bg-green-500 text-white">Sponsored</Badge>
                    ) : (
                      <Badge className="bg-pink-500 text-white">Available</Badge>
                    )}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{child.name}</h3>
                      <div className="flex items-center text-gray-600 text-sm space-x-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {child.age} years old
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {child.city}, {child.country}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm line-clamp-3">{child.description}</p>

                    {child.interests && child.interests.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {child.interests.slice(0, 3).map((interest, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-col gap-2 pt-4">
                      <Button onClick={() => handleViewProfile(child.id)} variant="outline" className="w-full">
                        View Profile
                      </Button>
                      {!child.isSponsored && (
                        <Button
                          onClick={() => handleSponsorClick(child.id)}
                          className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
                        >
                          <Heart className="h-4 w-4 mr-2" />
                          Sponsor ${child.sponsorshipAmount}/month
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredChildren.length > 0 && filteredChildren.length < children.length && (
          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              Load More Children
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
