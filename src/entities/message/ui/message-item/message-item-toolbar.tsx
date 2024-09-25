import { FC, MouseEvent } from "react";
import { MessageSquareText, Pencil, Smile, Trash } from "lucide-react";
import { EmojiClickData } from "emoji-picker-react";

import { Button } from "@/shared/ui/button";
import { Hint } from "@/shared/ui/hint";
import { EmojiPopover } from "@/shared/ui/emoji-popover";

export interface MessageItemToolbarProps {
  isAuthor: boolean;
  handleThread: () => void;
  handleDelete: () => void;
  handleReaction: (reaction: EmojiClickData) => void;
  setIsEditing: (e: MouseEvent<HTMLButtonElement>) => void;
  hideThreadButton: boolean;
}

export const MessageItemToolbar: FC<MessageItemToolbarProps> = ({
  isAuthor,
  handleReaction,
  handleThread,
  handleDelete,
  setIsEditing,
  hideThreadButton,
}) => {
  return (
    <div className="absolute top-0 right-4">
      <div className="transition-opacity group group-hover:opacity-100 opacity-0 border bg-white rounded-md shadow-sm">
        <EmojiPopover isReactionPicker hint="Add reaction" closeOnSelect onEmojiClick={handleReaction} onReactionClick={handleReaction}>
          <Button variant="ghost" size="iconSm">
            <Smile className="size-4" />
          </Button>
        </EmojiPopover>
        {!hideThreadButton && (
          <Hint label="Reply in thread">
            <Button variant="ghost" size="iconSm" onClick={handleThread}>
              <MessageSquareText className="size-4" />
            </Button>
          </Hint>
        )}
        {isAuthor && (
          <>
            <Hint label="Edit message">
              <Button variant="ghost" size="iconSm" onClick={setIsEditing}>
                <Pencil className="size-4" />
              </Button>
            </Hint>
            <Hint label="Delete message">
              <Button variant="ghost" size="iconSm" onClick={handleDelete}>
                <Trash className="size-4" />
              </Button>
            </Hint>
          </>
        )}
      </div>
    </div>
  );
};
