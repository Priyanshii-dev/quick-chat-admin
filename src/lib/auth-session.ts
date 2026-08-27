import Cookies from "js-cookie";
import { useAuthStore, type AuthUser } from "@/features/auth/store/auth-store";

type AuthSessionParams = {
  user: AuthUser | null;
  token: string;
};

type SuperAdminSessionParams = {
  user: AuthUser | null;
  token: string;
};

export const finalizeAdminAuthSession = ({
  user,
  token,
}: AuthSessionParams) => {
  if (!user || !token) {
    return "/login";
  }

  useAuthStore.getState().setAuth(user, token);
  Cookies.set("accessToken", token, { expires: 7, sameSite: "Lax" });
  Cookies.set("role", "admin", { expires: 7, sameSite: "Lax" });
  Cookies.remove("sidebar_state");
  return "/dashboard";
};

export const finalizeSuperAdminSession = ({
  user,
  token,
}: SuperAdminSessionParams) => {
  if (!user || !token) {
    return "/login";
  }

  useAuthStore.getState().setAuth(user, token);
  Cookies.set("accessToken", token, { expires: 7, sameSite: "Lax" });
  Cookies.set("role", "super_admin", { expires: 7, sameSite: "Lax" });
  Cookies.remove("sidebar_state");
  return "/users";
};
