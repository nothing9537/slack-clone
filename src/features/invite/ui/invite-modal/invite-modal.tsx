import { FC, useCallback, useState } from "react";
import { Copy, RefreshCcw } from "lucide-react";
import { toast } from "sonner";

import { useGetWorkspaceById } from "@/entities/workspace";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { useConfirmModal, useGenericModal, useWorkspaceIdParams } from "@/shared/lib/hooks";
import { WorkspaceInviteModalData } from "@/shared/types";
import { Button } from "@/shared/ui/button";

import { useUpdateWorkspaceJoinCode } from "../../model/services/update-workspace-join-code/update-workspace-join-code.service";

export const InviteModal: FC = () => {
  const { type, isOpen, onClose } = useGenericModal<WorkspaceInviteModalData>();
  const workspaceId = useWorkspaceIdParams();
  const [workspace] = useGetWorkspaceById({ workspaceId });
  const [isPending, setIsPending] = useState(false);

  const isModalOpen = type === "inviteModal" && isOpen;

  const [ConfirmModal, confirm] = useConfirmModal({
    title: "Are your sure you want regenerate invitation code?",
    description: "If you have shared the current code with other people, when you change it, they will no longer be able to access the workspace using the old code. This action cannot be undone.",
  });

  const updateWorkspaceJoinCode = useUpdateWorkspaceJoinCode(workspaceId, {
    onSuccess: () => {
      toast.success("New invite code regenerated.");
    },
    onError: (errorMessage) => {
      toast.error(errorMessage);
    },
  });

  const handleConfirm = useCallback(async () => {
    const isConfirmed = await confirm();

    if (!isConfirmed) {
      return;
    }

    setIsPending(true);

    updateWorkspaceJoinCode().finally(() => {
      setIsPending(false);
    });
  }, [updateWorkspaceJoinCode, confirm]);

  const handleCopy = useCallback(() => {
    const inviteLink = `${window.location.origin}/join/${workspace?._id}`;

    navigator.clipboard.writeText(inviteLink).then(() => {
      toast.success("Invite link copied to clipboard.");
    });
  }, [workspace]);

  if (!workspace) {
    return null;
  }

  return (
    <>
      <ConfirmModal />
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>
              Invite people to
              {" "}
              {workspace.name}
            </DialogTitle>
            <DialogDescription>
              Use invite code below to invite people to this workspace
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-y-4 items-center justify-center py-10">
            <p className="text-4xl font-bold tracking-widest uppercase">{workspace.joinCode}</p>
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              Copy invite link
              <Copy className="size-4 ml-2" />
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={handleConfirm} disabled={isPending}>
              Generate new code
              <RefreshCcw className="size-4 ml-2" />
            </Button>
            <DialogClose asChild disabled={isPending}>
              <Button>
                Close
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
