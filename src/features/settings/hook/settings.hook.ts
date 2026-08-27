import { useFetchData } from "../../../api/hooks/use-fetch-data";
import type { Settings } from "../components/general-settings/types/types";
export function useSettings() {
  return useFetchData<Settings>({ url: "/settings/general" });
}
