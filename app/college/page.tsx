import { CollegeDashboardLayout } from "@/components/college-dashboard-layout";
import { CollegeDashboardPage } from "@/components/college-dashboard-page";
import { RoleBasedRoute } from "@/components/role-based-route";

export default function CollegePageRoute() {
  return (
    <RoleBasedRoute allowedRoles={["collegeRep"]}>
      <CollegeDashboardLayout>
        <CollegeDashboardPage />
      </CollegeDashboardLayout>
    </RoleBasedRoute>
  );
}
