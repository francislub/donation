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
        prisma.child.count().catch(() => 0),
        prisma.beneficiary.count().catch(() => 0),
        prisma.sponsor.count().catch(() => 0),
        prisma.teamMember.count().catch(() => 0),
        prisma.donation.count().catch(() => 0),
        prisma.user.count().catch(() => 0),
      ],
    )

    // Get stats for quick stats section with error handling
    const [sponsorshipStats, donationStats, recentActivities] = await Promise.all([
      prisma.sponsorship
        .groupBy({
          by: ["isActive"],
          _count: true,
        })
        .catch(() => []),
      prisma.donation
        .groupBy({
          by: ["status"],
          _count: true,
        })
        .catch(() => []),
      // Fixed Prisma query - using proper syntax for filtering null values
      prisma.activityLog
        .findMany({
          take: 3,
          orderBy: { timestamp: "desc" },
          where: {
            AND: [{ userId: { not: null } }, { user: { isNot: null } }],
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        })
        .catch(() => []),
    ])

    const activeSponsors = sponsorshipStats.find((s) => s.isActive)?._count || 0
    const inactiveSponsors = sponsorshipStats.find((s) => !s.isActive)?._count || 0
    const pendingDonations = donationStats.find((d) => d.status === "PENDING")?._count || 0

    // Calculate monthly goal progress
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const monthlyTarget = 10000

    const monthlyDonations = await prisma.donation
      .aggregate({
        where: {
          date: {
            gte: new Date(currentYear, currentMonth, 1),
            lt: new Date(currentYear, currentMonth + 1, 1),
          },
          status: "COMPLETED",
        },
        _sum: { amount: true },
      })
      .catch(() => ({ _sum: { amount: 0 } }))

    const monthlyGoal = Math.min(((monthlyDonations._sum.amount || 0) / monthlyTarget) * 100, 100)

    // Get recent children added this week
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    const newChildrenCount = await prisma.child
      .count({
        where: {
          createdAt: {
            gte: oneWeekAgo,
          },
        },
      })
      .catch(() => 0)

    const recentActivity = recentActivities.map((activity) => ({
      action: activity.action,
      time: getTimeAgo(activity.timestamp),
      color: getActivityColor(activity.action),
      user: activity.user?.name || "Unknown User",
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
        inactiveSponsors,
        pendingDonations,
        newChildren: newChildrenCount,
      },
      recentActivity,
    })
  } catch (error) {
    console.error("Error fetching sidebar data:", error)
    // Return default data instead of error to prevent UI crashes
    return NextResponse.json({
      counts: {
        children: 0,
        beneficiaries: 0,
        sponsors: 0,
        team: 0,
        donations: 0,
        users: 0,
      },
      stats: {
        monthlyGoal: 0,
        activeSponsors: 0,
        inactiveSponsors: 0,
        pendingDonations: 0,
        newChildren: 0,
      },
      recentActivity: [],
    })
  }
}

function getTimeAgo(date: Date): string {
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

  if (diffInMinutes < 1) return "Just now"
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`
  if (diffInMinutes < 1440)
    return `${Math.floor(diffInMinutes / 60)} hour${Math.floor(diffInMinutes / 60) > 1 ? "s" : ""} ago`
  return `${Math.floor(diffInMinutes / 1440)} day${Math.floor(diffInMinutes / 1440) > 1 ? "s" : ""} ago`
}

function getActivityColor(action: string): string {
  if (action.includes("child") || action.includes("Child")) return "text-purple-400"
  if (action.includes("donation") || action.includes("Donation")) return "text-green-400"
  if (action.includes("sponsor") || action.includes("Sponsor")) return "text-red-400"
  if (action.includes("team") || action.includes("Team")) return "text-blue-400"
  if (action.includes("user") || action.includes("User")) return "text-indigo-400"
  return "text-gray-400"
}
