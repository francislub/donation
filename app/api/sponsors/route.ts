import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const { name, email, phone, address } = data

    const sponsor = await prisma.sponsor.create({
      data: {
        name,
        email,
        phone,
        address,
      },
    })

    return NextResponse.json(sponsor, { status: 201 })
  } catch (error) {
    console.error("Error creating sponsor:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const sponsors = await prisma.sponsor.findMany({
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

    return NextResponse.json(sponsors)
  } catch (error) {
    console.error("Error fetching sponsors:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
