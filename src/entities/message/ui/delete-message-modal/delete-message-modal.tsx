import { FC } from "react";

// eslint-disable-next-line import/no-cycle
import { useGenericModal } from "@/shared/lib/hooks";
import { MessageDeleteModalData } from "@/shared/types";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";

import { useDeleteMessage } from "../../model/services/delete-message/delete-message.service";

export const DeleteMessageModal: FC = () => {
  const { type, onClose, isOpen, modalData } = useGenericModal<MessageDeleteModalData>();

  const isModalOpen = type === "messageDeleteModal" && isOpen;

  // const onDelete = useDeleteMessage(modalData.message!._id, {
  //   onSuccess: () => {

  //   },
  //   onError: (errorMessage) => {

  //   },
  //   onSettled: () => {

  //   },
  // });

  if (!modalData?.message) {
    return null;
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want delete this message?
          </DialogTitle>
          <DialogDescription>
            This message will be deleted forever.
            {" "}
            <br />
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-2">
          <DialogClose asChild>
            <Button variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={() => {}} variant="destructive">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
