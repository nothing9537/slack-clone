import { FC, useCallback } from "react";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { Channel } from "@/entities/channel";
import { useConfirmModal, useModal } from "@/shared/lib/hooks";
import { useRemoveChannel } from "../../model/services/remove-channel/remove-channel.service";

interface DeleteChannelProps {
  channel: NonNullable<Channel>;
}

export const DeleteChannel: FC<DeleteChannelProps> = ({ channel }) => {
  const { onClose } = useModal();
  const router = useRouter();
  const [DeleteChannelConfirmModal, confirm] = useConfirmModal({
    title: "Are you sure?",
    description: `All data from this channel will be deleted forever. 
    This action cannot be undone.`,
  });

  const removeWorkspace = useRemoveChannel(channel._id, {
    onSuccess: ({ name }) => {
      toast.success("Channel action", {
        description: `Channel '${name}' has been successfully removed.`,
      });
      onClose();
      router.replace(`/workspace/${channel.workspaceId}`);
    },
    onError: (errorMessage) => {
      toast.error("Channel action", {
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
      <DeleteChannelConfirmModal />
      <button onClick={handleRemove} type="button" className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg cursor-pointer border hover:bg-gray-50 text-rose-600">
        <Trash className="size-4" />
        <p className="text-sm font-semibold">Delete channel</p>
      </button>
    </>
  );
};
