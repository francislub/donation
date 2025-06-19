import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get counts for navigation badges
    const [childrenCount, beneficiariesCount, sponsorsCount, teamCount, donationsCount, usersCount] = await Promise.all(
      [
        prisma.child.count(),
        prisma.beneficiary.count(),
        prisma.sponsor.count(),
        prisma.teamMember.count(),
        prisma.donation.count(),
        prisma.user.count(),
      ],
    )

    // Get stats for quick stats section
    const [sponsorshipStats, donationStats, recentActivities] = await Promise.all([
      prisma.sponsorship.groupBy({
        by: ["isActive"],
        _count: true,
      }),
      prisma.donation.groupBy({
        by: ["status"],
        _count: true,
      }),
      prisma.activityLog.findMany({
        take: 3,
        orderBy: { timestamp: "desc" },
        include: { user: true },
      }),
    ])

    const activeSponsors = sponsorshipStats.find((s) => s.isActive)?._count || 0
    const pendingDonations = donationStats.find((d) => d.status === "PENDING")?._count || 0

    // Calculate monthly goal progress
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const monthlyTarget = 10000

    const monthlyDonations = await prisma.donation.aggregate({
      where: {
        date: {
          gte: new Date(currentYear, currentMonth, 1),
          lt: new Date(currentYear, currentMonth + 1, 1),
        },
        status: "COMPLETED",
      },
      _sum: { amount: true },
    })

    const monthlyGoal = Math.min(((monthlyDonations._sum.amount || 0) / monthlyTarget) * 100, 100)

    // Get recent children added this week
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    const newChildrenCount = await prisma.child.count({
      where: {
        createdAt: {
          gte: oneWeekAgo,
        },
      },
    })

    const recentActivity = recentActivities.map((activity) => ({
      action: activity.action,
      time: getTimeAgo(activity.timestamp),
      color: getActivityColor(activity.action),
    }))

    return NextResponse.json({
      counts: {
        children: childrenCount,
        beneficiaries: beneficiariesCount,
        sponsors: sponsorsCount,
        team: teamCount,
        donations: donationsCount,
        users: usersCount,
      },
      stats: {
        monthlyGoal: Math.round(monthlyGoal),
        activeSponsors,
        pendingDonations,
        newChildren: newChildrenCount,
      },
      recentActivity,
    })
  } catch (error) {
    console.error("Error fetching sidebar data:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function getTimeAgo(date: Date): string {
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

  if (diffInMinutes < 1) return "Just now"
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hour ago`
  return `${Math.floor(diffInMinutes / 1440)} day ago`
}

function getActivityColor(action: string): string {
  if (action.includes("child") || action.includes("Child")) return "text-purple-400"
  if (action.includes("donation") || action.includes("Donation")) return "text-green-400"
  if (action.includes("sponsor") || action.includes("Sponsor")) return "text-red-400"
  if (action.includes("team") || action.includes("Team")) return "text-blue-400"
  if (action.includes("user") || action.includes("User")) return "text-indigo-400"
  return "text-gray-400"
}
