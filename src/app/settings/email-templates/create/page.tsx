import { Sidebar } from "@/components/layout/sidebar";
import { EmailTemplateForm } from "@/features/settings/email-templates/components/email-template-form";

export default function CreateEmailTemplatePage() {
  return (
    <div className="grid min-h-screen grid-cols-[248px_minmax(0,1fr)] max-[680px]:block">
      <Sidebar alwaysOpen />
      <main className="min-w-0 px-[42px] pt-7 pb-12 max-[1000px]:p-6 max-[680px]:px-4 max-[680px]:pt-5">
        <EmailTemplateForm mode="edit" />
      </main>
    </div>
  );
}
