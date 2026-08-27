import { API_ENDPOINTS } from "@/api/endpoints";
import instance from "@/api/instance";
import type { ApiResponse } from "@/api/types/types";
import type { SeoSummary, SiteSettings } from "../types/types";

export const seoApi = {
  getSummary: async () => {
    const response = await instance.get<ApiResponse<SeoSummary>>(
      API_ENDPOINTS.SEO.SUMMARY,
    );
    return response.data;
  },
  getSiteSettings: async () => {
    const response = await instance.get<ApiResponse<SiteSettings>>(
      API_ENDPOINTS.SETTINGS.SITE,
    );
    return response.data;
  },
  updateSiteSettings: async (payload: SiteSettings) => {
    const response = await instance.put<ApiResponse<SiteSettings>>(
      API_ENDPOINTS.SETTINGS.SITE,
      payload,
    );
    return response.data;
  },
};
