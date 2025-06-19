'use client'

import { Button } from "@/components/ui/button"
import { Heart, Users, BookOpen, ArrowRight } from 'lucide-react'

export function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-20 left-32 w-12 h-12 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-32 right-10 w-24 h-24 border-2 border-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Change a Life?
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Your support can transform a child's future. Join thousands of sponsors who are already making a difference in children's lives around the world.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">5,000+</h3>
            <p className="text-blue-100">Children Sponsored</p>
          </div>
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">3,200+</h3>
            <p className="text-blue-100">Active Sponsors</p>
          </div>
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">95%</h3>
            <p className="text-blue-100">School Completion Rate</p>
          </div>
        </div>

        {/* Main CTA */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">
              Start Your Sponsorship Journey Today
            </h3>
            <p className="text-lg text-blue-100 mb-6">
              For just $35 a month, you can provide a child with education, healthcare, and hope for a brighter future.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold group"
            >
              Sponsor a Child Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold"
            >
              Browse Children
            </Button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-blue-100 text-sm">
              ✓ Cancel anytime ✓ 100% of sponsorship goes to the child ✓ Regular updates and photos
            </p>
          </div>
        </div>

        {/* Secondary Actions */}
        <div className="mt-12 text-center">
          <p className="text-blue-100 mb-4">
            Not ready to sponsor? There are other ways to help:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              variant="outline" 
              className="border-white/50 text-white hover:bg-white/10"
            >
              Make a Donation
            </Button>
            <Button 
              variant="outline" 
              className="border-white/50 text-white hover:bg-white/10"
            >
              Volunteer
            </Button>
            <Button 
              variant="outline" 
              className="border-white/50 text-white hover:bg-white/10"
            >
              Fundraise
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
