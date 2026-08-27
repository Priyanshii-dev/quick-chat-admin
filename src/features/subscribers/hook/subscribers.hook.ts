import { useFetchData } from "../../../api/hooks/use-fetch-data";
import type { SubscriberSummary } from "../types/types";
export function useSubscribers() {
  return useFetchData<SubscriberSummary>({ url: "/subscribers" });
}
