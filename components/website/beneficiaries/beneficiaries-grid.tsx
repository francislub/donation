import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Heart } from "lucide-react"

export function BeneficiariesGrid() {
  const beneficiaries = [
    {
      id: 1,
      name: "Maria Santos",
      age: 8,
      location: "Guatemala",
      image: "/placeholder.svg?height=300&width=300",
      story: "Dreams of becoming a teacher to help other children in her village learn to read.",
      needs: ["Education", "School Supplies"],
      monthlySupport: "$35",
      sponsored: false,
    },
    {
      id: 2,
      name: "Ahmed Hassan",
      age: 12,
      location: "Kenya",
      image: "/placeholder.svg?height=300&width=300",
      story: "Loves mathematics and wants to become an engineer to build better homes for his community.",
      needs: ["Education", "Healthcare"],
      monthlySupport: "$40",
      sponsored: true,
    },
    {
      id: 3,
      name: "Priya Sharma",
      age: 10,
      location: "India",
      image: "/placeholder.svg?height=300&width=300",
      story: "Passionate about art and hopes to use creativity to bring joy to others.",
      needs: ["Education", "Nutrition"],
      monthlySupport: "$30",
      sponsored: false,
    },
    {
      id: 4,
      name: "Carlos Rodriguez",
      age: 9,
      location: "Peru",
      image: "/placeholder.svg?height=300&width=300",
      story: "Enjoys helping his family farm and dreams of studying agriculture to improve crop yields.",
      needs: ["Education", "Healthcare"],
      monthlySupport: "$35",
      sponsored: false,
    },
    {
      id: 5,
      name: "Fatima Al-Zahra",
      age: 11,
      location: "Morocco",
      image: "/placeholder.svg?height=300&width=300",
      story: "Loves reading and wants to become a doctor to help children in her community stay healthy.",
      needs: ["Education", "Medical Care"],
      monthlySupport: "$38",
      sponsored: true,
    },
    {
      id: 6,
      name: "David Okonkwo",
      age: 7,
      location: "Nigeria",
      image: "/placeholder.svg?height=300&width=300",
      story: "Enjoys playing soccer and dreams of using sports to bring communities together.",
      needs: ["Education", "Nutrition"],
      monthlySupport: "$32",
      sponsored: false,
    },
  ]

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Children Waiting for Sponsors</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each child has unique dreams and potential. Your sponsorship provides education, healthcare, and hope for a
            brighter future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {beneficiaries.map((child) => (
            <Card key={child.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img src={child.image || "/placeholder.svg"} alt={child.name} className="w-full h-64 object-cover" />
                {child.sponsored && (
                  <Badge className="absolute top-4 right-4 bg-green-500 hover:bg-green-600">Sponsored</Badge>
                )}
              </div>

              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{child.name}</h3>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {child.age} years old
                  </div>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{child.location}</span>
                </div>

                <p className="text-gray-700 mb-4 text-sm leading-relaxed">{child.story}</p>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Primary Needs:</p>
                  <div className="flex flex-wrap gap-2">
                    {child.needs.map((need, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {need}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-600">Monthly Support</p>
                    <p className="text-lg font-bold text-blue-600">{child.monthlySupport}</p>
                  </div>

                  {child.sponsored ? (
                    <Button disabled className="bg-gray-300 text-gray-500">
                      Already Sponsored
                    </Button>
                  ) : (
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Heart className="mr-2 h-4 w-4" />
                      Sponsor Now
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
            View More Children
          </Button>
        </div>
      </div>
    </section>
  )
}
