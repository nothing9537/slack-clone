import { useCallback } from "react";
import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";

import { api } from "@convex/_generated/api";

import { CreateWorkspaceOptions, CreateWorkspaceRequestType } from "../../types/create-workspace-service.types";

export const useCreateWorkspace = (options?: CreateWorkspaceOptions) => {
  const mutation = useMutation(api.workspaces.createWorkspace);

  // eslint-disable-next-line consistent-return
  const mutate = useCallback(async (values: CreateWorkspaceRequestType) => {
    try {
      const response = await mutation(values);
      options?.onSuccess?.(response, values.name);

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
