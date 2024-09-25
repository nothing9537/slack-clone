import { usePaginatedQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { GetMessagesResponseType } from '../../types/message-services.types';

const BATCH_SIZE = 20;

interface UseGetMessagesOptions {
  channelId?: Id<"channels">;
  conversationId?: Id<"conversations">;
  parentMessageId?: Id<"messages">;
}

type StatusType = ReturnType<typeof usePaginatedQuery>["status"];

export const useGetMessages = (options: UseGetMessagesOptions): [GetMessagesResponseType, StatusType, () => void] => {
  const { channelId, conversationId, parentMessageId } = options;

  const { results, status, loadMore } = usePaginatedQuery(
    api.messages.getMessages,
    { channelId, conversationId, parentMessageId },
    { initialNumItems: BATCH_SIZE },
  );

  return [results, status, () => loadMore(BATCH_SIZE)];
};
