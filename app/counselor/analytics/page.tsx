import { CounselorDashboardLayout } from '@/components/counselor-dashboard-layout'
import { CounselorAnalyticsPage } from '@/components/counselor-analytics-page'
import { RoleBasedRoute } from '@/components/role-based-route'

export default function CounselorAnalyticsPageRoute() {
  return (
    <RoleBasedRoute allowedRoles={['counselor']}>
      <CounselorDashboardLayout>
        <CounselorAnalyticsPage />
      </CounselorDashboardLayout>
    </RoleBasedRoute>
  )
}
