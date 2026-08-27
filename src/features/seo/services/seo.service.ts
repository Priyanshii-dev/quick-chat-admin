import { SeoMeta } from "../types/seo.types";

const mockSeoRecords: SeoMeta[] = [
  {
    id: "1",
    pageName: "Home",
    pageUrl: "/",
    metaTitle: "QuietChat - Anonymous 1-on-1 Live Private Messaging & Rewards",
    metaDescription:
      "Connect with verified chat partners 24/7. Safe, encrypted, private 1-on-1 conversations.",
    keywords: "chat, quiet chat, online messaging, private chat",
    status: "Active",
    updatedAt: "2026-08-25",
  },
  {
    id: "2",
    pageName: "About Us",
    pageUrl: "/about-us",
    metaTitle: "About QuietChat | Our Privacy & Security Commitment",
    metaDescription:
      "Learn more about our mission to provide safe, judgment-free anonymous connections.",
    keywords: "about quietchat, private chat app, privacy policy",
    status: "Active",
    updatedAt: "2026-08-20",
  },
  {
    id: "3",
    pageName: "Blog",
    pageUrl: "/blog",
    metaTitle: "QuietChat Blog & Updates - Technology and Product News",
    metaDescription:
      "Read latest articles, security updates, and community highlights.",
    keywords: "blog, chat technology, news",
    status: "Active",
    updatedAt: "2026-08-26",
  },
];

export const seoService = {
  getSeoRecords: async (): Promise<SeoMeta[]> => {
    return Promise.resolve(mockSeoRecords);
  },
  createSeo: async (seo: Partial<SeoMeta>): Promise<SeoMeta> => {
    const newSeo: SeoMeta = {
      id: String(Date.now()),
      pageName: seo.pageName || seo.metaTitle || "Untitled page",
      pageUrl: seo.pageUrl || "/",
      metaTitle: seo.metaTitle || "",
      metaDescription: seo.metaDescription || "",
      metaTags: seo.metaTags || "",
      keywords: seo.keywords || "",
      ogUrl: seo.ogUrl || "",
      robots: seo.robots || "index, follow",
      canonicalUrl: seo.canonicalUrl || "",
      metadata: seo.metadata || "",
      status: seo.status || "Active",
      updatedAt: new Date().toISOString().split("T")[0],
    };
    mockSeoRecords.unshift(newSeo);
    return Promise.resolve(newSeo);
  },
  deleteSeo: async (id: string): Promise<boolean> => {
    const idx = mockSeoRecords.findIndex((s) => s.id === id);
    if (idx !== -1) {
      mockSeoRecords.splice(idx, 1);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  },
};
