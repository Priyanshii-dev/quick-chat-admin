import { API_ENDPOINTS } from "@/api/endpoints";
import instance from "@/api/instance";
import type { ApiResponse } from "@/api/types/types";
import type { LoginEvent } from "../types/types";

export const LoginHistoryActions = {
  loginHistory: async () => {
    const response = await instance.get<
      ApiResponse<{ items: LoginEvent[]; total: number }>
    >(API_ENDPOINTS.SECURITY.LOGIN_HISTORY);
    return response.data;
  },
};
