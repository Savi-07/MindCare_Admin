import { DashboardLayout } from "@/components/dashboard-layout"
import { FeedbackPage } from "@/components/feedback-page"
import { ProtectedRoute } from "@/components/protected-route"

export default function Feedback() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <FeedbackPage />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
