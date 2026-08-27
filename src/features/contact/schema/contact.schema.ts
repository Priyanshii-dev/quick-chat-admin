import { z } from "zod";

export const contactReplySchema = z.object({
  replyMessage: z.string().min(5, "Reply message must be at least 5 characters"),
});

export type ContactReplyFormValues = z.infer<typeof contactReplySchema>;
