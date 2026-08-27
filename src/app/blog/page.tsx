import { AdminLayout } from "@/components/layout/admin-layout";
import { BlogListTable } from "@/features/blog";

export default function BlogListPage() {
  return (
    <AdminLayout>
      <BlogListTable />
    </AdminLayout>
  );
}
