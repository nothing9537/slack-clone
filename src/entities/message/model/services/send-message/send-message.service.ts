/* eslint-disable consistent-return */
import { useCallback } from "react";
import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";

// eslint-disable-next-line import/no-cycle
import { MutationServiceOptions } from "@/shared/types";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";

import { MutateMessageResponseType } from "../../types/message-services.types";
import { SendMessageSchemaType } from "../../types/message-schemas.types";

interface UseSendMessageOptions {
  workspaceId: Id<"workspaces">;
  channelId?: Id<"channels">;
  parentMessageId?: Id<"messages">;
  conversationId?: Id<"conversations">;
}

export const useSendMessage = (args: UseSendMessageOptions, options?: MutationServiceOptions<MutateMessageResponseType, SendMessageSchemaType>) => {
  const mutation = useMutation(api.messages.createMessage);

  const mutate = useCallback(async (values: SendMessageSchemaType, images?: Id<"_storage">[]) => {
    const { body } = values;

    try {
      const response = await mutation({ body, images, ...args });
      options?.onSuccess?.(response);

      return response;
    } catch (error) {
      const errorMessage = error instanceof ConvexError ? (error.data.message as string) : "Unexpected error ocurred.";

      options?.onError?.(errorMessage);

      if (options?.throwError) {
        throw error;
      }
    } finally {
      options?.onSettled?.();
    }
  }, [mutation, options, args]);

  return mutate;
};
