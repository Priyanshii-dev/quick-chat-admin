import { create } from "zustand";
import { ContactInquiry } from "../types/contact.types";

interface ContactState {
  searchQuery: string;
  selectedStatus: string;
  activeInquiry: ContactInquiry | null;
  setSearchQuery: (query: string) => void;
  setSelectedStatus: (status: string) => void;
  setActiveInquiry: (inquiry: ContactInquiry | null) => void;
  resetFilters: () => void;
}

export const useContactStore = create<ContactState>((set) => ({
  searchQuery: "",
  selectedStatus: "",
  activeInquiry: null,
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedStatus: (selectedStatus) => set({ selectedStatus }),
  setActiveInquiry: (activeInquiry) => set({ activeInquiry }),
  resetFilters: () => set({ searchQuery: "", selectedStatus: "" }),
}));
