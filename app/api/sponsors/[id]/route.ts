import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const sponsor = await prisma.sponsor.findUnique({
      where: { id: params.id },
      include: {
        donations: true,
        sponsorships: {
          include: {
            child: true,
          },
        },
      },
    })

    if (!sponsor) {
      return NextResponse.json({ error: "Sponsor not found" }, { status: 404 })
    }

    return NextResponse.json(sponsor)
  } catch (error) {
    console.error("Error fetching sponsor:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const { name, email, phone, address, isActive, isBlacklisted } = data

    const sponsor = await prisma.sponsor.update({
      where: { id: params.id },
      data: {
        name,
        email,
        phone,
        address,
        isActive,
        isBlacklisted,
      },
    })

    return NextResponse.json(sponsor)
  } catch (error) {
    console.error("Error updating sponsor:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await prisma.sponsor.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Sponsor deleted successfully" })
  } catch (error) {
    console.error("Error deleting sponsor:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
