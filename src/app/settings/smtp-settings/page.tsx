import { SettingsPage } from "@/features/settings/components/settings-page";

export default function SmtpSettingsPage() {
  return (
    <SettingsPage
      title="SMTP settings"
      eyebrow="Communication"
      description="Configure the mail server used for outgoing messages."
      kind="smtp"
      mode="edit"
    />
  );
}
