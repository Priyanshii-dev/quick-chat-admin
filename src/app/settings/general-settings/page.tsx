import { SettingsPage } from "@/features/settings/components/settings-page";

export default function GeneralSettingsPage() {
  return (
    <SettingsPage
      title="General settings"
      eyebrow="Workspace"
      description="Set the identity, locale, and operating preferences for your site."
      kind="general"
      mode="edit"
    />
  );
}
