import { useFetchData } from "../../../api/hooks/use-fetch-data";
import { DashboardSummary } from "../types/types";

export function useDashboardSummary() {
  return useFetchData<DashboardSummary>({ url: "/dashboard/summary" });
}
