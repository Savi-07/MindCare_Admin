"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  userRole: 'admin' | 'counsellor' | null
  login: (username: string, password: string, role: 'admin' | 'counsellor') => boolean
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState<'admin' | 'counsellor' | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already authenticated (from localStorage)
    const authStatus = localStorage.getItem('user_authenticated')
    const role = localStorage.getItem('user_role') as 'admin' | 'counsellor' | null
    if (authStatus === 'true' && role) {
      setIsAuthenticated(true)
      setUserRole(role)
    }
    setIsLoading(false)
  }, [])

  const login = (username: string, password: string, role: 'admin' | 'counsellor'): boolean => {
    // Default credentials for both admin and counsellor
    if ((username === 'admin' && password === 'admin' && role === 'admin') ||
        (username === 'counsellor' && password === 'counsellor' && role === 'counsellor')) {
      setIsAuthenticated(true)
      setUserRole(role)
      localStorage.setItem('user_authenticated', 'true')
      localStorage.setItem('user_role', role)
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUserRole(null)
    localStorage.removeItem('user_authenticated')
    localStorage.removeItem('user_role')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
