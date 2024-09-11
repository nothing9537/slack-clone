import { z } from "zod";

export const CreateChannelSchema = z.object({
  name: z.string().min(3),
});
