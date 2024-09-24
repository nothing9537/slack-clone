import { FC } from "react";
import { format } from "date-fns";

import { Hint } from "@/shared/ui/hint";
import { Thumbnail } from "@/shared/ui/thumbnail";

import { formatFullTime } from "../../lib/utils/format-full-time.utils";
import { BaseMessageItemProps } from "../../model/types/message-item-props.types";

export const CompactMessageItem: FC<BaseMessageItemProps> = ({ item, Renderer }) => {
  return (
    <div className="flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60 group relative transition">
      <div className="flex items-start gap-2">
        <Hint label={formatFullTime(new Date(item._creationTime))}>
          <button type="button" className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 w-10 leading-6 text-center hover:underline transition">
            {format(new Date(item._creationTime), "hh:mm")}
          </button>
        </Hint>
        <div className="flex flex-col w-full">
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
