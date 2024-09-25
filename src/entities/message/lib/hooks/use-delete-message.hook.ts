import { toast } from "sonner";
import { useCallback, useState } from "react";

import { useConfirmModal } from "@/shared/lib/hooks";

import { useDeleteMessage } from "../../model/services/delete-message/delete-message.service";
import { Message } from "../../model/types/message-services.types";

export const useHandleDeleteMessage = (message: NonNullable<Message>) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const [ConfirmDeleteModal, confirm] = useConfirmModal({
    title: "Are you sure you want delete this message?",
    description: "This message will be delete forever. This action cannot be undone.",
  });

  const deleteMessage = useDeleteMessage(message._id, {
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

  return {
    isDeleting,
    ConfirmDeleteModal,
    handleDelete,
  };
};
