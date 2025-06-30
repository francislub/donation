"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Heart, Play, ArrowRight, Users, Globe, Award } from "lucide-react"
import Image from "next/image"

const heroSlides = [
  {
    title: "Transform a Child's Future",
    subtitle: "Through Education",
    description:
      "Join thousands of sponsors who are making a lasting impact on children's lives through quality education and support.",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1200&h=800&fit=crop",
    stats: { children: "2,500+", countries: "15", years: "10+" },
  },
  {
    title: "Every Child Deserves",
    subtitle: "A Chance to Learn",
    description:
      "Your sponsorship provides school supplies, uniforms, meals, and the foundation for a brighter tomorrow.",
    image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=1200&h=800&fit=crop",
    stats: { children: "2,500+", countries: "15", years: "10+" },
  },
  {
    title: "Building Communities",
    subtitle: "One Child at a Time",
    description:
      "Together, we're not just changing individual lives – we're transforming entire communities through education.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=800&fit=crop",
    stats: { children: "2,500+", countries: "15", years: "10+" },
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const currentHero = heroSlides[currentSlide]

  const handleSponsorClick = () => {
    router.push("/children?filter=available")
  }

  const handleWatchStoryClick = () => {
    router.push("/about/story")
  }

  const handleStartSponsoringClick = () => {
    router.push("/children?filter=available")
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <Image
          src={currentHero.image || "/placeholder.svg"}
          alt="Hero background"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-white space-y-8 animate-slide-in-up">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <span className="text-pink-400 font-semibold text-lg">Rwahumati Foundation</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="block">{currentHero.title}</span>
                <span className="block gradient-text">{currentHero.subtitle}</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-2xl">{currentHero.description}</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handleSponsorClick}
                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-lg px-8 py-6"
              >
                <Heart className="mr-2 h-5 w-5" />
                Sponsor a Child
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={handleWatchStoryClick}
                className="border-2 border-white text-blue-800 hover:bg-white hover:text-gray-900 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-lg px-8 py-6"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Our Story
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-pink-400">{currentHero.stats.children}</div>
                <div className="text-sm text-gray-300">Children Helped</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-400">{currentHero.stats.countries}</div>
                <div className="text-sm text-gray-300">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-400">{currentHero.stats.years}</div>
                <div className="text-sm text-gray-300">Years Impact</div>
              </div>
            </div>
          </div>

          {/* Interactive Elements */}
          <div className="relative animate-fade-in-scale">
            <div className="relative">
              {/* Main Card */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white">Quick Impact</h3>
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-white">
                      <span>$50/month</span>
                      <span className="text-pink-400 font-semibold">Full Sponsorship</span>
                    </div>
                    <div className="flex items-center justify-between text-white">
                      <span>$25/month</span>
                      <span className="text-purple-400 font-semibold">Education Support</span>
                    </div>
                    <div className="flex items-center justify-between text-white">
                      <span>$10/month</span>
                      <span className="text-blue-400 font-semibold">School Supplies</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleStartSponsoringClick}
                    className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-lg"
                  >
                    Start Sponsoring Today
                  </Button>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl animate-float">
                <Users className="h-8 w-8 text-white" />
              </div>

              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl animate-float-delayed">
                <Globe className="h-6 w-6 text-white" />
              </div>
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

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-30 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
