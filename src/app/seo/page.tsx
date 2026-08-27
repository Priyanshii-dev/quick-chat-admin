import { AdminLayout } from "@/components/layout/admin-layout";
import { SeoListTable } from "@/features/seo";

export default function SeoListPage() {
  return (
    <AdminLayout>
      <SeoListTable />
    </AdminLayout>
  );
}
