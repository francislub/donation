"use client"

import { motion } from "framer-motion"
import { Heart, Users, BookOpen, Smile } from "lucide-react"

const steps = [
  {
    icon: Heart,
    title: "Choose a Child",
    description: "Browse through profiles of children in need and select one that touches your heart.",
    step: "01",
  },
  {
    icon: Users,
    title: "Start Sponsoring",
    description: "Begin your sponsorship journey with a monthly commitment that fits your budget.",
    step: "02",
  },
  {
    icon: BookOpen,
    title: "Stay Connected",
    description: "Receive regular updates, photos, and letters from the child you're sponsoring.",
    step: "03",
  },
  {
    icon: Smile,
    title: "See the Impact",
    description: "Watch as your support transforms a child's life through education and care.",
    step: "04",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Starting your sponsorship journey is simple. Follow these four easy steps to begin making a difference.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center h-full">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    {step.step}
                  </div>
                </div>

                <div className="mb-6 mt-4">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <div className="w-8 h-0.5 bg-blue-200"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors duration-300 shadow-lg hover:shadow-xl">
            Start Sponsoring Today
          </button>
        </motion.div>
      </div>
    </section>
  )
}
