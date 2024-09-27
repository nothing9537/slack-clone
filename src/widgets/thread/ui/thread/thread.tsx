import { FC, ReactNode } from "react";

import { Loader, TriangleAlert } from "lucide-react";
import { useGetMessageById } from "@/entities/message";
import { useCurrentMember } from "@/entities/member";
import { useChannelIdParams } from "@/shared/lib/hooks/use-channel-id";
import { useGetCurrentChannel } from "@/entities/channel";
import { useWorkspaceIdParams } from "@/shared/lib/hooks";
import { Id } from "@convex/_generated/dataModel";

import { ThreadScreen } from "../thread-screen/thread-screen";
import { ThreadHeader } from "../thread-header/thread-header";

interface ThreadProps {
  parentMessageId: Id<"messages">;
  onClose: () => void;
}

interface ThreadLayoutProps {
  onClose: () => void;
  children: ReactNode;
}

const ThreadLayout = ({ children, onClose }: ThreadLayoutProps) => {
  return (
    <div className="h-full flex flex-col">
      <ThreadHeader onThreadClose={onClose} />
      {children}
    </div>
  );
};

export const Thread: FC<ThreadProps> = ({ parentMessageId, onClose }) => {
  const currentChannelId = useChannelIdParams();
  const workspaceId = useWorkspaceIdParams();
  const [channel, isChannelLoading] = useGetCurrentChannel({ channelId: currentChannelId });
  const [message, isMessageLoading] = useGetMessageById({ messageId: parentMessageId });
  const [currentMember, isCurrentMemberLoading] = useCurrentMember({ workspaceId });

  if (isMessageLoading || isCurrentMemberLoading || isChannelLoading) {
    return (
      <ThreadLayout onClose={onClose}>
        <div className="h-full flex items-center justify-center">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </div>
      </ThreadLayout>
    );
  }

  if (!currentMember) {
    return (
      <ThreadLayout onClose={onClose}>
        <div className="flex h-full items-center justify-center flex-col gap-y-2">
          <TriangleAlert className="size-5 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Unauthorized.</p>
        </div>
      </ThreadLayout>
    );
  }

  if (!message) {
    return (
      <ThreadLayout onClose={onClose}>
        <div className="flex h-full items-center justify-center flex-col gap-y-2">
          <TriangleAlert className="size-5 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Message not found.</p>
        </div>
      </ThreadLayout>
    );
  }

  if (!channel) {
    return (
      <ThreadLayout onClose={onClose}>
        <div className="flex h-full items-center justify-center flex-col gap-y-2">
          <TriangleAlert className="size-5 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Channel not found.</p>
        </div>
      </ThreadLayout>
    );
  }

  return (
    <ThreadLayout onClose={onClose}>
      <ThreadScreen
        message={message}
        currentMember={currentMember}
        currentChannel={channel}
      />
    </ThreadLayout>
  );
};
