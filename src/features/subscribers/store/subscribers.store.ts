import { create } from "zustand";

interface SubscribersState {
  searchQuery: string;
  selectedStatus: string;
  setSearchQuery: (query: string) => void;
  setSelectedStatus: (status: string) => void;
  resetFilters: () => void;
}

export const useSubscribersStore = create<SubscribersState>((set) => ({
  searchQuery: "",
  selectedStatus: "",
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedStatus: (selectedStatus) => set({ selectedStatus }),
  resetFilters: () => set({ searchQuery: "", selectedStatus: "" }),
}));
