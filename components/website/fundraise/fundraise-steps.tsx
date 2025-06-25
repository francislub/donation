import { CheckCircle, Users, Share2, DollarSign } from "lucide-react"

const steps = [
  {
    id: 1,
    title: "Create Your Campaign",
    description: "Set up your fundraising page with your story, goal, and photos. Make it personal and compelling.",
    icon: CheckCircle,
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Share Your Story",
    description:
      "Tell your friends, family, and social networks about your campaign. Personal connections drive donations.",
    icon: Share2,
    color: "bg-green-500",
  },
  {
    id: 3,
    title: "Engage Your Network",
    description: "Keep supporters updated with progress, thank donors, and share impact stories to maintain momentum.",
    icon: Users,
    color: "bg-purple-500",
  },
  {
    id: 4,
    title: "Reach Your Goal",
    description: "Watch your donations grow and celebrate milestones. Every dollar goes directly to helping children.",
    icon: DollarSign,
    color: "bg-pink-500",
  },
]

export function FundraiseSteps() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Starting a fundraising campaign is simple and rewarding. Follow these four easy steps to make a meaningful
            impact on children's lives.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-green-500 via-purple-500 to-pink-500 transform -translate-y-1/2"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <div key={step.id} className="relative">
                  <div className="text-center">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 ${step.color} rounded-full text-white mb-6 relative z-10 shadow-lg`}
                    >
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                      <div className="mb-4">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-600 rounded-full text-sm font-bold mb-3">
                          {step.id}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
