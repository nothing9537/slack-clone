import { FC } from "react";
import { Loader } from "lucide-react";

import { Id } from "@convex/_generated/dataModel";
import { PopulatedMember, PopulatedMembers } from "../../model/types/member.types";
import { MemberItem } from "../member-item/member-item";

interface MembersListProps {
  items: PopulatedMembers;
  isLoading: boolean;
  workspaceId: Id<"workspaces">;
}

const renderMember = (workspaceId: Id<"workspaces">) => (item: PopulatedMember) => (
  <MemberItem
    workspaceId={workspaceId}
    // eslint-disable-next-line react/destructuring-assignment
    key={item._id}
    item={item}
  />
);

export const MembersList: FC<MembersListProps> = ({ items, isLoading, workspaceId }) => {
  if (isLoading) {
    return (
      <Loader className="size-4 animate-spin" />
    );
  }

  return (
    <div>
      {items!.map(renderMember(workspaceId))}
    </div>
  );
};
