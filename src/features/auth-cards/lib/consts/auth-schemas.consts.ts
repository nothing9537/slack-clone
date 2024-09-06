import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string(),
});

export const SignUpSchema = SignInSchema.extend({
  confirmPassword: z.string(),
});
