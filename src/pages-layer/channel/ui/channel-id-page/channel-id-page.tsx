"use client";

import { FC } from "react";
import { Loader, TriangleAlert } from "lucide-react";

import { useGetCurrentChannel } from "@/entities/channel";
import { ChannelScreen } from "@/widgets/channel";
import { useCurrentMember } from "@/entities/member";

import { Id } from "@convex/_generated/dataModel";

interface ChannelIDPageProps {
  params: {
    channelId: Id<"channels">;
    workspaceId: Id<"workspaces">;
  };
}

export const ChannelIDPage: FC<ChannelIDPageProps> = ({ params }) => {
  const { channelId, workspaceId } = params;
  const [currentChannel, isCurrentChannelLoading] = useGetCurrentChannel({ channelId });
  const [currentMember, isCurrentMemberLoading] = useCurrentMember({ workspaceId });

  if (isCurrentChannelLoading || isCurrentMemberLoading) {
    return (
      <div className="h-full flex flex-1 items-center justify-center">
        <Loader className="animate-spin size-6 text-muted-foreground" />
      </div>
    );
  }

  if (!currentChannel || !currentMember) {
    return (
      <div className="h-full flex flex-1 flex-col gap-y-2 items-center justify-center">
        <TriangleAlert className="size-5 text-destructive" />
        <p className="text-sm text-muted-foreground">Channel not found.</p>
      </div>
    );
  }

  return (
    <ChannelScreen
      channel={currentChannel}
      currentMember={currentMember}
    />
  );
};
