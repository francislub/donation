"use client"

import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import type * as React from "react"
import { useSession, signOut } from "next-auth/react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useState, useEffect } from "react"
import {
  Users,
  Heart,
  DollarSign,
  Settings,
  BarChart3,
  Home,
  Baby,
  HandHeart,
  LogOut,
  Bell,
  Search,
  Plus,
  TrendingUp,
  Moon,
  Sun,
  ChevronDown,
  Activity,
  Calendar,
  Target,
  Zap,
  UserCheck,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    key: "dashboard",
  },
  {
    name: "Children",
    href: "/dashboard/children",
    icon: Baby,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    key: "children",
  },
  {
    name: "Beneficiaries",
    href: "/dashboard/beneficiaries",
    icon: HandHeart,
    color: "text-green-500",
    bgColor: "bg-green-50",
    key: "beneficiaries",
  },
  {
    name: "Sponsors",
    href: "/dashboard/sponsors",
    icon: Heart,
    color: "text-red-500",
    bgColor: "bg-red-50",
    key: "sponsors",
  },
  {
    name: "Team",
    href: "/dashboard/team",
    icon: Users,
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
    key: "team",
  },
  {
    name: "Users",
    href: "/dashboard/users",
    icon: UserCheck,
    color: "text-cyan-500",
    bgColor: "bg-cyan-50",
    key: "users",
  },
  {
    name: "Donations",
    href: "/dashboard/donations",
    icon: DollarSign,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
    key: "donations",
  },
  {
    name: "Reports",
    href: "/dashboard/reports",
    icon: BarChart3,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    key: "reports",
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    color: "text-gray-500",
    bgColor: "bg-gray-50",
    key: "settings",
  },
]

const quickActions = [
  { name: "Add Child", href: "/dashboard/children/add", icon: Baby, color: "text-purple-500" },
  { name: "New Sponsor", href: "/dashboard/sponsors/add", icon: Heart, color: "text-red-500" },
  { name: "Record Donation", href: "/dashboard/donations/add", icon: DollarSign, color: "text-yellow-500" },
  { name: "Add User", href: "/dashboard/users/add", icon: UserCheck, color: "text-cyan-500" },
]

interface SidebarData {
  counts: {
    children: number
    beneficiaries: number
    sponsors: number
    team: number
    donations: number
    users: number
  }
  stats: {
    monthlyGoal: number
    activeSponsors: number
    pendingDonations: number
    newChildren: number
  }
  recentActivity: Array<{
    action: string
    time: string
    color: string
  }>
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [notifications] = useState(3)
  const [quickStatsOpen, setQuickStatsOpen] = useState(true)
  const [sidebarData, setSidebarData] = useState<SidebarData | null>(null)

  useEffect(() => {
    fetchSidebarData()
  }, [])

  const fetchSidebarData = async () => {
    try {
      const response = await fetch("/api/sidebar-data")
      if (response.ok) {
        const data = await response.json()
        setSidebarData(data)
      }
    } catch (error) {
      console.error("Failed to fetch sidebar data:", error)
    }
  }

