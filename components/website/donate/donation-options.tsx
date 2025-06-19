import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Gift, Repeat, Zap } from "lucide-react"

export function DonationOptions() {
  const donationTypes = [
    {
      icon: Heart,
      title: "One-Time Donation",
      description: "Make an immediate impact with a single donation",
      features: ["Immediate impact", "Tax deductible", "Choose your amount", "Support urgent needs"],
      buttonText: "Donate Now",
      popular: false,
      color: "text-red-500",
    },
    {
      icon: Repeat,
      title: "Monthly Giving",
      description: "Provide consistent support with recurring donations",
      features: ["Predictable support", "Greater impact over time", "Easy to manage", "Cancel anytime"],
      buttonText: "Start Monthly Giving",
      popular: true,
      color: "text-blue-500",
    },
    {
      icon: Gift,
      title: "Memorial & Honor Gifts",
      description: "Donate in memory or honor of someone special",
      features: ["Meaningful tribute", "Notification sent", "Tax deductible", "Lasting legacy"],
      buttonText: "Give in Honor",
      popular: false,
      color: "text-purple-500",
    },
    {
      icon: Zap,
      title: "Emergency Response",
      description: "Support urgent relief efforts and crisis response",
      features: ["Rapid deployment", "Crisis intervention", "Emergency supplies", "Immediate relief"],
      buttonText: "Emergency Donation",
      popular: false,
      color: "text-orange-500",
    },
  ]

  const quickAmounts = [25, 50, 100, 250, 500, 1000]

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ways to Make a Difference</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the donation option that works best for you. Every contribution, no matter the size, helps transform
            lives.
          </p>
        </div>

        {/* Donation Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {donationTypes.map((type, index) => {
            const IconComponent = type.icon
            return (
              <Card
                key={index}
                className={`relative hover:shadow-lg transition-shadow ${type.popular ? "ring-2 ring-blue-500" : ""}`}
              >
                {type.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 hover:bg-blue-600">
                    Most Popular
                  </Badge>
                )}

                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="bg-gray-100 p-3 rounded-full">
                      <IconComponent className={`h-8 w-8 ${type.color}`} />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{type.title}</CardTitle>
                  <p className="text-gray-600 text-sm">{type.description}</p>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-2 mb-6">
                    {type.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${type.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-800 hover:bg-gray-900"}`}
                  >
                    {type.buttonText}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Donation Amounts */}
        <div className="bg-white rounded-lg p-8 shadow-md">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Donation</h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {quickAmounts.map((amount) => (
              <Button
                key={amount}
                variant="outline"
                className="h-16 text-lg font-semibold bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600"
              >
                ${amount}
              </Button>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
              <Heart className="mr-2 h-5 w-5" />
              Donate Custom Amount
            </Button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Your donation is secure and tax-deductible. You'll receive a receipt via email.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
