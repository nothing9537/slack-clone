import { FC } from "react";

import { DropdownMenuItem, DropdownMenuSeparator } from "@/shared/ui/dropdown-menu";
import { Workspace } from "../../model/types/workspace.types";

interface AdminActionsViewProps {
  workspace: NonNullable<Workspace>;
}

export const AdminActionsView: FC<AdminActionsViewProps> = ({ workspace }) => {
  return (
    <>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="cursor-pointer py-2" onClick={() => { }}>
        Invite people to
        {" "}
        {workspace.name}
      </DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer py-2" onClick={() => { }}>
        Preferences
      </DropdownMenuItem>
    </>
  );
};
