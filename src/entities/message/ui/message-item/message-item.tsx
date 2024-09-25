import { ComponentType, FC, memo, MouseEvent, useCallback, useMemo } from "react";

import { RendererProps } from "@/shared/ui/renderer";
import { Member } from "@/entities/member";
import { useToggle } from "@/shared/lib/hooks/use-toggle";
import { cn } from "@/shared/lib/utils/cn";

import { Message } from "../../model/types/message-services.types";
import { useParseUrlImages } from "../../lib/hooks/use-parse-url-images.hook";
import { UpdateMessageForm } from "../update-message-form/update-message-form";
import { useHandleDeleteMessage } from "../../lib/hooks/use-delete-message.hook";
import { useHandleToggleReaction } from "../../lib/hooks/use-toggle-reaction.hook";
import { BaseMessageItemProps } from "../../model/types/message-item-props.types";
import { CompactMessageItem } from "./compact-message-item";
import { FullMessageItem } from "./full-message-item";
import { MessageItemToolbar } from "./message-item-toolbar";

interface MessageItemProps {
  item: Message;
  isCompact: boolean;
  hideThreadButton: boolean;
  Renderer: ComponentType<RendererProps>;
  currentMember: NonNullable<Member>;
}

export const MessageItem: FC<MessageItemProps> = memo(({ item, isCompact, Renderer, currentMember, hideThreadButton }) => {
  let Element: JSX.Element;

  const isAuthor = item.memberId === currentMember._id;

  const [isEditing, setIsEditing] = useToggle(false);
  const [messageImages, isImagesFetching] = useParseUrlImages(item, isEditing);
  const { ConfirmDeleteModal, isDeleting, handleDelete } = useHandleDeleteMessage(item);
  const handleReaction = useHandleToggleReaction(item);

  const handleSetIsEditing = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    setIsEditing(e);
  }, [setIsEditing]);

  const commonMessageItemProps = useMemo<BaseMessageItemProps>(() => ({
    item, Renderer, onReactionChange: handleReaction, currentMember,
  }), [Renderer, currentMember, handleReaction, item]);

  if (isCompact) {
    Element = <CompactMessageItem {...commonMessageItemProps} />;
  } else {
    Element = <FullMessageItem {...commonMessageItemProps} />;
  }

  if (isEditing && !isImagesFetching) {
    Element = (
      <UpdateMessageForm
        handleSetIsEditing={handleSetIsEditing as never}
        messageImages={messageImages}
        item={item}
      />
    );
  }

  return (
    <>
      {isAuthor && (
        <ConfirmDeleteModal />
      )}
      <div className={cn(
        "flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60 group relative transition",
        isEditing && "bg-[#f2c74433] hover:bg-[#f2c74433]",
        isDeleting && "bg-rose-500/50 transform transition-all scale-y-0 origin-bottom duration-300",
      )}
      >
        {Element}
        <MessageItemToolbar
          isAuthor={isAuthor}
          hideThreadButton={hideThreadButton}
          setIsEditing={handleSetIsEditing}
          handleReaction={handleReaction}
          handleThread={() => { }}
          handleDelete={handleDelete}
        />
      </div>
    </>
  );
});