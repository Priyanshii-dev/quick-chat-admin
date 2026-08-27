"use client";

import { Plus } from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";
import { CategoryTable } from "@/features/blog/components/category-table";
import { ModuleHeader } from "@/components/shared/module-header";
import { AppButton } from "@/components/shared/app-button";

export default function BlogCategoriesPage() {
  return (
    <div className="grid min-h-screen grid-cols-[248px_minmax(0,1fr)] bg-paper">
      <Sidebar />
      <main className="min-w-0 px-[42px] pt-7 max-[1000px]:p-6 max-[680px]:p-4">
        <ModuleHeader
          title="Blog Category"
          description="Manage blog categories and their details."
        >
          <AppButton variant="primary">
            <Plus size={15} /> Add category
          </AppButton>
        </ModuleHeader>
        <CategoryTable />
      </main>
    </div>
  );
}
