import { useQuery } from "convex/react";

import { api } from "@convex/_generated/api";

import { CurrentMemberParams } from "../../types/services/current-member.types";

export const useCurrentMemberIsAdmin = ({ workspaceId }: CurrentMemberParams): boolean => {
  const currentMemberIsAdmin = useQuery(api.members.wetherCurrentWorkspaceMemberAdmin, { workspaceId });

  return Boolean(currentMemberIsAdmin);
};
