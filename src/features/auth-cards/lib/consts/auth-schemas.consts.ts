import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string(),
  error: z.string().optional(),
});

export const SignUpSchema = SignInSchema.extend({
  firstName: z.string(),
  lastName: z.string(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[\W_]/, { message: "Password must contain at least one special character" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["error"],
  message: "Passwords don't match",
});
