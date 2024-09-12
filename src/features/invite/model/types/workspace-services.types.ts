import { Id } from "@convex/_generated/dataModel";

export type MutateWorkspaceResponseType = Id<"workspaces">;

export interface UpdateWorkspaceJoinCodeOptions {
  onSuccess?: (data: MutateWorkspaceResponseType) => void;
  onError?: (errorMessage: string) => void;
  onSettled?: () => void;
  throwError?: boolean;
}
