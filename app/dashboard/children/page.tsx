import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye, MapPin, Calendar } from "lucide-react"
import Image from "next/image"

async function getChildren() {
  return await prisma.child.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      sponsorships: {
        include: {
          sponsor: true,
        },
      },
    },
  })
}

export default async function ChildrenPage() {
  const children = await getChildren()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Children Management</h1>
          <p className="text-muted-foreground">Manage children profiles and sponsorship status</p>
        </div>
        <Link href="/dashboard/children/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Child
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {children.map((child) => (
          <Card key={child.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-square relative">
              {child.photo ? (
                <Image src={child.photo || "/placeholder.svg"} alt={child.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-6xl font-bold">
                  {child.name.charAt(0)}
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-1">
                <Badge variant={child.isSponsored ? "default" : "secondary"}>
                  {child.isSponsored ? "Sponsored" : "Available"}
                </Badge>
              </div>
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{child.name}</CardTitle>
                <Badge variant={child.isActive ? "default" : "destructive"}>
                  {child.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {child.age} years old
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {child.location}
                </div>
                {child.class && (
                  <p className="text-sm text-muted-foreground">
                    <strong>Class:</strong> {child.class}
                  </p>
                )}
                {child.bio && <p className="text-sm text-muted-foreground line-clamp-2">{child.bio}</p>}
                {child.needs.length > 0 && (
                  <div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {child.needs.slice(0, 3).map((need, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {need}
                        </Badge>
                      ))}
                      {child.needs.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{child.needs.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
                {child.sponsorships.length > 0 && (
                  <div className="bg-green-50 p-2 rounded-md">
                    <p className="text-xs text-green-700 font-medium">
                      Sponsored by {child.sponsorships[0].sponsor.name}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex gap-2 mt-4">
                <Link href={`/dashboard/children/${child.id}`}>
                  <Button variant="outline" size="sm">
                    <Eye className="mr-1 h-3 w-3" />
                    View
                  </Button>
                </Link>
                <Link href={`/dashboard/children/edit/${child.id}`}>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-1 h-3 w-3" />
                    Edit
                  </Button>
                </Link>
                <Button variant="outline" size="sm" className="text-red-600">
                  <Trash2 className="mr-1 h-3 w-3" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {children.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              C
            </div>
            <h3 className="text-lg font-semibold mb-2">No children profiles found</h3>
            <p className="text-muted-foreground mb-4">Start by adding your first child profile.</p>
            <Link href="/dashboard/children/add">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add First Child
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
