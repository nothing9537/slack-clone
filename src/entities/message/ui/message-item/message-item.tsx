import { ComponentType, FC } from "react";

import { RendererProps } from "@/shared/ui/renderer";
import { Id } from "@convex/_generated/dataModel";

import { Message } from "../../model/types/get-messages-service.types";
import { CompactMessageItem } from "./compact-message-item";
import { FullMessageItem } from "./full-message-item";

interface MessageItemProps {
  item: Message;
  isEditing?: boolean;
  setEditingId?: (id: Id<"messages"> | null) => void;
  isCompact?: boolean;
  hideThreadButton?: boolean;
  Renderer: ComponentType<RendererProps>;
}

export const MessageItem: FC<MessageItemProps> = ({ item, isCompact, Renderer }) => {
  let Element: JSX.Element;

  if (isCompact) {
    Element = <CompactMessageItem item={item} Renderer={Renderer} />;
  } else {
    Element = <FullMessageItem item={item} Renderer={Renderer} />;
  }

  return Element;
};
