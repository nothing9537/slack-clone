import { z } from "zod";

export const SendChannelMessageSchema = z.object({
  body: z.string().min(3),
  image: z.instanceof(File),
});
