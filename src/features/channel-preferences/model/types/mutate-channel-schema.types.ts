import { z } from "zod";

import { FormFactoryComponent } from "@/shared/lib/components";

import { UpdateChannelSchema } from "../../lib/consts/update-channel-schema.consts";

export type UpdateChannelSchemaType = z.infer<typeof UpdateChannelSchema>;
export type UpdateChannelComponent = FormFactoryComponent<UpdateChannelSchemaType>;
