"use client"

import { motion } from "framer-motion"
import { Heart, Users, Globe, Award } from "lucide-react"
import Image from "next/image"

export function OurStory() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Story</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Founded with a vision to transform lives, our journey began with a simple belief: every child deserves
            access to education, healthcare, and hope for a brighter future.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Our founding story"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm font-medium">Founded in 2015</p>
                <p className="text-2xl font-bold">8 Years of Impact</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-gray-900">How It All Began</h2>
            <p className="text-gray-600 leading-relaxed">
              In 2015, our founder Sarah Johnson visited a remote village where she witnessed children walking miles to
              reach a school with no proper facilities. That moment sparked a mission that would grow into a global
              movement.
            </p>
            <p className="text-gray-600 leading-relaxed">
              What started as a small initiative to build one classroom has now expanded to support thousands of
              children across multiple countries, providing education, healthcare, and essential resources.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="text-center p-4 bg-white rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">5,000+</p>
                <p className="text-sm text-gray-600">Children Helped</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-600">Countries</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl p-12 shadow-2xl"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Journey in Numbers</h3>
            <p className="text-gray-600">Milestones that define our impact</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Heart, number: "2015", label: "Founded", color: "text-red-600 bg-red-100" },
              { icon: Users, number: "2018", label: "1000th Child", color: "text-blue-600 bg-blue-100" },
              { icon: Award, number: "2020", label: "UN Recognition", color: "text-green-600 bg-green-100" },
              { icon: Globe, number: "2023", label: "Global Expansion", color: "text-purple-600 bg-purple-100" },
            ].map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div
                  className={`w-16 h-16 ${milestone.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <milestone.icon className="w-8 h-8" />
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-2">{milestone.number}</p>
                <p className="text-gray-600">{milestone.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
