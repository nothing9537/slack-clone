/* eslint-disable consistent-return */
import { useCallback } from "react";
import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";

import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";

import { UpdateWorkspaceJoinCodeOptions } from "../../types/workspace-services.types";

export const useUpdateWorkspaceJoinCode = (workspaceId: Id<"workspaces">, options?: UpdateWorkspaceJoinCodeOptions) => {
  const mutation = useMutation(api.workspaces.updateJoinCode);

  const mutate = useCallback(async () => {
    try {
      const response = await mutation({ workspaceId });
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
  }, [mutation, options, workspaceId]);

  return mutate;
};
