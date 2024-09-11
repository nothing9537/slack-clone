import { FC } from "react";

import { useGenericModal } from "@/shared/lib/hooks";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { CreateChannelModalData } from "@/shared/types";
import { CreateChannelModalForm } from "../create-channel-modal-form/create-channel-modal-form";

export const CreateChannelModal: FC = () => {
  const { type, onClose, isOpen, modalData } = useGenericModal<CreateChannelModalData>();

  const isModalOpen = type === "createChannelModal" && isOpen;

  if (!modalData?.workspace) {
    return null;
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Add a new channel
          </DialogTitle>
        </DialogHeader>
        <CreateChannelModalForm
          workspace={modalData.workspace}
        />
      </DialogContent>
    </Dialog>
  );
};
