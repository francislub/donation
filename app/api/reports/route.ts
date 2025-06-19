import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const from = searchParams.get("from")
    const to = searchParams.get("to")
    const type = searchParams.get("type")

    // Build date filter
    const dateFilter = {
      ...(from && { gte: new Date(from) }),
      ...(to && { lte: new Date(to) }),
    }

    // Get all data with error handling
    const [totalDonations, monthlyDonations, sponsorshipStats, childrenStats, children, sponsors, donations] =
      await Promise.all([
        prisma.donation
          .aggregate({
            _sum: { amount: true },
            _count: true,
            ...(Object.keys(dateFilter).length > 0 && { where: { date: dateFilter } }),
          })
          .catch(() => ({ _sum: { amount: 0 }, _count: 0 })),

        prisma.donation
          .groupBy({
            by: ["date"],
            _sum: { amount: true },
            orderBy: { date: "desc" },
            take: 12,
            ...(Object.keys(dateFilter).length > 0 && { where: { date: dateFilter } }),
          })
          .catch(() => []),

        prisma.sponsorship
          .groupBy({
            by: ["isActive"],
            _count: true,
          })
          .catch(() => []),

        prisma.child
          .groupBy({
            by: ["isSponsored"],
            _count: true,
          })
          .catch(() => []),

        prisma.child
          .findMany({
            select: {
              id: true,
              name: true,
              age: true,
              location: true,
              isSponsored: true,
              createdAt: true,
            },
            orderBy: { createdAt: "desc" },
            take: 100,
            ...(Object.keys(dateFilter).length > 0 && { where: { createdAt: dateFilter } }),
          })
          .catch(() => []),

        prisma.sponsor
          .findMany({
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              status: true,
              createdAt: true,
            },
            orderBy: { createdAt: "desc" },
            take: 100,
            ...(Object.keys(dateFilter).length > 0 && { where: { createdAt: dateFilter } }),
          })
          .catch(() => []),

        prisma.donation
          .findMany({
            select: {
              id: true,
              amount: true,
              donorName: true,
              donorEmail: true,
              status: true,
              date: true,
            },
            orderBy: { date: "desc" },
            take: 100,
            ...(Object.keys(dateFilter).length > 0 && { where: { date: dateFilter } }),
          })
          .catch(() => []),
      ])

    return NextResponse.json({
      totalDonations,
      monthlyDonations,
      sponsorshipStats,
      childrenStats,
      children,
      sponsors,
      donations,
    })
  } catch (error) {
    console.error("Error fetching reports data:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
