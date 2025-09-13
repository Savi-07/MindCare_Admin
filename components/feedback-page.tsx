"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockFeedback } from "@/lib/mock-data"
import { Star, Search, Filter, MessageSquare, TrendingUp, TrendingDown, MessageCircle, ThumbsUp, ThumbsDown, Clock, Users } from "lucide-react"

export function FeedbackPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sentimentFilter, setSentimentFilter] = useState("all")

  // Filter feedback based on search and sentiment
  const filteredFeedback = mockFeedback.filter((feedback) => {
    const matchesSearch =
      feedback.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.comments.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSentiment = sentimentFilter === "all" || feedback.sentiment === sentimentFilter
    return matchesSearch && matchesSentiment
  })

  // Calculate statistics
  const averageRating = mockFeedback.reduce((acc, f) => acc + f.rating, 0) / mockFeedback.length
  const sentimentCounts = {
    positive: mockFeedback.filter((f) => f.sentiment === "positive").length,
    neutral: mockFeedback.filter((f) => f.sentiment === "neutral").length,
    negative: mockFeedback.filter((f) => f.sentiment === "negative").length,
  }

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Positive</Badge>
      case "negative":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Negative</Badge>
      default:
        return <Badge variant="secondary">Neutral</Badge>
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900 dark:to-teal-900 rounded-xl p-8 border border-emerald-200 dark:border-emerald-700">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl">
            <MessageCircle className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Feedback Center</h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              Monitor user satisfaction and improve counseling services
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Real-time feedback processing</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{mockFeedback.length} total responses</span>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-l-4 border-l-yellow-500 hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">Average Rating</CardTitle>
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <Star className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{averageRating.toFixed(1)}</div>
            <div className="flex items-center">{renderStars(Math.round(averageRating))}</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">Positive Feedback</CardTitle>
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <ThumbsUp className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">{sentimentCounts.positive}</div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {Math.round((sentimentCounts.positive / mockFeedback.length) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">Neutral Feedback</CardTitle>
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{sentimentCounts.neutral}</div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {Math.round((sentimentCounts.neutral / mockFeedback.length) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">Negative Feedback</CardTitle>
            <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
              <ThumbsDown className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">{sentimentCounts.negative}</div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {Math.round((sentimentCounts.negative / mockFeedback.length) * 100)}% of total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-900/20 dark:to-teal-900/20">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-emerald-800 dark:text-emerald-200">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-800 rounded-lg">
              <Filter className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="text-lg font-semibold">Advanced Filters</span>
          </CardTitle>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">Search and filter feedback efficiently</p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex gap-4 flex-wrap">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search by user name or comments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
            <Select value={sentimentFilter} onValueChange={setSentimentFilter}>
              <SelectTrigger className="w-48 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-emerald-500">
                <Filter className="h-4 w-4 mr-2 text-slate-400" />
                <SelectValue placeholder="Filter by sentiment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sentiments</SelectItem>
                <SelectItem value="positive">Positive</SelectItem>
                <SelectItem value="neutral">Neutral</SelectItem>
                <SelectItem value="negative">Negative</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Feedback List */}
      <Card className="border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50/50 to-gray-50/50 dark:from-slate-900/20 dark:to-gray-900/20">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/30 dark:to-gray-900/30 rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-slate-200">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <MessageSquare className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            </div>
            <span className="text-lg font-semibold">User Feedback</span>
            <Badge variant="secondary" className="ml-2 bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-200">
              {filteredFeedback.length} responses
            </Badge>
          </CardTitle>
          <p className="text-sm text-slate-600 dark:text-slate-400">Detailed user feedback and ratings</p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {filteredFeedback.length > 0 ? (
              filteredFeedback.map((feedback) => (
                <div key={feedback.id} className="border border-slate-200 dark:border-slate-700 rounded-xl p-6 space-y-4 bg-white dark:bg-slate-800 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold text-slate-900 dark:text-white text-lg">{feedback.userName}</h4>
                        {getSentimentBadge(feedback.sentiment)}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex">{renderStars(feedback.rating)}</div>
                        <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">({feedback.rating}/5)</span>
                      </div>
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-lg">
                      {feedback.date}
                    </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
                    <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{feedback.comments}</p>
                  </div>
                  <div className="flex gap-3">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Respond
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-300 dark:border-slate-600">
                      Flag for Review
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <MessageSquare className="h-8 w-8 text-slate-400" />
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-medium mb-2">No feedback matches your filters</p>
                <p className="text-sm text-slate-400 dark:text-slate-500 mb-4">Try adjusting your search criteria</p>
                <Button
                  variant="outline"
                  className="bg-transparent border-slate-300 dark:border-slate-600"
                  onClick={() => {
                    setSearchTerm("")
                    setSentimentFilter("all")
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
  )
}
