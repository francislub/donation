"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Send } from "lucide-react"

export function VolunteerForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    availability: "",
    interests: [] as string[],
    experience: "",
    motivation: "",
    skills: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    alert("Thank you for your interest in volunteering! We'll be in touch soon.")
    setIsSubmitting(false)

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      availability: "",
      interests: [],
      experience: "",
      motivation: "",
      skills: "",
    })
  }

  const handleInterestChange = (interest: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        interests: [...prev.interests, interest],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        interests: prev.interests.filter((i) => i !== interest),
      }))
    }
  }

  const interests = [
    "Education Support",
    "Healthcare",
    "Community Outreach",
    "Photography & Media",
    "Web Development",
    "Event Planning",
    "Fundraising",
    "International Programs",
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-600 to-purple-600 rounded-full mb-6">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Join Our Volunteer Team</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to make a difference? Fill out the form below and we'll match you with the perfect volunteer
            opportunity.
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-t-lg">
            <CardTitle className="text-2xl font-bold text-gray-900">Volunteer Application</CardTitle>
            <CardDescription className="text-gray-600">
              Tell us about yourself and how you'd like to contribute to our mission.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="location" className="text-sm font-semibold text-gray-700">
                    Location (City, Country) *
                  </Label>
                  <Input
                    id="location"
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="availability" className="text-sm font-semibold text-gray-700">
                    Availability *
                  </Label>
                  <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, availability: value }))}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select your availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2 hours/week">1-2 hours per week</SelectItem>
                      <SelectItem value="3-5 hours/week">3-5 hours per week</SelectItem>
                      <SelectItem value="6-10 hours/week">6-10 hours per week</SelectItem>
                      <SelectItem value="10+ hours/week">10+ hours per week</SelectItem>
                      <SelectItem value="project-based">Project-based</SelectItem>
                      <SelectItem value="seasonal">Seasonal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Interests */}
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-4 block">
                  Areas of Interest (Select all that apply) *
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {interests.map((interest) => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Checkbox
                        id={interest}
                        checked={formData.interests.includes(interest)}
                        onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                      />
                      <Label htmlFor={interest} className="text-sm text-gray-700 cursor-pointer">
                        {interest}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience and Skills */}
              <div>
                <Label htmlFor="experience" className="text-sm font-semibold text-gray-700">
                  Relevant Experience
                </Label>
                <Textarea
                  id="experience"
                  placeholder="Tell us about any relevant volunteer experience, work experience, or education..."
                  value={formData.experience}
                  onChange={(e) => setFormData((prev) => ({ ...prev, experience: e.target.value }))}
                  className="mt-2"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="skills" className="text-sm font-semibold text-gray-700">
                  Special Skills or Talents
                </Label>
                <Textarea
                  id="skills"
                  placeholder="Languages, technical skills, professional expertise, hobbies, etc..."
                  value={formData.skills}
                  onChange={(e) => setFormData((prev) => ({ ...prev, skills: e.target.value }))}
                  className="mt-2"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="motivation" className="text-sm font-semibold text-gray-700">
                  Why do you want to volunteer with us? *
                </Label>
                <Textarea
                  id="motivation"
                  placeholder="Share your motivation and what you hope to achieve through volunteering..."
                  required
                  value={formData.motivation}
                  onChange={(e) => setFormData((prev) => ({ ...prev, motivation: e.target.value }))}
                  className="mt-2"
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white py-4 text-lg font-semibold"
              >
                {isSubmitting ? (
                  "Submitting Application..."
                ) : (
                  <>
                    Submit Application
                    <Send className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
