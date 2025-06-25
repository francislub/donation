import { FundraiseHero } from "@/components/website/fundraise/fundraise-hero"
import { FundraiseOptions } from "@/components/website/fundraise/fundraise-options"
import { FundraiseSteps } from "@/components/website/fundraise/fundraise-steps"
import { FundraiseSuccess } from "@/components/website/fundraise/fundraise-success"

export default function FundraisePage() {
  return (
    <div className="pt-20">
      <FundraiseHero />
      <FundraiseOptions />
      <FundraiseSteps />
      <FundraiseSuccess />
    </div>
  )
}
