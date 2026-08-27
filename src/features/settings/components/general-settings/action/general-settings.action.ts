import { useFetchData } from "@/api/hooks/use-fetch-data";
import usePutData from "@/api/hooks/use-put-data";
import type { GeneralSettingsValues } from "../types/types";

const GENERAL_SETTINGS_QUERY_KEY = ["general-settings"] as const;

export function useGeneralSettings() {
  return useFetchData<GeneralSettingsValues>({ url: "/settings/general" });
}

export function useUpdateGeneralSettings() {
  return usePutData<GeneralSettingsValues, GeneralSettingsValues>({
    url: "/settings/general",
    refetchQueries: [GENERAL_SETTINGS_QUERY_KEY[0]],
  });
}
