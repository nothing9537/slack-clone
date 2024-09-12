import { FC, useCallback } from "react";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Workspace } from "@/entities/workspace";
import { useConfirmModal, useModal } from "@/shared/lib/hooks";

import { useRemoveWorkspace } from "../../model/services/remove-workspace/remove-workspace.service";

interface DeleteWorkspaceProps {
  workspace: NonNullable<Workspace>;
}

export const DeleteWorkspace: FC<DeleteWorkspaceProps> = ({ workspace }) => {
  const { onClose } = useModal();
  const router = useRouter();
  const [DeleteWorkspaceConfirmModal, confirm] = useConfirmModal({
    title: "Are you sure?",
    description: `All data from this workspace will be deleted forever. 
    This action cannot be undone.`,
  });

  const removeWorkspace = useRemoveWorkspace(workspace._id, {
    onSuccess: () => {
      toast.success("Workspace action", {
        description: "Workspace has been successfully removed.",
      });
      onClose();
      router.replace("/");
    },
    onError: (errorMessage) => {
      toast.error("Workspace action", {
        description: errorMessage,
      });
    },
  });

  const handleRemove = useCallback(async () => {
    const isConfirmed = await confirm();

    if (!isConfirmed) {
      return;
    }

    removeWorkspace();
  }, [confirm, removeWorkspace]);

  return (
    <>
      <DeleteWorkspaceConfirmModal />
      <button
        onClick={handleRemove}
        type="button"
        disabled={false}
        className="flex outline-none items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600"
      >
        <Trash className="size-4" />
        <p className="text-sm">Delete workspace</p>
      </button>
    </>
  );
};
