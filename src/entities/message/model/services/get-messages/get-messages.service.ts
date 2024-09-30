import { usePaginatedQuery } from "convex/react";

import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";

import { GetMessagesResponseType } from "../../types/message-services.types";

const BATCH_SIZE = 10;

interface UseGetMessagesOptions {
  channelId?: Id<"channels">;
  conversationId?: Id<"conversations">;
  parentMessageId?: Id<"messages">;
  workspaceId?: Id<"workspaces">;
  threads?: boolean;
}

type StatusType = ReturnType<typeof usePaginatedQuery>["status"];

export const useGetMessages = (options: UseGetMessagesOptions): [GetMessagesResponseType, StatusType, () => void] => {
  const { results, status, loadMore } = usePaginatedQuery(
    api.messages.getMessages,
    options,
    { initialNumItems: BATCH_SIZE },
  );

  return [results, status, () => loadMore(BATCH_SIZE)];
};
