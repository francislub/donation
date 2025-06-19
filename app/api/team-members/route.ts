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
    const { name, position, department, email, phone, bio, avatar, startDate } = data

    // Create team member
    const teamMember = await prisma.teamMember.create({
      data: {
        name,
        position,
        department,
        email,
        phone,
        bio,
        avatar,
        startDate: new Date(startDate),
      },
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        action: `Added new team member: ${name}`,
        details: `Position: ${position}, Department: ${department}`,
        userId: session.user.id,
      },
    })

    return NextResponse.json({ message: "Team member added successfully", id: teamMember.id }, { status: 201 })
  } catch (error) {
    console.error("Error creating team member:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const teamMembers = await prisma.teamMember.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(teamMembers)
  } catch (error) {
    console.error("Error fetching team members:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
