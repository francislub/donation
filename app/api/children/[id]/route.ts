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

    const child = await prisma.child.findUnique({
      where: { id: params.id },
      include: {
        sponsorships: {
          include: {
            sponsor: true,
          },
        },
      },
    })

    if (!child) {
      return NextResponse.json({ error: "Child not found" }, { status: 404 })
    }

    return NextResponse.json(child)
  } catch (error) {
    console.error("Error fetching child:", error)
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
    const { name, age, class: childClass, bio, location, photo, gallery, needs, isActive } = data

    const child = await prisma.child.update({
      where: { id: params.id },
      data: {
        name,
        age,
        class: childClass,
        bio,
        location,
        photo,
        gallery: gallery || [],
        needs: needs || [],
        isActive,
      },
    })

    return NextResponse.json(child)
  } catch (error) {
    console.error("Error updating child:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await prisma.child.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Child deleted successfully" })
  } catch (error) {
    console.error("Error deleting child:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
