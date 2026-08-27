import { create } from "zustand";
import { BlogPost, BlogCategory } from "../types/types";

interface BlogState {
  searchQuery: string;
  selectedCategory: string;
  selectedStatus: string;
  activeBlog: BlogPost | null;
  activeCategory: BlogCategory | null;
  isCategoryModalOpen: boolean;
  isDeleteModalOpen: boolean;

  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: string) => void;
  setSelectedStatus: (status: string) => void;
  setActiveBlog: (blog: BlogPost | null) => void;
  setActiveCategory: (cat: BlogCategory | null) => void;
  setCategoryModalOpen: (open: boolean) => void;
  setDeleteModalOpen: (open: boolean) => void;
  resetFilters: () => void;
}

export const useBlogStore = create<BlogState>((set) => ({
  searchQuery: "",
  selectedCategory: "",
  selectedStatus: "",
  activeBlog: null,
  activeCategory: null,
  isCategoryModalOpen: false,
  isDeleteModalOpen: false,

  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setSelectedStatus: (selectedStatus) => set({ selectedStatus }),
  setActiveBlog: (activeBlog) => set({ activeBlog }),
  setActiveCategory: (activeCategory) => set({ activeCategory }),
  setCategoryModalOpen: (isCategoryModalOpen) => set({ isCategoryModalOpen }),
  setDeleteModalOpen: (isDeleteModalOpen) => set({ isDeleteModalOpen }),
  resetFilters: () =>
    set({
      searchQuery: "",
      selectedCategory: "",
      selectedStatus: "",
    }),
}));
