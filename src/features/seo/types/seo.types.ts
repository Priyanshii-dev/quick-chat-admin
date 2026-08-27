export interface SeoMeta {
  id: string;
  pageUrl: string;
  metaTitle: string;
  metaDescription: string;
  keywords?: string;
  ogImage?: string;
  robots?: string;
  canonicalUrl?: string;
  updatedAt: string;
  status: "Active" | "Pending" | "Draft";
}
