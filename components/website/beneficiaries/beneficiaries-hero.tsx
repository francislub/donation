import { Button } from "@/components/ui/button"
import { Heart, Users, Globe } from "lucide-react"

export function BeneficiariesHero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-white p-4 rounded-full shadow-lg">
            <Heart className="h-12 w-12 text-red-500" />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Meet Our <span className="text-blue-600">Beneficiaries</span>
        </h1>

        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Every child has a story, a dream, and unlimited potential. Through your support, we're helping transform lives
          and build brighter futures for children in need around the world.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Heart className="mr-2 h-5 w-5" />
            Sponsor a Child
          </Button>
          <Button variant="outline" size="lg" className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
            <Users className="mr-2 h-5 w-5" />
            View All Stories
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Globe className="h-8 w-8 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Reach</h3>
            <p className="text-gray-600">Supporting children across 15 countries worldwide</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <Users className="h-8 w-8 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Impact</h3>
            <p className="text-gray-600">Building stronger communities through education</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <Heart className="h-8 w-8 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Lasting Change</h3>
            <p className="text-gray-600">Creating sustainable solutions for lasting impact</p>
          </div>
        </div>
      </div>
    </section>
  )
}
