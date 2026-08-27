import { z } from "zod";
import { optionalString, requiredString, requiredUrl } from "@/lib/validation";

export const siteSettingsSchema = z.object({
  siteName: requiredString("Site name").min(2, "Site name must be at least 2 characters"),
  siteUrl: requiredUrl("Site URL"),
  defaultTitle: requiredString("SEO title")
    .min(10, "SEO title must be at least 10 characters")
    .max(60),
  defaultDescription: requiredString("Description")
    .min(10, "Description must be at least 10 characters")
    .max(160),
  metaTitle: optionalString("Meta title"),
  metaDescription: optionalString("Meta description"),
  metaKeywords: optionalString("Meta keywords"),
  canonicalUrl: optionalString("Canonical URL"),
  robots: optionalString("Robots"),
  noindex: optionalString("Noindex"),
  nofollow: optionalString("Nofollow"),
  language: optionalString("Language"),
  websiteUrl: optionalString("Website URL"),
  content: optionalString("Content"),
  slug: optionalString("Slug"),
  ogTitle: optionalString("OG title"),
  ogDescription: optionalString("OG description"),
  ogUrl: optionalString("OG URL"),
  ogType: optionalString("OG type"),
  ogImage: optionalString("OG image"),
  twitterTitle: optionalString("Twitter title"),
  twitterDescription: optionalString("Twitter description"),
  twitterCard: optionalString("Twitter card"),
  twitterImageUrl: optionalString("Twitter image URL"),
  twitterSite: optionalString("Twitter site"),
  twitterCreator: optionalString("Twitter creator"),
  schemaJson: optionalString("Schema JSON"),
  pagePriority: optionalString("Page priority"),
  changeFrequency: optionalString("Change frequency"),
});

export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>;
