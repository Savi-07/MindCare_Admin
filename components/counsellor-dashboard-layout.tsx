"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, Clock, BarChart3, Menu, X, Bell, Search, User, LogOut, Heart } from "lucide-react"
import { useAuth } from "./auth-context"

const counsellorNavigation = [
  { name: "Overview", href: "/counsellor", icon: LayoutDashboard },
  { name: "Students", href: "/counsellor/students", icon: Users },
  { name: "Queue", href: "/counsellor/queue", icon: Clock },
  { name: "Analytics", href: "/counsellor/analytics", icon: BarChart3 },
]

interface CounsellorDashboardLayoutProps {
  children: React.ReactNode
}

export function CounsellorDashboardLayout({ children }: CounsellorDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { logout } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 dark:from-slate-900 dark:to-green-900">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-green-900 to-green-800 border-r border-green-700 transform transition-transform duration-200 ease-in-out lg:translate-x-0 shadow-2xl",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-green-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">Counsellor Portal</h1>
            </div>
            <Button variant="ghost" size="sm" className="lg:hidden text-white hover:bg-green-700" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {counsellorNavigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                      : "text-green-300 hover:bg-green-700 hover:text-white",
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700 px-6 shadow-sm">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="lg:hidden text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>

            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                placeholder="Search students, cases..."
                className="w-64 pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="relative text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
            </Button>

            <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">
              <User className="h-5 w-5" />
            </Button>

            <Button 
              variant="ghost" 
              size="sm" 
              onClick={logout}
              className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6 bg-transparent">{children}</main>
      </div>
    </div>
  )
}
