import { FC } from "react";

import { SendChannelMessageForm } from "@/features/send-channel-message";
import { Channel } from "@/entities/channel";

import { ChannelHeader } from "../channel-header/channel-header";

interface ChannelScreenProps {
  channel: NonNullable<Channel>;
}

export const ChannelScreen: FC<ChannelScreenProps> = ({ channel }) => {
  return (
    <div className="flex flex-col h-full">
      <ChannelHeader channel={channel} />
      <div className="flex-1" />
      <div className="px-5">
        <SendChannelMessageForm channel={channel} />
      </div>
    </div>
  );
};