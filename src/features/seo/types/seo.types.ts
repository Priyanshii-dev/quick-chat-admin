export interface SeoMeta {
  id: string;
  pageName: string;
  pageUrl: string;
  metaTitle: string;
  metaDescription: string;
  metaTags?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  robots?: string;
  canonicalUrl?: string;
  metadata?: string;
  updatedAt: string;
  status: "Active" | "Pending" | "Draft";
}
