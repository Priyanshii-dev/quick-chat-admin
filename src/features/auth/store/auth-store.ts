import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthUser = {
  email: string;
  name: string;
  role: string;
};

export type AuthState = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: AuthUser, token?: string | null) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token = null) =>
        set({ user, token, isAuthenticated: true }),
      clearAuth: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    { name: "northstar-auth" },
  ),
);
