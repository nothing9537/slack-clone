/* eslint-disable consistent-return */
import { useCallback } from "react";
import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";

import { EmojiClickData } from "emoji-picker-react";
import { MutationServiceOptions } from "@/shared/types";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";

import { MutateReactionResponseType } from "../../types/message-services.types";

type UseToggleReactionValues = Pick<EmojiClickData, "emoji" | "unified">;

export const useToggleReaction = (messageId: Id<"messages">, options?: MutationServiceOptions<MutateReactionResponseType, UseToggleReactionValues>) => {
  const mutation = useMutation(api.reactions.toggleReaction);

  const mutate = useCallback(async (values: UseToggleReactionValues) => {
    try {
      const response = await mutation({ messageId, native: values.emoji, unified: values.unified });
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
