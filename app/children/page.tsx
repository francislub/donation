import { Suspense } from "react"
import { ChildrenHero } from "@/components/website/children/children-hero"
import { ChildrenStats } from "@/components/website/children/children-stats"
import { ChildrenGrid } from "@/components/website/children/children-grid"
import { CallToAction } from "@/components/website/call-to-action"

export const metadata = {
  title: "Children - Hope Foundation",
  description:
    "Meet the children who need your support. Sponsor a child today and transform their future through education and care.",
}

export default function ChildrenPage() {
  return (
    <div className="min-h-screen">
      <ChildrenHero />
      <Suspense fallback={<div className="py-20 text-center">Loading statistics...</div>}>
        <ChildrenStats />
      </Suspense>
      <Suspense fallback={<div className="py-20 text-center">Loading children...</div>}>
        <ChildrenGrid />
      </Suspense>
      <CallToAction />
    </div>
  )
}
