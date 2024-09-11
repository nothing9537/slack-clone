import { useQuery } from "convex/react";

import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";

import { Member } from "../../types/member.types";

export const useCurrentMember = (params: { workspaceId: Id<"workspaces"> }): [Member, boolean] => {
  const currentMember = useQuery(api.members.getCurrentMember, params);
  const isLoading = currentMember === undefined;

  return [currentMember, isLoading];
};
