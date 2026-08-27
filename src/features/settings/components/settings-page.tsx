import Link from "next/link";
import {
  History,
  Image,
  Mail,
  Send,
  Share2,
  type LucideIcon,
} from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";

import { ModulePage } from "@/components/shared/module-page";
import { GeneralSettingsForm } from "./general-settings/components/general-settings-form";
import { SmtpSettingsForm } from "./smtp/components/smtp-settings-form";
import { LogoSettingsForm } from "./logo-settings/components/LogoSettingsForm";
import { SocialMediaSettingsForm } from "./social-media/components/social-media-settings-form";
import { SeoSettingsForm } from "./seo-settings/components/seo-settings-form";
import { SettingsPageProps } from "./types/types";
import { ModuleHeader } from "@/components/shared/module-header";

const settingsCards = [
  {
    title: "General Settings",
    description:
      "Manage your site identity, communication, and account settings",
    href: "/settings/general-settings",
    icon: History,
  },

  {
    title: "Login History",
    description: "Review recent account access",
    href: "/settings/login-history",
    icon: History,
  },
  {
    title: "Email Templates",
    description: "Manage messages and notifications",
    href: "/settings/email-templates",
    icon: Mail,
  },
  {
    title: "SMTP Settings",
    description: "Configure outgoing email delivery",
    href: "/settings/smtp-settings",
    icon: Send,
  },
  {
    title: "Logo & Favicon",
    description: "Manage your site identity",
    href: "/settings/logo-settings",
    icon: Image,
  },
  {
    title: "SEO Configuration",
    description: "Manage your site identity",
    href: "/settings/seo",
    icon: Image,
  },
  {
    title: "Social Media",
    description: "Connect and manage social profiles",
    href: "/settings/social-media",
    icon: Share2,
  },
];

export function SettingsOverview() {
  return (
    <div className="grid min-h-screen grid-cols-[248px_minmax(0,1fr)] max-[680px]:block">
      <Sidebar />
      <main className="min-w-0 px-[42px] pt-7 pb-12 max-[1000px]:p-6 max-[680px]:px-4 max-[680px]:pt-5">
        <ModuleHeader
          eyebrow="Workspace"
          title="Settings"
          description="Manage your site identity, communication, and account settings."
        />
        <section
          className="grid grid-cols-3 gap-[22px] max-[1000px]:grid-cols-2 max-[680px]:grid-cols-1"
          aria-label="General settings"
        >
          {settingsCards.map(
            ({
              title,
              description,
              href,
              icon: Icon,
            }: {
              title: string;
              description: string;
              href: string;
              icon: LucideIcon;
            }) => (
              <Link
                className="flex min-h-[180px] items-center gap-[22px] rounded-lg border border-[#e1e6eb] bg-white px-8 py-7 text-ink no-underline shadow-[0_8px_24px_rgb(23_35_45_/_5%)] transition hover:-translate-y-0.5 hover:border-[#9dbdb7] hover:shadow-[0_14px_30px_rgb(23_35_45_/_10%)] max-[680px]:min-h-[140px] max-[680px]:p-[22px]"
                href={href}
                key={href}
              >
                <span className="grid size-[84px] shrink-0 place-items-center rounded-lg bg-teal text-white max-[680px]:size-[68px]">
                  <Icon size={28} />
                </span>
                <span>
                  <strong className="block text-lg font-bold">{title}</strong>
                  <span className="mt-2 block text-sm leading-5 text-muted">
                    {description}
                  </span>
                </span>
              </Link>
            ),
          )}
        </section>
      </main>
    </div>
  );
}

export function SettingsPage({
  title,
  eyebrow,
  description,
  kind,
  mode = "edit",
}: SettingsPageProps) {
  if (
    !(["general", "smtp", "branding", "social", "seo"] as const).includes(
      kind as "general" | "smtp" | "branding" | "social" | "seo",
    )
  ) {
    return (
      <ModulePage
        title={title}
        eyebrow={eyebrow}
        description={description}
        kind={kind}
      />
    );
  }

  return (
    <div className="grid min-h-screen grid-cols-[248px_minmax(0,1fr)] max-[680px]:block">
      <Sidebar />
      <main className="min-w-0 px-[42px] pt-7 pb-12 max-[1000px]:p-6 max-[680px]:px-4 max-[680px]:pt-5">
        {kind === "general" ? <GeneralSettingsForm mode={mode} /> : null}
        {kind === "smtp" ? <SmtpSettingsForm mode={mode} /> : null}
        {kind === "branding" ? <LogoSettingsForm mode={mode} /> : null}
        {kind === "social" ? <SocialMediaSettingsForm mode={mode} /> : null}
        {kind === "seo" ? <SeoSettingsForm /> : null}
      </main>
    </div>
  );
}
