import { CollegeDashboardLayout } from "@/components/college-dashboard-layout";
import { CollegeFlaggedPage } from "@/components/college-flagged-page";
import { RoleBasedRoute } from "@/components/role-based-route";

export default function CollegeFlaggedPageRoute() {
  return (
    <RoleBasedRoute allowedRoles={["collegeRep"]}>
      <CollegeDashboardLayout>
        <CollegeFlaggedPage />
      </CollegeDashboardLayout>
    </RoleBasedRoute>
  );
}
