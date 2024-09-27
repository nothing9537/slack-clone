import { FC } from "react";
import { ChevronRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";

import { Message } from "../../model/types/message-services.types";

interface ThreadBarProps {
  item: NonNullable<Message>;
  onThreadOpen: () => void;
}

export const ThreadBar: FC<ThreadBarProps> = ({ item, onThreadOpen }) => {
  const { threadCount, threadLastMessageImage, threadLastMessageTimestamp, threadLastMessageUserName } = item;

  if (!threadCount || !threadLastMessageTimestamp) {
    return null;
  }

  return (
    <button
      className="p-1 rounded-md hover:bg-white border border-transparent hover:border-border flex items-center justify-start group/thread-bar transition max-w-xl"
      type="button"
      onClick={onThreadOpen}
    >
      <div className="flex items-center gap-2 overflow-hidden">
        <Avatar className="size-6 shrink-0">
          <AvatarImage src={threadLastMessageImage} />
          <AvatarFallback>{threadLastMessageUserName?.charAt(0) || "M"}</AvatarFallback>
        </Avatar>
        <span className="text-xs text-sky-700 hover:underline font-bold truncate">
          {threadCount}
          {" "}
          {threadCount > 1 ? "replies" : "reply"}
        </span>
        <span className="text-xs text-muted-foreground truncate group-hover/thread-bar:opacity-0 group-hover/thread-bar:w-0 opacity-100 max-w-fit w-full transition-all">
          Last reply
          {" "}
          {formatDistanceToNow(new Date(threadLastMessageTimestamp), { addSuffix: true })}
        </span>
        <span className="text-xs text-muted-foreground truncate group-hover/thread-bar:opacity-100 opacity-0 transition-all">
          View thread
        </span>
      </div>
      <ChevronRight className="size-4 text-muted-foreground ml-auto opacity-0 group-hover/thread-bar:opacity-100 transition shrink-0" />
    </button>
  );
};
