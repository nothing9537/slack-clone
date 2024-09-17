import { z } from "zod";

export const JoinSchema = z.object({
  pin: z.string().min(6, {
    message: "Join code must be 6 characters long",
  }),
});
