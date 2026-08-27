import { SeoSettingsForm } from "@/features/settings/components/seo-settings/components/seo-settings-form";

export default function NewSeoPage() {
  return (
    <div className="w-full">
      <SeoSettingsForm mode="edit" isCreate />
    </div>
  );
}
