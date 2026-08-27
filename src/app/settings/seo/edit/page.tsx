import { SeoSettingsForm } from "@/features/settings/components/seo-settings/components/seo-settings-form";

export default function EditSeoPage() {
  return (
    <div className="w-full">
      <SeoSettingsForm mode="edit" />
    </div>
  );
}
