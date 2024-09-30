import { z } from "zod";

import { UpdateMemberSchema } from "../../lib/consts/update-member.schema";

export type UpdateMemberSchemaType = z.infer<typeof UpdateMemberSchema>;
