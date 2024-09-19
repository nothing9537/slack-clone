import { useQuery } from "convex/react";

import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";

import { Channel } from "../../types/channel.types";

export const useGetCurrentChannel = (params: { channelId: Id<"channels"> }): [Channel, boolean] => {
  const channel = useQuery(api.channels.getChannelById, params);
  const isLoading = channel === undefined;

  return [channel, isLoading];
};
