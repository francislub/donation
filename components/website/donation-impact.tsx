"use client"

import { motion } from "framer-motion"
import { TrendingUp, Users, BookOpen, Heart, Globe, Award } from "lucide-react"

export function DonationImpact() {
  const impactStats = [
    {
      icon: Users,
      number: "5,247",
      label: "Children Supported",
      description: "Direct beneficiaries of our programs",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: BookOpen,
      number: "89",
      label: "Schools Built",
      description: "Educational facilities constructed",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Globe,
      number: "12",
      label: "Countries",
      description: "Global reach of our programs",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Heart,
      number: "50K+",
      label: "Lives Touched",
      description: "Including families and communities",
      color: "from-red-500 to-red-600",
    },
  ]

  const successStories = [
    {
      name: "Maria Santos",
      age: 12,
      country: "Guatemala",
      story:
        "Thanks to sponsorship, Maria is now the first in her family to attend secondary school. She dreams of becoming a doctor.",
      image: "/placeholder.svg?height=300&width=300",
      achievement: "Honor Roll Student",
    },
    {
      name: "Ahmed Hassan",
      age: 14,
      country: "Kenya",
      story: "Our nutrition program helped Ahmed overcome malnutrition. He's now healthy and excelling in mathematics.",
      image: "/placeholder.svg?height=300&width=300",
      achievement: "Math Competition Winner",
    },
    {
      name: "Priya Sharma",
      age: 13,
      country: "India",
      story:
        "With access to clean water and healthcare, Priya's village has seen a 90% reduction in waterborne diseases.",
      image: "/placeholder.svg?height=300&width=300",
      achievement: "Community Health Leader",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Your Donation Impact</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See the real difference your generosity makes in children's lives around the world. Every donation creates
            lasting change and hope for the future.
          </p>
        </motion.div>

        {/* Impact Statistics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {impactStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}
              >
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
              <p className="text-lg font-semibold text-gray-800 mb-2">{stat.label}</p>
              <p className="text-gray-600 text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Success Stories */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Success Stories</h3>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="text-center mb-6">
                  <img
                    src={story.image || "/placeholder.svg"}
                    alt={story.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h4 className="text-xl font-bold text-gray-900">{story.name}</h4>
                  <p className="text-gray-600">
                    Age {story.age} • {story.country}
                  </p>
                  <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mt-2">
                    {story.achievement}
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">{story.story}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Transparency Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl p-12 shadow-lg mb-20"
        >
          <div className="text-center mb-12">
            <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Financial Transparency</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We believe in complete transparency about how your donations are used. Here's exactly where your money
              goes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">85%</span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Programs</h4>
              <p className="text-gray-600">Direct program implementation and beneficiary support</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">10%</span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Operations</h4>
              <p className="text-gray-600">Administrative costs and operational expenses</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">5%</span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Fundraising</h4>
              <p className="text-gray-600">Fundraising activities and donor engagement</p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
            <TrendingUp className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
            <h3 className="text-3xl font-bold mb-4">Ready to Make an Impact?</h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of donors who are creating positive change in children's lives. Your contribution, no
              matter the size, makes a real difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg">
                Donate Now
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors duration-300">
                Sponsor a Child
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
