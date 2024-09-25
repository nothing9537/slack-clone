import { FC } from "react";
import { Loader } from "lucide-react";

import { MessagesList, SendMessageForm, useGetMessages } from "@/entities/message";
import { Channel } from "@/entities/channel";
import { Member } from "@/entities/member";

import { ChannelHeader } from "../channel-header/channel-header";
import { ChannelHero } from "../channel-hero/channel-hero";

interface ChannelScreenProps {
  channel: NonNullable<Channel>;
  currentMember: NonNullable<Member>;
}

export const ChannelScreen: FC<ChannelScreenProps> = ({ channel, currentMember }) => {
  const [messages, status] = useGetMessages({ channelId: channel._id });

  if (status === "LoadingFirstPage") {
    return (
      <div className="h-full flex flex-1 items-center justify-center">
        <Loader className="animate-spin size-5 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ChannelHeader channel={channel} />
      <MessagesList items={messages} currentMember={currentMember}>
        <ChannelHero channel={channel} />
      </MessagesList>
      <div className="px-5 mt-2">
        <SendMessageForm channel={channel} />
      </div>
    </div>
  );
};
