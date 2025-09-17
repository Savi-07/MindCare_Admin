"use client";

import React, { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Clock,
  AlertCircle,
  CheckCircle,
  User,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { mockCounsellingQueue } from "@/lib/mock-data";

export function CounsellorSessionsPage() {
  const [queueItems, setQueueItems] = useState(mockCounsellingQueue);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [rescheduleAt, setRescheduleAt] = useState<string>("");
  const [rescheduleItemId, setRescheduleItemId] = useState<string | null>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="h-4 w-4" />;
      case "medium":
        return <Clock className="h-4 w-4" />;
      case "low":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const formatToDateTimeLocal = (dateString: string) => {
    const date = new Date(dateString);
    const pad = (n: number) => String(n).padStart(2, "0");
    const yyyy = date.getFullYear();
    const mm = pad(date.getMonth() + 1);
    const dd = pad(date.getDate());
    const hh = pad(date.getHours());
    const min = pad(date.getMinutes());
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  };

  const handleOpenReschedule = (itemId: string) => {
    const item = queueItems.find((i) => i.id === itemId);
    setRescheduleItemId(itemId);
    if (item) {
      setRescheduleAt(formatToDateTimeLocal(item.requestedDate));
    }
  };

  const handleSaveReschedule = (itemId: string) => {
    if (!rescheduleAt) return;
    const newIso = new Date(rescheduleAt).toISOString();
    setQueueItems((items) =>
      items.map((it) =>
        it.id === itemId ? { ...it, requestedDate: newIso } : it
      )
    );
    setRescheduleItemId(null);
  };

  const handleCloseReschedule = () => {
    setRescheduleItemId(null);
  };

  const getWaitTime = (requestedDate: string) => {
    const requested = new Date(requestedDate);
    const now = new Date();
    const diffHours = Math.floor(
      (now.getTime() - requested.getTime()) / (1000 * 60 * 60)
    );

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Counselling Sessions
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage student counselling requests and session scheduling.
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {queueItems.filter((item) => item.priority === "high").length} High
            Priority
          </Badge>
          <Badge variant="outline">{queueItems.length} Total in Queue</Badge>
        </div>
      </div>

      {/* Queue Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 rounded-full">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {queueItems.filter((item) => item.priority === "high").length}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                High Priority
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-50 rounded-full">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {queueItems.filter((item) => item.priority === "medium").length}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Medium Priority
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-full">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {queueItems.filter((item) => item.priority === "low").length}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Low Priority
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-full">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {queueItems.length}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Total Waiting
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Queue Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Student Queue
          </h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Sort by Priority
            </Button>
            <Button variant="outline" size="sm">
              Sort by Date
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">
                  Queue No.
                </th>
                <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">
                  Student ID
                </th>
                <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">
                  Reason
                </th>
                <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">
                  Priority
                </th>
                <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">
                  Requested Date
                </th>
                <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">
                  Wait Time
                </th>
                <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {queueItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <td className="py-3 px-4">
                    <div className="font-medium text-slate-900 dark:text-white">
                      #{item.queueNo}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-slate-900 dark:text-white">
                      {item.anonymousId}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-slate-600 dark:text-slate-400">
                      {item.reason}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge className={getPriorityColor(item.priority)}>
                      <div className="flex items-center gap-1">
                        {getPriorityIcon(item.priority)}
                        {item.priority.charAt(0).toUpperCase() +
                          item.priority.slice(1)}
                      </div>
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                    {new Date(item.requestedDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {getWaitTime(item.requestedDate)}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleOpenReschedule(item.id)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Reschedule
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedItem(item.id)}
                      >
                        Details
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Session Details Modal */}
      {selectedItem && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Session Details
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedItem(null)}
            >
              Close
            </Button>
          </div>

          {(() => {
            const item = queueItems.find((i) => i.id === selectedItem);
            if (!item) return null;

            return (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-slate-600" />
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">
                          Student ID
                        </div>
                        <div className="text-slate-600 dark:text-slate-400">
                          {item.anonymousId}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-5 w-5 text-slate-600" />
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">
                          Reason
                        </div>
                        <div className="text-slate-600 dark:text-slate-400">
                          {item.reason}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-slate-600" />
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">
                          Requested Date
                        </div>
                        <div className="text-slate-600 dark:text-slate-400">
                          {new Date(item.requestedDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                      <h4 className="font-medium text-slate-900 dark:text-white mb-2">
                        Priority Assessment
                      </h4>
                      <Badge className={getPriorityColor(item.priority)}>
                        <div className="flex items-center gap-1">
                          {getPriorityIcon(item.priority)}
                          {item.priority.charAt(0).toUpperCase() +
                            item.priority.slice(1)}{" "}
                          Priority
                        </div>
                      </Badge>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                        {item.priority === "high" &&
                          "Urgent attention required - student may be in crisis"}
                        {item.priority === "medium" &&
                          "Standard counseling request - schedule within 2-3 days"}
                        {item.priority === "low" &&
                          "Non-urgent request - can be scheduled flexibly"}
                      </p>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                        Wait Time
                      </h4>
                      <div className="text-lg font-bold text-blue-900 dark:text-blue-100">
                        {getWaitTime(item.requestedDate)}
                      </div>
                      <p className="text-sm text-blue-700 dark:text-blue-200">
                        Since initial request
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedItem(null)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            );
          })()}
        </Card>
      )}

      {/* Reschedule Modal */}
      {rescheduleItemId && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Reschedule Session
            </h3>
            <Button variant="outline" size="sm" onClick={handleCloseReschedule}>
              Close
            </Button>
          </div>

          {(() => {
            const item = queueItems.find((i) => i.id === rescheduleItemId);
            if (!item) return null;

            return (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      <span className="font-medium text-slate-900 dark:text-white">
                        Student ID:
                      </span>{" "}
                      {item.anonymousId}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      <span className="font-medium text-slate-900 dark:text-white">
                        Current Date:
                      </span>{" "}
                      {new Date(item.requestedDate).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Choose new date & time
                  </label>
                  <div className="flex items-center gap-3 max-w-md">
                    <Input
                      type="datetime-local"
                      value={rescheduleAt}
                      onChange={(e) => setRescheduleAt(e.target.value)}
                    />
                    <Button onClick={() => handleSaveReschedule(item.id)}>
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            );
          })()}
        </Card>
      )}
    </div>
  );
}
