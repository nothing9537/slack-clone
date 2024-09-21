import { FC, memo } from "react";
import { EmojiClickData } from "emoji-picker-react";

import { Smile } from "lucide-react";

import { Button } from "../button";
import { EmojiPopover } from "../emoji-popover";
import { Hint } from "../hint";

interface EmojiProps {
  onEmojiSelect: (emojiData: EmojiClickData) => void;
  disabled: boolean;
}

export const Emoji: FC<EmojiProps> = memo(({ onEmojiSelect, disabled }) => {
  return (
    <Hint label="Emoji">
      <EmojiPopover onEmojiSelect={onEmojiSelect}>
        <Button disabled={disabled} size="iconSm" variant="ghost" type="button">
          <Smile className="size-4" />
        </Button>
      </EmojiPopover>
    </Hint>
  );
});
