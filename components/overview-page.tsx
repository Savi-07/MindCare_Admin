"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockUsers, mockAnalytics } from "@/lib/mock-data";
import { useState } from "react";
import { useAuth } from "./auth-context";
import {
  Users,
  UserCheck,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Shield,
  Brain,
  Heart,
} from "lucide-react";

export function OverviewPage() {
  const { userRole, userCollege } = useAuth();
  const [selectedCollege, setSelectedCollege] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>('all');
  // Get all years for the selected college (if any)
  const collegeUsers = selectedCollege
    ? mockUsers.filter(u => u.college === selectedCollege)
    : [];
  const allYears = Array.from(new Set(collegeUsers.map(u => u.yearOfStudy).filter(Boolean)));

  // Filtered users by year
  const filteredCollegeUsers = collegeUsers.filter(u =>
    selectedYear === 'all' || u.yearOfStudy?.toString() === selectedYear
  );

  const users =
    userRole === "collegeRep" && userCollege
      ? mockUsers.filter(
          (u) => u.college.toLowerCase() === userCollege.toLowerCase()
        )
      : mockUsers;

  const totalUsers = users.length;
  const counselingUsers = users.filter(
    (user) => user.isTakingCounseling
  ).length;
  const flaggedUsers = users.filter((user) => user.riskLevel === "high").length;
  const averageScore = Math.round(
    users.reduce(
      (acc, user) =>
        acc +
        (user.testScores.anxiety +
          user.testScores.depression +
          user.testScores.stress) /
          3,
      0
    ) / (users.length || 1)
  );

  const recentFlaggedUsers = users
    .filter((user) => user.riskLevel === "high")
    .slice(0, 3);

  // Handler for clicking a college
  const handleCollegeClick = (college: string) => {
    setSelectedCollege(college);
  };
    const getRiskColor = (riskLevel: string) => {
      switch (riskLevel) {
        case "high":
          return "text-red-600";
        case "medium":
          return "text-yellow-600";
        default:
          return "text-green-600";
      }
    };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
              {userRole === "collegeRep" && userCollege
                ? `${userCollege} Dashboard`
                : "Admin Dashboard"}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              Comprehensive overview of counseling services and student mental
              health
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span>Real-time monitoring active</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Total Users
            </CardTitle>
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {totalUsers}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center text-green-600 dark:text-green-400 font-medium">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +12%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Total Number of Councilling till date
            </CardTitle>
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <UserCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {counselingUsers}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center text-green-600 dark:text-green-400 font-medium">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +8%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
              High Risk Cases
            </CardTitle>
            <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
              {flaggedUsers}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center text-green-600 dark:text-green-400 font-medium">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                -25%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Scheduled Counsilling Sessions
            </CardTitle>
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Heart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {averageScore}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center text-green-600 dark:text-green-400 font-medium">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                -5%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Highlights */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Flagged Users Highlight */}
        <Card className="border border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/20">
          <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-red-800 dark:text-red-200">
              <div className="p-2 bg-red-100 dark:bg-red-800 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <span className="text-lg font-semibold">Critical Cases</span>
            </CardTitle>
            <p className="text-sm text-red-600 dark:text-red-400">
              Users requiring immediate attention
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentFlaggedUsers.length > 0 ? (
              <>
                {recentFlaggedUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg border border-red-200 dark:border-red-700 hover:shadow-md transition-all duration-200"
                  >
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {user.college}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200 border-red-200 dark:border-red-700">
                        High Risk
                      </Badge>
                      <Button
                        size="sm"
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        Review Case
                      </Button>
                    </div>
                  </div>
                ))}
                <Button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold py-3 rounded-lg transition-all duration-200">
                  View All Critical Cases
                </Button>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="p-4 bg-green-100 dark:bg-green-900 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-green-600 dark:text-green-400 font-medium">
                  All Clear!
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No critical cases at this time
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* College Distribution */}
        <Card className="border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/20">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-blue-800 dark:text-blue-200">
              <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-lg font-semibold">College Analytics</span>
            </CardTitle>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              Counseling participation by department
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {(userRole === "collegeRep" && userCollege
              ? mockAnalytics.usersByCollege.filter(
                  (c) => c.college.toLowerCase() === userCollege.toLowerCase()
                )
              : mockAnalytics.usersByCollege
            ).map((college, index) => {
              const percentage = Math.round(
                (college.counseling / college.users) * 100
              );
              const colors = [
                "bg-gradient-to-r from-blue-500 to-blue-600",
                "bg-gradient-to-r from-green-500 to-green-600",
                "bg-gradient-to-r from-purple-500 to-purple-600",
                "bg-gradient-to-r from-orange-500 to-orange-600",
                "bg-gradient-to-r from-pink-500 to-pink-600",
              ];
              return (
                <button
                  key={college.college}
                  className={`space-y-3 w-full text-left focus:outline-none hover: cursor-pointer
                     ${selectedCollege === college.college ? 'ring-2 ring-green-500' : ''}`}
                  onClick={() => handleCollegeClick(college.college)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-slate-900 dark:text-white">
                      {college.college}
                    </span>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">
                        {college.counseling}/{college.users}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">
                        ({percentage}%)
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
                        colors[index % colors.length]
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </CardContent>
      {/* College details panel (moved below analytics) */}
      {selectedCollege && (
        <div className="mt-6 p-4 bg-white dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-blue-700 shadow">
          <div className="flex flex-wrap gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Year</label>
              <select
                className="border rounded px-2 py-1"
                value={selectedYear}
                onChange={e => setSelectedYear(e.target.value)}
              >
                <option value="all">All Years</option>
                {allYears.sort().map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Students</h4>
            {filteredCollegeUsers.length === 0 ? (
              <div className="text-slate-500">No students found for this selection.</div>
            ) : (
              <table className="w-full text-sm border">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-700">
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Email</th>
                    <th className="p-2 border">Year</th>
                    <th className="p-2 border">Risk</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCollegeUsers.map(u => (
                    <tr key={u.id}>
                      <td className="p-2 border">{u.name}</td>
                      <td className="p-2 border">{u.email}</td>
                      <td className="p-2 border">{u.yearOfStudy ?? '-'}</td>
                      <td className={`p-2 border ${getRiskColor(u.riskLevel)}`}>{u.riskLevel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
        </Card>
      </div>
    </div>
  );
}
