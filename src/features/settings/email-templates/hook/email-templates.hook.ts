import { useFetchData } from "@/api/hooks/use-fetch-data";
import usePostData from "@/api/hooks/use-post-data";
import { API_ENDPOINTS } from "@/api/endpoints";
import type { EmailTemplate } from "../types/types";
import type { EmailTemplateInput } from "../schema/email-template.schema";

const EMAIL_TEMPLATES_QUERY_KEY = "email-templates";

export function useEmailTemplates() {
  return useFetchData<{ items: EmailTemplate[]; total: number }>({
    url: API_ENDPOINTS.EMAIL.TEMPLATES,
  });
}

export function useCreateEmailTemplate() {
  return usePostData<EmailTemplate, EmailTemplateInput>({
    url: API_ENDPOINTS.EMAIL.TEMPLATES,
    refetchQueries: [EMAIL_TEMPLATES_QUERY_KEY],
  });
}
