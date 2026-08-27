import { HeroBanner } from "../types/hero.types";

const mockHeroBanners: HeroBanner[] = [
  {
    id: "1",
    badgeText: "⚡ 1-on-1 Private Live Chat & Messaging",
    heading: "Never Feel Lonely. Find Your Perfect Chat Companion.",
    subheading:
      "Jump into 100% private, anonymous 1-on-1 conversations with verified partners 24/7. QuietChat is your ultimate judgment-free escape.",
    primaryCtaText: "GET IT ON Google Play",
    primaryCtaLink: "https://play.google.com",
    secondaryCtaText: "DOWNLOAD FOR iOS / Web App",
    secondaryCtaLink: "https://quietchat.in",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
    isActive: true,
    updatedAt: "2026-08-27",
  },
];

export const heroService = {
  getHeroBanners: async (): Promise<HeroBanner[]> => {
    return Promise.resolve(mockHeroBanners);
  },
  saveHeroBanner: async (hero: Partial<HeroBanner>): Promise<HeroBanner> => {
    const newHero: HeroBanner = {
      id: String(Date.now()),
      badgeText: hero.badgeText || "",
      heading: hero.heading || "",
      subheading: hero.subheading || "",
      primaryCtaText: hero.primaryCtaText || "Get Started",
      primaryCtaLink: hero.primaryCtaLink || "/",
      secondaryCtaText: hero.secondaryCtaText || "",
      secondaryCtaLink: hero.secondaryCtaLink || "",
      imageUrl: hero.imageUrl || "",
      isActive: hero.isActive !== undefined ? hero.isActive : true,
      updatedAt: new Date().toISOString().split("T")[0],
    };
    mockHeroBanners[0] = newHero;
    return Promise.resolve(newHero);
  },
};
