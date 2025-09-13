import { DashboardLayout } from "@/components/dashboard-layout"
import { FlaggedUsersPage } from "@/components/flagged-users-page"
import { ProtectedRoute } from "@/components/protected-route"

export default function FlaggedUsers() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <FlaggedUsersPage />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
