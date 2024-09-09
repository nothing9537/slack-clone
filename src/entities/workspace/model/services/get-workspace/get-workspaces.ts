import { useQuery } from "convex/react";

import { api } from "@convex/_generated/api";

export const useGetWorkspaces = () => {
  const workspaces = useQuery(api.workspaces.getWorkspaces);
  const isLoading = workspaces === undefined;

  return { workspaces, isLoading };
};
