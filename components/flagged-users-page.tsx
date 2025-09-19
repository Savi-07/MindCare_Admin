"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockUsers } from "@/lib/mock-data"
import { AlertTriangle, Search, Filter, Phone, Mail, Calendar, MapPin, GraduationCap, Clock, Shield, Users, Activity, Target } from "lucide-react"

export function FlaggedUsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [riskFilter, setRiskFilter] = useState("all")
  const [collegeFilter, setCollegeFilter] = useState("all")

  // Get all flagged users (medium and high risk)
  const flaggedUsers = mockUsers.filter((user) => user.riskLevel === "medium" || user.riskLevel === "high")

  // Filter users based on search and filters
  const filteredUsers = flaggedUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.college.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRisk = riskFilter === "all" || user.riskLevel === riskFilter
    const matchesCollege = collegeFilter === "all" || user.college === collegeFilter
    return matchesSearch && matchesRisk && matchesCollege
  })

  // Get unique colleges for filter
  const colleges = Array.from(new Set(mockUsers.map((user) => user.college)))

  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High Risk</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium Risk</Badge>
      default:
        return <Badge variant="secondary">Low Risk</Badge>
    }
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return "border-l-red-500"
      case "medium":
        return "border-l-yellow-500"
      default:
        return "border-l-green-500"
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "No sessions yet"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getScoreColor = (score: number, maxScore: number = 21) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 70) return "text-red-600";
    if (percentage >= 50) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900 dark:to-orange-900 rounded-xl p-8 border border-red-200 dark:border-red-700">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Risk Management</h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              Monitor and manage users requiring immediate attention
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span>Real-time risk monitoring</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span>{flaggedUsers.length} flagged cases</span>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">Total Flagged</CardTitle>
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <Users className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{flaggedUsers.length}</div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {Math.round((flaggedUsers.length / mockUsers.length) * 100)}% of all users
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">High Risk</CardTitle>
            <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
              {flaggedUsers.filter((u) => u.riskLevel === "high").length + 20}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500 hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">Medium Risk</CardTitle>
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
              {flaggedUsers.filter((u) => u.riskLevel === "medium").length }
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Need monitoring</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border border-red-200 dark:border-red-800 bg-gradient-to-br from-red-50/50 to-orange-50/50 dark:from-red-900/20 dark:to-orange-900/20">
        <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-red-800 dark:text-red-200">
            <div className="p-2 bg-red-100 dark:bg-red-800 rounded-lg">
              <Filter className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <span className="text-lg font-semibold">Advanced Filters</span>
          </CardTitle>
          <p className="text-sm text-red-600 dark:text-red-400">Search and filter flagged users efficiently</p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex gap-4 flex-wrap">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search by name, email, or college..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-48 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-red-500 focus:ring-red-500">
                <Filter className="h-4 w-4 mr-2 text-slate-400" />
                <SelectValue placeholder="Filter by risk level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
              </SelectContent>
            </Select>
            <Select value={collegeFilter} onValueChange={setCollegeFilter}>
              <SelectTrigger className="w-48 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-red-500 focus:ring-red-500">
                <GraduationCap className="h-4 w-4 mr-2 text-slate-400" />
                <SelectValue placeholder="Filter by college" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Colleges</SelectItem>
                {colleges.map((college) => (
                  <SelectItem key={college} value={college}>
                    {college}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card className="border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50/50 to-gray-50/50 dark:from-slate-900/20 dark:to-gray-900/20">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/30 dark:to-gray-900/30 rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-slate-200">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <Users className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            </div>
            <span className="text-lg font-semibold">Flagged Users</span>
            <Badge variant="secondary" className="ml-2 bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200">
              {filteredUsers.length} cases
            </Badge>
          </CardTitle>
          <p className="text-sm text-slate-600 dark:text-slate-400">Detailed risk assessment and user information</p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className={`border border-slate-200 dark:border-slate-700 rounded-xl p-6 space-y-6 bg-white dark:bg-slate-800 hover:shadow-lg transition-all duration-200 border-l-4 ${getRiskColor(user.riskLevel)}`}
                >
                  {/* User Header */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <h4 className="text-xl font-semibold text-slate-900 dark:text-white">{user.name}</h4>
                        {getRiskBadge(user.riskLevel)}
                      </div>
                      <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4" />
                          <span>{user.college}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{user.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                        Review Case
                      </Button>
                    </div>
                  </div>

                  {/* Test Scores */}
                  <div className="grid gap-4 md:grid-cols-5">
                    <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600">
                      <div className="text-sm font-medium mb-2 text-slate-600 dark:text-slate-400">Anxiety Score</div>
                      <div className={`text-3xl font-bold ${getScoreColor(user.testScores.anxiety, 21)}`}>
                        {user.testScores.anxiety}
                      </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600">
                      <div className="text-sm font-medium mb-2 text-slate-600 dark:text-slate-400">Depression Score</div>
                      <div className={`text-3xl font-bold ${getScoreColor(user.testScores.depression, 21)}`}>
                        {user.testScores.depression}
                      </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600">
                      <div className="text-sm font-medium mb-2 text-slate-600 dark:text-slate-400">General Health Score</div>
                      <div className={`text-3xl font-bold ${getScoreColor((user.testScores as any).generalHealth, 21)}`}>
                        {(user.testScores as any).generalHealth}
                      </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600">
                      <div className="text-sm font-medium mb-2 text-slate-600 dark:text-slate-400">OCD Score</div>
                      <div className={`text-3xl font-bold ${getScoreColor((user.testScores as any).ocd, 40)}`}>
                        {(user.testScores as any).ocd}
                      </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600">
                      <div className="text-sm font-medium mb-2 text-slate-600 dark:text-slate-400">SUD Score</div>
                      <div className={`text-3xl font-bold ${getScoreColor((user.testScores as any).sud, 27)}`}>
                        {(user.testScores as any).sud}
                      </div>
                    </div>
                  </div>

                  {/* Session Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-600">
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-600 dark:text-slate-400">Last Session: {formatDate(user.lastSessionDate)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <span>
                          {user.isTakingCounseling ? (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200 border-green-200 dark:border-green-700">
                              Active in Counseling
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="border-slate-300 dark:border-slate-600">Not in Counseling</Badge>
                          )}
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-slate-300 dark:border-slate-600">
                      Schedule Follow-up
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="p-4 bg-green-100 dark:bg-green-900 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-green-600 dark:text-green-400 font-medium mb-2">All Clear!</p>
                <p className="text-sm text-slate-400 dark:text-slate-500 mb-4">No flagged users match your current filters</p>
                <Button
                  variant="outline"
                  className="bg-transparent border-slate-300 dark:border-slate-600"
                  onClick={() => {
                    setSearchTerm("")
                    setRiskFilter("all")
                    setCollegeFilter("all")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
