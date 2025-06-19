import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Trash2, Mail, Shield, Clock, UserPlus } from "lucide-react"

async function getUsers() {
  return await prisma.user.findMany({
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

export default async function UsersPage() {
  const users = await getUsers()

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
          <h1 className="text-3xl font-bold tracking-tight">System Users</h1>
          <p className="text-muted-foreground">Manage users who can access the admin dashboard</p>
        </div>
        <Link href="/dashboard/users/add">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <Card key={user.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Avatar className="w-16 h-16 mx-auto mb-4">
                <AvatarImage src={user.avatar || undefined} />
                <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-lg">{user.name}</CardTitle>
              <div className="flex justify-center gap-2">
                <Badge variant={getRoleBadgeVariant(user.role)} className="flex items-center gap-1">
                  {getRoleIcon(user.role)}
                  {user.role.replace("_", " ")}
                </Badge>
                <Badge variant={user.isActive ? "default" : "secondary"}>{user.isActive ? "Active" : "Inactive"}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </div>
                {user.phone && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {user.phone}
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Joined {new Date(user.createdAt).toLocaleDateString()}
                </div>

                {user.activities.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Recent Activity</p>
                    <div className="space-y-1">
                      {user.activities.map((activity) => (
                        <p key={activity.id} className="text-xs text-muted-foreground">
                          {activity.action}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <Link href={`/dashboard/users/edit/${user.id}`}>
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

      {users.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              U
            </div>
            <h3 className="text-lg font-semibold mb-2">No users found</h3>
            <p className="text-muted-foreground mb-4">Start by adding your first system user.</p>
            <Link href="/dashboard/users/add">
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add First User
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
