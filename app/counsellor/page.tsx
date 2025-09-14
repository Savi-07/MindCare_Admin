import { CounsellorDashboardLayout } from '@/components/counsellor-dashboard-layout'
import { CounsellorOverviewPage } from '@/components/counsellor-overview-page'
import { RoleBasedRoute } from '@/components/role-based-route'

export default function CounsellorPageRoute() {
  return (
    <RoleBasedRoute allowedRoles={['counsellor']}>
      <CounsellorDashboardLayout>
        <CounsellorOverviewPage />
      </CounsellorDashboardLayout>
    </RoleBasedRoute>
  )
}
