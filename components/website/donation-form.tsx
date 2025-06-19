"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { CreditCard, Lock, Heart, User, Mail, Phone, MapPin } from "lucide-react"

export function DonationForm() {
  const [formData, setFormData] = useState({
    amount: "",
    frequency: "monthly",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  })

  const [currentStep, setCurrentStep] = useState(1)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Complete Your Donation</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your secure donation helps us continue our mission of transforming lives around the world.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      currentStep >= step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-16 h-1 mx-2 ${currentStep > step ? "bg-blue-600" : "bg-gray-200"}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-8 mt-4">
              <span className={`text-sm ${currentStep >= 1 ? "text-blue-600 font-semibold" : "text-gray-500"}`}>
                Amount
              </span>
              <span className={`text-sm ${currentStep >= 2 ? "text-blue-600 font-semibold" : "text-gray-500"}`}>
                Details
              </span>
              <span className={`text-sm ${currentStep >= 3 ? "text-blue-600 font-semibold" : "text-gray-500"}`}>
                Payment
              </span>
            </div>
          </div>

          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-2xl p-8"
          >
            {/* Step 1: Amount Selection */}
            {currentStep === 1 && (
              <div>
                <div className="text-center mb-8">
                  <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Donation Amount</h3>
                  <p className="text-gray-600">Select how much you'd like to give</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-3">Donation Frequency</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setFormData({ ...formData, frequency: "monthly" })}
                        className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                          formData.frequency === "monthly"
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                      >
                        <div className="font-bold">Monthly</div>
                        <div className="text-sm text-gray-600">Ongoing support</div>
                      </button>
                      <button
                        onClick={() => setFormData({ ...formData, frequency: "onetime" })}
                        className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                          formData.frequency === "onetime"
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                      >
                        <div className="font-bold">One-Time</div>
                        <div className="text-sm text-gray-600">Single donation</div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-3">Amount</label>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {[25, 50, 100, 250, 500, 1000].map((amount) => (
                        <button
                          key={amount}
                          onClick={() => setFormData({ ...formData, amount: amount.toString() })}
                          className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                            formData.amount === amount.toString()
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                        >
                          <div className="font-bold text-xl">${amount}</div>
                        </button>
                      ))}
                    </div>

                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl">$</span>
                      <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        placeholder="Enter custom amount"
                        className="w-full pl-8 pr-4 py-4 border-2 border-gray-200 rounded-2xl text-xl font-bold focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Personal Details */}
            {currentStep === 2 && (
              <div>
                <div className="text-center mb-8">
                  <User className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Information</h3>
                  <p className="text-gray-600">We need some details for your donation receipt</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-2">Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <div>
                <div className="text-center mb-8">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Secure Payment</h3>
                  <p className="text-gray-600">Your payment information is encrypted and secure</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Name on Card</label>
                    <input
                      type="text"
                      name="nameOnCard"
                      value={formData.nameOnCard}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>

                  {/* Donation Summary */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h4 className="font-bold text-gray-900 mb-4">Donation Summary</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Amount:</span>
                        <span className="font-bold">${formData.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Frequency:</span>
                        <span className="font-bold capitalize">{formData.frequency}</span>
                      </div>
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total:</span>
                          <span>${formData.amount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  currentStep === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Previous
              </button>

              {currentStep < 3 ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300"
                >
                  Next Step
                </button>
              ) : (
                <button className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-lg">
                  Complete Donation
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
