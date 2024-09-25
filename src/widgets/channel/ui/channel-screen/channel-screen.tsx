import { FC } from "react";
import { Loader } from "lucide-react";

import { MessagesList, SendMessageForm, useGetMessages } from "@/entities/message";
import { Channel } from "@/entities/channel";
import { Member } from "@/entities/member";
import { InfiniteLoader } from "@/shared/ui/infinite-loader";

import { ChannelHeader } from "../channel-header/channel-header";
import { ChannelHero } from "../channel-hero/channel-hero";

interface ChannelScreenProps {
  channel: NonNullable<Channel>;
  currentMember: NonNullable<Member>;
}

const InfiniteLoaderSpinner = () => {
  return (
    <div className="text-center my-2 relative">
      <hr className="absolute top-1/2 left-0 right-0 border-t border-gray-300" />
      <span className="relative inline-block bg-white px-4 py-1 rounded-full text-xs border border-gray-300 shadow-sm">
        <Loader className="size-4 animate-spin" />
      </span>
    </div>
  );
};

export const ChannelScreen: FC<ChannelScreenProps> = ({ channel, currentMember }) => {
  const [messages, status, loadMore] = useGetMessages({ channelId: channel._id });

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
      <MessagesList
        items={messages}
        currentMember={currentMember}
      >
        <InfiniteLoader
          triggerPosition="aboveChild"
          isLoadingMore={status === "LoadingMore"}
          canLoadMore={status === "CanLoadMore"}
          loadMore={loadMore}
          loader={InfiniteLoaderSpinner}
        >
          <ChannelHero channel={channel} />
        </InfiniteLoader>
      </MessagesList>
      <div className="px-5 mt-2">
        <SendMessageForm channel={channel} />
      </div>
    </div>
  );
};
