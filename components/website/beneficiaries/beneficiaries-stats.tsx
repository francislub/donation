import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Users, GraduationCap, Home, Heart } from "lucide-react"

export function BeneficiariesStats() {
  const stats = [
    {
      icon: Users,
      label: "Children Supported",
      value: "2,847",
      description: "Active beneficiaries in our programs",
      color: "text-blue-600",
    },
    {
      icon: GraduationCap,
      label: "Education Programs",
      value: "156",
      description: "Schools and educational initiatives",
      color: "text-green-600",
    },
    {
      icon: Home,
      label: "Communities Reached",
      value: "89",
      description: "Villages and urban areas served",
      color: "text-purple-600",
    },
    {
      icon: Heart,
      label: "Success Stories",
      value: "1,234",
      description: "Children who've graduated our programs",
      color: "text-red-600",
    },
  ]

  const impactAreas = [
    { area: "Education", percentage: 85, color: "bg-blue-500" },
    { area: "Healthcare", percentage: 72, color: "bg-green-500" },
    { area: "Nutrition", percentage: 91, color: "bg-yellow-500" },
    { area: "Shelter", percentage: 68, color: "bg-purple-500" },
  ]

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Impact in Numbers</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how your support is making a real difference in the lives of children and communities worldwide.
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="bg-gray-100 p-3 rounded-full">
                      <IconComponent className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                  <p className="text-lg font-semibold text-gray-700 mb-1">{stat.label}</p>
                  <p className="text-sm text-gray-500">{stat.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Impact Areas */}
        <div className="bg-white rounded-lg p-8 shadow-md">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Program Effectiveness</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {impactAreas.map((area, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">{area.area}</span>
                  <span className="text-sm font-semibold text-gray-900">{area.percentage}%</span>
                </div>
                <Progress value={area.percentage} className="h-3" />
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 mt-6 text-sm">
            Based on independent evaluations and beneficiary feedback surveys
          </p>
        </div>
      </div>
    </section>
  )
}
