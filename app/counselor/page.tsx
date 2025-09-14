import { CounselorDashboardLayout } from '@/components/counselor-dashboard-layout'
import { CounselorOverviewPage } from '@/components/counselor-overview-page'
import { RoleBasedRoute } from '@/components/role-based-route'

export default function CounselorPageRoute() {
  return (
    <RoleBasedRoute allowedRoles={['counselor']}>
      <CounselorDashboardLayout>
        <CounselorOverviewPage />
      </CounselorDashboardLayout>
    </RoleBasedRoute>
  )
}
