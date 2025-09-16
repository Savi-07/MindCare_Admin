"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Users,
  Calendar,
  Award,
  BarChart3,
  Eye,
  Filter,
  Search,
  X,
  AlertTriangle,
  Clock,
  CheckCircle,
} from "lucide-react";
import { mockAnonymousStudents, mockTraitProgress } from "@/lib/mock-data";

export function CounsellorAnalyticsPage() {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [filterYear, setFilterYear] = useState<string>("all");

  const students = mockAnonymousStudents;
  const traitProgress = mockTraitProgress;

  const filteredStudents =
    filterYear === "all"
      ? students
      : students.filter((s) => s.yearOfStudy.toString() === filterYear);

  const getTraitData = (studentId: string) => {
    return traitProgress.filter((t) => t.studentId === studentId);
  };

  const getImprovementBadgeColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800 border-green-200";
    if (score >= 60) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Individual Student Analysis
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Detailed analysis of each student's progress and counseling journey.
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
          >
            <option value="all">All Years</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
          <Badge variant="outline" className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {filteredStudents.length} Students
          </Badge>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-full">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {filteredStudents.length}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Total Students
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-full">
              <Award className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {
                  filteredStudents.filter((s) => s.improvementScore >= 70)
                    .length
                }
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                High Performers
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 rounded-full">
              <TrendingUp className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {Math.round(
                  filteredStudents.reduce(
                    (acc, s) => acc + s.improvementScore,
                    0
                  ) / filteredStudents.length
                )}
                %
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Avg. Improvement
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-full">
              <Calendar className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {filteredStudents.filter((s) => s.improvementScore < 60).length}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Need Attention
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Student List */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Student Analysis Overview
          </h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStudents.map((student) => {
            const studentTraits = getTraitData(student.anonymousId);
            const avgTraitScore =
              studentTraits.length > 0
                ? Math.round(
                    studentTraits.reduce(
                      (acc, t) =>
                        acc + (t.year1 + t.year2 + t.year3 + t.year4) / 4,
                      0
                    ) / studentTraits.length
                  )
                : 0;

            return (
              <div
                key={student.id}
                className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      {student.anonymousId}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Year {student.yearOfStudy}
                    </p>
                  </div>
                  <Badge
                    className={getImprovementBadgeColor(
                      student.improvementScore
                    )}
                  >
                    {student.improvementScore}%
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex flex-wrap gap-1">
                    {student.traits.map((trait, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">
                      Last Session:
                    </span>
                    <span className="text-slate-900 dark:text-white">
                      {new Date(student.lastSessionDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">
                      Avg. Trait Score:
                    </span>
                    <span className="text-slate-900 dark:text-white">
                      {avgTraitScore}/10
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setSelectedStudent(student.anonymousId)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Detailed Analysis
                </Button>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Individual Student Detailed Analysis Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Detailed Analysis - {selectedStudent}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedStudent(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {(() => {
                const student = students.find(
                  (s) => s.anonymousId === selectedStudent
                );
                const studentTraits = getTraitData(selectedStudent);

                if (!student) return null;

                // Mock historical data for visualization
                const historicalData = {
                  sessions: [
                    {
                      date: "2023-09-15",
                      anxiety: 8,
                      depression: 7,
                      stress: 9,
                      mood: 3,
                    },
                    {
                      date: "2023-10-15",
                      anxiety: 7,
                      depression: 6,
                      stress: 8,
                      mood: 4,
                    },
                    {
                      date: "2023-11-15",
                      anxiety: 6,
                      depression: 5,
                      stress: 7,
                      mood: 5,
                    },
                    {
                      date: "2023-12-15",
                      anxiety: 5,
                      depression: 4,
                      stress: 6,
                      mood: 6,
                    },
                    {
                      date: "2024-01-15",
                      anxiety: 4,
                      depression: 3,
                      stress: 5,
                      mood: 7,
                    },
                    {
                      date: "2024-01-22",
                      anxiety: 3,
                      depression: 2,
                      stress: 4,
                      mood: 8,
                    },
                  ],
                  problems: [
                    {
                      problem: "Academic Pressure",
                      severity: "High",
                      date: "2023-09-01",
                      resolved: true,
                    },
                    {
                      problem: "Social Anxiety",
                      severity: "Medium",
                      date: "2023-10-01",
                      resolved: true,
                    },
                    {
                      problem: "Sleep Issues",
                      severity: "Medium",
                      date: "2023-11-01",
                      resolved: false,
                    },
                    {
                      problem: "Family Conflicts",
                      severity: "Low",
                      date: "2023-12-01",
                      resolved: true,
                    },
                  ],
                };

                return (
                  <div className="space-y-6">
                    {/* Student Overview Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          <h4 className="font-medium text-blue-900 dark:text-blue-100">
                            Profile
                          </h4>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-blue-700 dark:text-blue-200">
                              ID:
                            </span>
                            <span className="text-blue-900 dark:text-blue-100">
                              {student.anonymousId}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-700 dark:text-blue-200">
                              Year:
                            </span>
                            <span className="text-blue-900 dark:text-blue-100">
                              {student.yearOfStudy}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-700 dark:text-blue-200">
                              Sessions:
                            </span>
                            <span className="text-blue-900 dark:text-blue-100">
                              12
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <h4 className="font-medium text-green-900 dark:text-green-100">
                            Progress
                          </h4>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-green-700 dark:text-green-200">
                              Improvement:
                            </span>
                            <span className="text-green-900 dark:text-green-100">
                              {student.improvementScore}%
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-green-700 dark:text-green-200">
                              Consistency:
                            </span>
                            <span className="text-green-900 dark:text-green-100">
                              Regular
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-purple-600" />
                          <h4 className="font-medium text-purple-900 dark:text-purple-100">
                            Status
                          </h4>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-purple-700 dark:text-purple-200">
                              Last Session:
                            </span>
                            <span className="text-purple-900 dark:text-purple-100">
                              {new Date(
                                student.lastSessionDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-purple-700 dark:text-purple-200">
                              Next Session:
                            </span>
                            <span className="text-purple-900 dark:text-purple-100">
                              Scheduled
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-purple-700 dark:text-purple-200">
                              Priority:
                            </span>
                            <span className="text-purple-900 dark:text-purple-100">
                              Medium
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Visual Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Line Chart - Progress Over Time */}
                      <Card className="p-6">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
                          Progress Over Time
                        </h4>
                        <div className="space-y-4">
                          {["Anxiety", "Depression", "Stress", "Mood"].map(
                            (trait, index) => {
                              const colors = [
                                "bg-red-500",
                                "bg-blue-500",
                                "bg-yellow-500",
                                "bg-green-500",
                              ];
                              type MetricKey =
                                | "anxiety"
                                | "depression"
                                | "stress"
                                | "mood";
                              const key = trait.toLowerCase() as MetricKey;
                              const data = historicalData.sessions.map(
                                (session) => session[key]
                              );
                              const maxValue = Math.max(...data);
                              const minValue = Math.min(...data);

                              return (
                                <div key={index} className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                      {trait}
                                    </span>
                                    <span className="text-sm text-slate-600 dark:text-slate-400">
                                      {minValue} → {maxValue}
                                    </span>
                                  </div>
                                  <div className="flex items-end gap-1 h-8">
                                    {data.map((value, i) => (
                                      <div
                                        key={i}
                                        className={`flex-1 ${colors[index]} rounded-t transition-all duration-500`}
                                        style={{
                                          height: `${
                                            ((value - minValue) /
                                              (maxValue - minValue)) *
                                            100
                                          }%`,
                                        }}
                                        title={`${trait}: ${value}/10`}
                                      ></div>
                                    ))}
                                  </div>
                                  <div className="flex justify-between text-xs text-slate-500">
                                    <span>Sep 2023</span>
                                    <span>Jan 2024</span>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </Card>

                      {/* Bar Chart - Trait Comparison */}
                      <Card className="p-6">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
                          Current Trait Levels
                        </h4>
                        <div className="space-y-4">
                          {studentTraits.map((trait, index) => {
                            const colors = [
                              "bg-red-500",
                              "bg-blue-500",
                              "bg-yellow-500",
                              "bg-green-500",
                              "bg-purple-500",
                            ];
                            const currentScore = trait.year4;
                            const improvement = trait.year1 - trait.year4;

                            return (
                              <div key={index} className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    {trait.trait}
                                  </span>
                                  <div className="flex gap-2">
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      Current: {currentScore}/10
                                    </Badge>
                                    <Badge className="bg-green-100 text-green-800 text-xs">
                                      Improved: -{improvement}
                                    </Badge>
                                  </div>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4">
                                  <div
                                    className={`h-4 rounded-full ${
                                      colors[index % colors.length]
                                    } transition-all duration-500`}
                                    style={{
                                      width: `${(currentScore / 10) * 100}%`,
                                    }}
                                  ></div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </Card>
                    </div>

                    {/* Historical Problems */}
                    <Card className="p-6">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
                        Problem History & Resolution
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {historicalData.problems.map((problem, index) => (
                          <div
                            key={index}
                            className="border border-slate-200 dark:border-slate-700 rounded-lg p-4"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-medium text-slate-900 dark:text-white">
                                {problem.problem}
                              </h5>
                              <div className="flex gap-2">
                                <Badge
                                  variant={
                                    problem.severity === "High"
                                      ? "destructive"
                                      : problem.severity === "Medium"
                                      ? "default"
                                      : "secondary"
                                  }
                                  className="text-xs"
                                >
                                  {problem.severity}
                                </Badge>
                                {problem.resolved ? (
                                  <Badge className="bg-green-100 text-green-800 text-xs">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Resolved
                                  </Badge>
                                ) : (
                                  <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                                    <Clock className="h-3 w-3 mr-1" />
                                    Ongoing
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">
                              Reported:{" "}
                              {new Date(problem.date).toLocaleDateString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Counseling Notes & Action Items */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card className="p-6">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
                          Counseling Notes
                        </h4>
                        <div className="space-y-3 text-sm">
                          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <AlertTriangle className="h-4 w-4 text-yellow-600" />
                              <span className="font-medium text-yellow-900 dark:text-yellow-100">
                                Recent Observations
                              </span>
                            </div>
                            <p className="text-yellow-700 dark:text-yellow-200">
                              Student shows significant improvement in anxiety
                              management over the past 6 months. Responds well
                              to cognitive behavioral therapy techniques.
                            </p>
                          </div>
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <TrendingUp className="h-4 w-4 text-blue-600" />
                              <span className="font-medium text-blue-900 dark:text-blue-100">
                                Progress Highlights
                              </span>
                            </div>
                            <p className="text-blue-700 dark:text-blue-200">
                              Recommended to continue weekly sessions with focus
                              on stress management. Student has expressed
                              interest in peer support groups.
                            </p>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-6">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
                          Action Items
                        </h4>
                        <div className="space-y-3">
                          {[
                            {
                              task: "Schedule follow-up session within 2 weeks",
                              priority: "High",
                              status: "Pending",
                            },
                            {
                              task: "Review progress on stress management techniques",
                              priority: "Medium",
                              status: "In Progress",
                            },
                            {
                              task: "Consider introducing mindfulness exercises",
                              priority: "Medium",
                              status: "Pending",
                            },
                            {
                              task: "Monitor academic performance correlation",
                              priority: "Low",
                              status: "Completed",
                            },
                          ].map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
                            >
                              <div>
                                <p className="text-sm font-medium text-slate-900 dark:text-white">
                                  {item.task}
                                </p>
                                <div className="flex gap-2 mt-1">
                                  <Badge
                                    variant={
                                      item.priority === "High"
                                        ? "destructive"
                                        : item.priority === "Medium"
                                        ? "default"
                                        : "secondary"
                                    }
                                    className="text-xs"
                                  >
                                    {item.priority}
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className={
                                      item.status === "Completed"
                                        ? "bg-green-100 text-green-800"
                                        : item.status === "In Progress"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-gray-100 text-gray-800"
                                    }
                                  >
                                    {item.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
