"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockAnalytics, mockUsers } from "@/lib/mock-data"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts"
import { TrendingUp, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon, Activity, Target, Users, AlertTriangle } from "lucide-react"

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"]

export function AnalyticsPage() {
  // Prepare location data for pie chart
  const locationData = mockAnalytics.usersByLocation.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length],
  }))

  // Calculate risk level distribution
  const riskLevelData = [
    { level: "Low", count: mockUsers.filter((u) => u.riskLevel === "low").length, fill: "hsl(var(--chart-1))" },
    { level: "Medium", count: mockUsers.filter((u) => u.riskLevel === "medium").length, fill: "hsl(var(--chart-2))" },
    { level: "High", count: mockUsers.filter((u) => u.riskLevel === "high").length, fill: "hsl(var(--chart-3))" },
  ]

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900 rounded-xl p-8 border border-indigo-200 dark:border-indigo-700">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
            <BarChart3 className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Analytics Dashboard</h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              Advanced insights and trends for counseling services
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span>Real-time data processing</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span>Predictive analytics enabled</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-l-indigo-500 bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900 dark:to-indigo-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Number of Charts</p>
                <p className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">24 Charts</p>
              </div>
              <BarChart3 className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900 dark:to-green-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Data Points</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">1,247</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Students Recovered</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">129</p>
              </div>
              <LineChartIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Improvement Rate</p>
                <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">98.5%</p>
              </div>
              <Target className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Users by College Bar Chart */}
        <Card className="border border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-blue-800 dark:text-blue-200">
              <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-lg font-semibold">College Participation</span>
            </CardTitle>
            <p className="text-sm text-blue-600 dark:text-blue-400">Counseling engagement by department</p>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockAnalytics.usersByCollege}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="college"
                  tick={{ fontSize: 12, width: 120, wordBreak: "break-all", fill: "#64748b" }}
                  angle={-35}
                  textAnchor="end"
                  height={120}
                  interval={0}
                />
                <YAxis tick={{ fill: "#64748b" }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #334155', 
                    borderRadius: '8px',
                    color: '#f1f5f9'
                  }} 
                />
                <Bar dataKey="users" fill="#3b82f6" name="Total Users" radius={[4, 4, 0, 0]} />
                <Bar dataKey="counseling" fill="#10b981" name="In Counseling" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Users by Location Pie Chart */}
        <Card className="border border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-purple-800 dark:text-purple-200">
              <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg">
                <PieChartIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-lg font-semibold">Geographic Distribution</span>
            </CardTitle>
            <p className="text-sm text-purple-600 dark:text-purple-400">User distribution across locations</p>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={locationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ location, users, percent }) => `${location}: ${users} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="users"
                >
                  {locationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #334155', 
                    borderRadius: '8px',
                    color: '#f1f5f9'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Test Scores Trend Line Chart */}
        <Card className="border border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/20">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-green-800 dark:text-green-200">
              <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg">
                <LineChartIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-lg font-semibold">Wellness Trends</span>
            </CardTitle>
            <p className="text-sm text-green-600 dark:text-green-400">Mental health scores over time</p>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockAnalytics.testScoresTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fill: "#64748b" }} />
                <YAxis domain={[0, 34]} tick={{ fill: "#64748b" }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #334155', 
                    borderRadius: '8px',
                    color: '#f1f5f9'
                  }} 
                />
                <Legend />
                <Line type="monotone" dataKey="anxiety" stroke="#f59e0b" strokeWidth={3} name="Anxiety" dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }} />
                <Line
                  type="monotone"
                  dataKey="depression"
                  stroke="#ef4444"
                  strokeWidth={3}
                  name="Depression"
                  dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                />
                <Line type="monotone" dataKey="stress" stroke="#10b981" strokeWidth={3} name="General Health" dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Flagged Cases Trend */}
        <Card className="border border-red-200 dark:border-red-800 bg-gradient-to-br from-red-50/50 to-orange-50/50 dark:from-red-900/20 dark:to-orange-900/20">
          <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-red-800 dark:text-red-200">
              <div className="p-2 bg-red-100 dark:bg-red-800 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <span className="text-lg font-semibold">Risk Cases Trend</span>
            </CardTitle>
            <p className="text-sm text-red-600 dark:text-red-400">High-risk cases over time</p>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockAnalytics.flaggedCasesTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fill: "#64748b" }} />
                <YAxis tick={{ fill: "#64748b" }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #334155', 
                    borderRadius: '8px',
                    color: '#f1f5f9'
                  }} 
                />
                <Line
                  type="monotone"
                  dataKey="cases"
                  stroke="#ef4444"
                  strokeWidth={4}
                  name="Flagged Cases"
                  dot={{ fill: "#ef4444", strokeWidth: 2, r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Risk Level Distribution */}
      <Card className="border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50/50 to-gray-50/50 dark:from-slate-900/20 dark:to-gray-900/20">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/30 dark:to-gray-900/30 rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-slate-200">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <Users className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            </div>
            <span className="text-lg font-semibold">Risk Distribution</span>
          </CardTitle>
          <p className="text-sm text-slate-600 dark:text-slate-400">Current risk level breakdown</p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-3">
            {riskLevelData.map((item, index) => {
              const colors = [
                { bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-200 dark:border-green-800', text: 'text-green-800 dark:text-green-200', icon: 'text-green-600 dark:text-green-400' },
                { bg: 'bg-yellow-50 dark:bg-yellow-900/20', border: 'border-yellow-200 dark:border-yellow-800', text: 'text-yellow-800 dark:text-yellow-200', icon: 'text-yellow-600 dark:text-yellow-400' },
                { bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-200 dark:border-red-800', text: 'text-red-800 dark:text-red-200', icon: 'text-red-600 dark:text-red-400' }
              ]
              const colorSet = colors[index]
              return (
                <div key={item.level} className={`text-center p-6 rounded-xl border ${colorSet.bg} ${colorSet.border} hover:shadow-lg transition-all duration-200`}>
                  <div className="text-4xl font-bold mb-3 text-slate-900 dark:text-white">{item.count}</div>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.fill }} />
                    <span className={`text-sm font-semibold ${colorSet.text}`}>{item.level} Risk</span>
                  </div>
                  <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                    {Math.round((item.count / mockUsers.length) * 100)}% of total users
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card className="border border-indigo-200 dark:border-indigo-800 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/20 dark:to-purple-900/20">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-indigo-800 dark:text-indigo-200">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-800 rounded-lg">
              <TrendingUp className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <span className="text-lg font-semibold">AI-Powered Insights</span>
          </CardTitle>
          <p className="text-sm text-indigo-600 dark:text-indigo-400">Automated analysis and recommendations</p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-indigo-200 dark:border-indigo-700 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white">Highest Participation</h4>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Medical School leads with <span className="font-semibold text-green-600 dark:text-green-400">{Math.round((35 / 52) * 100)}%</span> counseling participation rate, 
                indicating strong mental health awareness in healthcare education.
              </p>
            </div>
            
            <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-indigo-200 dark:border-indigo-700 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white">Positive Trend</h4>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Wellness scores show <span className="font-semibold text-blue-600 dark:text-blue-400">20% improvement</span> over 5 months, 
                with stress levels decreasing significantly across all demographics.
              </p>
            </div>
            
            <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-indigo-200 dark:border-indigo-700 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white">Geographic Focus</h4>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                New York represents <span className="font-semibold text-purple-600 dark:text-purple-400">37%</span> of users, 
                suggesting targeted outreach opportunities in other regions.
              </p>
            </div>
            
            <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-indigo-200 dark:border-indigo-700 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white">Risk Management</h4>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Critical cases decreased by <span className="font-semibold text-orange-600 dark:text-orange-400">62%</span> since September, 
                demonstrating effective early intervention strategies.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
