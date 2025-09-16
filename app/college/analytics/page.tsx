import { CollegeDashboardLayout } from "@/components/college-dashboard-layout";
import { CollegeAnalyticsPage } from "@/components/college-analytics-page";
import { RoleBasedRoute } from "@/components/role-based-route";

export default function CollegeAnalyticsPageRoute() {
  return (
    <RoleBasedRoute allowedRoles={["collegeRep"]}>
      <CollegeDashboardLayout>
        <CollegeAnalyticsPage />
      </CollegeDashboardLayout>
    </RoleBasedRoute>
  );
}
