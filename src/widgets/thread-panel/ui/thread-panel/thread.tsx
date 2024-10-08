import { FC } from "react";

import { Loader, TriangleAlert } from "lucide-react";
import { useGetMessageById } from "@/entities/message";
import { useCurrentMember } from "@/entities/member";
import { useChannelIdParams } from "@/shared/lib/hooks/use-channel-id";
import { useWorkspaceIdParams } from "@/shared/lib/hooks";
import { Panel } from "@/shared/ui/panel";
import { Id } from "@convex/_generated/dataModel";

import { ThreadScreen } from "../thread-screen/thread-screen";

interface ThreadProps {
  parentMessageId: Id<"messages">;
  onClose: () => void;
}

export const ThreadPanel: FC<ThreadProps> = ({ parentMessageId, onClose }) => {
  let currentChannelId = useChannelIdParams();
  const workspaceId = useWorkspaceIdParams();
  const [message, isMessageLoading] = useGetMessageById({ messageId: parentMessageId });
  const [currentMember, isCurrentMemberLoading] = useCurrentMember({ workspaceId });

  if (isMessageLoading || isCurrentMemberLoading) {
    return (
      <Panel onPanelClose={onClose} headerText="Thread">
        <div className="h-full flex items-center justify-center">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </div>
      </Panel>
    );
  }

  if (!currentMember) {
    return (
      <Panel onPanelClose={onClose} headerText="Thread">
        <div className="flex h-full items-center justify-center flex-col gap-y-2">
          <TriangleAlert className="size-5 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Unauthorized.</p>
        </div>
      </Panel>
    );
  }

  if (!message) {
    return (
      <Panel onPanelClose={onClose} headerText="Thread">
        <div className="flex h-full items-center justify-center flex-col gap-y-2">
          <TriangleAlert className="size-5 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Message not found.</p>
        </div>
      </Panel>
    );
  }

  if (!currentChannelId && message?.channelId) {
    currentChannelId = message.channelId;
  }

  return (
    <Panel onPanelClose={onClose} headerText="Thread">
      <ThreadScreen
        message={message}
        currentMember={currentMember}
        currentChannelId={currentChannelId}
      />
    </Panel>
  );
};
