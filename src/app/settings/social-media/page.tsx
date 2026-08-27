import { SettingsPage } from "@/features/settings/components/settings-page";

export default function SocialMediaSettingsPage() {
  return (
    <SettingsPage
      title="Social media"
      eyebrow="Distribution"
      description="Keep your publishing channels connected and your social identity consistent."
      kind="social"
      mode="edit"
    />
  );
}
