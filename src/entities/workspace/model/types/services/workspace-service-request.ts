import { Id } from "@convex/_generated/dataModel";

export interface WorkspaceRequestParams {
  id: Id<"workspaces">;
}

export interface MutateWorkspaceParams {
  name: string;
}
