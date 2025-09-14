import { DashboardLayout } from "@/components/dashboard-layout"
import { OverviewPage } from "@/components/overview-page"
import { RoleBasedRoute } from "@/components/role-based-route"

export default function HomePage() {
  return (
    <RoleBasedRoute allowedRoles={['admin']}>
      <DashboardLayout>
        <OverviewPage />
      </DashboardLayout>
    </RoleBasedRoute>
  )
}
