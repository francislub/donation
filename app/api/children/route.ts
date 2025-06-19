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
    const { name, age, class: childClass, bio, location, photo, gallery, needs } = data

    const child = await prisma.child.create({
      data: {
        name,
        age,
        class: childClass,
        bio,
        location,
        photo,
        gallery: gallery || [],
        needs: needs || [],
      },
    })

    return NextResponse.json(child, { status: 201 })
  } catch (error) {
    console.error("Error creating child:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const children = await prisma.child.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        sponsorships: {
          include: {
            sponsor: true,
          },
        },
      },
    })

    return NextResponse.json(children)
  } catch (error) {
    console.error("Error fetching children:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
