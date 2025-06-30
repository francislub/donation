"use client"

import { motion } from "framer-motion"
import { BookOpen, Heart, Home, Utensils, Stethoscope, Users } from "lucide-react"

export function OurMission() {
  const missions = [
    {
      icon: BookOpen,
      title: "Education Access",
      description: "Ensuring every child has access to quality education and learning resources",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Stethoscope,
      title: "Healthcare Support",
      description: "Providing essential medical care and health services to underserved communities",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Utensils,
      title: "Nutrition Programs",
      description: "Fighting hunger through sustainable nutrition and food security programs",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: Home,
      title: "Safe Housing",
      description: "Creating safe, secure living environments for vulnerable children and families",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Users,
      title: "Community Building",
      description: "Strengthening communities through empowerment and capacity building",
      color: "from-teal-500 to-teal-600",
    },
    {
      icon: Heart,
      title: "Emotional Support",
      description: "Providing psychological support and counseling for trauma recovery",
      color: "from-pink-500 to-pink-600",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our mission is to connect compassionate donors with impactful causes, fostering a transparent and efficient platform for giving. We empower individuals and organizations to make a tangible difference in the world by simplifying the donation process and ensuring every contribution reaches its intended purpose.
          </p>
         
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Vision</h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our vision is a future where philanthropy is accessible, collaborative, and transformative for all. We aspire to be the leading digital destination for charitable giving, building a global community of engaged donors and thriving initiatives that create lasting positive change.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {missions.map((mission, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${mission.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <mission.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{mission.title}</h3>
                <p className="text-gray-600 leading-relaxed">{mission.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white text-center"
        >
          <h3 className="text-3xl font-bold mb-6">Our Core Values</h3>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "Compassion", description: "Leading with empathy and understanding" },
              { title: "Integrity", description: "Maintaining transparency in all our actions" },
              { title: "Innovation", description: "Finding creative solutions to complex problems" },
              { title: "Sustainability", description: "Building programs that create lasting impact" },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <h4 className="text-xl font-bold mb-3">{value.title}</h4>
                <p className="text-blue-100">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
