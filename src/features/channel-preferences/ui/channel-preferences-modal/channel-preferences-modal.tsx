import { FC } from "react";

import { useGetCurrentChannel } from "@/entities/channel";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { ChannelPreferencesModalData } from "@/shared/types";
import { useGenericModal } from "@/shared/lib/hooks";
import { useChannelIdParams } from "@/shared/lib/hooks/use-channel-id";
import { useCurrentMemberIsAdmin } from "@/entities/member";
import { Id } from "@convex/_generated/dataModel";

import { EditChannel } from "./edit-channel";
import { DeleteChannel } from "./delete-channel";

interface ChannelPreferencesModalProps {
  workspaceId: Id<"workspaces">;
}

export const ChannelPreferencesModal: FC<ChannelPreferencesModalProps> = ({ workspaceId }) => {
  const { isOpen, onClose, type } = useGenericModal<ChannelPreferencesModalData>();

  const channelId = useChannelIdParams();
  const [channel, isChannelLoading] = useGetCurrentChannel({ channelId });
  const [isAdmin] = useCurrentMemberIsAdmin({ workspaceId });

  const isModalOpen = type === "channelPreferencesModal" && isOpen;

  if (isChannelLoading || !channel) {
    return null;
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 bg-gray-50 overflow-hidden">
        <DialogHeader className="p-4 border-b bg-white">
          <DialogTitle>
            #
            {" "}
            {channel.name}
          </DialogTitle>
        </DialogHeader>
        <div className="px-4 pb-4 flex flex-col gap-y-2">
          <EditChannel channel={channel} isAdmin={isAdmin} />
          {isAdmin && (
            <DeleteChannel channel={channel} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
