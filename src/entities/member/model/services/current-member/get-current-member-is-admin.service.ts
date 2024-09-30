import { useQuery } from "convex/react";

import { api } from "@convex/_generated/api";

import { Id } from "@convex/_generated/dataModel";

export const useCurrentMemberIsAdmin = (params: { workspaceId: Id<"workspaces"> }): [boolean, boolean] => {
  const currentMemberIsAdmin = useQuery(api.members.wetherCurrentWorkspaceMemberAdmin, params);
  const isLoading = currentMemberIsAdmin === undefined;

  return [Boolean(currentMemberIsAdmin), isLoading];
};
