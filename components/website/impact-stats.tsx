"use client"

import { useEffect, useState, useRef } from "react"
import { Heart, Users, GraduationCap, School, Globe, Award } from "lucide-react"

const stats = [
  {
    icon: Users,
    number: 2847,
    label: "Children Sponsored",
    description: "Active sponsorships changing lives",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: GraduationCap,
    number: 1256,
    label: "Students Graduated",
    description: "Success stories and achievements",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: School,
    number: 67,
    label: "Schools Supported",
    description: "Educational institutions we help",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Globe,
    number: 15,
    label: "Countries Reached",
    description: "Global impact and presence",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Heart,
    number: 3420,
    label: "Active Sponsors",
    description: "Generous hearts making a difference",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Award,
    number: 89,
    label: "Scholarships Awarded",
    description: "Higher education opportunities",
    color: "from-teal-500 to-blue-500",
  },
]

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(target * easeOutQuart))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isVisible, target, duration])

  return <div ref={ref}>{count.toLocaleString()}</div>
}

export function ImpactStats() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000' fillOpacity='0.1'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3Ccircle cx='53' cy='7' r='7'/%3E%3Ccircle cx='7' cy='53' r='7'/%3E%3Ccircle cx='53' cy='53' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-pink-300/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-300/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-300/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-pink-200 mb-6">
            <Heart className="h-4 w-4 text-pink-600 mr-2" />
            <span className="text-sm font-medium text-pink-600">Our Impact in Numbers</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Transforming Lives
            <span className="block bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Around the World
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Every number represents a life changed, a dream realized, and a future brightened. See the incredible impact
            we're making together through education and compassion.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-white/50 hover:border-pink-200"
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}
              ></div>

              {/* Icon */}
              <div className="relative z-10">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <stat.icon className="h-8 w-8 text-white" />
                </div>

                {/* Number */}
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 group-hover:scale-105 transition-transform duration-300">
                  <AnimatedCounter target={stat.number} />
                  <span className="text-2xl text-pink-600">+</span>
                </div>

                {/* Label */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{stat.label}</h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">{stat.description}</p>

                {/* Decorative Element */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Be Part of Our Growing Impact</h3>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              These numbers grow every day thanks to generous sponsors like you. Join our community and help us reach
              even more children in need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Heart className="inline-block mr-2 h-5 w-5" />
                Start Sponsoring Today
              </button>
              <button className="border-2 border-gray-300 hover:border-pink-600 text-gray-700 hover:text-pink-600 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
                View Success Stories
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
