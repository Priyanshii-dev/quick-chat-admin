"use client";

import { Save } from "lucide-react";
import { useCallback, useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { NewBlogForm } from "@/features/blog/components/blog-form";
import { ModuleHeader } from "@/components/shared/module-header";
import { AppButton } from "@/components/shared/app-button";

export default function NewBlogPage() {
  const [canSave, setCanSave] = useState(false);
  const handleCanSaveChange = useCallback(
    (value: boolean) => setCanSave(value),
    [],
  );
  return (
    <div className="grid min-h-screen grid-cols-[248px_minmax(0,1fr)] bg-paper">
      <Sidebar />
      <main className="min-w-0 px-[42px] pt-7 max-[1000px]:p-6 max-[680px]:p-4">
        <ModuleHeader
          title="Create New Blog Post"
          description="Add a new blog post to your website."
        >
          <AppButton
            variant="primary"
            type="submit"
            form="new-blog-form"
            disabled={!canSave}
          >
            <Save size={15} /> Save draft
          </AppButton>
        </ModuleHeader>
        <NewBlogForm onCanSaveChange={handleCanSaveChange} />
      </main>
    </div>
  );
}
