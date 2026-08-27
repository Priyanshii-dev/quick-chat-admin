import { API_ENDPOINTS } from "@/api/endpoints";
import instance from "@/api/instance";
import type { ApiResponse } from "@/api/types/types";
import { DashboardSummary } from "../types/types";

export const dashboardApi = {
  summary: async () => {
    const response = await instance.get<ApiResponse<DashboardSummary>>(
      API_ENDPOINTS.DASHBOARD.SUMMARY,
    );
    return response.data;
  },
};
