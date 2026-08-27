"use client";

import { ImageUp } from "lucide-react";
import { ModuleHeader } from "@/components/shared/module-header";
import { FormModeActions, type FormMode } from "@/components/shared/form-mode";
import { LOGO_KEYS, type LogoKey } from "../action/logo-settings.action";
import { useLogoSettingsForm } from "../hook/use-logo-settings-form";

const logoMeta: Record<LogoKey, { label: string; className: string }> = {
  websiteLogo: { label: "Website Logo", className: "logo-preview-large" },
  websiteFavicon: {
    label: "Website Favicon",
    className: "logo-preview-favicon",
  },
  metaFavicon: { label: "Meta Favicon", className: "logo-preview-favicon" },
  appFavicon: { label: "App Favicon", className: "logo-preview-favicon" },
  salonLogo: {
    label: "Salon App Website Logo",
    className: "logo-preview-large logo-preview-light",
  },
  salonAppLogo: { label: "Salon App Logo", className: "logo-preview-upload" },
};

type LogoSettingsFormProps = { mode?: FormMode; onDelete?: () => void };

export function LogoSettingsForm({
  mode = "edit",
  onDelete,
}: LogoSettingsFormProps) {
  const { previews, selectFile, saveSettings, isReadOnly } =
    useLogoSettingsForm(mode);

  return (
    <>
      <ModuleHeader
        eyebrow="Site identity"
        title="Logo & Favicon"
      ></ModuleHeader>

      <section
        className="mb-8 grid grid-cols-2 gap-[18px] max-[680px]:mb-6 max-[680px]:grid-cols-1"
        aria-label="Logo and favicon settings"
      >
        {LOGO_KEYS.map((key) => {
          const { label, className } = logoMeta[key];
          return (
            <article
              className="rounded-lg border border-line bg-panel p-[22px] shadow-panel [&>h2]:mb-4 [&>h2]:text-[15px] [&>h2]:font-bold"
              key={key}
            >
              <h2>{label}</h2>
              <label
                className={`relative grid min-h-[154px] cursor-pointer place-items-center overflow-hidden rounded-lg border-2 border-dashed border-[#cfd9df] bg-white text-[#c7d0d8] hover:border-teal hover:bg-[#f8fcfb] [&>input]:absolute [&>input]:size-px [&>input]:opacity-0 [&>img]:block [&>img]:max-h-[120px] [&>img]:max-w-3/4 ${
                  className.includes("favicon") ? "[&>img]:size-[34px]" : ""
                } ${className.includes("light") ? "text-[#d8e0e5]" : ""}`}
              >
                {previews[key] ? (
                  <img src={previews[key]} alt={`${label} preview`} />
                ) : (
                  <ImageUp size={38} />
                )}
                <input
                  type="file"
                  accept="image/*"
                  disabled={isReadOnly}
                  onChange={(event) => selectFile(key, event)}
                />
              </label>
            </article>
          );
        })}
      </section>

      <div className="flex justify-end">
        <FormModeActions
          mode={mode}
          onDelete={onDelete}
          onSave={saveSettings}
          className="min-w-[180px]"
        />
      </div>
    </>
  );
}
