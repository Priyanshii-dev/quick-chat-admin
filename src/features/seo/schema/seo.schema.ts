import { z } from "zod";

export const seoSchema = z.object({
  metaTitle: z
    .string()
    .min(5, "Meta title must be at least 5 characters")
    .max(70, "Meta title recommended under 70 characters"),
  metaDescription: z
    .string()
    .min(10, "Meta description must be at least 10 characters")
    .max(160, "Meta description recommended under 160 characters"),
  metaTags: z.string().optional(),
  keywords: z.string().optional(),
  ogUrl: z.string().optional(),
  canonicalUrl: z.string().optional(),
  metadata: z.string().optional(),
});

export type SeoFormValues = z.infer<typeof seoSchema>;
