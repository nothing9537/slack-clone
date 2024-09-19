/* eslint-disable consistent-return */
import { useCallback } from "react";
import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";

import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";

import { RemoveChannelOptions } from "../../types/channel-services.types";

export const useRemoveChannel = (channelId: Id<"channels">, options?: RemoveChannelOptions) => {
  const mutation = useMutation(api.channels.deleteChannel);

  const mutate = useCallback(async () => {
    try {
      const response = await mutation({ channelId });
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
  }, [mutation, options, channelId]);

  return mutate;
};
