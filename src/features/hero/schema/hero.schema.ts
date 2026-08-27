import { z } from "zod";

export const heroSchema = z.object({
  badgeText: z.string().optional(),
  heading: z.string().min(5, "Heading must be at least 5 characters"),
  subheading: z.string().min(10, "Subheading must be at least 10 characters"),
  primaryCtaText: z.string().min(2, "Primary CTA text required"),
  primaryCtaLink: z.string().min(1, "Primary CTA link required"),
  secondaryCtaText: z.string().optional(),
  secondaryCtaLink: z.string().optional(),
  imageUrl: z.string().optional(),
  isActive: z.boolean().optional(),
});

export type HeroFormValues = z.infer<typeof heroSchema>;
