import { FC } from "react";

import { format } from "date-fns";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Hint } from "@/shared/ui/hint";

import { BaseMessageItemProps } from "../../model/types/message-item-props.types";
import { formatFullTime } from "../../lib/utils/format-full-time.utils";
import { ReactionsBar } from "./reactions-bar";
import { ImageThumbnails } from "./image-thumbnails";
import { ThreadBar } from "./thread-bar";

export const FullMessageItem: FC<BaseMessageItemProps> = ({ item, Renderer, onReactionChange, currentMember, handleThread, handleMemberProfile }) => {
  return (
    <div className="flex items-start gap-2">
      <Avatar className="rounded-full cursor-pointer" onClick={handleMemberProfile}>
        <AvatarImage src={item.user?.image} />
        <AvatarFallback className="rounded-full bg-sky-500 text-white text-xs capitalize">
          {item.user.name?.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col w-full overflow-hidden">
        <div className="text-sm">
          <button type="button" className="font-bold text-primary hover:underline transition" onClick={handleMemberProfile}>
            {item.user.name}
          </button>
          <span>&nbsp;</span>
          <Hint label={formatFullTime(new Date(item._creationTime))}>
            <button type="button" className="text-sm text-muted-foreground hover:underline">
              {format(new Date(item._creationTime), "hh:mm a")}
            </button>
          </Hint>
        </div>
        <Renderer body={item.body} />
        <ImageThumbnails message={item} />
        {item?.updatedAt && (
          <span className="text-sm text-muted-foreground">(edited)</span>
        )}
        <ReactionsBar
          message={item}
          onChange={onReactionChange}
          currentMember={currentMember}
        />
        <ThreadBar item={item} onThreadOpen={handleThread} />
      </div>
    </div>
  );
};
