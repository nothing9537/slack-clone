import { z } from "zod";

import { SendChannelMessageSchema } from "../../lib/consts/send-message-schema.consts";

export type SendChannelMessageSchemaType = z.infer<typeof SendChannelMessageSchema>;
