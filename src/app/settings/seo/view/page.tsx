import { SeoSettingsForm } from "@/features/settings/components/seo-settings/components/seo-settings-form";

export default function ViewSeoPage() {
  return (
    <div className="w-full">
      <SeoSettingsForm mode="view" />
    </div>
  );
}
