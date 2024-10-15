import { FC, memo } from "react";
import { AlertTriangle, Loader, MessageSquareIcon, SendHorizonal } from "lucide-react";
import { usePathname } from "next/navigation";

import { ChannelItem, ChannelsList, useGetChannels } from "@/entities/channel";
import { MembersList, useCurrentMember, useCurrentMemberIsAdmin, useGetMembers } from "@/entities/member";
import { useGetWorkspaceById } from "@/entities/workspace";
import { useModal, useWorkspaceIdParams } from "@/shared/lib/hooks";
import { useMemberIdParams } from "@/shared/lib/hooks/use-member-id";

import { usePanel } from "@/shared/lib/hooks/use-panel";
import { useProfileMemberId } from "@/entities/message";
import { LoadingFallback } from "../workspace-sidebar-header/loading-fallback";
import { WorkspaceHeader } from "../workspace-sidebar-header/workspace-sidebar-header";
import { WorkspaceSection } from "../workspace-section/workspace-section";

export const WorkspaceSidebar: FC = memo(() => {
  const { onOpen } = useModal();
  const pathname = usePathname();

  const workspaceId = useWorkspaceIdParams();
  const currentConversationMemberId = useMemberIdParams();
  const { queryParam: panelProfileMemberId } = usePanel(useProfileMemberId);
  const [currentMember, isCurrentMemberLoading] = useCurrentMember({ workspaceId });
  const [workspace, isWorkspaceLoading] = useGetWorkspaceById({ workspaceId });
  const [channels, isChannelsLoading] = useGetChannels({ workspaceId });
  const [members, isMembersLoading] = useGetMembers({ workspaceId });
  const [isAdmin] = useCurrentMemberIsAdmin({ workspaceId });

  if (isCurrentMemberLoading || isWorkspaceLoading) {
    return (
      <LoadingFallback>
        <Loader className="size-5 animate-spin text-white" />
      </LoadingFallback>
    );
  }

  if (!currentMember || !workspace) {
    return (
      <LoadingFallback>
        <AlertTriangle className="size-5 text-white" />
        <p className="text-white text-sm">Workspace not found.</p>
      </LoadingFallback>
    );
  }

  return (
    <div className="flex flex-col bg-[#532c5f] h-full overflow-y-auto app-scrollbar">
      <WorkspaceHeader workspace={workspace} isAdmin={isAdmin} />
      <div className="flex flex-col px-2 mt-6 gap-1">
        <ChannelItem
          label="Threads"
          Icon={MessageSquareIcon}
          workspaceId={workspaceId}
          href={`/workspace/${workspaceId}/threads`}
          variant={pathname.includes("threads") ? "active" : "default"}
        />
        <ChannelItem
          label="Drafts & Sent"
          Icon={SendHorizonal}
          href={`/workspace/${workspaceId}/threads`}
          workspaceId={workspaceId}
        />
      </div>
      <WorkspaceSection
        label="Channels"
        hint="Create a new channel"
        onNew={isAdmin ? () => onOpen("createChannelModal", { workspace }) : undefined}
      >
        <ChannelsList
          items={channels}
          isLoading={isChannelsLoading}
          workspaceId={workspaceId}
        />
      </WorkspaceSection>
      <WorkspaceSection
        label="Direct messages"
        hint="New direct message"
        onNew={() => { }}
      >
        <MembersList
          items={members}
          isLoading={isMembersLoading}
          workspaceId={workspaceId}
          isItemActive={(item) => item._id === currentConversationMemberId || item._id === panelProfileMemberId}
        />
      </WorkspaceSection>
    </div>
  );
});
