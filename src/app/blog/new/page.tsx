import { AdminLayout } from "@/components/layout/admin-layout";
import { BlogForm } from "@/features/blog";

export default function NewBlogPage() {
  return (
    <AdminLayout>
      <BlogForm />
    </AdminLayout>
  );
}
