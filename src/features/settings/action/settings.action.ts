import { API_ENDPOINTS } from "@/api/endpoints";
import instance from "@/api/instance";
import type { ApiResponse } from "@/api/types/types";
import type { Settings } from "../components/general-settings/types/types";

export const settingsApi = {
  getGeneral: async () => {
    const response = await instance.get<ApiResponse<Settings>>(
      API_ENDPOINTS.SETTINGS.SITE,
    );
    return response.data;
  },
};
