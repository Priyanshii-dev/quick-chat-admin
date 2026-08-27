import { z } from "zod";

export const blogPostSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(120, "Title cannot exceed 120 characters"),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase alphanumeric with hyphens",
    ),
  categoryId: z.string().min(1, "Please select a category"),
  description: z
    .string()
    .max(250, "Description cannot exceed 250 characters")
    .optional(),
  content: z.string().min(10, "Content must be at least 10 characters long"),
  status: z.enum(["Published", "Draft", "Archived"]).optional(),
  imageUrl: z.string().min(1, "Featured header image is required"),
  authorProfileUrl: z.string().optional(),
  author: z.string().min(1, "Author name is required"),
  doctorId: z.string().optional(),
  tag: z.string().optional(),
  engagement: z
    .number()
    .min(0, "Engagement must be a positive number")
    .optional(),
  date: z.string().optional(),
  publishedAt: z.string().optional(),
  dynamicBlocks: z.array(z.string()).optional(),
  faqs: z
    .array(
      z.object({
        question: z.string().min(1, "Question is required"),
        answer: z.string().min(1, "Answer is required"),
      }),
    )
    .optional(),
});

export type BlogPostFormValues = z.infer<typeof blogPostSchema>;

export const blogCategorySchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters"),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be valid slug format"),
  description: z
    .string()
    .max(200, "Description cannot exceed 200 characters")
    .optional(),
  iconUrl: z.string().optional(),
  imageUrl: z.string().optional(),
});

export type BlogCategoryFormValues = z.infer<typeof blogCategorySchema>;
