"use client"

import { motion } from "framer-motion"
import { Check, Star, Heart, Users, BookOpen, Stethoscope } from "lucide-react"
import { useState } from "react"

export function DonationPlans() {
  const [selectedPlan, setSelectedPlan] = useState("monthly")

  const plans = [
    {
      id: "basic",
      name: "Basic Support",
      icon: Heart,
      monthly: 25,
      yearly: 250,
      description: "Provide essential supplies and basic care",
      features: [
        "School supplies for 1 child",
        "Basic healthcare checkups",
        "Nutritional supplements",
        "Monthly progress updates",
      ],
      color: "from-blue-500 to-blue-600",
      popular: false,
    },
    {
      id: "standard",
      name: "Full Sponsorship",
      icon: Users,
      monthly: 50,
      yearly: 500,
      description: "Complete support for a child's development",
      features: [
        "Full education sponsorship",
        "Healthcare and medical care",
        "Nutritious meals program",
        "Clothing and supplies",
        "Personal correspondence",
        "Annual progress reports",
      ],
      color: "from-purple-500 to-purple-600",
      popular: true,
    },
    {
      id: "premium",
      name: "Community Impact",
      icon: BookOpen,
      monthly: 100,
      yearly: 1000,
      description: "Support entire communities and families",
      features: [
        "Support multiple children",
        "Community infrastructure",
        "Teacher training programs",
        "Family support services",
        "Emergency assistance fund",
        "Quarterly impact visits",
        "Direct communication access",
      ],
      color: "from-green-500 to-green-600",
      popular: false,
    },
  ]

  const oneTimeAmounts = [25, 50, 100, 250, 500, 1000]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Choose Your Impact</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Every donation makes a difference. Choose the giving option that works best for you and start changing lives
            today.
          </p>

          {/* Plan Type Toggle */}
          <div className="inline-flex bg-white rounded-full p-1 shadow-lg">
            <button
              onClick={() => setSelectedPlan("monthly")}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedPlan === "monthly" ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Monthly Giving
            </button>
            <button
              onClick={() => setSelectedPlan("yearly")}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedPlan === "yearly" ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Annual Giving
            </button>
            <button
              onClick={() => setSelectedPlan("onetime")}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedPlan === "onetime" ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:text-blue-600"
              }`}
            >
              One-Time Gift
            </button>
          </div>
        </motion.div>

        {selectedPlan !== "onetime" ? (
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 ${
                  plan.popular ? "ring-2 ring-purple-500 scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                <div
                  className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mb-6`}
                >
                  <plan.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900">
                      ${selectedPlan === "monthly" ? plan.monthly : plan.yearly}
                    </span>
                    <span className="text-gray-600 ml-2">/{selectedPlan === "monthly" ? "month" : "year"}</span>
                  </div>
                  {selectedPlan === "yearly" && (
                    <p className="text-green-600 text-sm font-semibold mt-1">
                      Save ${plan.monthly * 12 - plan.yearly} annually
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                >
                  Choose {plan.name}
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-3xl p-12 shadow-lg">
              <div className="text-center mb-8">
                <Stethoscope className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-900 mb-4">One-Time Donation</h3>
                <p className="text-gray-600">
                  Make an immediate impact with a one-time gift. Every dollar goes directly to our programs.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {oneTimeAmounts.map((amount) => (
                  <button
                    key={amount}
                    className="p-4 border-2 border-gray-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 text-center group"
                  >
                    <span className="text-2xl font-bold text-gray-900 group-hover:text-blue-600">${amount}</span>
                  </button>
                ))}
              </div>

              <div className="text-center">
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Custom Amount</label>
                  <div className="relative max-w-xs mx-auto">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl">$</span>
                    <input
                      type="number"
                      placeholder="Enter amount"
                      className="w-full pl-8 pr-4 py-4 border-2 border-gray-200 rounded-2xl text-xl font-bold text-center focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg">
                  Donate Now
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Impact Examples */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white"
        >
          <h3 className="text-3xl font-bold text-center mb-12">Your Impact in Action</h3>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { amount: "$25", impact: "Provides school supplies for one child for a month" },
              { amount: "$50", impact: "Covers medical checkups and basic healthcare for one child" },
              { amount: "$100", impact: "Funds nutritious meals for a child for an entire month" },
            ].map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6"
              >
                <div className="text-3xl font-bold mb-3">{example.amount}</div>
                <p className="text-blue-100">{example.impact}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
