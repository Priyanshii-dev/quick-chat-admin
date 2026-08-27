import { AdminLayout } from "@/components/layout/admin-layout";
import { ContactListTable } from "@/features/contact";

export default function ContactUsPage() {
  return (
    <AdminLayout>
      <ContactListTable />
    </AdminLayout>
  );
}
