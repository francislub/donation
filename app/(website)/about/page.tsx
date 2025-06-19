import { OurStory } from "@/components/website/about/our-story"
import { OurMission } from "@/components/website/about/our-mission"
import { OurImpact } from "@/components/website/about/our-impact"
import { OurTeam } from "@/components/website/about/our-team"

export default function AboutPage() {
  return (
    <div className="pt-20">
      <OurStory />
      <OurMission />
      <OurImpact />
      <OurTeam />
    </div>
  )
}
