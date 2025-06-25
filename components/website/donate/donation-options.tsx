"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Heart, CreditCard, Calendar, Gift, Users, ArrowRight } from "lucide-react"
import Link from "next/link"

export function DonationOptions() {
  const [donationType, setDonationType] = useState("monthly")
  const [amount, setAmount] = useState("50")
  const [customAmount, setCustomAmount] = useState("")

  const monthlyAmounts = [
    { value: "25", label: "$25", description: "Education support" },
    { value: "50", label: "$50", description: "Full sponsorship", popular: true },
    { value: "75", label: "$75", description: "Premium support" },
    { value: "100", label: "$100", description: "Multiple children" },
  ]

  const oneTimeAmounts = [
    { value: "25", label: "$25", description: "School supplies" },
    { value: "50", label: "$50", description: "Medical care" },
    { value: "100", label: "$100", description: "Emergency aid" },
    { value: "250", label: "$250", description: "Family support" },
  ]

  const currentAmounts = donationType === "monthly" ? monthlyAmounts : oneTimeAmounts

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Start Your Donation</h2>
          <p className="text-xl text-gray-600">Choose how you'd like to make a difference in a child's life today.</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl font-bold text-gray-900">Make Your Impact</CardTitle>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Donation Type Selection */}
            <div>
              <Label className="text-lg font-semibold text-gray-900 mb-4 block">Choose Donation Type</Label>
              <RadioGroup
                value={donationType}
                onValueChange={setDonationType}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2 p-4 border-2 border-gray-200 rounded-xl hover:border-pink-300 transition-colors">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly" className="flex-1 cursor-pointer">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-pink-600 mr-3" />
                      <div>
                        <div className="font-semibold text-gray-900">Monthly Sponsorship</div>
                        <div className="text-sm text-gray-600">Ongoing support for lasting impact</div>
                      </div>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 p-4 border-2 border-gray-200 rounded-xl hover:border-pink-300 transition-colors">
                  <RadioGroupItem value="onetime" id="onetime" />
                  <Label htmlFor="onetime" className="flex-1 cursor-pointer">
                    <div className="flex items-center">
                      <Gift className="h-5 w-5 text-purple-600 mr-3" />
                      <div>
                        <div className="font-semibold text-gray-900">One-Time Donation</div>
                        <div className="text-sm text-gray-600">Immediate help when needed</div>
                      </div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Amount Selection */}
            <div>
              <Label className="text-lg font-semibold text-gray-900 mb-4 block">
                Select Amount {donationType === "monthly" && "(per month)"}
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {currentAmounts.map((amountOption) => (
                  <button
                    key={amountOption.value}
                    onClick={() => {
                      setAmount(amountOption.value)
                      setCustomAmount("")
                    }}
                    className={`relative p-4 border-2 rounded-xl text-center transition-all duration-200 hover:scale-105 ${
                      amount === amountOption.value
                        ? "border-pink-500 bg-pink-50 shadow-lg"
                        : "border-gray-200 hover:border-pink-300"
                    }`}
                  >
                    {amountOption.popular && (
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                        Popular
                      </div>
                    )}
                    <div className="text-2xl font-bold text-gray-900">{amountOption.label}</div>
                    <div className="text-sm text-gray-600">{amountOption.description}</div>
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="Custom amount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value)
                    setAmount("")
                  }}
                  className="flex-1"
                />
                <span className="text-gray-600 font-medium">USD</span>
              </div>
            </div>

            {/* Impact Preview */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Heart className="h-5 w-5 text-pink-600 mr-2" />
                Your Impact
              </h3>
              <div className="text-gray-700">
                {donationType === "monthly" ? (
                  <div>
                    <p className="mb-2">
                      <strong>${customAmount || amount}/month</strong> will provide:
                    </p>
                    <ul className="space-y-1 text-sm">
                      {Number.parseInt(customAmount || amount) >= 50 && <li>• Complete child sponsorship</li>}
                      {Number.parseInt(customAmount || amount) >= 25 && <li>• Educational support and supplies</li>}
                      {Number.parseInt(customAmount || amount) >= 15 && <li>• Nutritious meals and healthcare</li>}
                      <li>• Regular progress updates</li>
                    </ul>
                  </div>
                ) : (
                  <div>
                    <p className="mb-2">
                      <strong>${customAmount || amount}</strong> will help provide:
                    </p>
                    <ul className="space-y-1 text-sm">
                      {Number.parseInt(customAmount || amount) >= 100 && <li>• Emergency family support</li>}
                      {Number.parseInt(customAmount || amount) >= 50 && <li>• Medical care and treatment</li>}
                      {Number.parseInt(customAmount || amount) >= 25 && <li>• School supplies and books</li>}
                      <li>• Immediate assistance where needed most</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {donationType === "monthly" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href="/children?filter=available">
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-lg py-6"
                    >
                      <Users className="mr-2 h-5 w-5" />
                      Choose a Child to Sponsor
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full text-lg py-6 border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white"
                  >
                    <Heart className="mr-2 h-5 w-5" />
                    General Monthly Support
                  </Button>
                </div>
              ) : (
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-lg py-6"
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  Donate ${customAmount || amount} Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
            </div>

            {/* Security Note */}
            <div className="text-center text-sm text-gray-600 bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-center mb-2">
                <CreditCard className="h-4 w-4 mr-2" />
                <span className="font-semibold">Secure Payment</span>
              </div>
              <p>Your donation is processed securely. 100% of your sponsorship goes directly to the child.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
