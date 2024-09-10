/* eslint-disable consistent-return */
import { useCallback } from "react";
import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";

import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";

import { MutateWorkspaceOptions, MutateWorkspaceRequestType } from "../../types/workspace-services.types";

export const useMutateWorkspace = (workspaceId: Id<"workspaces">, options?: MutateWorkspaceOptions) => {
  const mutation = useMutation(api.workspaces.updateWorkspace);

  const mutate = useCallback(async (values: MutateWorkspaceRequestType) => {
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
