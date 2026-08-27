"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { SocialMediaValues } from "../types/types";
import {
  useSocialMediaSettings,
  useUpdateSocialMediaSettings,
} from "../action/social-media-settings.action";
import type { FormMode } from "@/components/shared/form-mode";

const emptyValues: SocialMediaValues = {
  instagram: "",
  facebook: "",
  twitter: "",
  linkedin: "",
};

export function useSocialMediaSettingsForm(mode: FormMode) {
  const { data: settings, isLoading: isSettingsLoading } =
    useSocialMediaSettings();
  const { mutateAsync: updateSettings, isPending: isSubmitting } =
    useUpdateSocialMediaSettings();

  const { control, handleSubmit, reset, formState } =
    useForm<SocialMediaValues>({ defaultValues: emptyValues });

  useEffect(() => {
    if (settings) {
      reset(settings);
    }
  }, [settings]); // eslint-disable-line react-hooks/exhaustive-deps

  const isReadOnly = mode !== "edit";
  const isDirty = formState.isDirty;

  const handleSave = handleSubmit(async (values) => {
    try {
      await updateSettings({ payload: values });
      toast.success("Social media settings saved");
      reset(values);
    } catch (err) {
      toast.error("Couldn't save social media settings", {
        description: "Please try again.",
      });
    }
  });

  return {
    control,
    handleSave,
    isReadOnly,
    isDirty,
    isSubmitting,
    isSettingsLoading,
  };
}
