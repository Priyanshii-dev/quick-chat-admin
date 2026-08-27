import { useFetchData } from "@/api/hooks/use-fetch-data";
import type { LoginEvent } from "../types/types";
export function useLoginHistory() {
  return useFetchData<{ items: LoginEvent[]; total: number }>({
    url: "/login-history",
  });
}
