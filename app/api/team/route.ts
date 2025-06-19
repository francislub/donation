import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const { name, email, password, role, position, phone, bio, avatar } = data

    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email },
    })

    if (existingAdmin) {
      return NextResponse.json({ error: "Team member with this email already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create team member
    const teamMember = await prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        position,
        phone,
        bio,
        avatar,
      },
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        action: `Added new team member: ${name}`,
        details: `Position: ${position}, Role: ${role}`,
        adminId: session.user.id,
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

    const teamMembers = await prisma.admin.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        activities: {
          take: 3,
          orderBy: {
            timestamp: "desc",
          },
        },
      },
    })

    return NextResponse.json(teamMembers)
  } catch (error) {
    console.error("Error fetching team members:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
