import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye, MapPin, Phone } from "lucide-react"
import Image from "next/image"

async function getBeneficiaries() {
  return await prisma.beneficiary.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })
}

export default async function BeneficiariesPage() {
  const beneficiaries = await getBeneficiaries()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Beneficiaries Management</h1>
          <p className="text-muted-foreground">Manage families and individuals receiving aid</p>
        </div>
        <Link href="/dashboard/beneficiaries/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Beneficiary
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {beneficiaries.map((beneficiary) => (
          <Card key={beneficiary.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative">
              {beneficiary.photos.length > 0 ? (
                <Image
                  src={beneficiary.photos[0] || "/placeholder.svg"}
                  alt={beneficiary.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-4xl font-bold">
                  {beneficiary.name.charAt(0)}
                </div>
              )}
              <div className="absolute top-2 right-2">
                <Badge variant={beneficiary.isActive ? "default" : "secondary"}>
                  {beneficiary.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{beneficiary.name}</CardTitle>
              <Badge variant="outline" className="w-fit">
                {beneficiary.helpType}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {beneficiary.location && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {beneficiary.location}
                  </div>
                )}
                {beneficiary.contact && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {beneficiary.contact}
                  </div>
                )}
                {beneficiary.details && (
                  <p className="text-sm text-muted-foreground line-clamp-3">{beneficiary.details}</p>
                )}
                <div className="flex gap-2 pt-4">
                  <Link href={`/dashboard/beneficiaries/${beneficiary.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="mr-1 h-3 w-3" />
                      View
                    </Button>
                  </Link>
                  <Link href={`/dashboard/beneficiaries/edit/${beneficiary.id}`}>
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
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {beneficiaries.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              B
            </div>
            <h3 className="text-lg font-semibold mb-2">No beneficiaries found</h3>
            <p className="text-muted-foreground mb-4">Start by adding your first beneficiary profile.</p>
            <Link href="/dashboard/beneficiaries/add">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add First Beneficiary
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
