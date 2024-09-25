/* eslint-disable consistent-return */
import { useCallback } from "react";
import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";

import { MutationServiceOptions } from "@/shared/types";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";

import { MutateMessageResponseType } from "../../types/message-services.types";

export const useHandleDeleteMessage = (messageId: Id<"messages">, options?: MutationServiceOptions<MutateMessageResponseType>) => {
  const mutation = useMutation(api.messages.deleteMessage);

  const mutate = useCallback(async () => {
    try {
      const response = await mutation({ messageId });
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
  }, [mutation, options, messageId]);

  return mutate;
};
