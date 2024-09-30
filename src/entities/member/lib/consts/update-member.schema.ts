import { z } from "zod";

export const UpdateMemberSchema = z.object({
  role: z.enum(["admin", "member"]),
});
