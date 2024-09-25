/* eslint-disable react/destructuring-assignment */
import { FC, memo, ReactNode } from "react";
import { differenceInMinutes } from "date-fns";
import dynamic from "next/dynamic";
import { ClassValue } from "clsx";

import { cn } from "@/shared/lib/utils/cn";
import { Member } from "@/entities/member";

import { GetMessagesResponseType, Message } from "../../model/types/message-services.types";
import { MessageItem } from "../message-item/message-item";
import { formatDateLabel } from "../../lib/utils/format-date-label.utils";
import { generateGroupedMessages } from "../../lib/utils/generate-grouped-messages.utils";

type MessagesListVariant = "channel" | "thread" | "conversation";

const TIME_TOLERANCE = 5;

interface MessagesListProps {
  items: GetMessagesResponseType;
  // loadMore: () => void;
  // isLoadingMode: boolean;
  // canLoadMore: boolean;
  variant?: MessagesListVariant;
  children?: ReactNode;
  className?: ClassValue;
  currentMember: NonNullable<Member>;
}

interface RenderMessageProps {
  variant: MessagesListVariant;
  currentMember: NonNullable<Member>;
}

const Renderer = dynamic(() => import("@/shared/ui/renderer"), {
  ssr: true,
});

const renderMessage = (props: RenderMessageProps) => (item: Message, index: number, messages: GetMessagesResponseType) => {
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
      hideThreadButton={props.variant === "thread"}
      currentMember={props.currentMember}
    />
  );
};

export const MessagesList: FC<MessagesListProps> = memo((props) => {
  const {
    items,
    className,
    children = null,
    // loadMore,
    // isLoadingMode,
    // canLoadMore,
    variant = "channel",
    currentMember,
  } = props;

  const groupedMessages = generateGroupedMessages(items);

  return (
    <div className={cn("flex-1 flex flex-col-reverse pb-4 overflow-y-auto app-scrollbar", className)}>
      {Object.entries(groupedMessages || {}).map(([dateKey, messages]) => (
        <div key={dateKey}>
          <div className="text-center my-2 relative">
            <hr className="absolute top-1/2 left-0 right-0 border-t border-gray-300" />
            <span className="relative inline-block bg-white px-4 py-1 rounded-full text-xs border border-gray-300 shadow-sm">
              {formatDateLabel(dateKey)}
            </span>
          </div>
          {messages.map(renderMessage({ variant, currentMember }))}
        </div>
      ))}
      {children}
    </div>
  );
});
