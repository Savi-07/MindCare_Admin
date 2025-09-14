import { DashboardLayout } from "@/components/dashboard-layout"
import { AnalyticsPage } from "@/components/analytics-page"
import { RoleBasedRoute } from "@/components/role-based-route"

export default function Analytics() {
  return (
    <RoleBasedRoute allowedRoles={['admin']}>
      <DashboardLayout>
        <AnalyticsPage />
      </DashboardLayout>
    </RoleBasedRoute>
  )
}
