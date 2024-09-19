/* eslint-disable consistent-return */
import { useCallback } from "react";
import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";

import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";

import { MutateChannelOptions, MutateChannelRequestType } from "../../types/channel-services.types";

export const useMutateChannel = (channelId: Id<"channels">, options?: MutateChannelOptions) => {
  const mutation = useMutation(api.channels.updateChannel);

  const mutate = useCallback(async (values: MutateChannelRequestType) => {
    try {
      const response = await mutation({ ...values, channelId });
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
  }, [mutation, options, channelId]);

  return mutate;
};
