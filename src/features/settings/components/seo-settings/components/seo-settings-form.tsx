"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FormInput } from "@/components/shared/custom-input-text";
import { FormModeActions, type FormMode } from "@/components/shared/form-mode";
import { ModuleHeader } from "@/components/shared/module-header";
import {
  siteSettingsSchema,
  type SiteSettingsInput,
} from "../schema/site-settings.schema";
import { useSiteSettings, useUpdateSiteSettings } from "../hook/seo.hook";

type SeoSettingsFormProps = {
  mode?: FormMode;
  isCreate?: boolean;
  onDelete?: () => void;
  hideHeader?: boolean;
  onSuccess?: () => void;
};

const emptySettings: SiteSettingsInput = {
  siteName: "",
  siteUrl: "",
  defaultTitle: "",
  defaultDescription: "",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  canonicalUrl: "",
  robots: "",
  noindex: "",
  nofollow: "",
  language: "",
  websiteUrl: "",
  content: "",
  slug: "",
  ogTitle: "",
  ogDescription: "",
  ogUrl: "",
  ogType: "",
  ogImage: "",
  twitterTitle: "",
  twitterDescription: "",
  twitterCard: "",
  twitterImageUrl: "",
  twitterSite: "",
  twitterCreator: "",
  schemaJson: "",
  pagePriority: "",
  changeFrequency: "",
};

export function SeoSettingsForm({
  mode = "edit",
  isCreate = false,
  onDelete,
  hideHeader = false,
  onSuccess,
}: SeoSettingsFormProps) {
  const { data: settings } = useSiteSettings();
  const updateSettings = useUpdateSiteSettings();

  const { control, handleSubmit, formState } = useForm<SiteSettingsInput>({
    resolver: zodResolver(siteSettingsSchema),
    values: isCreate ? emptySettings : { ...emptySettings, ...settings },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const submit = (values: SiteSettingsInput) => {
    updateSettings.mutate(
      { payload: values },
      {
        onSuccess: () => {
          toast.success("SEO settings saved", {
            description: "Default metadata has been updated.",
          });
          onSuccess?.();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <>
      {!hideHeader && (
        <ModuleHeader eyebrow="Search visibility" title="SEO Configuration" />
      )}

      <form
        noValidate
        className="grid gap-[18px]"
        onSubmit={handleSubmit(submit)}
      >
        <fieldset disabled={mode === "view"} className="border-0 p-0">
          <section className="grid gap-[18px] rounded-lg border border-line bg-panel p-[22px] shadow-panel">
            <h2 className="text-sm font-bold">Basic SEO</h2>
            <div className="grid grid-cols-2 gap-x-[22px] gap-y-[18px] max-[680px]:grid-cols-1">
              <FormInput
                name="siteName"
                label="Site name"
                control={control}
                required
              />
              <FormInput
                name="siteUrl"
                label="Site URL"
                control={control}
                type="url"
                required
              />
              <FormInput
                name="defaultTitle"
                label="Default SEO title"
                control={control}
                required
              />
              <FormInput
                name="defaultDescription"
                label="Default description"
                control={control}
                textarea
                rows={4}
                required
              />
              <FormInput
                name="metaTitle"
                label="Meta title"
                control={control}
              />
              <FormInput
                name="metaDescription"
                label="Meta description"
                control={control}
                textarea
                rows={3}
              />
              <FormInput
                name="metaKeywords"
                label="Meta keywords"
                control={control}
              />
              <FormInput
                name="canonicalUrl"
                label="Canonical URL"
                control={control}
                type="url"
              />
              <FormInput name="robots" label="Robots" control={control} />
              <FormInput name="noindex" label="Noindex" control={control} />
              <FormInput name="nofollow" label="Nofollow" control={control} />
              <FormInput name="language" label="Language" control={control} />
              <FormInput
                name="websiteUrl"
                label="Website URL"
                control={control}
                type="url"
              />
              <FormInput
                name="content"
                label="Content"
                control={control}
                textarea
                rows={4}
              />
              <FormInput name="slug" label="Slug" control={control} />
            </div>
          </section>
          <section className="grid gap-[18px] rounded-lg border border-line bg-panel p-[22px] shadow-panel">
            <h2 className="text-sm font-bold">Open Graph and Twitter</h2>
            <div className="grid grid-cols-2 gap-x-[22px] gap-y-[18px] max-[680px]:grid-cols-1">
              <FormInput name="ogTitle" label="OG title" control={control} />
              <FormInput
                name="ogDescription"
                label="OG description"
                control={control}
                textarea
                rows={3}
              />
              <FormInput
                name="ogUrl"
                label="OG URL"
                control={control}
                type="url"
              />
              <FormInput name="ogType" label="OG type" control={control} />
              <FormInput name="ogImage" label="OG image" control={control} />
              <FormInput
                name="twitterTitle"
                label="Twitter title"
                control={control}
              />
              <FormInput
                name="twitterDescription"
                label="Twitter description"
                control={control}
                textarea
                rows={3}
              />
              <FormInput
                name="twitterCard"
                label="Twitter card"
                control={control}
              />
              <FormInput
                name="twitterImageUrl"
                label="Twitter image URL"
                control={control}
                type="url"
              />
              <FormInput
                name="twitterSite"
                label="Twitter site"
                control={control}
              />
              <FormInput
                name="twitterCreator"
                label="Twitter creator"
                control={control}
              />
            </div>
          </section>
          <section className="grid gap-[18px] rounded-lg border border-line bg-panel p-[22px] shadow-panel">
            <h2 className="text-sm font-bold">Structured Data and Sitemap</h2>
            <div className="grid grid-cols-2 gap-x-[22px] gap-y-[18px] max-[680px]:grid-cols-1">
              <FormInput
                name="schemaJson"
                label="Schema JSON"
                control={control}
                textarea
                rows={5}
              />
              <FormInput
                name="pagePriority"
                label="Page priority"
                control={control}
              />
              <FormInput
                name="changeFrequency"
                label="Change frequency"
                control={control}
              />
            </div>
          </section>
        </fieldset>

        <div className="flex justify-end">
          <FormModeActions
            mode={mode}
            onDelete={onDelete}
            className="min-w-[180px]"
            isSubmitting={updateSettings.isPending}
            isDisabled={!formState.isDirty}
          />
        </div>
      </form>
    </>
  );
}
