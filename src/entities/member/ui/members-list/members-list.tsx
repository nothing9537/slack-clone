import { FC } from "react";
import { Loader, TriangleAlert } from "lucide-react";

import { Id } from "@convex/_generated/dataModel";
import { Member, PopulatedMember, PopulatedMembers } from "../../model/types/member.types";
import { MemberItem } from "../member-item/member-item";
import { useCurrentMember } from "../../model/services/current-member/get-current-member.service";

interface MembersListProps {
  items: PopulatedMembers;
  isLoading: boolean;
  workspaceId: Id<"workspaces">;
  isItemActive?: (item: PopulatedMember) => boolean;
}

const renderMember = (
  workspaceId: Id<"workspaces">,
  currentMember: NonNullable<Member>,
  isItemActive?: MembersListProps["isItemActive"],
) => (item: PopulatedMember) => {
  const variant = isItemActive?.(item) ? "active" : "default";

  return (
    <MemberItem
      currentMember={currentMember}
      workspaceId={workspaceId}
      variant={variant}
      // eslint-disable-next-line react/destructuring-assignment
      key={item._id}
      item={item}
    />
  );
};

export const MembersList: FC<MembersListProps> = ({ items, isLoading, workspaceId, isItemActive }) => {
  const [currentMember, isCurrentMemberLoading] = useCurrentMember({ workspaceId });

  if (isLoading || isCurrentMemberLoading) {
    return (
      <Loader className="size-5 animate-spin" />
    );
  }

  if (!currentMember) {
    return (
      <div className="flex items-center justify-center gap-2">
        <TriangleAlert className="size-5 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Unauthorized.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      {items!.map(renderMember(workspaceId, currentMember, isItemActive))}
    </div>
  );
};
