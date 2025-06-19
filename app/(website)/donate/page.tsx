import { DonateHero } from "@/components/website/donate/donate-hero"
import { DonationOptions } from "@/components/website/donate/donation-options"
import { SponsorshipPlans } from "@/components/website/donate/sponsorship-plans"
import { DonationImpact } from "@/components/website/donate/donation-impact"

export default function DonatePage() {
  return (
    <div className="pt-20">
      <DonateHero />
      <SponsorshipPlans />
      <DonationOptions />
      <DonationImpact />
    </div>
  )
}
