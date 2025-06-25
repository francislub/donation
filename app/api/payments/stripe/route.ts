import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const childId = searchParams.get("childId")
  const amount = searchParams.get("amount")
  const frequency = searchParams.get("frequency")

  // Here you would integrate with Stripe API
  // For now, we'll redirect to a placeholder

  // You would create a Stripe checkout session here
  const stripeUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/payment/stripe-checkout?childId=${childId}&amount=${amount}&frequency=${frequency}`

  return NextResponse.redirect(stripeUrl)
}
