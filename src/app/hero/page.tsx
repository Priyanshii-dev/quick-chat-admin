import { AdminLayout } from "@/components/layout/admin-layout";
import { HeroForm } from "@/features/hero";

export default function HeroPage() {
  return (
    <AdminLayout>
      <HeroForm />
    </AdminLayout>
  );
}
