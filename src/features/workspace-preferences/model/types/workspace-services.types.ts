import { Id } from "@convex/_generated/dataModel";

import { UpdateWorkspaceSchemaType } from "./mutate-workspace-schema.types";

export type MutateWorkspaceRequestType = UpdateWorkspaceSchemaType;
export type MutateWorkspaceResponseType = Id<"workspaces">;

export interface MutateWorkspaceOptions {
  onSuccess?: (data: MutateWorkspaceResponseType, args: UpdateWorkspaceSchemaType) => void;
  onError?: (errorMessage: string) => void;
  onSettled?: () => void;
  throwError?: boolean;
}

export interface RemoveWorkspaceOptions {
  onSuccess?: (data: MutateWorkspaceResponseType) => void;
  onError?: (errorMessage: string) => void;
  onSettled?: () => void;
  throwError?: boolean;
}
