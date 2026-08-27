import { API_ENDPOINTS } from "@/api/endpoints";
import instance from "@/api/instance";
import type { ApiResponse } from "@/api/types/types";
import type { BlogListResponse } from "../types/types";

export const blogApi = {
  list: async () => {
    const response = await instance.get<ApiResponse<BlogListResponse>>(
      API_ENDPOINTS.BLOG.LIST,
    );
    return response.data;
  },
};
