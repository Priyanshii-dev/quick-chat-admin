"use client";

import { Check, Plus } from "lucide-react";
import { toast } from "sonner";
import { SeoSettingsForm } from "@/features/settings/components/seo-settings/components/seo-settings-form";
import { AppButton } from "./app-button";
import { ModuleHeader } from "./module-header";

type ModuleProps = {
  title: string;
  eyebrow: string;
  description: string;
  kind: ModuleKind;
};

export type ModuleKind =
  | "seo"
  | "blog"
  | "subscribers"
  | "social"
  | "email"
  | "general"
  | "smtp"
  | "branding";

const copy: Record<ModuleProps["kind"], { rows: string[]; action: string }> = {
  seo: {
    rows: ["Default metadata", "Sitemap & indexing", "Redirect manager"],
    action: "Add recommendation",
  },
  blog: {
    rows: [
      "The quiet advantage of a focused site",
      "A practical guide to better metadata",
      "Small teams, meaningful growth",
    ],
    action: "New blog post",
  },
  subscribers: {
    rows: ["Active subscribers", "Unconfirmed contacts", "Unsubscribed"],
    action: "Import contacts",
  },
  social: {
    rows: ["LinkedIn", "X / Twitter", "Instagram"],
    action: "Connect profile",
  },
  email: {
    rows: ["Welcome subscriber", "Password reset", "Monthly digest"],
    action: "New template",
  },
  general: {
    rows: ["Site identity", "Locale & timezone", "Analytics"],
    action: "Save changes",
  },
  smtp: {
    rows: ["SMTP host", "Sender address", "Connection status"],
    action: "Save changes",
  },
  branding: {
    rows: ["Logo", "Favicon", "Browser title"],
    action: "Save changes",
  },
};

export function ModulePage({ title, eyebrow, description, kind }: ModuleProps) {
  const data = copy[kind];
  const action = () =>
    toast.success(`${data.action} opened`, {
      description: "This workflow is ready for your next update.",
    });

  return (
    <div className="w-full space-y-4">
      <ModuleHeader eyebrow={eyebrow} title={title} description={description}>
        <AppButton type="button" variant="primary" onClick={action}>
          <Plus size={16} /> {data.action}
        </AppButton>
      </ModuleHeader>

      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        {kind === "seo" ? (
          <SeoSettingsForm />
        ) : (
          <div className="grid max-w-[760px]">
            {data.rows.map((row, index) => (
              <div
                className="flex items-center justify-between gap-5 border-b border-border py-4 text-sm"
                key={row}
              >
                <div>
                  <strong className="mb-1 block font-bold text-foreground">
                    {row}
                  </strong>
                  <span className="text-xs text-muted-foreground">
                    {kind === "subscribers"
                      ? `${[248, 12, 8][index]} records`
                      : "Configuration is up to date"}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-600">
                  <Check size={12} />{" "}
                  {kind === "social" && index === 0 ? "Connected" : "Active"}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
