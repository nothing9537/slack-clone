import { useQuery } from "convex/react";

import { api } from "@convex/_generated/api";

import { GetWorkspaceByIdParams } from "../../types/services/get-workspace-by-id.types";
import { Workspace } from "../../types/workspace.types";

export const useGetWorkspaceById = ({ id }: GetWorkspaceByIdParams): [Workspace, boolean] => {
  const workspace = useQuery(api.workspaces.getWorkspaceById, { id });
  const isLoading = workspace === undefined;

  return [workspace, isLoading];
};
