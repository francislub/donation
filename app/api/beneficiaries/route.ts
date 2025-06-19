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
    const { name, contact, details, photos, helpType, location, isActive } = data

    const beneficiary = await prisma.beneficiary.create({
      data: {
        name,
        contact,
        details,
        photos,
        helpType,
        location,
        isActive,
      },
    })

    return NextResponse.json(beneficiary, { status: 201 })
  } catch (error) {
    console.error("Error creating beneficiary:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const beneficiaries = await prisma.beneficiary.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(beneficiaries)
  } catch (error) {
    console.error("Error fetching beneficiaries:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
