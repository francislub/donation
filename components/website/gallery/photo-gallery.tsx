"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Share2, Download, ChevronLeft, ChevronRight, Camera } from "lucide-react"
import Image from "next/image"

// Sample photo data - replace with actual data from your API
const photos = [
  {
    id: 1,
    src: "/placeholder.svg?height=400&width=600",
    title: "Children Learning Together",
    category: "education",
    description: "Students in our literacy program showing their progress",
    date: "2024-01-15",
    location: "Kampala, Uganda",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=400&width=600",
    title: "Clean Water Access",
    category: "water",
    description: "New water well serving the community",
    date: "2024-01-10",
    location: "Rural Kenya",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=400&width=600",
    title: "Medical Care",
    category: "health",
    description: "Mobile clinic providing healthcare services",
    date: "2024-01-08",
    location: "Tanzania",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=400&width=600",
    title: "Nutrition Program",
    category: "nutrition",
    description: "Children receiving nutritious meals",
    date: "2024-01-05",
    location: "Ethiopia",
  },
  {
    id: 5,
    src: "/placeholder.svg?height=400&width=600",
    title: "Community Garden",
    category: "agriculture",
    description: "Families growing their own vegetables",
    date: "2024-01-03",
    location: "Ghana",
  },
  {
    id: 6,
    src: "/placeholder.svg?height=400&width=600",
    title: "School Construction",
    category: "infrastructure",
    description: "New classroom building completion",
    date: "2024-01-01",
    location: "Nigeria",
  },
  {
    id: 7,
    src: "/placeholder.svg?height=400&width=600",
    title: "Skills Training",
    category: "education",
    description: "Vocational training for young adults",
    date: "2023-12-28",
    location: "Rwanda",
  },
  {
    id: 8,
    src: "/placeholder.svg?height=400&width=600",
    title: "Family Support",
    category: "community",
    description: "Families receiving support packages",
    date: "2023-12-25",
    location: "Malawi",
  },
]

const categories = [
  { id: "all", label: "All Photos", count: photos.length },
  { id: "education", label: "Education", count: photos.filter((p) => p.category === "education").length },
  { id: "health", label: "Healthcare", count: photos.filter((p) => p.category === "health").length },
  { id: "water", label: "Clean Water", count: photos.filter((p) => p.category === "water").length },
  { id: "nutrition", label: "Nutrition", count: photos.filter((p) => p.category === "nutrition").length },
  {
    id: "infrastructure",
    label: "Infrastructure",
    count: photos.filter((p) => p.category === "infrastructure").length,
  },
  { id: "community", label: "Community", count: photos.filter((p) => p.category === "community").length },
  { id: "agriculture", label: "Agriculture", count: photos.filter((p) => p.category === "agriculture").length },
]

export function PhotoGallery() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)

  const filteredPhotos =
    selectedCategory === "all" ? photos : photos.filter((photo) => photo.category === selectedCategory)

  const handlePrevious = () => {
    if (selectedPhoto !== null) {
      const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto)
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredPhotos.length - 1
      setSelectedPhoto(filteredPhotos[prevIndex].id)
    }
  }

  const handleNext = () => {
    if (selectedPhoto !== null) {
      const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto)
      const nextIndex = currentIndex < filteredPhotos.length - 1 ? currentIndex + 1 : 0
      setSelectedPhoto(filteredPhotos[nextIndex].id)
    }
  }

  const selectedPhotoData = selectedPhoto ? photos.find((p) => p.id === selectedPhoto) : null

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Impact in Pictures</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through our collection of photos showcasing the real impact of your donations and the lives being
            transformed every day.
          </p>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8 h-auto p-1 bg-white">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex flex-col items-center gap-1 py-3 px-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
              >
                <span className="text-xs font-medium">{category.label}</span>
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-8">
            {/* Photo Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPhotos.map((photo) => (
                <Dialog key={photo.id}>
                  <DialogTrigger asChild>
                    <Card className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                      <CardContent className="p-0">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={photo.src || "/placeholder.svg"}
                            alt={photo.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            onClick={() => setSelectedPhoto(photo.id)}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{photo.title}</h3>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{photo.description}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{photo.location}</span>
                            <span>{new Date(photo.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>

                  <DialogContent className="max-w-4xl w-full p-0 overflow-hidden">
                    {selectedPhotoData && (
                      <div className="relative">
                        {/* Image */}
                        <div className="relative aspect-[16/10] bg-black">
                          <Image
                            src={selectedPhotoData.src || "/placeholder.svg"}
                            alt={selectedPhotoData.title}
                            fill
                            className="object-contain"
                          />

                          {/* Navigation Buttons */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                            onClick={handlePrevious}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                            onClick={handleNext}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Photo Info */}
                        <div className="p-6 bg-white">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">{selectedPhotoData.title}</h3>
                              <p className="text-gray-600 mb-3">{selectedPhotoData.description}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>{selectedPhotoData.location}</span>
                                <span>•</span>
                                <span>{new Date(selectedPhotoData.date).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                <Heart className="h-4 w-4 mr-2" />
                                Like
                              </Button>
                              <Button variant="outline" size="sm">
                                <Share2 className="h-4 w-4 mr-2" />
                                Share
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              ))}
            </div>

            {/* Load More Button */}
            {filteredPhotos.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg" className="bg-white">
                  Load More Photos
                </Button>
              </div>
            )}

            {/* Empty State */}
            {filteredPhotos.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No photos found</h3>
                <p className="text-gray-600">No photos available in this category yet. Check back soon!</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
