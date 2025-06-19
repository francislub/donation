"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Play, X, Clock, Eye } from "lucide-react"

export function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null)

  const videos = [
    {
      id: 1,
      title: "Building Hope: School Construction Project",
      thumbnail: "/placeholder.svg?height=300&width=500",
      duration: "3:45",
      views: "12.5K",
      description:
        "Follow the journey of building a new school in rural Guatemala, from groundbreaking to the first day of classes.",
    },
    {
      id: 2,
      title: "Mobile Health Clinic in Action",
      thumbnail: "/placeholder.svg?height=300&width=500",
      duration: "2:30",
      views: "8.2K",
      description: "See how our mobile health clinic brings essential medical care to remote communities.",
    },
    {
      id: 3,
      title: "Children's Stories: Education Changes Lives",
      thumbnail: "/placeholder.svg?height=300&width=500",
      duration: "5:12",
      views: "15.7K",
      description: "Hear directly from children whose lives have been transformed through access to quality education.",
    },
    {
      id: 4,
      title: "Community Garden Success Story",
      thumbnail: "/placeholder.svg?height=300&width=500",
      duration: "4:20",
      views: "6.8K",
      description: "Discover how community gardens are providing sustainable nutrition and income for families.",
    },
    {
      id: 5,
      title: "Clean Water Initiative Impact",
      thumbnail: "/placeholder.svg?height=300&width=500",
      duration: "3:15",
      views: "11.3K",
      description: "The transformative power of clean water access in rural communities.",
    },
    {
      id: 6,
      title: "Volunteer Spotlight: Making a Difference",
      thumbnail: "/placeholder.svg?height=300&width=500",
      duration: "2:45",
      views: "9.1K",
      description: "Meet the dedicated volunteers who make our programs possible around the world.",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Video Stories</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience our impact through powerful video stories that showcase the real change happening in communities
            around the world.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedVideo(index)}
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 text-blue-600 ml-1" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{video.duration}</span>
                </div>

                {/* Views Badge */}
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center space-x-1">
                  <Eye className="w-3 h-3" />
                  <span>{video.views}</span>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {video.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{video.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Modal */}
        {selectedVideo !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                {/* Video Player Placeholder */}
                <div className="w-full h-full flex items-center justify-center bg-gray-900">
                  <div className="text-center text-white">
                    <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Video Player</p>
                    <p className="text-sm text-gray-400">{videos[selectedVideo].title}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-white">
                <h3 className="text-xl font-bold mb-2">{videos[selectedVideo].title}</h3>
                <p className="text-gray-300">{videos[selectedVideo].description}</p>

                <div className="flex items-center space-x-4 mt-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{videos[selectedVideo].duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{videos[selectedVideo].views} views</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Share Our Stories</h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Help us spread awareness by sharing these powerful stories with your network. Every share helps us reach
              more people who can make a difference.
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-300">
              Subscribe to Our Channel
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
