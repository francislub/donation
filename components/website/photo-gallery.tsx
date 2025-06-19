"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { X, ChevronLeft, ChevronRight, Download, Share2 } from "lucide-react"
import Image from "next/image"

export function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Photos", count: 24 },
    { id: "education", name: "Education", count: 8 },
    { id: "healthcare", name: "Healthcare", count: 6 },
    { id: "community", name: "Community", count: 10 },
  ]

  const photos = [
    {
      id: 1,
      src: "/placeholder.svg?height=400&width=600",
      title: "New School Opening",
      category: "education",
      description: "Children celebrating the opening of their new classroom in rural Kenya.",
    },
    {
      id: 2,
      src: "/placeholder.svg?height=400&width=600",
      title: "Medical Checkup",
      category: "healthcare",
      description: "Regular health screenings provided by our mobile clinic team.",
    },
    {
      id: 3,
      src: "/placeholder.svg?height=400&width=600",
      title: "Community Garden",
      category: "community",
      description: "Families working together in the community vegetable garden.",
    },
    {
      id: 4,
      src: "/placeholder.svg?height=400&width=600",
      title: "Reading Time",
      category: "education",
      description: "Children enjoying story time in their new library.",
    },
    {
      id: 5,
      src: "/placeholder.svg?height=400&width=600",
      title: "Clean Water Access",
      category: "community",
      description: "New water well providing clean drinking water to the village.",
    },
    {
      id: 6,
      src: "/placeholder.svg?height=400&width=600",
      title: "Vaccination Drive",
      category: "healthcare",
      description: "Immunization program protecting children from preventable diseases.",
    },
    {
      id: 7,
      src: "/placeholder.svg?height=400&width=600",
      title: "Art Class",
      category: "education",
      description: "Creative expression through art therapy sessions.",
    },
    {
      id: 8,
      src: "/placeholder.svg?height=400&width=600",
      title: "Family Support",
      category: "community",
      description: "Counseling and support services for families in need.",
    },
  ]

  const filteredPhotos =
    selectedCategory === "all" ? photos : photos.filter((photo) => photo.category === selectedCategory)

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredPhotos.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredPhotos.length - 1 : selectedImage - 1)
    }
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Photo Gallery</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore moments of joy, hope, and transformation from our programs around the world.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </motion.div>

        {/* Photo Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedImage(index)}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <Image
                  src={photo.src || "/placeholder.svg"}
                  alt={photo.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-bold text-lg mb-1">{photo.title}</h3>
                  <p className="text-sm text-gray-200">{photo.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              <div className="relative">
                <Image
                  src={filteredPhotos[selectedImage].src || "/placeholder.svg"}
                  alt={filteredPhotos[selectedImage].title}
                  width={800}
                  height={600}
                  className="rounded-lg max-h-[80vh] object-contain"
                />

                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <div className="mt-4 text-white text-center">
                <h3 className="text-xl font-bold mb-2">{filteredPhotos[selectedImage].title}</h3>
                <p className="text-gray-300 mb-4">{filteredPhotos[selectedImage].description}</p>

                <div className="flex justify-center space-x-4">
                  <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                  <button className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
