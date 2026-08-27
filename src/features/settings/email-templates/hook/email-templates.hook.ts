import { useFetchData } from "@/api/hooks/use-fetch-data";
import type { EmailTemplate } from "../types/types";

export function useEmailTemplates() {
  return useFetchData<{ items: EmailTemplate[]; total: number }>({
    url: "/email/templates",
  });
}
