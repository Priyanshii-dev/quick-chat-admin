"use client";

import Link from "next/link";
import { FormInput } from "@/components/shared/custom-input-text";
import { ModuleHeader } from "@/components/shared/module-header";
import { FormModeActions, type FormMode } from "@/components/shared/form-mode";
import { useGeneralSettingsForm } from "../hook/use-general-settings-form";

type GeneralSettingsFormProps = { mode?: FormMode; onDelete?: () => void };

export function GeneralSettingsForm({
  mode = "edit",
  onDelete,
}: GeneralSettingsFormProps) {
  const { control, handleSave, isReadOnly, isDirty, isSubmitting } =
    useGeneralSettingsForm(mode);

  return (
    <>
      <ModuleHeader eyebrow="Workspace" title="General Settings"></ModuleHeader>

      <form noValidate className="grid gap-[18px]" onSubmit={handleSave}>
        <fieldset
          disabled={isReadOnly}
          className="grid gap-[18px] border-0 p-0"
        >
          <section className="rounded-lg border border-line bg-panel p-[22px] shadow-panel [&>h2]:mb-5 [&>h2]:text-sm [&>h2]:font-bold">
            <h2>Website settings</h2>
            <div className="grid grid-cols-2 gap-x-[22px] gap-y-[18px] max-[680px]:grid-cols-1 [&>label:last-child:nth-child(odd)]:col-span-full">
              <FormInput
                name="websiteName"
                label="Website Name"
                control={control}
                required
              />
              <FormInput
                name="email"
                label="Email"
                control={control}
                type="email"
                required
              />
              <FormInput
                name="mobileNo"
                label="Mobile No"
                control={control}
                required
              />
              <FormInput
                name="whatsappNumber"
                label="WhatsApp Number"
                control={control}
                required
              />
              <FormInput name="city" label="City" control={control} required />
              <FormInput
                name="state"
                label="State"
                control={control}
                required
              />
              <FormInput name="zip" label="Zip" control={control} required />
              <FormInput
                name="country"
                label="Country"
                control={control}
                required
              />
              <FormInput
                name="address"
                label="Address"
                control={control}
                textarea
                rows={3}
                required
              />
            </div>
          </section>

          <section className="rounded-lg border border-line bg-panel p-[22px] shadow-panel [&>h2]:mb-5 [&>h2]:text-sm [&>h2]:font-bold">
            <h2>Bank Details</h2>
            <div className="grid grid-cols-2 gap-x-[22px] gap-y-[18px] max-[680px]:grid-cols-1">
              <FormInput
                name="bankName"
                label="Bank Name"
                control={control}
                placeholder="Enter Bank Name"
                required
              />
              <FormInput
                name="accountHolderName"
                label="Account Holder Name"
                control={control}
                placeholder="Enter Account Holder Name"
                required
              />
              <FormInput
                name="accountNumber"
                label="Account Number"
                control={control}
                placeholder="Enter Account Number"
                required
              />
              <FormInput
                name="ifscCode"
                label="IFSC Code"
                control={control}
                placeholder="Enter IFSC Code"
                required
              />
            </div>
          </section>

          <section className="rounded-lg border border-line bg-panel p-[22px] shadow-panel [&>h2]:mb-5 [&>h2]:text-sm [&>h2]:font-bold">
            <h2>Social Media Links</h2>
            <div className="grid grid-cols-2 gap-x-[22px] gap-y-[18px] max-[680px]:grid-cols-1">
              <FormInput
                name="facebookLink"
                label="Facebook Link"
                control={control}
                placeholder="https://facebook.com/..."
                required
              />
              <FormInput
                name="instagramLink"
                label="Instagram Link"
                control={control}
                placeholder="https://instagram.com/..."
                required
              />
              <FormInput
                name="twitterLink"
                label="Twitter Link"
                control={control}
                placeholder="https://twitter.com/..."
                required
              />
              <FormInput
                name="linkedinLink"
                label="LinkedIn Link"
                control={control}
                placeholder="https://linkedin.com/..."
                required
              />
              <FormInput
                name="pinterestLink"
                label="Pinterest Link"
                control={control}
                placeholder="https://pinterest.com/..."
                required
              />
              <FormInput
                name="youtubeLink"
                label="YouTube Link"
                control={control}
                placeholder="https://youtube.com/..."
                required
              />
            </div>
          </section>
        </fieldset>

        <div className="flex justify-end">
          <FormModeActions
            mode={mode}
            onDelete={onDelete}
            className="min-w-[180px]"
            isSubmitting={isSubmitting}
            isDisabled={!isDirty}
          />
        </div>
      </form>
    </>
  );
}
