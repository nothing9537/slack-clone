import { FC, ReactNode } from "react";

import { Loader, TriangleAlert } from "lucide-react";
import { useGetMessageById } from "@/entities/message";
import { useCurrentMember } from "@/entities/member";
import { Id } from "@convex/_generated/dataModel";

import { ThreadScreen } from "../thread-screen/thread-screen";
import { ThreadHeader } from "../thread-header/thread-header";

interface ThreadProps {
  parentMessageId: Id<"messages">;
  onClose: () => void;
  workspaceId: Id<"workspaces">;
}

export const Thread: FC<ThreadProps> = ({ parentMessageId, onClose, workspaceId }) => {
  const [message, isMessageLoading] = useGetMessageById({ messageId: parentMessageId });
  const [currentMember, isCurrentMemberLoading] = useCurrentMember({ workspaceId });

  let Content: ReactNode = null;

  if (isMessageLoading || isCurrentMemberLoading) {
    Content = (
      <div className="h-full flex items-center justify-center">
        <Loader className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!currentMember) {
    Content = (
      <div className="flex h-full items-center justify-center flex-col gap-y-2">
        <TriangleAlert className="size-5 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Unauthorized.</p>
      </div>
    );
  }

  if (!message) {
    Content = (
      <div className="flex h-full items-center justify-center flex-col gap-y-2">
        <TriangleAlert className="size-5 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Message not found.</p>
      </div>
    );
  }

  if (message && currentMember) {
    Content = (
      <ThreadScreen
        message={message}
        currentMember={currentMember}
      />
    );
  }

  return (
    <div className="h-full flex flex-col">
      <ThreadHeader onThreadClose={onClose} />
      {Content}
    </div>
  );
};
