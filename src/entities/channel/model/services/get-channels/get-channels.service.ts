import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";

import { Channels } from "../../types/channel.types";

export const useGetChannels = ({ workspaceId }: { workspaceId: Id<"workspaces"> }): [Channels, boolean] => {
  const channels = useQuery(api.channels.getChannels, { workspaceId });
  const isLoading = channels === undefined;

  return [channels, isLoading];
};
