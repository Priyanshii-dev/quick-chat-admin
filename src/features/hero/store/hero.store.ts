import { create } from "zustand";
import { HeroBanner } from "../types/hero.types";

interface HeroState {
  searchQuery: string;
  activeHero: HeroBanner | null;
  setSearchQuery: (query: string) => void;
  setActiveHero: (hero: HeroBanner | null) => void;
}

export const useHeroStore = create<HeroState>((set) => ({
  searchQuery: "",
  activeHero: null,
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setActiveHero: (activeHero) => set({ activeHero }),
}));
