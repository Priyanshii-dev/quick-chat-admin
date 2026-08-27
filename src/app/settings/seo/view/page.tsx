import { SeoSettingsForm } from "@/features/settings/components/seo-settings/components/seo-settings-form";
import { Sidebar } from "@/components/layout/sidebar";

export default function ViewSeoPage() {
  return (
    <div className="grid min-h-screen grid-cols-[248px_minmax(0,1fr)] max-[680px]:block">
      <Sidebar />
      <main className="min-w-0 bg-[#f4f5f5] px-[42px] pt-7 pb-12 max-[1000px]:p-6 max-[680px]:px-4 max-[680px]:pt-5">
        <SeoSettingsForm mode="view" />
      </main>
    </div>
  );
}
