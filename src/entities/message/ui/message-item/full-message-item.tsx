import { FC } from "react";

import { format } from "date-fns";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Hint } from "@/shared/ui/hint";

import { Thumbnail } from "@/shared/ui/thumbnail";
import { BaseMessageItemProps } from "../../model/types/message-item-props.types";
import { formatFullTime } from "../../lib/utils/format-full-time.utils";

export const FullMessageItem: FC<BaseMessageItemProps> = ({ item, Renderer }) => {
  return (
    <div className="flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60 group relative transition">
      <div className="flex items-start gap-2">
        <Avatar className="rounded-full">
          <AvatarImage src={item.user?.image} />
          <AvatarFallback className="rounded-full bg-sky-500 text-white text-xs capitalize">
            {item.user.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col w-full overflow-hidden">
          <div className="text-sm">
            <button type="button" className="font-bold text-primary hover:underline transition">
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
          {item.images.length !== 0 && (
            <div className="flex gap-2 flex-wrap">
              {item.images.map((imageURL) => (
                <Thumbnail
                  src={imageURL}
                  key={imageURL}
                />
              ))}
            </div>
          )}
          {item?.updatedAt && (
            <span className="text-sm text-muted-foreground">(edited)</span>
          )}
        </div>
      </div>
    </div>
  );
};
