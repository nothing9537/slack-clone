import { Id } from "@convex/_generated/dataModel";

import { CreateChannelSchemaType } from "./create-channel-schema.types";

export type CreateChannelRequestType = CreateChannelSchemaType;
export type CreateChannelResponseType = Id<"channels">;

export interface CreateChannelOptions {
  onSuccess?: (data: CreateChannelResponseType, args: CreateChannelSchemaType) => void;
  onError?: (errorMessage: string) => void;
  onSettled?: () => void;
  throwError?: boolean;
}
