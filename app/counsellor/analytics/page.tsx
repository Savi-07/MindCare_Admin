import { CounsellorDashboardLayout } from '@/components/counsellor-dashboard-layout'
import { CounsellorAnalyticsPage } from '@/components/counsellor-analytics-page'
import { RoleBasedRoute } from '@/components/role-based-route'

export default function CounsellorAnalyticsPageRoute() {
  return (
    <RoleBasedRoute allowedRoles={['counsellor']}>
      <CounsellorDashboardLayout>
        <CounsellorAnalyticsPage />
      </CounsellorDashboardLayout>
    </RoleBasedRoute>
  )
}
