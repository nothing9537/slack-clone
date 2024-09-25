import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { Message } from "../../types/message-services.types";

export const useGetMessageById = ({ messageId }: { messageId: Id<"messages"> }): [Message | undefined | null, boolean] => {
  const message = useQuery(api.messages.getMessageById, { messageId });
  const isLoading = message === undefined;

  return [message, isLoading];
};
