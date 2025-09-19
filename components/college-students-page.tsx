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
import { mockUsers, mockFeedback } from "@/lib/mock-data";
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
  BarChart3,
  Heart,
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

  const collegeFeedback = mockFeedback.filter((f) => {
    const user = mockUsers.find((u) => u.id === f.userId);
    return user?.college.toLowerCase() === userCollege?.toLowerCase();
  });
  const positiveFeedback = collegeFeedback.filter((f) => f.sentiment === "positive").length;
  const neutralFeedback = collegeFeedback.filter((f) => f.sentiment === "neutral").length;
  const negativeFeedback = collegeFeedback.filter((f) => f.sentiment === "negative").length;

  // Derived insights for the college (branch-wise and year-wise)
  const branchCounts = collegeStudents.reduce<Record<string, number>>((acc, s) => {
    const key = (s as any).branch || "Unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const yearCounts = [1, 2, 3, 4].map((y) => ({
    year: `${y} Year`,
    count: collegeStudents.filter((s) => s.yearOfStudy === y).length,
  }));

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
    if (score >= 15) return "text-red-600";
    if (score >= 10) return "text-yellow-600";
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

      {/* Visual Insights */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Branch-wise Distribution */}
        <Card className="border border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-slate-200">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <TrendingUp className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              </div>
              <span className="text-lg font-semibold">Branch-wise Distribution</span>
            </CardTitle>
            <p className="text-sm text-slate-600 dark:text-slate-400">Students by branch</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.keys(branchCounts).length === 0 ? (
              <div className="text-sm text-slate-500">No branch data available</div>
            ) : (
              Object.entries(branchCounts).map(([branch, count]) => {
                const pct = collegeStudents.length ? Math.round((count / collegeStudents.length) * 100) : 0;
                return (
                  <div key={branch} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">{branch}</div>
                      <div className="text-sm text-slate-500">{count} ({pct}%)</div>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                      <div className="h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>

        {/* Year-wise Distribution */}
        <Card className="border border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-slate-200">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <BarChart3 className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              </div>
              <span className="text-lg font-semibold">Year-wise Distribution</span>
            </CardTitle>
            <p className="text-sm text-slate-600 dark:text-slate-400">Students by academic year</p>
          </CardHeader>
          <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {yearCounts.map((y) => {
              const pct = collegeStudents.length ? Math.round((y.count / collegeStudents.length) * 100) : 0;
              return (
                <div key={y.year} className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                  <div className="text-xs text-slate-500 mb-2">{y.year}</div>
                  <div className="text-2xl font-bold mb-1">{y.count}</div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{pct}%</div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Feedback Analysis (circular UI) */}
      <Card className="border border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-slate-200">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <Heart className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            </div>
            <span className="text-lg font-semibold">Feedback Analysis</span>
          </CardTitle>
          <p className="text-sm text-slate-600 dark:text-slate-400">Student feedback sentiment breakdown</p>
        </CardHeader>
        <CardContent>
          {(() => {
            const total = collegeFeedback.length;
            const pct = (n: number) => (total ? Math.round((n / total) * 100) : 0);
            const Circle = ({ value, color, label }: { value: number; color: string; label: string }) => (
              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-24 h-24 rounded-full grid place-items-center text-xl font-bold"
                  style={{ background: `conic-gradient(${color} ${pct(value)}%, #e5e7eb ${pct(value)}%)` }}
                >
                  <div className="w-20 h-20 rounded-full bg-white dark:bg-slate-800 grid place-items-center">
                    <span className={color === '#ef4444' ? 'text-red-600' : color === '#f59e0b' ? 'text-yellow-600' : 'text-green-600'}>
                      {value}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{label}</div>
                <div className="text-xs text-slate-500">{pct(value)}% of total</div>
              </div>
            );
            return (
              <div className="grid gap-6 md:grid-cols-3 place-items-center">
                <Circle value={positiveFeedback} color="#10b981" label="Positive Feedback" />
                <Circle value={neutralFeedback} color="#f59e0b" label="Neutral Feedback" />
                <Circle value={negativeFeedback} color="#ef4444" label="Negative Feedback" />
              </div>
            );
          })()}
        </CardContent>
      </Card>
    </div>
  );
}
