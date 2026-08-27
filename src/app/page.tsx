import { AdminLayout } from "@/components/layout/admin-layout";
import { DashboardOverview } from "@/features/dashboard";

export default function Home() {
  return (
    <AdminLayout>
      <DashboardOverview />
    </AdminLayout>
  );
}
