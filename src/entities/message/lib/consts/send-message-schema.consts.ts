import { z } from "zod";

export const SendMessageSchema = z.object({
  body: z.string().min(3),
  images: z.instanceof(File).array().optional(),
});
