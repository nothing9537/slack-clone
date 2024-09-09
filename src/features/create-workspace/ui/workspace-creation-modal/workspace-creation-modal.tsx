import { FC } from "react";

import { useModal } from "@/shared/lib/hooks/use-modal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog";

import { CreateWorkspaceForm } from "../create-workspace-form/create-workspace-form";

export const WorkspaceCreationModal: FC = () => {
  const { type, isOpen, onClose } = useModal();

  const isModalOpen = type === "workspaceCreationModal" && isOpen;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create a workspace
          </DialogTitle>
        </DialogHeader>
        <CreateWorkspaceForm />
      </DialogContent>
    </Dialog>
  );
};
