import instance from "../../../api/instance";
import { API_ENDPOINTS } from "../../../api/endpoints";
import type { ApiResponse } from "../../../api/types/types";
import type { LoginInput } from "../schema/login.schema";
import type { AuthProfile, LoginResponse } from "../types/types";

export const authApi = {
  login: async (payload: LoginInput) => {
    const response = await instance.post<ApiResponse<LoginResponse>>(
      API_ENDPOINTS.AUTH.LOGIN,
      payload,
    );
    return response.data;
  },
  profile: async () => {
    const response =
      await instance.get<ApiResponse<AuthProfile>>("/auth/profile");
    return response.data;
  },
};
