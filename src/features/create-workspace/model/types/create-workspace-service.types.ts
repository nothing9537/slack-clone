import { Id } from "@convex/_generated/dataModel";

import { CreateWorkspaceSchemaType } from "./create-workspace-schema.types";

export type CreateWorkspaceRequestType = CreateWorkspaceSchemaType;
export type CreateWorkspaceResponseType = Id<"workspaces">;

export interface CreateWorkspaceOptions {
  onSuccess?: (data: CreateWorkspaceResponseType, args: CreateWorkspaceSchemaType) => void;
  onError?: (errorMessage: string) => void;
  onSettled?: () => void;
  throwError?: boolean;
}
