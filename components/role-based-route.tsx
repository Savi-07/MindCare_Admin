"use client"

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from './auth-context'
import { LoginPage } from './login-page'

interface RoleBasedRouteProps {
  children: React.ReactNode
  allowedRoles?: ('admin' | 'counsellor')[]
}

export function RoleBasedRoute({ children, allowedRoles }: RoleBasedRouteProps) {
  const { isAuthenticated, userRole, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated && userRole) {
      // Redirect to appropriate dashboard based on role
      if (userRole === 'admin' && !window.location.pathname.startsWith('/') && window.location.pathname !== '/') {
        router.push('/')
      } else if (userRole === 'counsellor' && !window.location.pathname.startsWith('/counsellor')) {
        router.push('/counsellor')
      }
    }
  }, [isAuthenticated, userRole, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginPage />
  }

  // Check if user has permission to access this route
  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard instead of showing access denied
    if (userRole === 'admin') {
      router.push('/')
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg">Redirecting to Admin Dashboard...</p>
          </div>
        </div>
      )
    } else if (userRole === 'counsellor') {
      router.push('/counsellor')
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg">Redirecting to Counsellor Dashboard...</p>
          </div>
        </div>
      )
    }
  }

  return <>{children}</>
}
