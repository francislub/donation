import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const [totalChildren, sponsoredChildren, countries] = await Promise.all([
      prisma.child.count({
        where: { isActive: true },
      }),
      prisma.child.count({
        where: {
          isActive: true,
          isSponsored: true,
        },
      }),
      prisma.child.groupBy({
        by: ["location"],
        where: { isActive: true },
      }),
    ])

    const availableChildren = totalChildren - sponsoredChildren

    return NextResponse.json({
      totalChildren,
      sponsoredChildren,
      availableChildren,
      countries: countries.length,
    })
  } catch (error) {
    console.error("Error fetching children stats:", error)
    return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 })
  }
}
