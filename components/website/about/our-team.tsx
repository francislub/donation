"use client"

import { motion } from "framer-motion"
import { Linkedin, Twitter, Mail } from "lucide-react"
import Image from "next/image"

export function OurTeam() {
  const leadership = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Former UN humanitarian coordinator with 15+ years of experience in international development.",
      image: "/placeholder.svg?height=300&width=300",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "sarah@charity.org",
      },
    },
    {
      name: "Dr. Michael Chen",
      role: "Director of Programs",
      bio: "Pediatrician and public health expert specializing in community health initiatives.",
      image: "/placeholder.svg?height=300&width=300",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "michael@charity.org",
      },
    },
    {
      name: "Maria Rodriguez",
      role: "Head of Operations",
      bio: "Operations specialist with expertise in scaling humanitarian programs across multiple countries.",
      image: "/placeholder.svg?height=300&width=300",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "maria@charity.org",
      },
    },
    {
      name: "James Wilson",
      role: "Director of Partnerships",
      bio: "Former corporate executive focused on building strategic partnerships and sustainable funding.",
      image: "/placeholder.svg?height=300&width=300",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "james@charity.org",
      },
    },
  ]

  const boardMembers = [
    { name: "Dr. Amara Okafor", role: "Board Chair", expertise: "International Development" },
    { name: "Robert Kim", role: "Treasurer", expertise: "Financial Management" },
    { name: "Lisa Thompson", role: "Secretary", expertise: "Legal Affairs" },
    { name: "Ahmed Hassan", role: "Board Member", expertise: "Education Policy" },
    { name: "Jennifer Davis", role: "Board Member", expertise: "Healthcare Systems" },
    { name: "Carlos Mendez", role: "Board Member", expertise: "Community Development" },
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
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our dedicated team of professionals brings together decades of experience in humanitarian work, healthcare,
            education, and community development.
          </p>
        </motion.div>

        {/* Leadership Team */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            Leadership Team
          </motion.h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 text-center h-full">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h4>
                  <p className="text-blue-600 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{member.bio}</p>

                  <div className="flex justify-center space-x-3">
                    <a
                      href={member.social.linkedin}
                      className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors duration-300"
                    >
                      <Linkedin className="w-5 h-5 text-blue-600" />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center hover:bg-sky-200 transition-colors duration-300"
                    >
                      <Twitter className="w-5 h-5 text-sky-600" />
                    </a>
                    <a
                      href={`mailto:${member.social.email}`}
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-300"
                    >
                      <Mail className="w-5 h-5 text-gray-600" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Board of Directors */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12"
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Board of Directors</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boardMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h4 className="text-lg font-bold text-gray-900 mb-2">{member.name}</h4>
                <p className="text-blue-600 font-semibold mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.expertise}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Join Our Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Join Our Mission</h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              We're always looking for passionate individuals who want to make a difference. Explore career
              opportunities and volunteer positions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors duration-300">
                View Open Positions
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-blue-600 transition-colors duration-300">
                Volunteer With Us
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
