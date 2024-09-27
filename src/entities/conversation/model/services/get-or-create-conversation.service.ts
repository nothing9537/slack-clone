/* eslint-disable consistent-return */
import { useCallback } from "react";
import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";

import { MutationServiceOptions } from "@/shared/types";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";

import { GetOrCreateConversationResponseType } from "../types/get-or-create-conversation-service.types";

interface UseGetOrCreateConversationOptions {
  workspaceId: Id<"workspaces">;
  memberId: Id<"members">;
}

export const useGetOrCreateConversation = (
  args: UseGetOrCreateConversationOptions,
  options?: MutationServiceOptions<GetOrCreateConversationResponseType>,
) => {
  const mutation = useMutation(api.conversations.createOrGet);

  const mutate = useCallback(async () => {
    try {
      const response = await mutation(args);
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
