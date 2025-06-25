import { VolunteerHero } from "@/components/website/volunteer/volunteer-hero"
import { VolunteerOpportunities } from "@/components/website/volunteer/volunteer-opportunities"
import { VolunteerForm } from "@/components/website/volunteer/volunteer-form"

export default function VolunteerPage() {
  return (
    <div className="pt-20">
      <VolunteerHero />
      <VolunteerOpportunities />
      <VolunteerForm />
    </div>
  )
}
