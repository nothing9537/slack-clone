import { FC } from "react";
import { Loader } from "lucide-react";

import { useCurrentMember, useCurrentMemberIsAdmin, useGetMemberById } from "@/entities/member";
import { useWorkspaceIdParams } from "@/shared/lib/hooks";
import { Panel } from "@/shared/ui/panel";
import { NotFoundFallback } from "@/shared/ui/not-found-fallback";
import { Id } from "@convex/_generated/dataModel";

import { MemberProfileScreen } from "../member-profile-screen/member-profile-screen";

interface ThreadProps {
  memberId: Id<"members">;
  onClose: () => void;
}

export const MemberProfilePanel: FC<ThreadProps> = ({ memberId, onClose }) => {
  const workspaceId = useWorkspaceIdParams();
  const [member, isMemberLoading] = useGetMemberById({ memberId });
  const [currentMember, isCurrentMemberLoading] = useCurrentMember({ workspaceId });
  const [isAdmin, isAdminLoading] = useCurrentMemberIsAdmin({ workspaceId });

  if (isMemberLoading || isCurrentMemberLoading || isAdminLoading) {
    return (
      <Panel onPanelClose={onClose} headerText="Member Profile">
        <div className="h-full flex items-center justify-center">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </div>
      </Panel>
    );
  }

  if (!currentMember) {
    return (
      <Panel onPanelClose={onClose} headerText="Member Profile">
        <NotFoundFallback text="Unauthorized" />
      </Panel>
    );
  }

  if (!member) {
    return (
      <Panel onPanelClose={onClose} headerText="Member Profile">
        <NotFoundFallback text="Profile not found." />
      </Panel>
    );
  }

  return (
    <Panel onPanelClose={onClose} headerText="Member Profile">
      <MemberProfileScreen
        isCurrentMemberAdmin={isAdmin}
        member={member}
        currentMember={currentMember}
      />
    </Panel>
  );
};
