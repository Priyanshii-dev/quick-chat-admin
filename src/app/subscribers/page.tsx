import { AdminLayout } from "@/components/layout/admin-layout";
import { SubscribersListTable } from "@/features/subscribers";

export default function SubscribersPage() {
  return (
    <AdminLayout>
      <SubscribersListTable />
    </AdminLayout>
  );
}
