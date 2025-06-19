'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle, Heart, Users, Globe } from 'lucide-react'

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubscribed(true)
    setIsLoading(false)
    setEmail("")
  }

  if (isSubscribed) {
    return (
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to Our Community!
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Thank you for subscribing! You'll receive inspiring stories, updates, and ways to make an even bigger impact.
              </p>
              <Button 
                onClick={() => setIsSubscribed(false)}
                variant="outline"
                className="border-green-500 text-green-600 hover:bg-green-50"
              >
                Subscribe Another Email
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Stay Connected with Our Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get inspiring stories, impact updates, and exclusive opportunities to make a difference delivered to your inbox.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Impact Stories</h3>
                <p className="text-sm text-gray-600">Real stories from children whose lives you're helping transform</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Community Updates</h3>
                <p className="text-sm text-gray-600">Latest news from our programs and communities worldwide</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Global Impact</h3>
                <p className="text-sm text-gray-600">Monthly reports on our collective impact around the world</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 h-12 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 h-12 px-8 font-semibold"
                >
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                ✓ No spam, ever ✓ Unsubscribe anytime ✓ 2-3 emails per month
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Join over 10,000 supporters who stay informed about our impact</p>
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
              <span>📧 Weekly Stories</span>
              <span>📊 Monthly Reports</span>
              <span>🎉 Special Events</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
