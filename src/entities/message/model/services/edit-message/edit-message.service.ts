/* eslint-disable consistent-return */
import { useCallback } from "react";
import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";

import { MutationServiceOptions } from "@/shared/types";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";

import { MutateMessageResponseType } from "../../types/message-services.types";
import { UpdateMessageSchemaType } from "../../types/message-schemas.types";

export const useUpdateMessage = (messageId: Id<"messages">, options?: MutationServiceOptions<MutateMessageResponseType, UpdateMessageSchemaType>) => {
  const mutation = useMutation(api.messages.updateMessage);

  const mutate = useCallback(async (values: UpdateMessageSchemaType, images: Id<"_storage">[]) => {
    const { body } = values;

    try {
      const response = await mutation({ body, messageId, images });
      options?.onSuccess?.(response, values);

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
