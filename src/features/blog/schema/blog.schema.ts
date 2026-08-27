import { z } from "zod";
import { optionalString, requiredString } from "@/lib/validation";

export const blogSchema = z.object({
  title: requiredString("Title"),
  slug: requiredString("Slug"),
  summary: optionalString("Summary"),
  content: requiredString("Content"),
  author: requiredString("Author"),
  category: requiredString("Category"),
  publishDate: optionalString("Publish date"),
  seoTitle: optionalString("SEO title"),
  seoMetaTags: optionalString("SEO meta tags"),
  canonicalUrl: optionalString("Canonical URL"),
  seoDescription: optionalString("SEO description"),
});

export type BlogFormValues = z.infer<typeof blogSchema>;
