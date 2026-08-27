import { create } from "zustand";

interface DashboardState {
  refreshKey: number;
  triggerRefresh: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  refreshKey: 0,
  triggerRefresh: () => set((state) => ({ refreshKey: state.refreshKey + 1 })),
}));
