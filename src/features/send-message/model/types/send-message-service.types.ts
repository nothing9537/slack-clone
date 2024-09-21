import { Id } from "@convex/_generated/dataModel";
import { SendChannelMessageSchemaType } from "./send-message-schema.types";

export type CreateMessageRequestType = SendChannelMessageSchemaType;
export type CreateMessageResponseType = Id<"messages">;

export interface CreateMessageOptions {
  onSuccess?: (data: CreateMessageResponseType) => void;
  onError?: (errorMessage: string) => void;
  onSettled?: () => void;
  throwError?: boolean;
}
