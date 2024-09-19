import { z } from "zod";

export const UpdateChannelSchema = z.object({
  name: z.string().min(3),
});
