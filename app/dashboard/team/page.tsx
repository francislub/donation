import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, Edit, Trash2, Mail, Shield, Clock } from "lucide-react"

async function getTeamMembers() {
  return await prisma.admin.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      activities: {
        take: 3,
        orderBy: {
          timestamp: "desc",
        },
      },
    },
  })
}

export default async function TeamPage() {
  const teamMembers = await getTeamMembers()

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "destructive"
      case "ADMIN":
        return "default"
      case "EDITOR":
        return "secondary"
      case "VIEWER":
        return "outline"
      default:
        return "outline"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return <Shield className="h-3 w-3" />
      case "ADMIN":
        return <Shield className="h-3 w-3" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
          <p className="text-muted-foreground">Manage team members, roles, and permissions</p>
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
          <Card key={member.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Avatar className="w-16 h-16 mx-auto mb-4">
                <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-purple-400 to-pink-500 text-white">
                  {member.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-lg">{member.name}</CardTitle>
              <div className="flex justify-center gap-2">
                <Badge variant={getRoleBadgeVariant(member.role)} className="flex items-center gap-1">
                  {getRoleIcon(member.role)}
                  {member.role.replace("_", " ")}
                </Badge>
                <Badge variant={member.isActive ? "default" : "secondary"}>
                  {member.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {member.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Joined {new Date(member.createdAt).toLocaleDateString()}
                </div>

                {member.activities.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Recent Activity</p>
                    <div className="space-y-1">
                      {member.activities.map((activity) => (
                        <p key={activity.id} className="text-xs text-muted-foreground">
                          {activity.action}
                        </p>
                      ))}
                    </div>
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
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              T
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
