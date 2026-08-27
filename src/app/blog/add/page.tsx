import { AdminLayout } from "@/components/layout/admin-layout";
import { BlogForm } from "@/features/blog";

export default function AddBlogPage() {
  return (
    <AdminLayout>
      <BlogForm />
    </AdminLayout>
  );
}
