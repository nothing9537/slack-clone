/* eslint-disable consistent-return */
import { useCallback } from "react";
import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";

import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { CreateMessageOptions, CreateMessageRequestType } from "../../types/send-message-service.types";

interface UseSendMessageOptions {
  workspaceId: Id<"workspaces">;
  channelId?: Id<"channels">;
  parentMessageId?: Id<"messages">;
}

export const useSendMessage = (args: UseSendMessageOptions, options?: CreateMessageOptions) => {
  const mutation = useMutation(api.messages.createMessage);

  const mutate = useCallback(async (values: CreateMessageRequestType, images?: Id<"_storage">[]) => {
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
