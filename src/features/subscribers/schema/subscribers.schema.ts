import { z } from "zod";

export const subscriberSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  source: z.string().optional().default("Website Footer"),
  status: z.enum(["Subscribed", "Unsubscribed", "Bounced"]).default("Subscribed"),
});

export type SubscriberFormValues = z.infer<typeof subscriberSchema>;
