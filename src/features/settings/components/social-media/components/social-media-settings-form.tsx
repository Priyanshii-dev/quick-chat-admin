"use client";

import React from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Save,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/shared/custom-input-text";
import { ModuleHeader } from "@/components/shared/module-header";
import { useSocialMediaSettingsForm } from "../hook/use-social-media";
import { FormMode } from "@/components/shared/form-mode";

type SocialMediaSettingsFormProps = { mode?: FormMode; onDelete?: () => void };

export function SocialMediaSettingsForm({
  mode = "edit",
}: SocialMediaSettingsFormProps) {
  const { control, handleSave, isReadOnly } = useSocialMediaSettingsForm(mode);

  return (
    <div className="w-full space-y-6">
      <ModuleHeader
        eyebrow="Distribution"
        title="Social Media Links"
        description="Connect and configure your official social media profile URLs."
      />

      <form noValidate onSubmit={handleSave} className="space-y-6">
        <fieldset disabled={isReadOnly} className="border-0 p-0">
          <section className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2.5 border-b border-border/60 pb-3.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Share2 className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-extrabold text-foreground tracking-tight">
                Social Profile Handles
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <FormInput
                name="instagram"
                label="Instagram Profile"
                control={control}
                type="url"
                placeholder="https://instagram.com/your-profile"
                startAdornment={
                  <Instagram className="h-4 w-4 text-primary shrink-0" />
                }
                inputWrapperClassName="flex items-center gap-2.5"
              />
              <FormInput
                name="facebook"
                label="Facebook Page"
                control={control}
                type="url"
                placeholder="https://facebook.com/your-page"
                startAdornment={
                  <Facebook className="h-4 w-4 text-primary shrink-0" />
                }
                inputWrapperClassName="flex items-center gap-2.5"
              />
              <FormInput
                name="twitter"
                label="Twitter / X Profile"
                control={control}
                type="url"
                placeholder="https://twitter.com/your-profile"
                startAdornment={
                  <Twitter className="h-4 w-4 text-primary shrink-0" />
                }
                inputWrapperClassName="flex items-center gap-2.5"
              />
              <FormInput
                name="linkedin"
                label="LinkedIn Company Page"
                control={control}
                type="url"
                placeholder="https://linkedin.com/company/your-company"
                startAdornment={
                  <Linkedin className="h-4 w-4 text-primary shrink-0" />
                }
                inputWrapperClassName="flex items-center gap-2.5"
              />
            </div>
          </section>
        </fieldset>

        {!isReadOnly && (
          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              className="gap-2 bg-primary text-primary-foreground font-bold h-11 px-8 hover:opacity-90 shadow-md text-sm"
            >
              <Save className="h-4 w-4" />
              Save Social Media
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
