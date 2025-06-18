import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Heart, MapPin, Calendar, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

async function getChild(id: string) {
  const child = await prisma.child.findUnique({
    where: { id },
    include: {
      sponsorships: {
        include: {
          sponsor: true,
        },
      },
    },
  })

  if (!child) {
    notFound()
  }

  return child
}

export default async function ChildDetailPage({ params }: { params: { id: string } }) {
  const child = await getChild(params.id)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{child.name}</h1>
          <p className="text-muted-foreground">Child Profile Details</p>
        </div>
        <div className="flex gap-2">
          <Link href={`/dashboard/children/edit/${child.id}`}>
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </Link>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Image */}
        <Card>
          <CardContent className="p-6">
            <div className="aspect-square relative mb-4">
              {child.photo ? (
                <Image
                  src={child.photo || "/placeholder.svg"}
                  alt={child.name}
                  fill
                  className="object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white text-6xl font-bold">
                  {child.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold">{child.name}</h3>
              <div className="flex justify-center gap-2">
                <Badge variant={child.isSponsored ? "default" : "secondary"}>
                  {child.isSponsored ? "Sponsored" : "Available"}
                </Badge>
                <Badge variant={child.isActive ? "default" : "destructive"}>
                  {child.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Age</p>
                  <p className="text-sm text-muted-foreground">{child.age} years old</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Class</p>
                  <p className="text-sm text-muted-foreground">{child.class || "Not specified"}</p>
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-muted-foreground">{child.location}</p>
              </div>
            </div>
            {child.bio && (
              <div>
                <p className="text-sm font-medium mb-2">Biography</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{child.bio}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Needs */}
        <Card>
          <CardHeader>
            <CardTitle>Current Needs</CardTitle>
          </CardHeader>
          <CardContent>
            {child.needs.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {child.needs.map((need, index) => (
                  <Badge key={index} variant="outline">
                    {need}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No specific needs listed</p>
            )}
          </CardContent>
        </Card>

        {/* Sponsorship Information */}
        <Card>
          <CardHeader>
            <CardTitle>Sponsorship Information</CardTitle>
          </CardHeader>
          <CardContent>
            {child.sponsorships.length > 0 ? (
              <div className="space-y-4">
                {child.sponsorships.map((sponsorship) => (
                  <div key={sponsorship.id} className="flex items-center space-x-3">
                    <Heart className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="text-sm font-medium">{sponsorship.sponsor.name}</p>
                      <p className="text-xs text-muted-foreground">
                        ${sponsorship.amount}/month since {new Date(sponsorship.startDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <Heart className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No active sponsorship</p>
                <p className="text-xs text-muted-foreground">This child is awaiting a sponsor</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
