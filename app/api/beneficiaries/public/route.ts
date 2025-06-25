import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const beneficiaries = await prisma.beneficiary.findMany({
      where: {
        isActive: true,
      },
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
