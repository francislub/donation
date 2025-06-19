"use client"

import { motion } from "framer-motion"
import { Camera, Video, Heart } from "lucide-react"

export function GalleryHero() {
  return (
    <section className="relative py-32 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <Camera className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Gallery</h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Witness the moments that matter. Every photo and video tells a story of hope, transformation, and the
            incredible impact we create together.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <div className="flex items-center space-x-2 bg-white/20 rounded-full px-6 py-3">
              <Camera className="w-5 h-5" />
              <span className="font-semibold">500+ Photos</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 rounded-full px-6 py-3">
              <Video className="w-5 h-5" />
              <span className="font-semibold">50+ Videos</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 rounded-full px-6 py-3">
              <Heart className="w-5 h-5" />
              <span className="font-semibold">Countless Stories</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-16 h-16 bg-white/10 rounded-full"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 right-10 w-12 h-12 bg-white/10 rounded-full"
      />
    </section>
  )
}