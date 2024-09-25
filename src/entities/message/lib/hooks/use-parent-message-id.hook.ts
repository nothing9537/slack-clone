import { useQueryState, UseQueryStateReturn } from "nuqs";
import { Id } from "@convex/_generated/dataModel";

export const useParentMessageId = () => {
  return useQueryState("parentMessageId") as UseQueryStateReturn<Id<"messages">, undefined>;
};
