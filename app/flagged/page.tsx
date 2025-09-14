import { DashboardLayout } from "@/components/dashboard-layout"
import { FlaggedUsersPage } from "@/components/flagged-users-page"
import { RoleBasedRoute } from "@/components/role-based-route"

export default function FlaggedUsers() {
  return (
    <RoleBasedRoute allowedRoles={['admin']}>
      <DashboardLayout>
        <FlaggedUsersPage />
      </DashboardLayout>
    </RoleBasedRoute>
  )
}
