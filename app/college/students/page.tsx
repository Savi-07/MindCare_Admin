import { CollegeDashboardLayout } from "@/components/college-dashboard-layout";
import { CollegeStudentsPage } from "@/components/college-students-page";
import { RoleBasedRoute } from "@/components/role-based-route";

export default function CollegeStudentsPageRoute() {
  return (
    <RoleBasedRoute allowedRoles={["collegeRep"]}>
      <CollegeDashboardLayout>
        <CollegeStudentsPage />
      </CollegeDashboardLayout>
    </RoleBasedRoute>
  );
}
