"use client";

import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { FormInput } from "@/components/shared/custom-input-text";
import { ModuleHeader } from "@/components/shared/module-header";
import { FormModeActions, type FormMode } from "@/components/shared/form-mode";
import { useSocialMediaSettingsForm } from "../hook/use-social-media";

type SocialMediaSettingsFormProps = { mode?: FormMode; onDelete?: () => void };

export function SocialMediaSettingsForm({
  mode = "edit",
  onDelete,
}: SocialMediaSettingsFormProps) {
  const { control, handleSave, isReadOnly } = useSocialMediaSettingsForm(mode);

  return (
    <>
      <ModuleHeader eyebrow="Distribution" title="Social Media"></ModuleHeader>

      <form
        noValidate
        id="social-settings-form"
        className="grid gap-[18px]"
        onSubmit={handleSave}
      >
        <fieldset disabled={isReadOnly} className="border-0 p-0">
          <section className="rounded-lg border border-line bg-panel p-[22px] shadow-panel">
            <div className="grid grid-cols-2 gap-x-[22px] gap-y-[18px] max-[680px]:grid-cols-1">
              <FormInput
                name="instagram"
                label="Instagram"
                control={control}
                type="url"
                placeholder="https://instagram.com/your-profile"
                startAdornment={<Instagram size={16} />}
                inputWrapperClassName="flex items-center gap-2 text-muted [&>input]:min-w-0"
              />
              <FormInput
                name="facebook"
                label="Facebook"
                control={control}
                type="url"
                placeholder="https://facebook.com/your-page"
                startAdornment={<Facebook size={16} />}
                inputWrapperClassName="flex items-center gap-2 text-muted [&>input]:min-w-0"
              />
              <FormInput
                name="twitter"
                label="Twitter"
                control={control}
                type="url"
                placeholder="https://twitter.com/your-profile"
                startAdornment={<Twitter size={16} />}
                inputWrapperClassName="flex items-center gap-2 text-muted [&>input]:min-w-0"
              />
              <FormInput
                name="linkedin"
                label="LinkedIn"
                control={control}
                type="url"
                placeholder="https://linkedin.com/company/your-company"
                startAdornment={<Linkedin size={16} />}
                inputWrapperClassName="flex items-center gap-2 text-muted [&>input]:min-w-0"
              />
            </div>
          </section>
        </fieldset>
      </form>

      <div className="mt-4 flex justify-end">
        <FormModeActions
          mode={mode}
          onDelete={onDelete}
          formId="social-settings-form"
          className="min-w-[180px]"
        />
      </div>
    </>
  );
}
