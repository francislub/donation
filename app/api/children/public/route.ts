import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const children = await prisma.child.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(children)
  } catch (error) {
    console.error("Error fetching children:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
