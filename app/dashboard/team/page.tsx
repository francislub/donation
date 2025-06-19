import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Edit, Trash2, Mail, Briefcase, Calendar, Users } from "lucide-react"

async function getTeamMembers() {
  return await prisma.teamMember.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })
}

export default async function TeamPage() {
  const teamMembers = await getTeamMembers()

  const getPositionColor = (position: string) => {
    switch (position.toLowerCase()) {
      case "ceo":
        return "bg-gradient-to-r from-purple-500 to-pink-500"
      case "director":
        return "bg-gradient-to-r from-blue-500 to-indigo-500"
      case "manager":
        return "bg-gradient-to-r from-green-500 to-teal-500"
      case "team leader":
        return "bg-gradient-to-r from-orange-500 to-red-500"
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600"
    }
  }

  const getPositionBadgeVariant = (position: string) => {
    switch (position.toLowerCase()) {
      case "ceo":
        return "destructive"
      case "director":
        return "default"
      case "manager":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Members</h1>
          <p className="text-muted-foreground">Meet our organizational team and leadership</p>
        </div>
        <Link href="/dashboard/team/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Team Member
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <Card key={member.id} className="hover:shadow-lg transition-shadow overflow-hidden">
            <div className={`h-2 ${getPositionColor(member.position)}`}></div>
            <CardHeader className="text-center">
              <Avatar className="w-20 h-20 mx-auto mb-4 border-4 border-white shadow-lg">
                <AvatarImage src={member.avatar || undefined} />
                <AvatarFallback className={`text-xl font-bold text-white ${getPositionColor(member.position)}`}>
                  {member.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">{member.name}</CardTitle>
              <div className="flex justify-center gap-2 flex-wrap">
                <Badge variant={getPositionBadgeVariant(member.position)} className="font-semibold">
                  {member.position}
                </Badge>
                {member.department && (
                  <Badge variant="outline" className="text-xs">
                    {member.department}
                  </Badge>
                )}
                <Badge variant={member.isActive ? "default" : "secondary"}>
                  {member.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {member.email && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {member.email}
                  </div>
                )}
                {member.phone && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Briefcase className="h-4 w-4" />
                    {member.phone}
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Started {new Date(member.startDate).toLocaleDateString()}
                </div>

                {member.bio && (
                  <div className="mt-3">
                    <p className="text-sm text-muted-foreground line-clamp-3">{member.bio}</p>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <Link href={`/dashboard/team/edit/${member.id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-1 h-3 w-3" />
                      Edit
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" className="text-red-600">
                    <Trash2 className="mr-1 h-3 w-3" />
                    Remove
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {teamMembers.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No team members found</h3>
            <p className="text-muted-foreground mb-4">Start by adding your first team member.</p>
            <Link href="/dashboard/team/add">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add First Team Member
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
