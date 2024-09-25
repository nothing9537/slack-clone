import { useCallback } from "react";
import { EmojiClickData } from "emoji-picker-react";
import { toast } from "sonner";

import { useToggleReaction } from "../../model/services/toggle-reaction/toggle-reaction.service";
import { Message } from "../../model/types/message-services.types";

type EmojiClickEvent = Pick<EmojiClickData, "emoji" | "unified">;

export const useHandleToggleReaction = (message: NonNullable<Message>) => {
  const toggleReaction = useToggleReaction(message._id, {
    onError: (errorMessage) => {
      toast.error("Reaction action.", {
        description: errorMessage,
      });
    },
  });

  const handler = useCallback((emojiEvent: EmojiClickEvent) => {
    return toggleReaction(emojiEvent);
  }, [toggleReaction]);

  return handler;
};
