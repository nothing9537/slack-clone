import { useQuery } from "convex/react";

import { api } from "@convex/_generated/api";

import { CurrentMemberParams } from "../../types/services/current-member.types";
import { Member } from "../../types/member.types";

export const useCurrentMember = ({ workspaceId }: CurrentMemberParams): [Member, boolean] => {
  const currentMember = useQuery(api.members.getCurrentMember, { workspaceId });
  const isLoading = currentMember === undefined;

  return [currentMember, isLoading];
};
