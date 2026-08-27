import { z } from "zod";
import { requiredEmail, requiredPassword } from "@/lib/validation";

export const loginSchema = z.object({
  email: requiredEmail("Email"),
  password: requiredPassword(),
});

export type LoginInput = z.infer<typeof loginSchema>;
