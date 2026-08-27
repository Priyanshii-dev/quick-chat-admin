import { useFetchData } from "@/api/hooks/use-fetch-data";
import usePutData from "@/api/hooks/use-put-data";
import type { SocialMediaValues } from "../types/types";

const SOCIAL_MEDIA_QUERY_KEY = ["social-media-settings"] as const;

export function useSocialMediaSettings() {
  return useFetchData<SocialMediaValues>({ url: "/settings/social-media" });
}

export function useUpdateSocialMediaSettings() {
  return usePutData<SocialMediaValues, SocialMediaValues>({
    url: "/settings/social-media",
    refetchQueries: [SOCIAL_MEDIA_QUERY_KEY[0]],
  });
}
