import { DashboardLayout } from "@/components/dashboard-layout"
import { OverviewPage } from "@/components/overview-page"
import { ProtectedRoute } from "@/components/protected-route"

export default function HomePage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <OverviewPage />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
