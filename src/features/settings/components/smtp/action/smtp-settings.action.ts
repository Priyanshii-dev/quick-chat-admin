import { useFetchData } from "@/api/hooks/use-fetch-data";
import usePostData from "@/api/hooks/use-post-data";
import usePutData from "@/api/hooks/use-put-data";
import type { SmtpSettingsValues } from "../types/types";

const SMTP_SETTINGS_QUERY_KEY = ["smtp-settings"] as const;

export function useSmtpSettings() {
  return useFetchData<SmtpSettingsValues>({ url: "/settings/smtp" });
}

export function useUpdateSmtpSettings() {
  return usePutData<SmtpSettingsValues, SmtpSettingsValues>({
    url: "/settings/smtp",
    refetchQueries: [SMTP_SETTINGS_QUERY_KEY[0]],
  });
}

export function useSendTestEmail() {
  return usePostData<unknown, { testEmail: string; content: string }>({
    url: "/settings/smtp/test-email",
    showToast: false,
  });
}
