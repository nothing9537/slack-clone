import { FC } from "react";
import dynamic from "next/dynamic";
import { Loader } from "lucide-react";

import { Message, MessageItem, MessagesList, useGetMessages } from "@/entities/message";
import { Member } from "@/entities/member";
import { Channel } from "@/entities/channel";
import { InfiniteLoader } from "@/shared/ui/infinite-loader";
import { MessagesInfiniteLoader } from "@/shared/ui/messages-loader";
import { cn } from "@/shared/lib/utils/cn";

import { ThreadReplyForm } from "../thread-reply-form/thread-reply-form";
import { ThreadHero } from "../thread-hero/thread-hero";

interface ThreadScreenProps {
  message: NonNullable<Message>;
  currentMember: NonNullable<Member>;
  currentChannel: NonNullable<Channel>;
}

const Renderer = dynamic(() => import("@/shared/ui/renderer"), {
  ssr: true,
});

export const ThreadScreen: FC<ThreadScreenProps> = ({ message, currentMember, currentChannel }) => {
  const [repliedMessages, status, loadMore] = useGetMessages({ channelId: message.channelId, parentMessageId: message._id });

  if (status === "LoadingFirstPage") {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader className="size-5 animate-spin text-muted-foreground" />
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
