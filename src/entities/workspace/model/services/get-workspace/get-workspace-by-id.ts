import { useQuery } from "convex/react";

import { api } from "@convex/_generated/api";

import { WorkspaceRequestParams } from "../../types/services/workspace-service-request";
import { Workspace } from "../../types/workspace.types";

export const useGetWorkspaceById = ({ id }: WorkspaceRequestParams): [Workspace, boolean] => {
  const workspace = useQuery(api.workspaces.getWorkspaceById, { id });
  const isLoading = workspace === undefined;

  return [workspace, isLoading];
};
