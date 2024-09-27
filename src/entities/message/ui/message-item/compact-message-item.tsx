import { FC } from "react";
import { format } from "date-fns";

import { Hint } from "@/shared/ui/hint";

import { formatFullTime } from "../../lib/utils/format-full-time.utils";
import { BaseMessageItemProps } from "../../model/types/message-item-props.types";
import { ReactionsBar } from "./reactions-bar";
import { ImageThumbnails } from "./image-thumbnails";
import { ThreadBar } from "./thread-bar";

export const CompactMessageItem: FC<BaseMessageItemProps> = ({ item, Renderer, onReactionChange, currentMember, handleThread }) => {
  return (
    <div className="flex items-start gap-2">
      <Hint label={formatFullTime(new Date(item._creationTime))}>
        <button type="button" className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 w-10 leading-6 text-center hover:underline transition">
          {format(new Date(item._creationTime), "hh:mm")}
        </button>
      </Hint>
      <div className="flex flex-col w-full">
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