  return (
    <SidebarProvider>
      <Sidebar variant="inset" className="border-r-0">
        {/* Custom Background - New Beautiful Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900 via-purple-800 to-blue-900">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fillRule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23F8BBD9&quot; fillOpacity=&quot;0.1&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        </div>

        <SidebarHeader className="relative z-10 border-b border-white/10 bg-white/5 backdrop-blur-sm">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="hover:bg-white/10 text-white">
                <Link href="/dashboard">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-pink-400 to-blue-500 text-white shadow-lg">
                    <Heart className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-bold text-white">Hope Foundation</span>
                    <span className="truncate text-xs text-gray-300">Admin Dashboard</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-400/30">
                    Live
                  </Badge>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          {/* Search Bar */}
          <div className="px-3 py-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20 transition-colors"
              />
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="relative z-10">
          {/* Quick Stats */}
          <Collapsible open={quickStatsOpen} onOpenChange={setQuickStatsOpen}>
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="flex w-full items-center justify-between hover:bg-white/10 rounded-md px-2 py-1 text-white">
                  <span className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    Quick Stats
                  </span>
                  <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <div className="space-y-3 px-2 py-2">
                    <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-400/30 rounded-lg p-3 text-white backdrop-blur-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-300">Monthly Goal</p>
                          <p className="text-lg font-bold">{sidebarData?.stats.monthlyGoal || 0}%</p>
                        </div>
                        <Target className="h-6 w-6 text-pink-400" />
                      </div>
                      <Progress value={sidebarData?.stats.monthlyGoal || 0} className="mt-2 bg-pink-400/20" />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-2 backdrop-blur-sm">
                        <p className="text-xs text-blue-300">Active Sponsors</p>
                        <p className="text-lg font-bold text-blue-200">{sidebarData?.stats.activeSponsors || 0}</p>
                      </div>
                      <div className="bg-purple-500/20 border border-purple-400/30 rounded-lg p-2 backdrop-blur-sm">
                        <p className="text-xs text-purple-300">Pending</p>
                        <p className="text-lg font-bold text-purple-200">{sidebarData?.stats.pendingDonations || 0}</p>
                      </div>
                    </div>
                  </div>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>

          <SidebarSeparator className="bg-white/10" />

          {/* Main Navigation */}
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2 text-gray-300">
              <Activity className="h-4 w-4" />
              Management
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  const count = sidebarData?.counts[item.key as keyof typeof sidebarData.counts]
                  return (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={`group relative overflow-hidden transition-all duration-200 ${
                          isActive
                            ? "bg-white/20 border-l-4 border-l-pink-400 text-white shadow-sm backdrop-blur-sm"
                            : "hover:bg-white/10 text-gray-300 hover:text-white"
                        }`}
                      >
                        <Link href={item.href} className="flex items-center gap-3">
                          <div className={`p-1.5 rounded-lg ${isActive ? "bg-white/20" : "bg-white/10"}`}>
                            <item.icon className={`h-4 w-4 ${isActive ? item.color : "text-gray-400"}`} />
                          </div>
                          <span className="font-medium">{item.name}</span>
                          {count !== undefined && count > 0 && (
                            <Badge
                              variant="secondary"
                              className={`ml-auto ${isActive ? "bg-white/20 text-white" : "bg-white/10 text-gray-300"}`}
                            >
                              {count}
                            </Badge>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator className="bg-white/10" />

          {/* Quick Actions */}
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2 text-gray-300">
              <Zap className="h-4 w-4" />
              Quick Actions
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {quickActions.map((action) => (
                  <SidebarMenuItem key={action.name}>
                    <SidebarMenuButton asChild className="hover:bg-white/10 text-gray-300 hover:text-white">
                      <Link href={action.href} className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-white/10">
                          <action.icon className={`h-4 w-4 ${action.color}`} />
                        </div>
                        <span className="text-sm">{action.name}</span>
                        <Plus className="h-3 w-3 ml-auto text-gray-400" />
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator className="bg-white/10" />

          {/* Recent Activity */}
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2 text-gray-300">
              <Calendar className="h-4 w-4" />
              Recent Activity
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-2 px-2">
                {sidebarData?.recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 ${activity.color.replace("text-", "bg-")}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white truncate">{activity.action}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                )) || <p className="text-xs text-gray-400 px-2">No recent activity</p>}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="relative z-10 border-t border-white/10 bg-white/5 backdrop-blur-sm">
          {/* Theme Toggle & Notifications */}
          <div className="flex items-center justify-between px-3 py-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="h-8 w-8 p-0 text-gray-300 hover:text-white hover:bg-white/10"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 relative text-gray-300 hover:text-white hover:bg-white/10"
            >
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 text-white">
                  {notifications}
                </Badge>
              )}
            </Button>
          </div>

          {/* User Profile */}
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-white/20 hover:bg-white/10 transition-colors text-white"
                  >
                    <div className="relative">
                      <Avatar className="h-8 w-8 rounded-lg border-2 border-white/20 shadow-sm">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="rounded-lg bg-gradient-to-br from-pink-500 to-blue-600 text-white font-semibold">
                          {session?.user?.name?.charAt(0) || "A"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-slate-900 rounded-full"></div>
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold text-white">{session?.user?.name || "Admin User"}</span>
                      <span className="truncate text-xs text-gray-300">{session?.user?.role || "Administrator"}</span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    Notifications
                    {notifications > 0 && (
                      <Badge variant="secondary" className="ml-auto">
                        {notifications}
                      </Badge>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Preferences
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()} className="flex items-center gap-2 text-red-600">
                    <LogOut className="h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b bg-white/80 backdrop-blur-sm">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 hover:bg-gray-100 rounded-md" />
            <div className="h-4 w-px bg-gray-300" />
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Welcome back,</span>
              <span className="font-semibold text-gray-900">{session?.user?.name || "Admin"}</span>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2 px-4">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
              System Online
            </Badge>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-gray-50/50">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
