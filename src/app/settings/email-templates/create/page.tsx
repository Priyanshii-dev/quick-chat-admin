import { EmailTemplateForm } from "@/features/settings/email-templates/components/email-template-form";

export default function CreateEmailTemplatePage() {
  return (
    <div className="w-full">
      <EmailTemplateForm mode="edit" />
    </div>
  );
}
