import { z } from "zod";
import { optionalEmail, requiredEmail, requiredString } from "@/lib/validation";

export const smtpSettingsSchema = z.object({
  host: requiredString("SMTP host"),
  port: requiredString("SMTP port").regex(/^\d+$/, "SMTP port must be a number"),
  username: requiredString("SMTP username"),
  password: requiredString("SMTP password"),
  encryption: requiredString("Encryption"),
  enabled: z.boolean(),
  fromEmail: requiredEmail("Email"),
  fromName: requiredString("Sender name"),
  fromCc: optionalEmail(),
  fromBcc: optionalEmail(),
  testEmail: optionalEmail(),
  content: requiredString("Content").max(10000, "Content is too long"),
});

export const smtpTestEmailSchema = smtpSettingsSchema
  .pick({
    testEmail: true,
    content: true,
  })
  .extend({
    testEmail: requiredEmail("Email"),
  });
