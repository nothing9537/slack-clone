import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";

import { PopulatedMember } from "../../types/member.types";

export const useGetMemberById = (params: { memberId: Id<"members"> }): [PopulatedMember | undefined | null, boolean] => {
  const member = useQuery(api.members.getMemberById, params);
  const isLoading = member === undefined;

  return [member, isLoading];
};
