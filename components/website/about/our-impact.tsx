"use client"

import { motion } from "framer-motion"
import { TrendingUp, Users, Globe, Award, BookOpen, Heart } from "lucide-react"
import { useEffect, useState } from "react"

export function OurImpact() {
  const [counts, setCounts] = useState({
    children: 0,
    schools: 0,
    countries: 0,
    volunteers: 0,
  })

  const finalCounts = {
    children: 5247,
    schools: 89,
    countries: 12,
    volunteers: 1200,
  }

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    const counters = Object.keys(finalCounts).map((key) => {
      const finalValue = finalCounts[key as keyof typeof finalCounts]
      const increment = finalValue / steps
      let currentValue = 0

      return setInterval(() => {
        currentValue += increment
        if (currentValue >= finalValue) {
          currentValue = finalValue
          clearInterval(counters.find((c) => c === counters[Object.keys(finalCounts).indexOf(key)]))
        }
        setCounts((prev) => ({
          ...prev,
          [key]: Math.floor(currentValue),
        }))
      }, stepDuration)
    })

    return () => counters.forEach(clearInterval)
  }, [])

  const impactStories = [
    {
      title: "Education Transformation",
      description:
        "Built 89 schools and learning centers, providing quality education to thousands of children in remote areas.",
      image: "/placeholder.svg?height=300&width=400",
      stats: "89 Schools Built",
    },
    {
      title: "Healthcare Access",
      description: "Established mobile health clinics reaching over 50,000 people with essential medical services.",
      image: "/placeholder.svg?height=300&width=400",
      stats: "50K+ People Served",
    },
    {
      title: "Community Empowerment",
      description: "Trained 1,200+ local volunteers who continue to drive positive change in their communities.",
      image: "/placeholder.svg?height=300&width=400",
      stats: "1,200+ Volunteers",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Global Impact</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Through the generosity of our supporters and the dedication of our team, we've created meaningful change
            across the globe.
          </p>
        </motion.div>

        {/* Impact Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-4 gap-8 mb-20"
        >
          {[
            { icon: Users, label: "Children Helped", value: counts.children, color: "text-blue-600 bg-blue-100" },
            { icon: BookOpen, label: "Schools Built", value: counts.schools, color: "text-green-600 bg-green-100" },
            { icon: Globe, label: "Countries", value: counts.countries, color: "text-purple-600 bg-purple-100" },
            { icon: Heart, label: "Volunteers", value: counts.volunteers, color: "text-red-600 bg-red-100" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`w-16 h-16 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value.toLocaleString()}</p>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Impact Stories */}
        <div className="space-y-16">
          {impactStories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
            >
              <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={story.image || "/placeholder.svg"}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <p className="text-lg font-bold">{story.stats}</p>
                  </div>
                </div>
              </div>
              <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">{story.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">{story.description}</p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Ongoing Impact</p>
                    <p className="text-gray-600">Sustainable programs for lasting change</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white"
        >
          <Award className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
          <h3 className="text-3xl font-bold mb-4">Be Part of Our Impact</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of supporters who are making a difference in children's lives around the world.
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-300">
            Start Making Impact Today
          </button>
        </motion.div>
      </div>
    </section>
  )
}
