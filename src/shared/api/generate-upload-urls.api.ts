/* eslint-disable consistent-return */
import { useCallback } from "react";
import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";

import { api } from "@convex/_generated/api";
import { MutationServiceOptions } from "../types";

export const useGenerateUploadURLs = (options?: MutationServiceOptions<string[], void>) => {
  const mutation = useMutation(api.upload.generateUploadUrls);

  const mutate = useCallback(async (count: number) => {
    try {
      const response = await mutation({ count });
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
  }, [mutation, options]);

  return mutate;
};
