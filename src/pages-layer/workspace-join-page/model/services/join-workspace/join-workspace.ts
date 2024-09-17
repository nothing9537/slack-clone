/* eslint-disable consistent-return */
import { useCallback } from "react";
import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";

import { api } from "@convex/_generated/api";
import { JoinWorkspaceOptions, JoinWorkspaceRequestType } from "../../types/join-workspace-service.types";

export const useJoinWorkspace = (options?: JoinWorkspaceOptions) => {
  const mutation = useMutation(api.workspaces.joinWorkspace);

  const mutate = useCallback(async (values: JoinWorkspaceRequestType) => {
    try {
      const response = await mutation({ joinCode: values.pin });
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
  }, [mutation, options]);

  return mutate;
};
