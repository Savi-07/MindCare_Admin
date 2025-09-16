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
import { mockUsers, mockFeedback, mockCounsellingQueue } from "@/lib/mock-data";
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
  Search,
  Filter,
  Phone,
  Mail,
  Calendar,
  MapPin,
  GraduationCap,
  Clock,
  Target,
  BarChart3,
  Eye,
} from "lucide-react";

// Generate random user ID function
export function generateUserId(): string {
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      // Use a shorter, user-friendly form by trimming
      const uuid = (crypto as any).randomUUID() as string;
      return `user_${uuid.split("-")[0]}${uuid.split("-")[1]}`;
    }
  } catch {
    // ignore and fallback
  }
  const randomPart = Math.random().toString(36).slice(2, 8);
  const timePart = Date.now().toString(36);
  return `user_${timePart}${randomPart}`;
}

export function CollegeDashboardPage() {
  const { userCollege } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [counselingStatusFilter, setCounselingStatusFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [generatedUserIds, setGeneratedUserIds] = useState<Record<string, string>>({});

  // Generate user ID for a specific user
  const getUserGeneratedId = (userId: string) => {
    if (!generatedUserIds[userId]) {
      const newId = generateUserId();
      setGeneratedUserIds((prev) => ({ ...prev, [userId]: newId }));
      return newId;
    }
    return generatedUserIds[userId];
  };

  // Filter data for the specific college
  const collegeUsers = mockUsers.filter(
    (user) => user.college.toLowerCase() === userCollege?.toLowerCase()
  );

  const collegeFeedback = mockFeedback.filter((feedback) => {
    const user = mockUsers.find((u) => u.id === feedback.userId);
    return user?.college.toLowerCase() === userCollege?.toLowerCase();
  });

  const collegeQueue = mockCounsellingQueue.filter((item) => {
    // For demo purposes, we'll show some queue items for the college
    return true; // In real app, this would be filtered by college
  });

  // Calculate statistics
  const totalUsers = collegeUsers.length;
  const counselingUsers = collegeUsers.filter(
    (user) => user.isTakingCounseling
  ).length;
  const flaggedUsers = collegeUsers.filter(
    (user) => user.riskLevel === "high"
  ).length;
  const mediumRiskUsers = collegeUsers.filter(
    (user) => user.riskLevel === "medium"
  ).length;
  const averageScore = Math.round(
    collegeUsers.reduce(
      (acc, user) =>
        acc +
        (user.testScores.anxiety +
          user.testScores.depression +
          user.testScores.stress) /
          3,
      0
    ) / (collegeUsers.length || 1)
  );

  // Filter users based on search and filters
  const filteredUsers = collegeUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === "all" || user.riskLevel === riskFilter;
    const matchesCounseling =
      counselingStatusFilter === "all" ||
      (counselingStatusFilter === "active" && user.isTakingCounseling) ||
      (counselingStatusFilter === "inactive" && !user.isTakingCounseling);
    const matchesYear =
      yearFilter === "all" ||
      (yearFilter === "1styear" && user.yearOfStudy === 1) ||
      (yearFilter === "2ndyear" && user.yearOfStudy === 2) ||
      (yearFilter === "3rdyear" && user.yearOfStudy === 3) ||
      (yearFilter === "4thyear" && user.yearOfStudy === 4);
    return matchesSearch && matchesRisk && matchesCounseling && matchesYear;
  });

  //filter student on the basis of thier year
  const filteredUsersbyYear = collegeUsers.filter((user) => {
   const matchesCounseling =
  counselingStatusFilter === "all" ||
  (counselingStatusFilter === "active" && user.isTakingCounseling) ||
  (counselingStatusFilter === "inactive" && !user.isTakingCounseling) ||
  (counselingStatusFilter === "1styear" && user.yearOfStudy === 1) ||
  (counselingStatusFilter === "2ndyear" && user.yearOfStudy === 2) ||
  (counselingStatusFilter === "3rdyear" && user.yearOfStudy === 3) ||
  (counselingStatusFilter === "4thyear" && user.yearOfStudy === 4);
    return  matchesCounseling;
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
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900 dark:to-teal-900 rounded-xl p-8 border border-emerald-200 dark:border-emerald-700">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
              {userCollege} Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              Comprehensive overview of student mental health and counseling
              services
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
              Total Students
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
                +8%
              </span>{" "}
              from last month
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
              {counselingUsers}
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
                -15%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Avg Wellness Score
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
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +5%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Highlights */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Risk Distribution */}
        <Card className="border border-orange-200 dark:border-orange-800 bg-orange-50/50 dark:bg-orange-900/20">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/30 dark:to-yellow-900/30 rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-orange-800 dark:text-orange-200">
              <div className="p-2 bg-orange-100 dark:bg-orange-800 rounded-lg">
                <Target className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="text-lg font-semibold">Risk Distribution</span>
            </CardTitle>
            <p className="text-sm text-orange-600 dark:text-orange-400">
              Student risk level breakdown
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {collegeUsers.filter((u) => u.riskLevel === "low").length}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Low Risk
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {mediumRiskUsers}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Medium Risk
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {flaggedUsers}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  High Risk
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Counseling Status */}
        <Card className="border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/20">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-blue-800 dark:text-blue-200">
              <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-lg font-semibold">Counseling Status</span>
            </CardTitle>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              Active vs inactive counseling participation
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {counselingUsers}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Active
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-600">
                  {totalUsers - counselingUsers}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Not Active
                </div>
              </div>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(counselingUsers / totalUsers) * 100}%` }}
              />
            </div>
            <div className="text-center text-sm text-slate-600 dark:text-slate-400">
              {Math.round((counselingUsers / totalUsers) * 100)}% participation
              rate
            </div>
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
            <span className="text-lg font-semibold">Student Management</span>
          </CardTitle>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Search and filter students efficiently
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
                className="pl-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-48 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-emerald-500">
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
              value={counselingStatusFilter}
              onValueChange={setCounselingStatusFilter}
            >
              <SelectTrigger className="w-48 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-emerald-500">
                <UserCheck className="h-4 w-4 mr-2 text-slate-400" />
                <SelectValue placeholder="Filter by counseling status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Students</SelectItem>
                <SelectItem value="active">Active Counseling</SelectItem>
                <SelectItem value="inactive">Not in Counseling</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={yearFilter}
              onValueChange={setYearFilter}
            >
              <SelectTrigger className="w-48 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-emerald-500">
                <GraduationCap className="h-4 w-4 mr-2 text-slate-400" />
                <SelectValue placeholder="Filter by year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="1styear">1st Year</SelectItem>
                <SelectItem value="2ndyear">2nd Year</SelectItem>
                <SelectItem value="3rdyear">3rd Year</SelectItem>
                <SelectItem value="4thyear">4th Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Students List */}
          <div className="space-y-4">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className={`border border-slate-200 dark:border-slate-700 rounded-xl p-6 space-y-4 bg-white dark:bg-slate-800 hover:shadow-lg transition-all duration-200 border-l-4 ${getRiskColor(
                    user.riskLevel
                  )}`}
                >
                  {/* User Header */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div>
                          <h1 className="text-xl  font-mono">
                            {getUserGeneratedId(user.id)}
                          </h1>
                        </div>
                        {getRiskBadge(user.riskLevel)}
                      </div>
                      <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-2">
                          <span>{userCollege}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{user.location}</span>
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
                        variant="outline"
                        className="border-slate-300 dark:border-slate-600"
                        onClick={() => {
                          const newId = generateUserId();
                          setGeneratedUserIds((prev) => ({
                            ...prev,
                            [user.id]: newId,
                          }));
                        }}
                      >
                        <Target className="h-4 w-4 mr-2" />
                        New ID
                      </Button>
                      <Button
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
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
                          user.testScores.anxiety
                        )}`}
                      >
                        {user.testScores.anxiety}
                      </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600">
                      <div className="text-sm font-medium mb-2 text-slate-600 dark:text-slate-400">
                        Depression Score
                      </div>
                      <div
                        className={`text-3xl font-bold ${getScoreColor(
                          user.testScores.depression
                        )}`}
                      >
                        {user.testScores.depression}
                      </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600">
                      <div className="text-sm font-medium mb-2 text-slate-600 dark:text-slate-400">
                        Stress Score
                      </div>
                      <div
                        className={`text-3xl font-bold ${getScoreColor(
                          user.testScores.stress
                        )}`}
                      >
                        {user.testScores.stress}
                      </div>
                    </div>
                  </div>

                  {/* Session Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-600">
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-600 dark:text-slate-400">
                          Last Session: {formatDate(user.lastSessionDate)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <span>
                          {user.isTakingCounseling ? (
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
                <div className="p-4 bg-green-100 dark:bg-green-900 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-green-600 dark:text-green-400 font-medium mb-2">
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
                    setCounselingStatusFilter("all");
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
