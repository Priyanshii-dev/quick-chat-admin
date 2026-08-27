import { z } from "zod";
import { requiredEmail, requiredString } from "@/lib/validation";

export const emailTemplateSchema = z.object({
  name: requiredString("Template name")
    .min(2, "Template name must be at least 2 characters")
    .max(100),
  from: requiredEmail("Email"),
  subject: requiredString("Subject").min(2, "Subject is required").max(200),
  status: z.enum(["Active", "Draft"]),
  content: requiredString("Email content").max(10000),
});

export type EmailTemplateInput = z.infer<typeof emailTemplateSchema>;
