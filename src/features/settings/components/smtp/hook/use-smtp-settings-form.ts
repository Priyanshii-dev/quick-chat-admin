"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import type { SmtpSettingsValues } from "../types/types";
import {
  useSmtpSettings,
  useUpdateSmtpSettings,
  useSendTestEmail,
} from "../action/smtp-settings.action";
import type { FormMode } from "@/components/shared/form-mode";
import {
  smtpSettingsSchema,
  smtpTestEmailSchema,
} from "../schema/smtp-settings.schema";

const emptyValues: SmtpSettingsValues = {
  host: "",
  port: "",
  username: "",
  password: "",
  encryption: "",
  enabled: true,
  fromEmail: "",
  fromName: "",
  fromCc: "",
  fromBcc: "",
  testEmail: "",
  content: "",
};

export function useSmtpSettingsForm(mode: FormMode) {
  const { data: settings, isLoading: isSettingsLoading } = useSmtpSettings();
  const { mutateAsync: updateSettings, isPending: isSubmitting } =
    useUpdateSmtpSettings();
  const { mutateAsync: sendTestEmail, isPending: isSendingTest } =
    useSendTestEmail();

  const { control, handleSubmit, register, getValues, reset, formState } =
    useForm<SmtpSettingsValues>({
      resolver: zodResolver(smtpSettingsSchema),
      defaultValues: emptyValues,
      mode: "onBlur",
    });

  // Populate the form once real data arrives, without clobbering test-email fields
  useEffect(() => {
    if (settings) {
      reset((current) => ({
        ...emptyValues,
        ...settings,
        testEmail: current.testEmail,
        content: current.content,
      }));
    }
  }, [settings]); // eslint-disable-line react-hooks/exhaustive-deps

  const isReadOnly = mode !== "edit";
  const isDirty = formState.isDirty;

  const handleSave = handleSubmit(async (values) => {
    // testEmail/content are transient — don't persist them as SMTP config
    const { testEmail, content, ...configValues } = values;
    try {
      await updateSettings({ payload: configValues as SmtpSettingsValues });
      toast.success("SMTP settings saved");
      reset({ ...values }); // keep test fields, clear isDirty
    } catch (err) {
      toast.error("Couldn't save SMTP settings", {
        description: "Please try again.",
      });
    }
  });

  const handleSendTestEmail = async () => {
    const { testEmail, content } = getValues();
    const parsed = smtpTestEmailSchema.safeParse({ testEmail, content });
    if (!parsed.success) {
      toast.error(
        parsed.error.issues[0]?.message ?? "Enter a valid test email",
      );
      return;
    }
    try {
      await sendTestEmail({ testEmail, content });
      toast.success("Test email sent");
    } catch (err) {
      toast.error("Couldn't send test email", {
        description: "Please try again.",
      });
    }
  };

  return {
    control,
    register,
    handleSave,
    handleSendTestEmail,
    isReadOnly,
    isDirty,
    isSubmitting,
    isSendingTest,
    isSettingsLoading,
  };
}
