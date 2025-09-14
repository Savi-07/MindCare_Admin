import { CounsellorDashboardLayout } from '@/components/counsellor-dashboard-layout'
import { CounsellorQueuePage } from '@/components/counsellor-queue-page'
import { RoleBasedRoute } from '@/components/role-based-route'

export default function CounsellorQueuePageRoute() {
  return (
    <RoleBasedRoute allowedRoles={['counsellor']}>
      <CounsellorDashboardLayout>
        <CounsellorQueuePage />
      </CounsellorDashboardLayout>
    </RoleBasedRoute>
  )
}
