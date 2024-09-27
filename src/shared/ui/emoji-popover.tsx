import { FC, memo, ReactNode, useCallback, useState } from "react";
import { EmojiClickData, Theme } from "emoji-picker-react";
import dynamic from "next/dynamic";
import { Loader } from "lucide-react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface EmojiPopoverProps {
  children: ReactNode;
  hint?: string;
  onEmojiClick?: (emojiData: EmojiClickData) => void;
  onReactionClick?: (emojiData: EmojiClickData) => void;
  isReactionPicker?: boolean;
  closeOnSelect?: boolean;
}

const EmojiPicker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
  loading: () => (
    <Loader className="size-5 animate-spin" />
  ),
});

export const EmojiPopover: FC<EmojiPopoverProps> = memo(({
  children,
  hint = "Emoji",
  onEmojiClick,
  onReactionClick,
  isReactionPicker = false,
  closeOnSelect = false,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const onEmojiSelect = useCallback((event: EmojiClickData) => {
    onEmojiClick?.(event);

    if (closeOnSelect) {
      setIsPopoverOpen(false);
    }

    setTimeout(() => {
      setIsTooltipOpen(false);
    }, 500);
  }, [onEmojiClick, closeOnSelect]);

  const onReactionSelect = useCallback((event: EmojiClickData) => {
    onReactionClick?.(event);

    if (closeOnSelect) {
      setIsPopoverOpen(false);
    }

    setTimeout(() => {
      setIsTooltipOpen(false);
    }, 500);
  }, [onReactionClick, closeOnSelect]);

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
            lazyLoadEmojis
            theme={Theme.LIGHT}
            onEmojiClick={onEmojiSelect}
            onReactionClick={onReactionSelect}
            reactionsDefaultOpen={isReactionPicker}
          />
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
});
