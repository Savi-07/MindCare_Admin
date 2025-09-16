"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "./auth-context";
import { mockUsers, mockFeedback } from "@/lib/mock-data";
import {
  BarChart3,
  TrendingUp,
  Users,
  UserCheck,
  AlertTriangle,
  Heart,
  Calendar,
  Activity,
  Target,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export function CollegeAnalyticsPage() {
  const { userCollege } = useAuth();
  const [timeRange, setTimeRange] = useState("6months");

  // Filter data for the specific college
  const collegeUsers = mockUsers.filter(
    (user) => user.college.toLowerCase() === userCollege?.toLowerCase()
  );

  const collegeFeedback = mockFeedback.filter((feedback) => {
    const user = mockUsers.find((u) => u.id === feedback.userId);
    return user?.college.toLowerCase() === userCollege?.toLowerCase();
  });

  // Calculate analytics
  const totalUsers = collegeUsers.length;
  const counselingUsers = collegeUsers.filter(
    (user) => user.isTakingCounseling
  ).length;
  const highRiskUsers = collegeUsers.filter(
    (user) => user.riskLevel === "high"
  ).length;
  const mediumRiskUsers = collegeUsers.filter(
    (user) => user.riskLevel === "medium"
  ).length;
  const lowRiskUsers = collegeUsers.filter(
    (user) => user.riskLevel === "low"
  ).length;

  const safeDiv = (num: number, den: number) =>
    den > 0 ? Math.round(num / den) : 0;
  const averageAnxiety = safeDiv(
    collegeUsers.reduce((acc, user) => acc + user.testScores.anxiety, 0),
    totalUsers
  );
  const averageDepression = safeDiv(
    collegeUsers.reduce((acc, user) => acc + user.testScores.depression, 0),
    totalUsers
  );
  const averageStress = safeDiv(
    collegeUsers.reduce((acc, user) => acc + user.testScores.stress, 0),
    totalUsers
  );

  const positiveFeedback = collegeFeedback.filter(
    (f) => f.sentiment === "positive"
  ).length;
  const negativeFeedback = collegeFeedback.filter(
    (f) => f.sentiment === "negative"
  ).length;
  const neutralFeedback = collegeFeedback.filter(
    (f) => f.sentiment === "neutral"
  ).length;

  const averageRating =
    collegeFeedback.length > 0
      ? Math.round(
          (collegeFeedback.reduce((acc, f) => acc + f.rating, 0) /
            collegeFeedback.length) *
            10
        ) / 10
      : 0;

  // Mock trend data
  const trendData = [
    {
      month: "Jul",
      users: Math.floor(totalUsers * 0.8),
      counseling: Math.floor(counselingUsers * 0.7),
    },
    {
      month: "Aug",
      users: Math.floor(totalUsers * 0.85),
      counseling: Math.floor(counselingUsers * 0.75),
    },
    {
      month: "Sep",
      users: Math.floor(totalUsers * 0.9),
      counseling: Math.floor(counselingUsers * 0.8),
    },
    {
      month: "Oct",
      users: Math.floor(totalUsers * 0.95),
      counseling: Math.floor(counselingUsers * 0.85),
    },
    {
      month: "Nov",
      users: totalUsers,
      counseling: Math.floor(counselingUsers * 0.9),
    },
    { month: "Dec", users: totalUsers, counseling: counselingUsers },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900 dark:to-indigo-900 rounded-xl p-8 border border-purple-200 dark:border-purple-700">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl">
            <BarChart3 className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
              Analytics Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              Comprehensive insights and trends for {userCollege}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span>Real-time analytics</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
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
                +12%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Counseling Rate
            </CardTitle>
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <UserCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {totalUsers > 0
                ? Math.round((counselingUsers / totalUsers) * 100)
                : 0}
              %
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
              High Risk Rate
            </CardTitle>
            <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
              {Math.round((highRiskUsers / totalUsers) * 100)}%
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
              Avg Rating
            </CardTitle>
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Heart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {averageRating}/5
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center text-green-600 dark:text-green-400 font-medium">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +0.3
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Risk Distribution */}
        <Card className="border border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-slate-200">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <PieChart className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              </div>
              <span className="text-lg font-semibold">
                Risk Level Distribution
              </span>
            </CardTitle>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Student risk assessment breakdown
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Low Risk
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-slate-900 dark:text-white">
                    {lowRiskUsers}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {totalUsers > 0
                      ? Math.round((lowRiskUsers / totalUsers) * 100)
                      : 0}
                    %
                  </div>
                </div>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      totalUsers > 0 ? (lowRiskUsers / totalUsers) * 100 : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Medium Risk
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-slate-900 dark:text-white">
                    {mediumRiskUsers}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {totalUsers > 0
                      ? Math.round((mediumRiskUsers / totalUsers) * 100)
                      : 0}
                    %
                  </div>
                </div>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                <div
                  className="bg-yellow-500 h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      totalUsers > 0 ? (mediumRiskUsers / totalUsers) * 100 : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    High Risk
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-slate-900 dark:text-white">
                    {highRiskUsers}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {totalUsers > 0
                      ? Math.round((highRiskUsers / totalUsers) * 100)
                      : 0}
                    %
                  </div>
                </div>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                <div
                  className="bg-red-500 h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      totalUsers > 0 ? (highRiskUsers / totalUsers) * 100 : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mental Health Scores */}
        <Card className="border border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-slate-200">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <BarChart3 className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              </div>
              <span className="text-lg font-semibold">
                Average Mental Health Scores
              </span>
            </CardTitle>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              College-wide mental health metrics
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Anxiety
                </span>
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  {averageAnxiety}/100
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4">
                <div
                  className={`h-4 rounded-full transition-all duration-500 ${
                    averageAnxiety >= 70
                      ? "bg-red-500"
                      : averageAnxiety >= 50
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{ width: `${averageAnxiety}%` }}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Depression
                </span>
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  {averageDepression}/100
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4">
                <div
                  className={`h-4 rounded-full transition-all duration-500 ${
                    averageDepression >= 70
                      ? "bg-red-500"
                      : averageDepression >= 50
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{ width: `${averageDepression}%` }}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Stress
                </span>
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  {averageStress}/100
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4">
                <div
                  className={`h-4 rounded-full transition-all duration-500 ${
                    averageStress >= 70
                      ? "bg-red-500"
                      : averageStress >= 50
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{ width: `${averageStress}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback Analysis */}
      <Card className="border border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-slate-200">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <Heart className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            </div>
            <span className="text-lg font-semibold">Feedback Analysis</span>
          </CardTitle>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Student feedback sentiment breakdown
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {positiveFeedback}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Positive Feedback
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                {collegeFeedback.length > 0
                  ? Math.round(
                      (positiveFeedback / collegeFeedback.length) * 100
                    )
                  : 0}
                % of total
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {neutralFeedback}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Neutral Feedback
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                {collegeFeedback.length > 0
                  ? Math.round((neutralFeedback / collegeFeedback.length) * 100)
                  : 0}
                % of total
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {negativeFeedback}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Negative Feedback
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                {collegeFeedback.length > 0
                  ? Math.round(
                      (negativeFeedback / collegeFeedback.length) * 100
                    )
                  : 0}
                % of total
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
