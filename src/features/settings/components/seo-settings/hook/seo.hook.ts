import { useQueryClient } from "@tanstack/react-query";
import { useFetchData } from "../../../../../api/hooks/use-fetch-data";
import usePutData from "../../../../../api/hooks/use-put-data";
import type { SeoSummary, SiteSettings } from "../types/types";

export function useSeoSummary() {
  return useFetchData<SeoSummary>({ url: "/seo/summary" });
}
export function useSiteSettings() {
  return useFetchData<SiteSettings>({ url: "/settings/site" });
}
export function useUpdateSiteSettings() {
  const queryClient = useQueryClient();
  return usePutData<SiteSettings, SiteSettings>({
    url: "/settings/site",
    mutationOptions: {
      onSuccess: (data) => {
        queryClient.setQueryData(["/settings/site", {}], data);
      },
    },
  });
}
