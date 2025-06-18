"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export default function AddChildPage() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    class: "",
    bio: "",
    location: "",
    photo: "",
    needs: [] as string[],
  })
  const [currentNeed, setCurrentNeed] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const addNeed = () => {
    if (currentNeed.trim() && !formData.needs.includes(currentNeed.trim())) {
      setFormData({
        ...formData,
        needs: [...formData.needs, currentNeed.trim()],
      })
      setCurrentNeed("")
    }
  }

  const removeNeed = (needToRemove: string) => {
    setFormData({
      ...formData,
      needs: formData.needs.filter((need) => need !== needToRemove),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/children", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          age: Number.parseInt(formData.age),
        }),
      })

      if (response.ok) {
        router.push("/dashboard/children")
      } else {
        const data = await response.json()
        setError(data.error || "Failed to add child")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Add New Child</h1>
        <p className="text-gray-600">Create a new child profile for sponsorship</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Child Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="class">Class/Grade</Label>
                <Input
                  id="class"
                  value={formData.class}
                  onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo">Photo URL</Label>
              <Input
                id="photo"
                type="url"
                value={formData.photo}
                onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Biography</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
                placeholder="Tell us about this child..."
              />
            </div>

            <div className="space-y-2">
              <Label>Needs</Label>
              <div className="flex gap-2">
                <Input
                  value={currentNeed}
                  onChange={(e) => setCurrentNeed(e.target.value)}
                  placeholder="Add a need (e.g., School supplies)"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addNeed())}
                />
                <Button type="button" onClick={addNeed} variant="outline">
                  Add
                </Button>
              </div>
              {formData.needs.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.needs.map((need, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {need}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeNeed(need)} />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? "Adding Child..." : "Add Child"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
