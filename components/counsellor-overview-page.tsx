"use client"

import React from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, Clock, TrendingUp, Heart } from 'lucide-react'
import { mockAnalytics } from '@/lib/mock-data'

export function CounsellorOverviewPage() {
  const { counsellorStats } = mockAnalytics

  const statsCards = [
    {
      title: "Students Treated",
      value: counsellorStats.totalStudentsTreated,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Total students helped"
    },
    {
      title: "Active Students",
      value: counsellorStats.activeStudents,
      icon: Heart,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Currently in counseling"
    },
    {
      title: "Waiting in Queue",
      value: counsellorStats.studentsInQueue,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Students awaiting sessions"
    },
    {
      title: "Avg. Improvement",
      value: `${counsellorStats.averageImprovementScore}%`,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Overall progress score"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Counsellor Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Welcome back! Here's your counselling overview.</p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          Active Counsellor
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{stat.title}</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{stat.value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{stat.description}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Students */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Students</h3>
            <Badge variant="secondary">Last 7 days</Badge>
          </div>
          <div className="space-y-3">
            {[
              { id: "STU001", name: "Student 001", lastSession: "2 days ago", improvement: "+12%" },
              { id: "STU002", name: "Student 002", lastSession: "3 days ago", improvement: "+8%" },
              { id: "STU003", name: "Student 003", lastSession: "5 days ago", improvement: "+15%" },
            ].map((student) => (
              <div key={student.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">{student.name}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Last session: {student.lastSession}</p>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-200">
                  {student.improvement}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Queue Status */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Counseling Queue</h3>
            <Badge variant="destructive">{counsellorStats.studentsInQueue} waiting</Badge>
          </div>
          <div className="space-y-3">
            {[
              { id: "STU006", reason: "Academic stress", priority: "High", waitTime: "2 hours" },
              { id: "STU007", reason: "Relationship counseling", priority: "Medium", waitTime: "4 hours" },
              { id: "STU008", reason: "Career guidance", priority: "Low", waitTime: "6 hours" },
            ].map((queueItem) => (
              <div key={queueItem.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">{queueItem.id}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{queueItem.reason}</p>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={queueItem.priority === "High" ? "destructive" : queueItem.priority === "Medium" ? "default" : "secondary"}
                    className="mb-1"
                  >
                    {queueItem.priority}
                  </Badge>
                  <p className="text-xs text-slate-500">{queueItem.waitTime}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">This Month's Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">23</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Sessions Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">4.2</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Avg. Session Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">78%</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Student Satisfaction</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
