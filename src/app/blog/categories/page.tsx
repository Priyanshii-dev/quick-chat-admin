import { AdminLayout } from "@/components/layout/admin-layout";
import { CategoryTable } from "@/features/blog";

export default function BlogCategoriesPage() {
  return (
    <AdminLayout>
      <CategoryTable />
    </AdminLayout>
  );
}
