import { useParams } from "next/navigation";

import { Id } from "@convex/_generated/dataModel";

export const useWorkspaceIdParams = () => {
  const params = useParams();

  return params.workspaceId as Id<"workspaces">;
};
