import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Camera, Code, Heart, Users, Globe, Clock, MapPin } from "lucide-react"

const opportunities = [
  {
    id: 1,
    title: "Education Support",
    description: "Help children with homework, reading, and educational activities",
    icon: BookOpen,
    location: "Remote & On-site",
    timeCommitment: "2-4 hours/week",
    skills: ["Teaching", "Patience", "Communication"],
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: 2,
    title: "Photography & Media",
    description: "Document our impact through photos and videos",
    icon: Camera,
    location: "On-site",
    timeCommitment: "4-8 hours/month",
    skills: ["Photography", "Video editing", "Storytelling"],
    color: "bg-purple-50 text-purple-600",
  },
  {
    id: 3,
    title: "Web Development",
    description: "Help maintain and improve our digital platforms",
    icon: Code,
    location: "Remote",
    timeCommitment: "5-10 hours/week",
    skills: ["React", "Node.js", "Database management"],
    color: "bg-green-50 text-green-600",
  },
  {
    id: 4,
    title: "Community Outreach",
    description: "Organize events and engage with local communities",
    icon: Users,
    location: "Local communities",
    timeCommitment: "6-12 hours/month",
    skills: ["Event planning", "Public speaking", "Networking"],
    color: "bg-pink-50 text-pink-600",
  },
  {
    id: 5,
    title: "Healthcare Support",
    description: "Assist with medical checkups and health education",
    icon: Heart,
    location: "On-site",
    timeCommitment: "8-16 hours/month",
    skills: ["Medical background", "First aid", "Compassion"],
    color: "bg-red-50 text-red-600",
  },
  {
    id: 6,
    title: "International Programs",
    description: "Support our global initiatives and partnerships",
    icon: Globe,
    location: "International",
    timeCommitment: "1-3 months",
    skills: ["Cultural awareness", "Language skills", "Adaptability"],
    color: "bg-indigo-50 text-indigo-600",
  },
]

export function VolunteerOpportunities() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Volunteer Opportunities</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the perfect way to contribute your skills and make a meaningful impact. Whether you have a few hours a
            week or can commit to longer-term projects, we have opportunities for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {opportunities.map((opportunity) => {
            const IconComponent = opportunity.icon
            return (
              <Card
                key={opportunity.id}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg"
              >
                <CardHeader className="pb-4">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${opportunity.color} mb-4`}
                  >
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                    {opportunity.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">{opportunity.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-pink-500" />
                      {opportunity.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-pink-500" />
                      {opportunity.timeCommitment}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-2">Skills needed:</p>
                      <div className="flex flex-wrap gap-2">
                        {opportunity.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-pink-50 text-pink-600 text-xs font-medium rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold">
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
