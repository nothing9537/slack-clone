import { useQuery } from "convex/react";

import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";

import { Workspace } from "../../types/workspace.types";

export const useGetWorkspaceById = (params: { workspaceId: Id<"workspaces"> }): [Workspace, boolean] => {
  const workspace = useQuery(api.workspaces.getWorkspaceById, { id: params.workspaceId });
  const isLoading = workspace === undefined;

  return [workspace, isLoading];
};
