import { z } from "zod";

import { FormFactoryComponent } from "@/shared/lib/components";

import { CreateChannelSchema } from "../../lib/consts/create-channel-schema.consts";

export type CreateChannelSchemaType = z.infer<typeof CreateChannelSchema>;
export type CreateChannelComponent = FormFactoryComponent<CreateChannelSchemaType>;
