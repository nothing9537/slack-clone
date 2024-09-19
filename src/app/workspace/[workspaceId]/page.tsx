"use client";

import { FC, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Loader, TriangleAlert } from "lucide-react";

import { useGetChannels } from "@/entities/channel";
import { useGetWorkspaceById } from "@/entities/workspace";
import { useCurrentMember } from "@/entities/member";
import { Id } from "@convex/_generated/dataModel";

interface WorkspaceIDPageProps {
  params: {
    workspaceId: Id<"workspaces">;
  }
}

const WorkspaceIDPage: FC<WorkspaceIDPageProps> = ({ params }) => {
  const { workspaceId } = params;
  const router = useRouter();

  const [channels, isChannelsLoading] = useGetChannels({ workspaceId });
  const [workspace, isWorkspaceLoading] = useGetWorkspaceById({ workspaceId });
  const [member, isMemberLoading] = useCurrentMember({ workspaceId });
  const channelId = useMemo(() => channels?.[0]?._id, [channels]);

  useEffect(() => {
    if (channelId && workspace) {
      router.replace(`/workspace/${workspace._id}/channel/${channelId}`);
    }
  }, [channelId, router, workspace]);

  if (isChannelsLoading || isWorkspaceLoading || isMemberLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader className="size-16 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!workspace || !channelId || !member) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-2">
          <TriangleAlert className="text-destructive" />
          <p className="text-sm text-muted-foreground">Workspace not found.</p>
        </div>
      </div>
    );
  }

  return null;
};

export default WorkspaceIDPage;
