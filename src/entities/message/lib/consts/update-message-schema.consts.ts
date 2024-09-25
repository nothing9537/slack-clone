import { z } from "zod";

export const UpdateMessageSchema = z.object({
  body: z.string().min(3),
  images: z.instanceof(File).array().optional(),
});
