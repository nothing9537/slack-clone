/* eslint-disable no-param-reassign */
/* eslint-disable react/destructuring-assignment */
import { FC, ReactNode } from "react";
import { differenceInMinutes, format } from "date-fns";
import dynamic from "next/dynamic";
import { ClassValue } from "clsx";

import { cn } from "@/shared/lib/utils/cn";

import { GetMessagesResponseType, Message } from "../../model/types/get-messages-service.types";
import { MessageItem } from "../message-item/message-item";
import { formatDateLabel } from "../../lib/utils/format-date-label.utils";

// type MessagesListVariant = "channel" | "thread" | "conversation";
type GroupedMessagesType = Record<string, GetMessagesResponseType>;

const TIME_TOLERANCE = 5;

interface MessagesListProps {
  items: GetMessagesResponseType;
  // loadMore: () => void;
  isCompact?: boolean
  // isLoadingMode: boolean;
  // canLoadMore: boolean;
  // variant?: MessagesListVariant;
  // memberName?: string;
  // memberImage?: string;
  // channelName?: string;
  // channelCreationTime?: number;
  children?: ReactNode;
  className?: ClassValue;
}

const Renderer = dynamic(() => import("@/shared/ui/renderer"), {
  ssr: true,
});

const renderMessage = (item: Message, index: number, messages: GetMessagesResponseType) => {
  const prevMessage = messages[index - 1];
  const isCompact = prevMessage
    && prevMessage?.user?._id === item.user?._id
    && differenceInMinutes(new Date(item._creationTime), new Date(prevMessage._creationTime)) < TIME_TOLERANCE;

  return (
    <MessageItem
      key={item._id}
      item={item}
      isCompact={isCompact}
      Renderer={Renderer}
    />
  );
};

export const MessagesList: FC<MessagesListProps> = (props) => {
  const {
    items,
    className,
    children = null,
    // isCompact = true,
    // loadMore,
    // isLoadingMode,
    // canLoadMore,
    // variant = "channel",
    // memberImage,
    // memberName,
    // channelCreationTime,
    // channelName,
  } = props;

  const groupedMessages = items.reduce((groups, message) => {
    const date = new Date(message._creationTime);
    const dateKey = format(date, "yyyy-MM-dd");

    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }

    groups[dateKey].unshift(message);

    return groups;
  }, {} as (GroupedMessagesType));

  return (
    <div className={cn("flex-1 flex flex-col-reverse pb-4 overflow-y-auto app-scrollbar", className)}>
      {Object.entries(groupedMessages || {} as GroupedMessagesType).map(([dateKey, messages]) => (
        <div key={dateKey}>
          <div className="text-center my-2 relative">
            <hr className="absolute top-1/2 left-0 right-0 border-t border-gray-300" />
            <span className="relative inline-block bg-white px-4 py-1 rounded-full text-xs border border-gray-300 shadow-sm">
              {formatDateLabel(dateKey)}
            </span>
          </div>
          {messages.map(renderMessage)}
        </div>
      ))}
      {children}
    </div>
  );
};
