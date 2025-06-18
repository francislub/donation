import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Mail, Phone } from "lucide-react"

async function getSponsors() {
  return await prisma.sponsor.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      donations: true,
      sponsorships: {
        include: {
          child: true,
        },
      },
    },
  })
}

export default async function SponsorsPage() {
  const sponsors = await getSponsors()

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sponsors Management</h1>
          <p className="text-gray-600">Manage sponsors and donors</p>
        </div>
        <Link href="/dashboard/sponsors/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Sponsor
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {sponsors.map((sponsor) => {
          const totalDonations = sponsor.donations.reduce((sum, donation) => sum + donation.amount, 0)

          return (
            <Card key={sponsor.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{sponsor.name}</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant={sponsor.isActive ? "default" : "secondary"}>
                      {sponsor.isActive ? "Active" : "Inactive"}
                    </Badge>
                    {sponsor.isBlacklisted && <Badge variant="destructive">Blacklisted</Badge>}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    {sponsor.email}
                  </div>
                  {sponsor.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      {sponsor.phone}
                    </div>
                  )}
                  {sponsor.address && (
                    <p className="text-sm text-gray-600">
                      <strong>Address:</strong> {sponsor.address}
                    </p>
                  )}

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-sm font-medium">Total Donations</p>
                      <p className="text-lg font-bold text-green-600">${totalDonations.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Sponsorships</p>
                      <p className="text-lg font-bold text-blue-600">{sponsor.sponsorships.length}</p>
                    </div>
                  </div>

                  {sponsor.sponsorships.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Sponsored Children:</p>
                      <div className="space-y-1">
                        {sponsor.sponsorships.map((sponsorship) => (
                          <Badge key={sponsorship.id} variant="outline">
                            {sponsorship.child.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-4">
                    <Link href={`/dashboard/sponsors/edit/${sponsor.id}`}>
                      <Button variant="outline" size="sm">
                        <Edit className="mr-1 h-3 w-3" />
                        Edit
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      View History
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {sponsors.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No sponsors found.</p>
            <Link href="/dashboard/sponsors/add">
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Add First Sponsor
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
