"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";
import { BlogTable } from "@/features/blog/components/blog-list-table";
import { AppButton } from "@/components/shared/app-button";
import { ModuleHeader } from "@/components/shared/module-header";
function BlogPage() {
  const router = useRouter();
  return (
    <div className="grid min-h-screen grid-cols-[248px_minmax(0,1fr)] bg-paper">
      <Sidebar />
      <main className="min-w-0 px-[42px] pt-7 max-[1000px]:p-6 max-[680px]:p-4">
        <ModuleHeader
          title="Blog List"
          description="Manage your blog posts and their visibility."
        >
          <AppButton variant="primary" onClick={() => router.push("/blog/new")}>
            <Plus size={15} /> Add blog
          </AppButton>
        </ModuleHeader>
        <BlogTable />
      </main>
    </div>
  );
}

export default BlogPage;
