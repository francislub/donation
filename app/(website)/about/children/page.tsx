import { ChildrenHero } from "@/components/website/children/children-hero"
import { ChildrenGrid } from "@/components/website/children/children-grid"
import { ChildrenStats } from "@/components/website/children/children-stats"

export default function ChildrenPage() {
  return (
    <div className="pt-20">
      <ChildrenHero />
      <ChildrenStats />
      <ChildrenGrid />
    </div>
  )
}
