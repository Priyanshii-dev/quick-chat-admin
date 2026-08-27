import { Sidebar } from "@/components/layout/sidebar";
import { ModuleHeader } from "@/components/shared/module-header";
import { Dashboard } from "@/features/dashboard/components/page";

export default function Home() {
  return (
    <div className="grid min-h-screen grid-cols-[248px_minmax(0,1fr)] max-[680px]:block">
      <Sidebar />
      <main className="min-w-0 px-[42px] pt-7 pb-12 max-[1000px]:p-6 max-[680px]:px-4 max-[680px]:pt-5 max-[680px]:pb-8">
        <ModuleHeader
          eyebrow="Workspace"
          title="Overview"
          description="Here is the shape of your site today."
        />
        <Dashboard />
      </main>
    </div>
  );
}
