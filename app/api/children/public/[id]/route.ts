import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const child = await prisma.child.findUnique({
      where: {
        id: params.id,
        isActive: true,
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
