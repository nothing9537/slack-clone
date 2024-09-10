import { FC, useState } from "react";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { Workspace } from "@/entities/workspace";
import { useModal } from "@/shared/lib/hooks";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";

import { useRemoveWorkspace } from "../../model/services/remove-workspace/remove-workspace.service";

interface DeleteWorkspaceProps {
  workspace: NonNullable<Workspace>;
}

export const DeleteWorkspace: FC<DeleteWorkspaceProps> = ({ workspace }) => {
  const { onClose } = useModal();
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          disabled={false}
          className="flex outline-none items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600"
        >
          <Trash className="size-4" />
          <p className="text-sm">Delete workspace</p>
        </button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>
            Are you sure you want delete this workspace?
          </DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" variant="destructive" onClick={removeWorkspace}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
