import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import Cookies from "js-cookie";

import { API_ENDPOINTS } from "../endpoints";
import instance from "../instance";
import {
  useAuthStore,
  type AuthState,
} from "../../features/auth/store/auth-store";

import type { ApiError } from "../types/types";

export function useLogout() {
  const router = useRouter();
  const clearAuth = useAuthStore((state: AuthState) => state.clearAuth);

  return useMutation<void, ApiError, void>({
    mutationFn: async () => {
      try {
        await instance.post(API_ENDPOINTS.AUTH.LOGOUT);
      } catch (error) {
        const message = isAxiosError<ApiError>(error)
          ? (error.response?.data?.message ?? error.message)
          : error instanceof Error
            ? error.message
            : "Logout API failed";
        console.error("Logout API failed:", message);
      }
    },
    onSettled: () => {
      Cookies.remove("accessToken");
      Cookies.remove("role");
      clearAuth();
      router.push("/login");
    },
  });
}
