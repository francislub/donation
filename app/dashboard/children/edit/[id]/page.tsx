"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { X } from "lucide-react"

interface Child {
  id: string
  name: string
  age: number
  class: string | null
  bio: string | null
  location: string
  photo: string | null
  needs: string[]
  isActive: boolean
  isSponsored: boolean
}

export default function EditChildPage({ params }: { params: { id: string } }) {
  const [child, setChild] = useState<Child | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    class: "",
    bio: "",
    location: "",
    photo: "",
    needs: [] as string[],
    isActive: true,
  })
  const [currentNeed, setCurrentNeed] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchChild()
  }, [params.id])

  const fetchChild = async () => {
    try {
      const response = await fetch(`/api/children/${params.id}`)
      if (response.ok) {
        const childData = await response.json()
        setChild(childData)
        setFormData({
          name: childData.name,
          age: childData.age.toString(),
          class: childData.class || "",
          bio: childData.bio || "",
          location: childData.location,
          photo: childData.photo || "",
          needs: childData.needs || [],
          isActive: childData.isActive,
        })
      } else {
        setError("Failed to fetch child data")
      }
    } catch (error) {
      setError("An error occurred while fetching child data")
    } finally {
      setFetchLoading(false)
    }
  }

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
      const response = await fetch(`/api/children/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          age: Number.parseInt(formData.age),
        }),
      })

      if (response.ok) {
        router.push(`/dashboard/children/${params.id}`)
      } else {
        const data = await response.json()
        setError(data.error || "Failed to update child")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading child data...</p>
        </div>
      </div>
    )
  }

  if (!child) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Child not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Child Profile</h1>
        <p className="text-muted-foreground">Update {child.name}'s information</p>
      </div>

      <Card className="max-w-4xl">
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

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label htmlFor="isActive">Profile is active</Label>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Child"}
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
