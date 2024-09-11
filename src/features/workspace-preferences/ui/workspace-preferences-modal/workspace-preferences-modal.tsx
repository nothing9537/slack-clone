import { FC } from "react";

import { useGetWorkspaceById } from "@/entities/workspace";
import { useModalGeneric, useWorkspaceIdParams } from "@/shared/lib/hooks";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { WorkspacePreferencesModalData } from "@/shared/types";

import { EditWorkspace } from "./edit-workspace";
import { DeleteWorkspace } from "./delete-workspace";

export const WorkspacePreferencesModal: FC = () => {
  const { type, onClose, isOpen } = useModalGeneric<WorkspacePreferencesModalData>();
  const workspaceId = useWorkspaceIdParams();
  const [workspace, isLoading] = useGetWorkspaceById({ workspaceId });

  const isModalOpen = type === "workspacePreferencesModal" && isOpen;

  if (isLoading || !workspace) {
    return null;
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 bg-gray-50 overflow-hidden">
        <DialogHeader className="p-4 border-b bg-white">
          <DialogTitle>
            {workspace.name}
          </DialogTitle>
        </DialogHeader>
        <div className="px-2 pb-4 flex flex-col gap-y-2">
          <EditWorkspace workspace={workspace} />
          <DeleteWorkspace workspace={workspace} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
