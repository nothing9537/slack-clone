import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";

import { PopulatedMembers } from "../../types/member.types";

export const useGetMembers = (params: { workspaceId: Id<"workspaces"> }): [PopulatedMembers, boolean] => {
  const members = useQuery(api.members.getWorkspaceMembers, params);
  const isLoading = members === undefined;

  return [members, isLoading] as const;
};
