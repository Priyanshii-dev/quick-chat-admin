import { create } from "zustand";
import { SeoMeta } from "../types/seo.types";

interface SeoState {
  searchQuery: string;
  selectedStatus: string;
  activeSeo: SeoMeta | null;
  setSearchQuery: (query: string) => void;
  setSelectedStatus: (status: string) => void;
  setActiveSeo: (seo: SeoMeta | null) => void;
  resetFilters: () => void;
}

export const useSeoStore = create<SeoState>((set) => ({
  searchQuery: "",
  selectedStatus: "",
  activeSeo: null,
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedStatus: (selectedStatus) => set({ selectedStatus }),
  setActiveSeo: (activeSeo) => set({ activeSeo }),
  resetFilters: () => set({ searchQuery: "", selectedStatus: "" }),
}));
