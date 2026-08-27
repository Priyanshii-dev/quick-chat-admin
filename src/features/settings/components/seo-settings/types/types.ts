export type SeoSummary = {
  score: number | null;
  recommendations: number | null;
};
export type SiteSettings = {
  siteName: string;
  siteUrl: string;
  defaultTitle: string;
  defaultDescription: string;
};
export type SeoRow = {
  pageName: string;
  title: string;
  seoUrl: string;
  canonicalUrl: string;
  slug: string;
};
