import { FC } from "react";
import { Emoji } from "emoji-picker-react";

import { MdOutlineAddReaction } from "react-icons/md";
import { Member } from "@/entities/member";
import { cn } from "@/shared/lib/utils/cn";
import { Hint } from "@/shared/ui/hint";
import { EmojiPopover } from "@/shared/ui/emoji-popover";

import { Message, Reaction } from "../../model/types/message-services.types";
import { useHandleToggleReaction } from "../../lib/hooks/use-toggle-reaction.hook";

interface ReactionsBarProps {
  message: NonNullable<Message>;
  onChange: ReturnType<typeof useHandleToggleReaction>;
  currentMember: NonNullable<Member>;
}

const HintLabel: FC<{ reaction: Reaction }> = ({ reaction }) => {
  const text = `${reaction.count} ${reaction.count === 1 ? "person" : "people"} reacted with`;

  return (
    <span className="flex items-center gap-x-1">
      {text}
      {" "}
      <Emoji lazyLoad unified={reaction.unified} size={16} />
    </span>
  );
};

export const ReactionsBar: FC<ReactionsBarProps> = ({ message, onChange, currentMember }) => {
  const { reactions } = message;

  if (reactions.length <= 0) {
    return null;
  }

  return (
    <div className="flex items-center justify-start gap-2 flex-wrap my-1">
      {reactions.map((r) => {
        const isAddedByCurrentMember = r.memberIds.includes(currentMember._id);

        return (
          <Hint label={<HintLabel reaction={r} />} key={r._id}>
            <button
              onClick={() => onChange({ unified: r.unified, emoji: r.native })}
              type="button"
              className={cn(
                "h-6 px-2 rounded-full bg-slate-200/70 border border-transparent text-slate-800 flex items-center gap-x-1",
                isAddedByCurrentMember && "bg-blue-100/70 border-blue-500",
              )}
            >
              <Emoji lazyLoad unified={r.unified} size={16} />
              <span className={cn("text-xs font-semibold text-muted-foreground", isAddedByCurrentMember && "text-blue-500")}>
                {r.count}
              </span>
            </button>
          </Hint>
        );
      })}
      <EmojiPopover hint="Add reaction" onEmojiClick={onChange} isReactionPicker onReactionClick={onChange}>
        <button type="button" className="h-7 px-3 rounded-full bg-slate-200/70 border border-transparent hover:border-slate-500 text-slate-800 flex items-center gap-x-1 transition-colors">
          <MdOutlineAddReaction className="size-4" />
        </button>
      </EmojiPopover>
    </div>
  );
};
