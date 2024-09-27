import { useParams } from "next/navigation";

import { Id } from "@convex/_generated/dataModel";

export const useMemberIdParams = () => {
  const params = useParams();

  return params.memberId as Id<"members">;
};
