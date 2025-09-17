import { CounsellorDashboardLayout } from '@/components/counsellor-dashboard-layout'
import { CounsellorSessionsPage } from '@/components/counsellor-sessions-page'
import { RoleBasedRoute } from '@/components/role-based-route'

export default function CounsellorQueuePageRoute() {
  return (
    <RoleBasedRoute allowedRoles={['counsellor']}>
      <CounsellorDashboardLayout>
        <CounsellorSessionsPage />
      </CounsellorDashboardLayout>
    </RoleBasedRoute>
  )
}
