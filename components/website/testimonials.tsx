'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Sponsor for 3 years",
    image: "/placeholder.svg?height=60&width=60",
    content: "Sponsoring Maria has been one of the most rewarding experiences of my life. Seeing her progress from struggling with basic reading to excelling in school fills my heart with joy.",
    rating: 5,
    location: "New York, USA"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Monthly Donor",
    image: "/placeholder.svg?height=60&width=60",
    content: "The transparency and regular updates make me confident that my donations are making a real difference. I've seen the direct impact on the children's lives.",
    rating: 5,
    location: "California, USA"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Sponsor for 2 years",
    image: "/placeholder.svg?height=60&width=60",
    content: "The letters and photos I receive from Ahmed show his incredible growth. It's amazing to be part of a child's journey to a brighter future.",
    rating: 5,
    location: "Texas, USA"
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Corporate Sponsor",
    image: "/placeholder.svg?height=60&width=60",
    content: "Our company has been supporting this organization for years. The professionalism and impact they deliver is outstanding. Highly recommended.",
    rating: 5,
    location: "London, UK"
  },
  {
    id: 5,
    name: "Lisa Wang",
    role: "Volunteer & Sponsor",
    image: "/placeholder.svg?height=60&width=60",
    content: "Not only do I sponsor a child, but I also volunteer. Seeing the joy on children's faces when they receive educational supplies is priceless.",
    rating: 5,
    location: "Toronto, Canada"
  },
  {
    id: 6,
    name: "James Miller",
    role: "Long-term Supporter",
    image: "/placeholder.svg?height=60&width=60",
    content: "Five years of supporting this cause and I've never been more proud of an investment. These children are our future, and they deserve every opportunity.",
    rating: 5,
    location: "Sydney, Australia"
  }
]

export function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Supporters Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from the amazing people who are making a difference in children's lives through their generous support and sponsorship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id} 
              className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-blue-500 mb-2" />
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback className="bg-blue-500 text-white">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-blue-600">{testimonial.role}</p>
                    <p className="text-xs text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white rounded-lg p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join Our Community of Supporters
            </h3>
            <p className="text-gray-600 mb-6">
              Become part of a global community dedicated to transforming children's lives through education and support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Start Sponsoring
              </button>
              <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
