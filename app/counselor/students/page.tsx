import { CounselorDashboardLayout } from '@/components/counselor-dashboard-layout'
import { CounselorStudentsPage } from '@/components/counselor-students-page'
import { RoleBasedRoute } from '@/components/role-based-route'

export default function CounselorStudentsPageRoute() {
  return (
    <RoleBasedRoute allowedRoles={['counselor']}>
      <CounselorDashboardLayout>
        <CounselorStudentsPage />
      </CounselorDashboardLayout>
    </RoleBasedRoute>
  )
}
