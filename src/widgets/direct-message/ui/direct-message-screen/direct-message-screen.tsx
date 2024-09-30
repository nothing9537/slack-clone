import { FC } from "react";

import { MessagesList, useGetMessages } from "@/entities/message";
import { GetOrCreateConversationResponseType } from "@/entities/conversation";
import { Member, PopulatedMember } from "@/entities/member";
import { InfiniteLoader } from "@/shared/ui/infinite-loader";

import { DirectMessageHero } from "../direct-message-hero/direct-message-hero";

interface DirectMessageScreenProps {
  conversation: NonNullable<GetOrCreateConversationResponseType>;
  currentMember: NonNullable<Member>;
  otherMember: NonNullable<PopulatedMember>;
  getMessagesReturn: ReturnType<typeof useGetMessages>;
}

export const DirectMessageScreen: FC<DirectMessageScreenProps> = ({ conversation, currentMember, otherMember, getMessagesReturn }) => {
  const [messages, status, loadMore] = getMessagesReturn;

  return (
    <MessagesList
      items={messages}
      currentMember={currentMember}
      variant="conversation"
    >
      <InfiniteLoader loadMore={loadMore} canLoadMore={status === "CanLoadMore"} isLoadingMore={status === "LoadingMore"}>
        <DirectMessageHero
          conversation={conversation}
          otherMember={otherMember}
        />
      </InfiniteLoader>
    </MessagesList>
  );
};
