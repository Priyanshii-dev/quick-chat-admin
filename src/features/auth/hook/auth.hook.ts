import usePostData from "../../../api/hooks/use-post-data";
import { useFetchData } from "../../../api/hooks/use-fetch-data";
import { API_ENDPOINTS } from "../../../api/endpoints";
import { useAuthStore } from "../store/auth-store";
import type { LoginInput } from "../schema/login.schema";
import type { AuthProfile, LoginResponse } from "../types/types";

export function useUser() {
  return useAuthStore((state) => state.user);
}

export function useAuthProfile() {
  return useFetchData<AuthProfile>({
    url: "/auth/profile",
  });
}
export function useLogin() {
  return usePostData<LoginResponse, LoginInput>({
    url: API_ENDPOINTS.AUTH.LOGIN,
  });
}
