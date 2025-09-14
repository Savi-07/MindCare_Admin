import { DashboardLayout } from "@/components/dashboard-layout"
import { FeedbackPage } from "@/components/feedback-page"
import { RoleBasedRoute } from "@/components/role-based-route"

export default function Feedback() {
  return (
    <RoleBasedRoute allowedRoles={['admin']}>
      <DashboardLayout>
        <FeedbackPage />
      </DashboardLayout>
    </RoleBasedRoute>
  )
}
