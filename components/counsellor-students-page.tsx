"use client"

import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Users, Calendar, TrendingUp, Eye } from 'lucide-react'
import { mockAnonymousStudents, mockTraitProgress } from '@/lib/mock-data'

export function CounsellorStudentsPage() {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const [selectedTrait, setSelectedTrait] = useState<string>('Anxiety')

  const students = mockAnonymousStudents
  const traitProgress = mockTraitProgress

  const getTraitData = (studentId: string, trait: string) => {
    const data = traitProgress.find(t => t.studentId === studentId && t.trait === trait)
    return data ? [
      { year: 'Year 1', score: data.year1 },
      { year: 'Year 2', score: data.year2 },
      { year: 'Year 3', score: data.year3 },
      { year: 'Year 4', score: data.year4 }
    ] : []
  }

  const getImprovementBadgeColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800 border-green-200"
    if (score >= 60) return "bg-yellow-100 text-yellow-800 border-yellow-200"
    return "bg-red-100 text-red-800 border-red-200"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Student Progress</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Track anonymous student progress and counselling sessions.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Student List Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Anonymous Student List</h3>
          <Badge variant="outline">{students.length} students</Badge>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Student ID</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Year of Study</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Traits</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Last Session</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Improvement Score</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-3 px-4">
                    <div className="font-medium text-slate-900 dark:text-white">{student.anonymousId}</div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="outline">{student.yearOfStudy} Year</Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {student.traits.map((trait, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                    {new Date(student.lastSessionDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <Badge className={getImprovementBadgeColor(student.improvementScore)}>
                      {student.improvementScore}%
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedStudent(student.anonymousId)}
                    >
                      View Progress
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Individual Student Trait Progress */}
      {selectedStudent && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Trait Progress - {selectedStudent}
            </h3>
            <div className="flex gap-2">
              <select
                value={selectedTrait}
                onChange={(e) => setSelectedTrait(e.target.value)}
                className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="Anxiety">Anxiety</option>
                <option value="Depression">Depression</option>
                <option value="Stress Management">Stress Management</option>
                <option value="Academic Pressure">Academic Pressure</option>
              </select>
              <Button variant="outline" size="sm" onClick={() => setSelectedStudent(null)}>
                Close
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Trait Progress Chart */}
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
              <h4 className="font-medium text-slate-900 dark:text-white mb-4">{selectedTrait} Progress Over Years</h4>
              <div className="space-y-3">
                {getTraitData(selectedStudent, selectedTrait).map((data, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-20 text-sm text-slate-600 dark:text-slate-400">{data.year}</div>
                    <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-4">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-600 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${(data.score / 10) * 100}%` }}
                      ></div>
                    </div>
                    <div className="w-12 text-sm font-medium text-slate-900 dark:text-white">{data.score}/10</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900 dark:text-blue-100">Overall Trend</span>
                </div>
                <div className="text-lg font-bold text-blue-900 dark:text-blue-100">Improving</div>
                <div className="text-xs text-blue-700 dark:text-blue-200">+15% this year</div>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-900 dark:text-green-100">Last Session</span>
                </div>
                <div className="text-lg font-bold text-green-900 dark:text-green-100">2 days ago</div>
                <div className="text-xs text-green-700 dark:text-green-200">Regular attendance</div>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-900 dark:text-purple-100">Engagement</span>
                </div>
                <div className="text-lg font-bold text-purple-900 dark:text-purple-100">High</div>
                <div className="text-xs text-purple-700 dark:text-purple-200">Active participation</div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 text-center">
          <div className="text-2xl font-bold text-blue-600">{students.length}</div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Total Students</div>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-2xl font-bold text-green-600">
            {students.filter(s => s.improvementScore >= 70).length}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">High Performers</div>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-2xl font-bold text-orange-600">
            {students.filter(s => s.improvementScore < 60).length}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Need Attention</div>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {Math.round(students.reduce((acc, s) => acc + s.improvementScore, 0) / students.length)}%
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Avg. Improvement</div>
        </Card>
      </div>
    </div>
  )
}
