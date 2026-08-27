"use client";

import React from "react";
import { Save, Settings, Building2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/shared/custom-input-text";
import { ModuleHeader } from "@/components/shared/module-header";
import { useGeneralSettingsForm } from "../hook/use-general-settings-form";
import { FormMode } from "@/components/shared/form-mode";

type GeneralSettingsFormProps = { mode?: FormMode; onDelete?: () => void };

export function GeneralSettingsForm({
  mode = "edit",
}: GeneralSettingsFormProps) {
  const { control, handleSave, isReadOnly, isSubmitting } =
    useGeneralSettingsForm(mode);

  return (
    <div className="w-full space-y-6">
      <ModuleHeader
        eyebrow="Workspace"
        title="General Settings"
        description="Manage site identity, contact information, locale details, bank accounts, and social links."
      />

      <form noValidate className="space-y-6" onSubmit={handleSave}>
        <fieldset disabled={isReadOnly} className="space-y-6 border-0 p-0">
          {/* Section 1: Website Settings */}
          <section className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2.5 border-b border-border/60 pb-3.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Settings className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-extrabold text-foreground tracking-tight">
                Website Settings
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <FormInput
                name="websiteName"
                label="Website Name"
                control={control}
                placeholder="QuietChat"
                required
              />
              <FormInput
                name="email"
                label="Primary Contact Email"
                control={control}
                type="email"
                placeholder="contact@quietchat.in"
                required
              />
              <FormInput
                name="mobileNo"
                label="Mobile Number"
                control={control}
                placeholder="+91 9876543210"
                required
              />
              <FormInput
                name="whatsappNumber"
                label="WhatsApp Support Number"
                control={control}
                placeholder="+91 9876543210"
                required
              />
              <FormInput
                name="city"
                label="City"
                control={control}
                placeholder="New Delhi"
                required
              />
              <FormInput
                name="state"
                label="State"
                control={control}
                placeholder="Delhi"
                required
              />
              <FormInput
                name="zip"
                label="ZIP / Postal Code"
                control={control}
                placeholder="110001"
                required
              />
              <FormInput
                name="country"
                label="Country"
                control={control}
                placeholder="India"
                required
              />
              <div className="md:col-span-2">
                <FormInput
                  name="address"
                  label="Office / Business Address"
                  control={control}
                  textarea
                  rows={3}
                  placeholder="Enter full registered address..."
                  required
                />
              </div>
            </div>
          </section>

          {/* Section 2: Bank Details */}
          <section className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2.5 border-b border-border/60 pb-3.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Building2 className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-extrabold text-foreground tracking-tight">
                Bank & Payment Details
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <FormInput
                name="bankName"
                label="Bank Name"
                control={control}
                placeholder="HDFC Bank / ICICI Bank"
                required
              />
              <FormInput
                name="accountHolderName"
                label="Account Holder Name"
                control={control}
                placeholder="QuietChat Technologies Pvt Ltd"
                required
              />
              <FormInput
                name="accountNumber"
                label="Account Number"
                control={control}
                placeholder="50200012345678"
                required
              />
              <FormInput
                name="ifscCode"
                label="IFSC Code"
                control={control}
                placeholder="HDFC0000123"
                required
              />
            </div>
          </section>

          {/* Section 3: Social Media Links */}
          <section className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2.5 border-b border-border/60 pb-3.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Share2 className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-extrabold text-foreground tracking-tight">
                Social Media Links
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <FormInput
                name="facebookLink"
                label="Facebook Profile URL"
                control={control}
                placeholder="https://facebook.com/quietchat"
                required
              />
              <FormInput
                name="instagramLink"
                label="Instagram Profile URL"
                control={control}
                placeholder="https://instagram.com/quietchat"
                required
              />
              <FormInput
                name="twitterLink"
                label="Twitter / X Profile URL"
                control={control}
                placeholder="https://x.com/quietchat"
                required
              />
              <FormInput
                name="linkedinLink"
                label="LinkedIn Company URL"
                control={control}
                placeholder="https://linkedin.com/company/quietchat"
                required
              />
              <FormInput
                name="pinterestLink"
                label="Pinterest Profile URL"
                control={control}
                placeholder="https://pinterest.com/quietchat"
                required
              />
              <FormInput
                name="youtubeLink"
                label="YouTube Channel URL"
                control={control}
                placeholder="https://youtube.com/@quietchat"
                required
              />
            </div>
          </section>
        </fieldset>

        {/* Save Settings Action Button */}
        {!isReadOnly && (
          <div className="flex items-center justify-end gap-3 pt-3">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="gap-2 bg-primary text-primary-foreground font-bold h-11 px-8 hover:opacity-90 shadow-md text-sm"
            >
              <Save className="h-4 w-4" />
              {isSubmitting
                ? "Saving General Settings..."
                : "Save General Settings"}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
