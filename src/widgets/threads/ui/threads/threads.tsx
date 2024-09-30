import { FC } from "react";

import { GetMessagesResponseType, MessagesList, useGetMessages } from "@/entities/message";
import { Member } from "@/entities/member";
import { InfiniteLoader } from "@/shared/ui/infinite-loader";
import { MessagesInfiniteLoader } from "@/shared/ui/messages-loader";

import { ThreadsHeader } from "../threads-header/threads-header";
import { ThreadsHero } from "../threads-hero/threads-hero";

interface ThreadsProps {
  threads: GetMessagesResponseType;
  status: ReturnType<typeof useGetMessages>[1];
  loadMore: () => void;
  currentMember: NonNullable<Member>;
}

export const Threads: FC<ThreadsProps> = ({ threads, status, loadMore, currentMember }) => {
  return (
    <div className="flex flex-col gap-y-2">
      <ThreadsHeader />
      <MessagesList
        items={threads}
        currentMember={currentMember}
        variant="thread"
      >
        <InfiniteLoader
          canLoadMore={status === "CanLoadMore"}
          isLoadingMore={status === "LoadingMore"}
          loadMore={loadMore}
          loader={MessagesInfiniteLoader}
        >
          <ThreadsHero />
        </InfiniteLoader>
      </MessagesList>
    </div>
  );
};
