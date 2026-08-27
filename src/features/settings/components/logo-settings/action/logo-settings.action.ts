import { useFetchData } from "@/api/hooks/use-fetch-data";
import usePutData from "@/api/hooks/use-put-data";

export const LOGO_KEYS = [
  "websiteLogo",
  "websiteFavicon",
  "metaFavicon",
  "appFavicon",
  "salonLogo",
  "salonAppLogo",
] as const;

export type LogoKey = (typeof LOGO_KEYS)[number];

export type LogoSettingsValues = Partial<Record<LogoKey, string>>; // stored URLs

const LOGO_SETTINGS_QUERY_KEY = ["logo-settings"] as const;

export function useLogoSettings() {
  return useFetchData<LogoSettingsValues>({ url: "/settings/logos" });
}

export function useUpdateLogoSettings() {
  return usePutData<Partial<Record<LogoKey, File>>, LogoSettingsValues>({
    url: "/settings/logos",
    useFormData: true,
    refetchQueries: [LOGO_SETTINGS_QUERY_KEY[0]],
  });
}
