import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Users, Heart } from "lucide-react"

export function SponsorshipPlans() {
  const plans = [
    {
      name: "Basic Sponsorship",
      price: "$35",
      period: "per month",
      description: "Provide essential support for a child's education and basic needs",
      features: [
        "Monthly progress updates",
        "Annual photo and letter",
        "Educational support",
        "Basic healthcare",
        "Nutritional assistance",
        "Tax-deductible receipts",
      ],
      buttonText: "Start Basic Sponsorship",
      popular: false,
      color: "border-gray-200",
    },
    {
      name: "Complete Care",
      price: "$50",
      period: "per month",
      description: "Comprehensive support covering all aspects of a child's development",
      features: [
        "Everything in Basic",
        "Bi-monthly updates",
        "Direct correspondence",
        "Extended healthcare",
        "Vocational training",
        "Family support programs",
        "Emergency assistance fund",
      ],
      buttonText: "Choose Complete Care",
      popular: true,
      color: "border-blue-500",
    },
    {
      name: "Community Impact",
      price: "$75",
      period: "per month",
      description: "Support a child while also investing in their entire community",
      features: [
        "Everything in Complete Care",
        "Community development projects",
        "Infrastructure improvements",
        "Teacher training programs",
        "Clean water initiatives",
        "Agricultural support",
        "Quarterly impact reports",
      ],
      buttonText: "Make Community Impact",
      popular: false,
      color: "border-purple-500",
    },
  ]

  const impactExamples = [
    {
      amount: "$35",
      impact: "Provides school supplies and uniforms for one child for a full year",
    },
    {
      amount: "$50",
      impact: "Covers medical checkups, vaccinations, and emergency healthcare",
    },
    {
      amount: "$75",
      impact: "Supports teacher training that benefits an entire classroom",
    },
    {
      amount: "$100",
      impact: "Funds clean water access for a family of five for six months",
    },
  ]

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Child Sponsorship Plans</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose a sponsorship level that fits your budget and desired impact. Every plan creates lasting change in a
            child's life.
          </p>
        </div>

        {/* Sponsorship Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative hover:shadow-lg transition-shadow ${plan.color} ${plan.popular ? "ring-2 ring-blue-500 scale-105" : ""}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 hover:bg-blue-600">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-800 hover:bg-gray-900"}`}
                  size="lg"
                >
                  <Heart className="mr-2 h-5 w-5" />
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Impact Examples */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Impact in Action</h3>
            <p className="text-gray-600">See exactly how your monthly contribution transforms lives</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {impactExamples.map((example, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="text-2xl font-bold text-blue-600">{example.amount}</span>
                </div>
                <p className="text-gray-700">{example.impact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Change a Life?</h3>
            <p className="text-gray-600 mb-6">
              Join thousands of sponsors who are making a difference. Start your sponsorship journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Heart className="mr-2 h-5 w-5" />
                Browse Children
              </Button>
              <Button variant="outline" size="lg" className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
                Learn More About Sponsorship
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
