import { HeroSection } from "@/components/website/hero-section"
import { ImpactStats } from "@/components/website/impact-stats"
import { FeaturedChildren } from "@/components/website/featured-children"
import { HowItWorks } from "@/components/website/how-it-works"
import { CallToAction } from "@/components/website/call-to-action"
import { Newsletter } from "@/components/website/newsletter"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ImpactStats />
      <FeaturedChildren />
      <HowItWorks />
      <CallToAction />
      <Newsletter />
    </>
  )
}
