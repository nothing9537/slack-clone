import { z } from "zod";

import { UpdateMessageSchema } from "../../lib/consts/update-message-schema.consts";
import { SendMessageSchema } from "../../lib/consts/send-message-schema.consts";

export type UpdateMessageSchemaType = z.infer<typeof UpdateMessageSchema>;

export type SendMessageSchemaType = z.infer<typeof SendMessageSchema>;
