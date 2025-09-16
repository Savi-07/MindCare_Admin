"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "./auth-context";
import { mockUsers } from "@/lib/mock-data";
import {
  Users,
  Search,
  Filter,
  Phone,
  Mail,
  Calendar,
  MapPin,
  GraduationCap,
  Clock,
  Shield,
  Eye,
  UserCheck,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

export function CollegeStudentsPage() {
  const { userCollege } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [counselingFilter, setCounselingFilter] = useState("all");

  // Filter students for the specific college
  const collegeStudents = mockUsers.filter(
    (user) => user.college.toLowerCase() === userCollege?.toLowerCase()
  );

  // Filter students based on search and filters
  const filteredStudents = collegeStudents.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === "all" || user.riskLevel === riskFilter;
    const matchesCounseling =
      counselingFilter === "all" ||
      (counselingFilter === "active" && user.isTakingCounseling) ||
      (counselingFilter === "inactive" && !user.isTakingCounseling);
    return matchesSearch && matchesRisk && matchesCounseling;
  });

  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            High Risk
          </Badge>
        );
      case "medium":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Medium Risk
          </Badge>
        );
      default:
        return <Badge variant="secondary">Low Risk</Badge>;
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return "border-l-red-500";
      case "medium":
        return "border-l-yellow-500";
      default:
        return "border-l-green-500";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-red-600";
    if (score >= 50) return "text-yellow-600";
    return "text-green-600";
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "No sessions yet";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 rounded-xl p-8 border border-blue-200 dark:border-blue-700">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
            <Users className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
              Student Directory
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              Manage and monitor all students at {userCollege}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{collegeStudents.length} total students</span>
          </div>
          <div className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            <span>
              {collegeStudents.filter((s) => s.isTakingCounseling).length} in
              counseling
            </span>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Total Students
            </CardTitle>
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {collegeStudents.length}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Enrolled students
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Active Counseling
            </CardTitle>
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <UserCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {collegeStudents.filter((s) => s.isTakingCounseling).length}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Currently in counseling
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500 hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Medium Risk
            </CardTitle>
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
              {collegeStudents.filter((s) => s.riskLevel === "medium").length}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Need monitoring
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
              High Risk
            </CardTitle>
            <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
              {collegeStudents.filter((s) => s.riskLevel === "high").length}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Require immediate attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50/50 to-gray-50/50 dark:from-slate-900/20 dark:to-gray-900/20">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/30 dark:to-gray-900/30 rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-slate-200">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <Filter className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            </div>
            <span className="text-lg font-semibold">
              Student Search & Filter
            </span>
          </CardTitle>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Find and filter students efficiently
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex gap-4 flex-wrap mb-6">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-48 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500">
                <Filter className="h-4 w-4 mr-2 text-slate-400" />
                <SelectValue placeholder="Filter by risk level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={counselingFilter}
              onValueChange={setCounselingFilter}
            >
              <SelectTrigger className="w-48 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500">
                <UserCheck className="h-4 w-4 mr-2 text-slate-400" />
                <SelectValue placeholder="Filter by counseling status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Students</SelectItem>
                <SelectItem value="active">Active Counseling</SelectItem>
                <SelectItem value="inactive">Not in Counseling</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Students List */}
          <div className="space-y-4">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className={`border border-slate-200 dark:border-slate-700 rounded-xl p-6 space-y-4 bg-white dark:bg-slate-800 hover:shadow-lg transition-all duration-200 border-l-4 ${getRiskColor(
                    student.riskLevel
                  )}`}
                >
                  {/* Student Header */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <h4 className="text-xl font-semibold text-slate-900 dark:text-white">
                          {student.name}
                        </h4>
                        {getRiskBadge(student.riskLevel)}
                      </div>
                      <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span>{student.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{student.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-300 dark:border-slate-600"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Profile
                      </Button>
                    </div>
                  </div>

                  {/* Test Scores */}
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600">
                      <div className="text-sm font-medium mb-2 text-slate-600 dark:text-slate-400">
                        Anxiety Score
                      </div>
                      <div
                        className={`text-3xl font-bold ${getScoreColor(
                          student.testScores.anxiety
                        )}`}
                      >
                        {student.testScores.anxiety}
                      </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600">
                      <div className="text-sm font-medium mb-2 text-slate-600 dark:text-slate-400">
                        Depression Score
                      </div>
                      <div
                        className={`text-3xl font-bold ${getScoreColor(
                          student.testScores.depression
                        )}`}
                      >
                        {student.testScores.depression}
                      </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600">
                      <div className="text-sm font-medium mb-2 text-slate-600 dark:text-slate-400">
                        Stress Score
                      </div>
                      <div
                        className={`text-3xl font-bold ${getScoreColor(
                          student.testScores.stress
                        )}`}
                      >
                        {student.testScores.stress}
                      </div>
                    </div>
                  </div>

                  {/* Session Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-600">
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-600 dark:text-slate-400">
                          Last Session: {formatDate(student.lastSessionDate)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <span>
                          {student.isTakingCounseling ? (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200 border-green-200 dark:border-green-700">
                              Active in Counseling
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="border-slate-300 dark:border-slate-600"
                            >
                              Not in Counseling
                            </Badge>
                          )}
                        </span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-300 dark:border-slate-600"
                    >
                      Schedule Follow-up
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                  No students found
                </p>
                <p className="text-sm text-slate-400 dark:text-slate-500 mb-4">
                  No students match your current filters
                </p>
                <Button
                  variant="outline"
                  className="bg-transparent border-slate-300 dark:border-slate-600"
                  onClick={() => {
                    setSearchTerm("");
                    setRiskFilter("all");
                    setCounselingFilter("all");
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
  );
}
