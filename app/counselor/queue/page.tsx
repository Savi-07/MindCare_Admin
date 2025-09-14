import { CounselorDashboardLayout } from '@/components/counselor-dashboard-layout'
import { CounselorQueuePage } from '@/components/counselor-queue-page'
import { RoleBasedRoute } from '@/components/role-based-route'

export default function CounselorQueuePageRoute() {
  return (
    <RoleBasedRoute allowedRoles={['counselor']}>
      <CounselorDashboardLayout>
        <CounselorQueuePage />
      </CounselorDashboardLayout>
    </RoleBasedRoute>
  )
}
