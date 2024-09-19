import { Doc } from "@convex/_generated/dataModel";

import { UpdateChannelSchemaType } from "./mutate-channel-schema.types";

export type MutateChannelRequestType = UpdateChannelSchemaType;
export type MutateChannelResponseType = Doc<"channels">;

export interface MutateChannelOptions {
  onSuccess?: (data: MutateChannelResponseType, args: UpdateChannelSchemaType) => void;
  onError?: (errorMessage: string) => void;
  onSettled?: () => void;
  throwError?: boolean;
}

export interface RemoveChannelOptions {
  onSuccess?: (data: MutateChannelResponseType) => void;
  onError?: (errorMessage: string) => void;
  onSettled?: () => void;
  throwError?: boolean;
}
