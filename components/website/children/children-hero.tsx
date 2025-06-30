"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Users, Globe, Award, ArrowRight, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const heroSlides = [
  {
    title: "Meet Our Children",
    subtitle: "Waiting for Your Support",
    description:
      "Every child deserves a chance at education and a brighter future. Browse our children and find the one whose story touches your heart.",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1200&h=800&fit=crop",
    cta: "Browse Available Children",
  },
  {
    title: "Transform Lives",
    subtitle: "Through Education",
    description:
      "Your sponsorship provides school supplies, uniforms, meals, and the foundation for a child to break the cycle of poverty.",
    image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=1200&h=800&fit=crop",
    cta: "Start Sponsoring Today",
  },
  {
    title: "Building Futures",
    subtitle: "One Child at a Time",
    description:
      "Join thousands of sponsors who are already making a difference. See the impact of your support through regular updates and photos.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=800&fit=crop",
    cta: "View Success Stories",
  },
]

export function ChildrenHero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const currentHero = heroSlides[currentSlide]

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={currentHero.image || "/placeholder.svg"}
          alt="Children hero background"
          fill
          className="object-cover transition-all duration-1000"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-10 w-20 h-20 bg-pink-500/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-500/20 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-blue-500/20 rounded-full animate-float"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center text-white space-y-8">
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-pink-400 font-semibold text-lg">Rwahumati Foundation</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="block">{currentHero.title}</span>
              <span className="block gradient-text">{currentHero.subtitle}</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-4xl mx-auto">
              {currentHero.description}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/children?filter=available">
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-lg px-8 py-6"
              >
                <Heart className="mr-2 h-5 w-5" />
                {currentHero.cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link href="/about/story">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-blue-800 hover:bg-white hover:text-gray-900 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-lg px-8 py-6"
              >
                <Play className="mr-2 h-5 w-5" />
                Our Story
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-pink-400 mb-2">2,500+</div>
              <div className="text-gray-300">Children Helped</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-blue-400 mb-2">15</div>
              <div className="text-gray-300">Countries</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">95%</div>
              <div className="text-gray-300">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-pink-500 w-8" : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
