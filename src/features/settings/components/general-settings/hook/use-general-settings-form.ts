"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { generalSettingsSchema } from "../schema/general-settings.schema";
import type { GeneralSettingsValues } from "../types/types";
import {
  useGeneralSettings,
  useUpdateGeneralSettings,
} from "../action/general-settings.action";
import type { FormMode } from "@/components/shared/form-mode";

const emptyValues: GeneralSettingsValues = {
  websiteName: "",
  email: "",
  mobileNo: "",
  whatsappNumber: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  address: "",
  bankName: "",
  accountHolderName: "",
  accountNumber: "",
  ifscCode: "",
  facebookLink: "",
  instagramLink: "",
  twitterLink: "",
  linkedinLink: "",
  pinterestLink: "",
  youtubeLink: "",
};

export function useGeneralSettingsForm(mode: FormMode) {
  const { data: settings, isLoading: isSettingsLoading } = useGeneralSettings();
  const { mutateAsync: updateSettings, isPending: isSubmitting } =
    useUpdateGeneralSettings();

  const form = useForm<GeneralSettingsValues>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: emptyValues,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  // Populate the form once real data arrives (don't stomp on user edits)
  useEffect(() => {
    if (settings) {
      form.reset(settings);
    }
  }, [settings]); // eslint-disable-line react-hooks/exhaustive-deps

  const isReadOnly = mode !== "edit";
  const isDirty = form.formState.isDirty;

  const handleSave = form.handleSubmit(async (values) => {
    try {
      await updateSettings({ payload: values });
      toast.success("Settings saved", {
        description: "Your general settings have been updated.",
      });
      form.reset(values); // clears isDirty after a successful save
    } catch (err) {
      toast.error("Couldn't save settings", {
        description: "Please try again.",
      });
    }
  });

  return {
    control: form.control,
    handleSave,
    isReadOnly,
    isDirty,
    isSubmitting,
    isSettingsLoading,
  };
}
