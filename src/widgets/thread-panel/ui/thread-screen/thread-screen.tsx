import { FC } from "react";
import dynamic from "next/dynamic";
import { Loader, TriangleAlert } from "lucide-react";

import { Message, MessageItem, MessagesList, useGetMessages } from "@/entities/message";
import { Member } from "@/entities/member";
import { useGetCurrentChannel } from "@/entities/channel";
import { InfiniteLoader } from "@/shared/ui/infinite-loader";
import { MessagesInfiniteLoader } from "@/shared/ui/messages-loader";
import { cn } from "@/shared/lib/utils/cn";
import { Id } from "@convex/_generated/dataModel";

import { ThreadReplyForm } from "../thread-reply-form/thread-reply-form";
import { ThreadHero } from "../thread-hero/thread-hero";

interface ThreadScreenProps {
  message: NonNullable<Message>;
  currentMember: NonNullable<Member>;
  currentChannelId: Id<"channels">;
}

const Renderer = dynamic(() => import("@/shared/ui/renderer"), {
  ssr: true,
});

export const ThreadScreen: FC<ThreadScreenProps> = ({ message, currentMember, currentChannelId }) => {
  const [repliedMessages, status, loadMore] = useGetMessages({ channelId: message.channelId, parentMessageId: message._id });
  const [currentChannel, isCurrentChannelLoading] = useGetCurrentChannel({ channelId: currentChannelId });

  if (status === "LoadingFirstPage" || isCurrentChannelLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!currentChannel) {
    return (
      <div className="flex h-full items-center justify-center flex-col gap-y-2">
        <TriangleAlert className="size-5 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Channel not found.</p>
      </div>
    );
  }

  return (
    <div className={cn("h-full flex flex-col gap-y-2")}>
      <MessageItem
        item={message}
        currentMember={currentMember}
        hideThreadButton
        isCompact={false}
        Renderer={Renderer}
      />
      <MessagesList
        items={repliedMessages}
        currentMember={currentMember}
        variant="thread"
        className="justify-self-start"
      >
        <InfiniteLoader
          triggerPosition="aboveChild"
          isLoadingMore={status === "LoadingMore"}
          canLoadMore={status === "CanLoadMore"}
          loadMore={loadMore}
          loader={MessagesInfiniteLoader}
        >
          <ThreadHero parentMessage={message} />
        </InfiniteLoader>
      </MessagesList>
      <ThreadReplyForm
        threadMessage={message}
        currentChannel={currentChannel}
        className="mt-auto"
      />
    </div>
  );
};
