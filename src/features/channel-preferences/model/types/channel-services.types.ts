import { Doc, Id } from "@convex/_generated/dataModel";

import { UpdateChannelSchemaType } from "./mutate-channel-schema.types";

export type MutateChannelRequestType = UpdateChannelSchemaType;
export type MutateChannelResponseType = Id<"channels">;
export type DeleteChannelResponseType = Doc<"channels">;

export interface MutateChannelOptions {
  onSuccess?: (data: MutateChannelResponseType, args: UpdateChannelSchemaType) => void;
  onError?: (errorMessage: string) => void;
  onSettled?: () => void;
  throwError?: boolean;
}

export interface RemoveChannelOptions {
  onSuccess?: (data: DeleteChannelResponseType) => void;
  onError?: (errorMessage: string) => void;
  onSettled?: () => void;
  throwError?: boolean;
}
