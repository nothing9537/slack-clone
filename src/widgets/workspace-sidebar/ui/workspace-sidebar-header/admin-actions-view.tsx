import { FC, useCallback } from "react";

import { InviteModal } from "@/features/invite";
import { Workspace } from "@/entities/workspace";
import { DropdownMenuItem, DropdownMenuSeparator } from "@/shared/ui/dropdown-menu";
import { useModal } from "@/shared/lib/hooks";

interface AdminActionsViewProps {
  workspace: NonNullable<Workspace>;
}

export const AdminActionsView: FC<AdminActionsViewProps> = ({ workspace }) => {
  const { onOpen } = useModal();

  const onWorkspacePreferencesOpen = useCallback(() => onOpen("workspacePreferencesModal", { workspace }), [workspace, onOpen]);

  return (
    <>
      <InviteModal />
      <DropdownMenuSeparator />
      <DropdownMenuItem className="cursor-pointer py-2" onClick={() => onOpen("inviteModal", { workspace })}>
        Invite people to
        {" "}
        {workspace.name}
      </DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer py-2" onClick={onWorkspacePreferencesOpen}>
        Preferences
      </DropdownMenuItem>
    </>
  );
};
