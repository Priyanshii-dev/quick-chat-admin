import { API_ENDPOINTS } from "@/api/endpoints";
import instance from "@/api/instance";
import type { ApiResponse } from "@/api/types/types";
import type { SubscriberSummary } from "../types/types";

export const subscribersApi = {
  list: async () => {
    const response = await instance.get<ApiResponse<SubscriberSummary>>(
      API_ENDPOINTS.SUBSCRIBERS.LIST,
    );
    return response.data;
  },
};
