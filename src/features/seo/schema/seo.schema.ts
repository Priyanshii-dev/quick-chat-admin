import { z } from "zod";

export const seoSchema = z.object({
  pageUrl: z.string().min(1, "Page URL path is required (e.g. /about-us)"),
  metaTitle: z
    .string()
    .min(5, "Meta title must be at least 5 characters")
    .max(70, "Meta title recommended under 70 characters"),
  metaDescription: z
    .string()
    .min(10, "Meta description must be at least 10 characters")
    .max(160, "Meta description recommended under 160 characters"),
  keywords: z.string().optional(),
  ogImage: z.string().optional(),
  robots: z.string().optional(),
  canonicalUrl: z.string().optional(),
  status: z.enum(["Active", "Pending", "Draft"]).optional(),
});

export type SeoFormValues = z.infer<typeof seoSchema>;
