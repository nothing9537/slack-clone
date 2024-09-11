import { FC } from "react";
import { HashIcon, Loader } from "lucide-react";

import { Id } from "@convex/_generated/dataModel";

import { Channel, Channels } from "../../model/types/channel.types";
import { ChannelItem } from "../channel-item/channel-item";

interface ChannelsListProps {
  items: Channels;
  isLoading: boolean;
  workspaceId: Id<"workspaces">;
}

const renderChannel = (workspaceId: Id<"workspaces">) => ({ _id, name }: NonNullable<Channel>) => (
  <ChannelItem
    key={_id}
    label={name}
    Icon={HashIcon}
    id={_id}
    workspaceId={workspaceId}
  />
);

export const ChannelsList: FC<ChannelsListProps> = ({ items: channels, isLoading, workspaceId }) => {
  if (isLoading) {
    return (
      <Loader className="size-4 animate-spin" />
    );
  }

  return (
    <div className="flex flex-col gap-1">
      {channels!.map(renderChannel(workspaceId))}
    </div>
  );
};
