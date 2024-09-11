/* eslint-disable consistent-return */
import { useCallback } from "react";
import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";

import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";

import { CreateChannelOptions, CreateChannelRequestType } from "../../types/create-channel-service.types";

export const useCreateChannel = (workspaceId: Id<"workspaces">, options?: CreateChannelOptions) => {
  const mutation = useMutation(api.channels.createChannel);

  const mutate = useCallback(async (values: CreateChannelRequestType) => {
    try {
      const response = await mutation({ ...values, workspaceId });
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
  }, [mutation, options, workspaceId]);

  return mutate;
};
