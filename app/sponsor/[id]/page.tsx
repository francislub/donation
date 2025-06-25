"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Calendar, Heart, ArrowLeft, Loader2, CreditCard, DollarSign } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Child {
  id: string
  name: string
  age: number
  class?: string
  bio?: string
  location: string
  needs: string[]
  photo?: string
  gallery: string[]
  isActive: boolean
  isSponsored: boolean
}

interface SponsorshipForm {
  sponsorName: string
  sponsorEmail: string
  sponsorPhone: string
  sponsorAddress: string
  amount: string
  frequency: string
  paymentMethod: string
  message: string
}

export default function SponsorPage() {
  const params = useParams()
  const [child, setChild] = useState<Child | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState(1)

  const [formData, setFormData] = useState<SponsorshipForm>({
    sponsorName: "",
    sponsorEmail: "",
    sponsorPhone: "",
    sponsorAddress: "",
    amount: "35",
    frequency: "monthly",
    paymentMethod: "",
    message: "",
  })

  useEffect(() => {
    if (params.id) {
      fetchChild(params.id as string)
    }
  }, [params.id])

  const fetchChild = async (id: string) => {
    try {
      const response = await fetch(`/api/children/public/${id}`)
      if (!response.ok) {
        throw new Error("Child not found")
      }
      const data = await response.json()
      if (data.isSponsored) {
        throw new Error("This child is already sponsored")
      }
      setChild(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof SponsorshipForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePaymentMethodSelect = (method: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }))
    setStep(3)
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      // Here you would integrate with your payment processor
      // For now, we'll simulate the process

      if (formData.paymentMethod === "paypal") {
        // Redirect to PayPal
        window.location.href = `/api/payments/paypal?childId=${child?.id}&amount=${formData.amount}&frequency=${formData.frequency}`
      } else if (formData.paymentMethod === "stripe") {
        // Redirect to Stripe
        window.location.href = `/api/payments/stripe?childId=${child?.id}&amount=${formData.amount}&frequency=${formData.frequency}`
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-lg text-gray-600">Loading sponsorship details...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error || !child) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <p className="text-red-600 text-lg mb-4">Error: {error || "Child not found"}</p>
            <Link href="/beneficiaries">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Children
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href={`/children/${child.id}`}>
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {child.name}'s Profile
            </Button>
          </Link>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= stepNum ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {stepNum}
                </div>
                {stepNum < 3 && <div className={`w-16 h-1 mx-2 ${step > stepNum ? "bg-blue-600" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-8 mt-4">
            <span className={`text-sm ${step >= 1 ? "text-blue-600 font-semibold" : "text-gray-500"}`}>Details</span>
            <span className={`text-sm ${step >= 2 ? "text-blue-600 font-semibold" : "text-gray-500"}`}>
              Payment Method
            </span>
            <span className={`text-sm ${step >= 3 ? "text-blue-600 font-semibold" : "text-gray-500"}`}>Complete</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Child Summary */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="mr-2 h-5 w-5 text-red-500" />
                Sponsoring {child.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4">
                <Image
                  src={child.photo || "/placeholder.svg?height=120&width=120"}
                  alt={child.name}
                  width={120}
                  height={120}
                  className="rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{child.name}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{child.age} years old</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{child.location}</span>
                  </div>
                  {child.needs.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {child.needs.slice(0, 3).map((need, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {need}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sponsorship Form */}
          <Card>
            <CardContent className="p-6">
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Sponsorship Details</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sponsorName">Full Name *</Label>
                      <Input
                        id="sponsorName"
                        value={formData.sponsorName}
                        onChange={(e) => handleInputChange("sponsorName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="sponsorEmail">Email Address *</Label>
                      <Input
                        id="sponsorEmail"
                        type="email"
                        value={formData.sponsorEmail}
                        onChange={(e) => handleInputChange("sponsorEmail", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sponsorPhone">Phone Number</Label>
                      <Input
                        id="sponsorPhone"
                        value={formData.sponsorPhone}
                        onChange={(e) => handleInputChange("sponsorPhone", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="amount">Monthly Amount *</Label>
                      <Select value={formData.amount} onValueChange={(value) => handleInputChange("amount", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="25">$25/month</SelectItem>
                          <SelectItem value="35">$35/month (Recommended)</SelectItem>
                          <SelectItem value="50">$50/month</SelectItem>
                          <SelectItem value="75">$75/month</SelectItem>
                          <SelectItem value="100">$100/month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="sponsorAddress">Address</Label>
                    <Textarea
                      id="sponsorAddress"
                      value={formData.sponsorAddress}
                      onChange={(e) => handleInputChange("sponsorAddress", e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message to {child.name} (Optional)</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Write a encouraging message..."
                      rows={3}
                    />
                  </div>

                  <Button
                    onClick={() => setStep(2)}
                    className="w-full"
                    disabled={!formData.sponsorName || !formData.sponsorEmail}
                  >
                    Continue to Payment
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Payment Method</h2>

                  <div className="space-y-4">
                    <button
                      onClick={() => handlePaymentMethodSelect("paypal")}
                      className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-colors text-left"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                            <CreditCard className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">PayPal</h3>
                            <p className="text-gray-600 text-sm">Secure payment with PayPal</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">${formData.amount}</p>
                          <p className="text-gray-500 text-sm">per month</p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handlePaymentMethodSelect("stripe")}
                      className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-colors text-left"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                            <DollarSign className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">Credit/Debit Card</h3>
                            <p className="text-gray-600 text-sm">Secure payment with Stripe</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">${formData.amount}</p>
                          <p className="text-gray-500 text-sm">per month</p>
                        </div>
                      </div>
                    </button>
                  </div>

                  <Button variant="outline" onClick={() => setStep(1)} className="w-full">
                    Back to Details
                  </Button>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Heart className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Complete Your Sponsorship</h2>
                  <p className="text-gray-600">
                    You're about to sponsor {child.name} with ${formData.amount} per month via{" "}
                    {formData.paymentMethod === "paypal" ? "PayPal" : "Credit Card"}.
                  </p>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span>Monthly Sponsorship:</span>
                      <span className="font-bold">${formData.amount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Payment Method:</span>
                      <span className="font-bold capitalize">{formData.paymentMethod}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleSubmit}
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Heart className="mr-2 h-4 w-4" />
                        Complete Sponsorship
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
