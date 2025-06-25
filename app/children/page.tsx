"use client"

import { Suspense } from "react"
import { ChildrenHero } from "@/components/website/children/children-hero"
import { ChildrenGrid } from "@/components/website/children/children-grid"
import { ChildrenStats } from "@/components/website/children/children-stats"

function ChildrenPageContent() {
  return (
    <div className="pt-20">
      <ChildrenHero />
      <ChildrenStats />
      <ChildrenGrid />
    </div>
  )
}

export default function ChildrenPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-20 min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-600"></div>
        </div>
      }
    >
      <ChildrenPageContent />
    </Suspense>
  )
}
