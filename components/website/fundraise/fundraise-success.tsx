import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Quote, Star } from "lucide-react"

const successStories = [
  {
    id: 1,
    name: "Sarah Johnson",
    campaign: "Birthday for Books",
    raised: "$1,250",
    story:
      "Instead of gifts for my 30th birthday, I asked friends to donate to help children get access to education. The response was incredible!",
    impact: "Sponsored 3 children for 1 year",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Mike Chen",
    campaign: "Marathon for Hope",
    raised: "$3,500",
    story:
      "I ran my first marathon and raised funds for every mile. Training was tough, but knowing I was helping children kept me going.",
    impact: "Provided school supplies for 150 children",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    campaign: "Memory of Mom",
    raised: "$2,800",
    story:
      "After losing my mother, I wanted to honor her memory by helping children in need. She would have loved this cause.",
    impact: "Built 2 new classrooms",
    image: "/placeholder.svg?height=80&width=80",
  },
]

export function FundraiseSuccess() {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how ordinary people have made extraordinary impacts through their fundraising campaigns. You could be
            our next success story!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {successStories.map((story) => (
            <Card
              key={story.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white"
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={story.image || "/placeholder.svg"}
                    alt={story.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">{story.name}</h3>
                    <p className="text-sm text-gray-600">{story.campaign}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <Quote className="h-6 w-6 text-green-500 mb-2" />
                  <p className="text-gray-700 italic leading-relaxed">"{story.story}"</p>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-900">Amount Raised:</span>
                    <span className="text-lg font-bold text-green-600">{story.raised}</span>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-sm text-green-800">
                      <span className="font-semibold">Impact:</span> {story.impact}
                    </p>
                  </div>
                </div>

                <div className="flex items-center mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">Verified Impact</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Own Success Story?</h3>
            <p className="text-gray-600 mb-6">
              Join hundreds of fundraisers who have already made a difference. Your campaign could be the next one to
              change children's lives.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold"
            >
              Start Your Campaign Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
