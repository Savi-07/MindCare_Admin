"use client"

import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Users, Calendar, TrendingUp, Eye, X } from 'lucide-react'
import { mockAnonymousStudents, mockTraitProgress } from '@/lib/mock-data'

export function CounsellorStudentsPage() {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const [selectedTrait, setSelectedTrait] = useState<string>('Anxiety')

  const students = mockAnonymousStudents
  const traitProgress = mockTraitProgress

  const getTraitData = (studentId: string, trait: string, currentYear?: number) => {
    const data = traitProgress.find(t => t.studentId === studentId && t.trait === trait)
    if (!data) return []
    const all = [
      { year: 'Year 1', score: data.year1 },
      { year: 'Year 2', score: data.year2 },
      { year: 'Year 3', score: data.year3 },
      { year: 'Year 4', score: data.year4 }
    ]
    const limit = currentYear ? Math.max(1, Math.min(4, currentYear)) : 4
    return all.slice(0, limit)
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

      {/* Individual Student Trait Progress - Popup */}
      {selectedStudent && (() => {
        const student = students.find(s => s.anonymousId === selectedStudent)
        if (!student) return null
        const traits = student.traits
        const traitToShow = selectedTrait && traits.includes(selectedTrait) ? selectedTrait : traits[0]
        const data = getTraitData(selectedStudent, traitToShow, student.yearOfStudy)
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={() => setSelectedStudent(null)} />
            <Card className="relative z-10 w-full max-w-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Progress: {student.anonymousId}</h3>
                  <p className="text-sm text-slate-500">Year 1 to Year {student.yearOfStudy}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setSelectedStudent(null)}>
                  <X className="h-4 w-4 mr-1" /> Close
                </Button>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-slate-500">Trait:</span>
                <select
                  value={traitToShow}
                  onChange={(e) => setSelectedTrait(e.target.value)}
                  className="px-2 py-1 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-sm"
                >
                  {traits.map(t => (<option key={t} value={t}>{t}</option>))}
                </select>
              </div>
              <div className="space-y-3">
                {data.map((row) => (
                  <div key={row.year} className="flex items-center gap-3">
                    <div className="w-20 text-xs text-slate-500">{row.year}</div>
                    <div className="flex-1 bg-slate-200 dark:bg-slate-700 h-3 rounded-full">
                      <div className="h-3 rounded-full bg-emerald-500" style={{ width: `${(row.score / 10) * 100}%` }} />
                    </div>
                    <div className="w-10 text-xs font-medium">{row.score}/10</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )
      })()}

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
