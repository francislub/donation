import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CakeIcon as Birthday, Heart, Trophy, Users, Calendar, Gift } from "lucide-react"

const fundraiseOptions = [
  {
    id: 1,
    title: "Birthday Fundraiser",
    description: "Ask for donations instead of gifts for your special day",
    icon: Birthday,
    color: "bg-pink-50 text-pink-600",
    examples: ["Birthday parties", "Anniversary celebrations", "Milestone birthdays"],
    averageRaised: "$350",
  },
  {
    id: 2,
    title: "Memorial Fundraiser",
    description: "Honor a loved one's memory by helping children in need",
    icon: Heart,
    color: "bg-purple-50 text-purple-600",
    examples: ["In memory of loved ones", "Celebration of life", "Annual remembrance"],
    averageRaised: "$750",
  },
  {
    id: 3,
    title: "Challenge Fundraiser",
    description: "Set a personal challenge and get sponsored for completing it",
    icon: Trophy,
    color: "bg-blue-50 text-blue-600",
    examples: ["Marathon running", "Mountain climbing", "Fitness challenges"],
    averageRaised: "$1,200",
  },
  {
    id: 4,
    title: "Team Fundraiser",
    description: "Rally your team, club, or organization for a group effort",
    icon: Users,
    color: "bg-green-50 text-green-600",
    examples: ["School clubs", "Sports teams", "Workplace groups"],
    averageRaised: "$2,500",
  },
  {
    id: 5,
    title: "Event Fundraiser",
    description: "Organize an event and donate proceeds to our cause",
    icon: Calendar,
    color: "bg-orange-50 text-orange-600",
    examples: ["Charity dinners", "Concerts", "Community events"],
    averageRaised: "$3,000",
  },
  {
    id: 6,
    title: "Holiday Fundraiser",
    description: "Spread joy during holidays by giving back to children",
    icon: Gift,
    color: "bg-red-50 text-red-600",
    examples: ["Christmas giving", "Holiday parties", "New Year resolutions"],
    averageRaised: "$500",
  },
]

export function FundraiseOptions() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Fundraising Style</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            There are many ways to raise funds for children in need. Pick the approach that fits your style, occasion,
            or personal goals. Every campaign makes a difference!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fundraiseOptions.map((option) => {
            const IconComponent = option.icon
            return (
              <Card
                key={option.id}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg"
              >
                <CardHeader className="pb-4">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${option.color} mb-4`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                    {option.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">{option.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-2">Popular examples:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {option.examples.map((example, index) => (
                          <li key={index} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-sm text-green-800">
                        <span className="font-semibold">Average raised:</span> {option.averageRaised}
                      </p>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold">
                      Start This Campaign
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
