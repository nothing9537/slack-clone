import { FC, useCallback } from "react";

import { DropdownMenuItem, DropdownMenuSeparator } from "@/shared/ui/dropdown-menu";
import { Workspace } from "@/entities/workspace";
import { useModal } from "@/shared/lib/hooks";

interface AdminActionsViewProps {
  workspace: NonNullable<Workspace>;
}

export const AdminActionsView: FC<AdminActionsViewProps> = ({ workspace }) => {
  const { onOpen } = useModal();

  const onWorkspacePreferencesOpen = useCallback(() => onOpen("workspacePreferencesModal", { workspace }), [workspace, onOpen]);

  return (
    <>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="cursor-pointer py-2" onClick={() => { }}>
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
