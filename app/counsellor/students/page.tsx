import { CounsellorDashboardLayout } from '@/components/counsellor-dashboard-layout'
import { CounsellorStudentsPage } from '@/components/counsellor-students-page'
import { RoleBasedRoute } from '@/components/role-based-route'

export default function CounsellorStudentsPageRoute() {
  return (
    <RoleBasedRoute allowedRoles={['counsellor']}>
      <CounsellorDashboardLayout>
        <CounsellorStudentsPage />
      </CounsellorDashboardLayout>
    </RoleBasedRoute>
  )
}
