"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mail, Loader2 } from "lucide-react"
import Image from "next/image"

interface TeamMember {
  id: string
  name: string
  position: string
  department?: string
  email?: string
  phone?: string
  bio?: string
  avatar?: string
  startDate: string
  isActive: boolean
}

export function OurTeam() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch("/api/team-members/public")
      if (!response.ok) {
        throw new Error("Failed to fetch team members")
      }
      const data = await response.json()
      setTeamMembers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-lg text-gray-600">Loading team members...</span>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-600 text-lg">Error loading team: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  const leadership = teamMembers.filter(
    (member) =>
      member.position.toLowerCase().includes("ceo") ||
      member.position.toLowerCase().includes("director") ||
      member.position.toLowerCase().includes("founder"),
  )

  const otherMembers = teamMembers.filter(
    (member) =>
      !member.position.toLowerCase().includes("ceo") &&
      !member.position.toLowerCase().includes("director") &&
      !member.position.toLowerCase().includes("founder"),
  )

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
        {leadership.length > 0 && (
          <div className="mb-20">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-center text-gray-900 mb-12"
            >
              Leadership Team
            </motion.h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {leadership.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 text-center h-full">
                    <div className="relative w-32 h-32 mx-auto mb-6">
                      <Image
                        src={member.avatar || "/placeholder.svg?height=128&width=128"}
                        alt={member.name}
                        fill
                        className="rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h4>
                    <p className="text-blue-600 font-semibold mb-2">{member.position}</p>
                    {member.department && <p className="text-gray-500 text-sm mb-4">{member.department}</p>}
                    {member.bio && <p className="text-gray-600 text-sm leading-relaxed mb-6">{member.bio}</p>}

                    <div className="flex justify-center space-x-3">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-300"
                        >
                          <Mail className="w-5 h-5 text-gray-600" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Other Team Members */}
        {otherMembers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12"
          >
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Team</h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={member.avatar || "/placeholder.svg?height=64&width=64"}
                        alt={member.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h4>
                      <p className="text-blue-600 font-semibold text-sm mb-1">{member.position}</p>
                      {member.department && <p className="text-gray-500 text-xs">{member.department}</p>}
                    </div>
                  </div>
                  {member.bio && <p className="text-gray-600 text-sm mt-4 leading-relaxed">{member.bio}</p>}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

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
