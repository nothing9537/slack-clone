import { useQuery } from "convex/react";

import { api } from "@convex/_generated/api";
import { Workspaces } from "../../types/workspace.types";

export const useGetWorkspaces = (): [Workspaces, boolean] => {
  const workspaces = useQuery(api.workspaces.getWorkspaces);
  const isLoading = workspaces === undefined;

  return [workspaces, isLoading];
};
