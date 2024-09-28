import { useQueryState, UseQueryStateReturn } from "nuqs";
import { Id } from "@convex/_generated/dataModel";

export const useProfileMemberId = () => {
  return useQueryState("profileMemberId") as UseQueryStateReturn<Id<"members">, undefined>;
};
