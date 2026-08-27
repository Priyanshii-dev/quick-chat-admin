import { SettingsPage } from "@/features/settings/components/settings-page";

export default function LogoSettingsPage() {
  return (
    <SettingsPage
      title="Logo & favicon"
      eyebrow="Site identity"
      description="Manage the visual identity used across your site."
      kind="branding"
      mode="edit"
    />
  );
}
