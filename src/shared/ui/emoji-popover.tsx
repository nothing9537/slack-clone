import { FC, memo, ReactNode, useCallback, useState } from "react";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface EmojiPopoverProps {
  children: ReactNode;
  hint?: string;
  onEmojiSelect: (emojiData: EmojiClickData) => void;
}

export const EmojiPopover: FC<EmojiPopoverProps> = memo(({ children, hint = "Emoji", onEmojiSelect }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const onEmoji = useCallback((event: EmojiClickData) => {
    onEmojiSelect(event);

    setTimeout(() => {
      setIsTooltipOpen(false);
    }, 500);
  }, [onEmojiSelect]);

  return (
    <TooltipProvider>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen} delayDuration={50}>
          <PopoverTrigger asChild>
            <TooltipTrigger asChild>
              {children}
            </TooltipTrigger>
          </PopoverTrigger>
          <TooltipContent className="bg-black text-white border border-white/5">
            <p className="font-medium text-xs">{hint}</p>
          </TooltipContent>
        </Tooltip>
        <PopoverContent className="p-0 w-full border-none shadow-none">
          <EmojiPicker
            theme={Theme.LIGHT}
            onEmojiClick={onEmoji}
          />
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
});
