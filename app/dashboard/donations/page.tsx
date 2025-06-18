import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

async function getDonations() {
  return await prisma.donation.findMany({
    orderBy: {
      date: "desc",
    },
    include: {
      sponsor: true,
    },
  })
}

export default async function DonationsPage() {
  const donations = await getDonations()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "default"
      case "PENDING":
        return "secondary"
      case "APPROVED":
        return "default"
      case "REJECTED":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Donations Management</h1>
          <p className="text-gray-600">Track and manage all donations</p>
        </div>
        <Link href="/dashboard/donations/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Record Donation
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Donations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Date</th>
                  <th className="text-left py-2">Donor</th>
                  <th className="text-left py-2">Amount</th>
                  <th className="text-left py-2">Method</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Reference</th>
                  <th className="text-left py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation) => (
                  <tr key={donation.id} className="border-b">
                    <td className="py-3">{new Date(donation.date).toLocaleDateString()}</td>
                    <td className="py-3">{donation.sponsor.name}</td>
                    <td className="py-3 font-semibold">${donation.amount.toLocaleString()}</td>
                    <td className="py-3">
                      <Badge variant="outline">{donation.method.replace("_", " ")}</Badge>
                    </td>
                    <td className="py-3">
                      <Badge variant={getStatusColor(donation.status)}>{donation.status}</Badge>
                    </td>
                    <td className="py-3 text-sm text-gray-600">{donation.reference || "-"}</td>
                    <td className="py-3">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {donations.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No donations recorded yet.</p>
              <Link href="/dashboard/donations/add">
                <Button className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Record First Donation
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
