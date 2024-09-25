import { ComponentType, FC, memo, MouseEvent, useCallback, useState } from "react";

import { toast } from "sonner";
import { RendererProps } from "@/shared/ui/renderer";
import { Member } from "@/entities/member";
import { useToggle } from "@/shared/lib/hooks/use-toggle";
import { cn } from "@/shared/lib/utils/cn";
import { useConfirmModal } from "@/shared/lib/hooks";

import { Message } from "../../model/types/message-services.types";
import { useParseUrlImages } from "../../lib/hooks/use-parse-url-images.hook";
import { UpdateMessageForm } from "../update-message-form/update-message-form";
import { useHandleDeleteMessage } from "../../model/services/delete-message/delete-message.service";
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
  const [isDeleting, setIsDeleting] = useState(false);
  const [ConfirmDeleteModal, confirm] = useConfirmModal({
    title: "Are you sure you want delete this message?",
    description: "This message will be delete forever. This action cannot be undone.",
  });

  if (isCompact) {
    Element = <CompactMessageItem item={item} Renderer={Renderer} />;
  } else {
    Element = <FullMessageItem item={item} Renderer={Renderer} />;
  }

  const [messageImages, isImagesFetching] = useParseUrlImages(item, isEditing);
  const deleteMessage = useHandleDeleteMessage(item._id, {
    onSuccess: () => {
      toast.success("Message action", {
        description: "Message deleted.",
      });
    },
    onError: (errorMessage) => {
      toast.error("Message action", {
        description: errorMessage,
      });
    },
  });

  const handleSetIsEditing = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    setIsEditing(e);
  }, [setIsEditing]);

  const handleDelete = useCallback(async () => {
    const isConfirmed = await confirm();

    if (!isConfirmed) {
      return;
    }

    setIsDeleting(true);

    deleteMessage().then(() => {
      setIsDeleting(false);
    });
  }, [confirm, deleteMessage]);

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
          handleReaction={() => { }}
          handleThread={() => { }}
          handleDelete={handleDelete}
        />
      </div>
    </>
  );
});
